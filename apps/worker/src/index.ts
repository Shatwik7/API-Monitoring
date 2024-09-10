import https, { RequestOptions, Agent } from 'https';
import { Kafka } from 'kafkajs';
import dns, { LookupOptions } from 'dns';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const kafka = new Kafka({
  clientId: 'worker-service',
  brokers: ['localhost:9093'], // Replace with your Kafka broker address
});
const consumer = kafka.consumer({ groupId: 'api-monitoring-group' });

interface APICheckResult {
  apiId: number;
  apiUrl: string;
  dnsLookupTime: number;
  tcpConnectionTime: number;
  tlsHandshakeTime: number;
  statusCode: number;
  totalTime: number;
}

const agent = new Agent({
  keepAlive: false,
  lookup: (
    hostname: string,
    options: LookupOptions,
    callback: (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family: number) => void
  ) => {
    const startTime = process.hrtime();
    dns.lookup(hostname, options, (err, address, family) => {
      const endTime = process.hrtime(startTime);
      const dnsLookupTime = (endTime[0] * 1000 + endTime[1] / 1e6);
      if (err) {
        callback(err, '', 0); // Provide default values for address and family in case of error
      } else {
        callback(null, address, family);
      }
    });
  }
});

interface Api {
  id: number;
  url: string;
  name: string;
  description: string;
  checkInterval: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

async function monitorRequest(api: Api): Promise<APICheckResult | null> {
  const { url: apiUrl, id: apiId } = api;
  console.log(apiUrl, apiId);
  const startTime = process.hrtime();
  let dnsLookupTime = 0, tcpConnectionTime: [number, number] | undefined, tlsHandshakeTime: [number, number] | undefined, totalTime: [number, number] | undefined;

  return new Promise((resolve) => {
    const request = https.get(apiUrl, { agent } as RequestOptions, (res) => {
      res.on('data', () => {});

      res.on('end', () => {
        totalTime = process.hrtime(startTime);
        resolve({
          apiId,
          apiUrl,
          dnsLookupTime,
          tcpConnectionTime: tcpConnectionTime ? (tcpConnectionTime[0] * 1000 + tcpConnectionTime[1] / 1e6) : 0,
          tlsHandshakeTime: tlsHandshakeTime ? (tlsHandshakeTime[0] * 1000 + tlsHandshakeTime[1] / 1e6) : 0,
          statusCode: res.statusCode!,
          totalTime: totalTime ? (totalTime[0] * 1000 + totalTime[1] / 1e6) : 0,
        });
      });
    });

    request.on('socket', (socket) => {
      socket.on('connect', () => {
        tcpConnectionTime = process.hrtime(startTime);
      });

      socket.on('secureConnect', () => {
        tlsHandshakeTime = process.hrtime(startTime);
      });
    });

    request.on('error', (error: Error) => {
      console.error(`Request failed: ${error.message}`);
      resolve(null);
    });
  });
}

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'api-monitoring-tasks', fromBeginning: false });

  let results: APICheckResult[] = [];

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("topic", topic);
      if (message.value) {
        try {
          const tasks = JSON.parse(message.value.toString()) as Api[];
          
          // Launch multiple monitorRequest calls concurrently
          const monitorPromises = tasks.map((task) => monitorRequest(task));
          const concurrentResults = await Promise.all(monitorPromises);

          // Filter out null results
          const validResults = concurrentResults.filter((result) => result !== null) as APICheckResult[];
          results.push(...validResults);

          // Bulk insert every 1000 tasks or so
          if (results.length >= 100) {
            await prisma.aPICheck.createMany({ data: results }).catch((e) => console.error(e));
            console.log('Bulk insert completed.');
            console.log("\x1B[31m", results, "\x1B[37m");
            results = [];
          }
        } catch (error) {
          console.error('Failed to parse message or process tasks:', error);
        }
      } else {
        console.warn('Received a message with null or undefined value');
      }
    },
  });
}

// Start the worker service
run().catch((e) => console.error(e));
