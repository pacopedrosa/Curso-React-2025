import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
  getHome,
  getPopularMovies, 
  getMovieDetails, 
  searchMovies
} from '../controllers/movieController.js';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.get('/popular', getPopularMovies); // Para la página de películas (/movies)
router.get('/search', searchMovies);      // Para la búsqueda
router.get('/:id', getMovieDetails);        // Para detalles de película

// Rutas protegidas que requieren autenticación
router.use(authMiddleware);

export default router; 