import express from 'express';
import cors from 'cors';
import workshopsRouter from './routes/workshops';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/workshops', workshopsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend ejecutándose en http://localhost:${PORT}`);
});