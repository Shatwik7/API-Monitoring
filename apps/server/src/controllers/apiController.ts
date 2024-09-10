import { Request, Response } from 'express';
import APIService from '../services/APIService';
import { formatResponse, formatErrorResponse } from '../views/response';

class APIController {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  async createAPI(req: Request, res: Response): Promise<void> {
    try {
      const newAPI = await this.apiService.createAPI(req.body);
      res.status(201).json(formatResponse(newAPI));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to create API', error));
    }
  }

  async getAllAPIs(req: Request, res: Response): Promise<void> {
    try {
      const apis = await this.apiService.getAllAPIs();
      res.json(formatResponse(apis));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to fetch APIs', error));
    }
  }

  async getAPIById(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const api = await this.apiService.getAPIById(apiId);
      if (api) {
        res.json(formatResponse(api));
      } else {
        res.status(404).json(formatErrorResponse('API not found'));
      }
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to fetch API', error));
    }
  }

  async updateAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const updatedAPI = await this.apiService.updateAPI(apiId, req.body);
      res.json(formatResponse(updatedAPI));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to update API', error));
    }
  }

  async deleteAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiId = Number(req.params.id);
      const result = await this.apiService.deleteAPI(apiId);
      res.json(formatResponse(result));
    } catch (error) {
      res.status(500).json(formatErrorResponse('Failed to delete API', error));
    }
  }
}

export default new APIController();  // Export an instance of the controller
