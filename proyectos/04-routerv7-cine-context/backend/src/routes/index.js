import express from 'express';
import authRoutes from './authRoutes.js';
import movieRoutes from './movieRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import favoriteRoutes from './favoriteRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Configuración de rutas principales con manejo de errores
router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/users', userRoutes);

// Ruta de verificación de API
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    services: {
      auth: 'up',
      movies: 'up',
      reviews: 'up',
      favorites: 'up',
      users: 'up'
    }
  });
});

// Manejo de rutas no encontradas
router.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'La ruta solicitada no existe',
    path: req.originalUrl
  });
});

// Manejo de errores global
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Ha ocurrido un error en el servidor'
  });
});

export default router;
