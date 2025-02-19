import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import favoriteRoutes from './routes/favoriteRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  credentials: true
}));

// Añadir antes de las rutas
app.use((req, res, next) => {
    console.log('Request recibida:');
    console.log('URL:', req.url);
    console.log('Método:', req.method);
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    next();
});

// Montar todas las rutas bajo /api
app.use('/api', routes);

// Montar las rutas de películas en /api/movies
app.use('/api/movies', movieRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
