import { Request, Response } from 'express';
import APICheckService from '../services/APICheckService';

const apiCheckService = new APICheckService();

class APICheckController {
  // Create a new API check
  async createAPICheck(req: Request, res: Response): Promise<void> {
    try {
      const newAPICheck = await apiCheckService.createAPICheck(req.body);
      res.status(201).json(newAPICheck);
    } catch (error) {
      res.status(500).json({ message: 'Error creating API check', error });
    }
  }

  // Get API checks for a specific API in the last 24 hours
  async getAPIChecksLast24Hours(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast24Hours(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 24 hours', error });
    }
  }

  // Get API checks for a specific API in the last 7 days
  async getAPIChecksLast7Days(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast7Days(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 7 days', error });
    }
  }

  // Get API checks for a specific API in the last 28 days
  async getAPIChecksLast28Days(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast28Days(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 28 days', error });
    }
  }

  // Get API checks for a specific API in the last 3 months
  async getAPIChecksLast3Months(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast3Months(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 3 months', error });
    }
  }

  // Get API checks for a specific API in the last 6 months
  async getAPIChecksLast6Months(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAPIChecksLast6Months(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching API checks for the last 6 months', error });
    }
  }

  // Get all API checks for a specific API (forever)
  async getAllAPIChecksForAPI(req: Request, res: Response): Promise<void> {
    try {
      const apiChecks = await apiCheckService.getAllAPIChecksForAPI(Number(req.params.id));
      res.json(apiChecks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all API checks for the API', error });
    }
  }
}

export default new APICheckController();
