import { PrismaClient, APICheck } from '@prisma/client';
import { APICheckCreateData } from '../models/APICheckCreateData';

const prisma = new PrismaClient();

class APICheckService {
    // Create a new API check
    async createAPICheck(apiCheckData: APICheckCreateData): Promise<APICheck> {
      try {
        const newAPICheck = await prisma.aPICheck.create({
          data: apiCheckData,
        });
        return newAPICheck;
      } catch (error) {
        console.error('Error creating API check:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 24 hours
    async getAPIChecksLast24Hours(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 24 hours:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 7 days
    async getAPIChecksLast7Days(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 7 days:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 28 days
    async getAPIChecksLast28Days(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 28);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 28 days:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 3 months
    async getAPIChecksLast3Months(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 3 months:', error);
        throw error;
      }
    }
  
    // Get API checks for a specific API in the last 6 months
    async getAPIChecksLast6Months(apiId: number): Promise<APICheck[]> {
      try {
        const date = new Date();
        date.setMonth(date.getMonth() - 6);
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
            checkedAt: {
              gte: date,
            },
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching API checks for the last 6 months:', error);
        throw error;
      }
    }
  
    // Get all API checks for a specific API (forever)
    async getAllAPIChecksForAPI(apiId: number): Promise<APICheck[]> {
      try {
        const apiChecks = await prisma.aPICheck.findMany({
          where: {
            apiId: apiId,
          },
        });
        return apiChecks;
      } catch (error) {
        console.error('Error fetching all API checks for the API:', error);
        throw error;
      }
    }
  }
  
export default APICheckService;
// const APICheck=new APICheckService();

// async function main() {
    
//     console.log(await APICheck.getAPIChecksLast24Hours(1));
// }

// main().catch((e)=>console.log(e));