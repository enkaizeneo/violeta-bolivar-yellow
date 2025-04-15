import express from 'express';
import { 
  fetchWorkshops, 
  createWorkshop 
} from '../services/workshopService';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const workshops = fetchWorkshops();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener talleres' });
  }
});

router.post('/', (req, res) => {
  try {
    const newWorkshop = createWorkshop(req.body.name);
    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear taller' });
  }
});

export default router;