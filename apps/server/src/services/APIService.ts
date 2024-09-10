import { PrismaClient, API } from '@prisma/client';
import { APICreateData } from '../models/APICreateData';

const prisma = new PrismaClient();

class APIService {
  // Create a new API
  async createAPI(apiData: APICreateData): Promise<API> {
    try {
      const newAPI = await prisma.aPI.create({
        data: apiData,
      });
      return newAPI;
    } catch (error) {
      console.error('Error creating API:', error);
      throw error;
    }
  }

  // Get all APIs
  async getAllAPIs(): Promise<API[]> {
    try {
      const apis = await prisma.aPI.findMany();
      return apis;
    } catch (error) {
      console.error('Error fetching APIs:', error);
      throw error;
    }
  }

  // Get API by ID
  async getAPIById(apiId: number): Promise<API | null> {
    try {
      const api = await prisma.aPI.findUnique({
        where: { id: apiId },
      });
      return api;
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error;
    }
  }

  // Update API
  async updateAPI(apiId: number, updateData: Partial<APICreateData>): Promise<API> {
    try {
      const updatedAPI = await prisma.aPI.update({
        where: { id: apiId },
        data: updateData,
      });
      return updatedAPI;
    } catch (error) {
      console.error('Error updating API:', error);
      throw error;
    }
  }

  // Delete API
  async deleteAPI(apiId: number): Promise<{ message: string }> {
    try {
      await prisma.aPI.delete({
        where: { id: apiId },
      });
      return { message: 'API deleted successfully' };
    } catch (error) {
      console.error('Error deleting API:', error);
      throw error;
    }
  }
}

export default APIService;
