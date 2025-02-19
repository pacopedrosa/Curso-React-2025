import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
  getHome,
  getPopularMovies, 
  getMovieDetails, 
  searchMovies,
  getMovieVideos 
} from '../controllers/movieController.js';

const router = Router();

// Rutas públicas (no requieren autenticación)
router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieDetails);
router.get('/:id/videos', getMovieVideos); // Add this new route

// Rutas protegidas que requieren autenticación
router.use(authMiddleware);

export default router;