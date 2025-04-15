import { Request, Response } from 'express';
import {
  fetchWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop
} from '../services/workshopService';

export const getWorkshops = async (req: Request, res: Response) => {
  try {
    const workshops = await fetchWorkshops();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... Implementar otros métodos del controlador