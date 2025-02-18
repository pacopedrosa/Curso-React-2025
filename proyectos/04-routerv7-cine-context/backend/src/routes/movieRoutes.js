import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
  getHome,
  getPopularMovies, 
  getMovieById, 
  searchMovies
} from '../controllers/movieController.js';

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.get('/popular', getPopularMovies); // Para la página de películas (/movies)
router.get('/search', searchMovies);      // Para la búsqueda
router.get('/:id', getMovieById);        // Para detalles de película

// Rutas protegidas que requieren autenticación
router.use(authMiddleware);

export default router; 