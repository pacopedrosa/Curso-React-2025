import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import favoriteRoutes from './routes/favoriteRoutes.js';
import router from './routes/movieRoutes.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
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

// Un solo punto de entrada para todas las rutas
app.use('/api', routes);

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
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
