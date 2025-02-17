import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
  getPopularMovies, 
  getMovieById, 
  searchMovies
} from '../controllers/movieController.js';

const router = express.Router();

// Rutas públicas
router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);

// Rutas protegidas que requieren autenticación
router.use(authMiddleware);

export default router; 