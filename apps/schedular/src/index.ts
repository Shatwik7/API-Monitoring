import { Kafka } from 'kafkajs';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const kafka = new Kafka({
  clientId: 'scheduler-service',
  brokers: ['localhost:9093'],
});

const producer = kafka.producer();
const BATCH_SIZE = 50; // Number of records to process per batch

async function getApi(lastId: number) {
  const apiBatch = await prisma.aPI.findMany({
    where: { id: { gt: lastId } },
    take: BATCH_SIZE,
  });
  return apiBatch;
}

async function sendMessage(batch: any[]) {
  await producer.send({
    topic: 'api-monitoring-tasks',
    messages: [{ value: JSON.stringify(batch) }],
  });
  console.log(`Sent batch of ${batch.length} API URLs to Kafka`);
}

cron.schedule('*/19 * * * * *', async () => {
  await producer.connect();
  console.log('Scheduler started, pushing API URLs to Kafka...');
  
  let lastId = 0;
  while (true) {
    const API_URLS = await getApi(lastId);
    if (API_URLS.length === 0) break; // No more records to process

    await sendMessage(API_URLS);
    
    // Update the lastId to the latest fetched record's ID
    lastId = API_URLS[API_URLS.length - 1].id;
  }

  await producer.disconnect();
  console.log('All API URL batches pushed for this cycle.');
});
