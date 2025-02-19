import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  createReview,
  getMovieReviews,
  getUserReviews,
  deleteReview,
  getGlobalReviews // Añadir esta importación
} from '../controllers/reviewController.js';

const router = express.Router();

// Rutas públicas
router.get('/movie/:movieId', getMovieReviews);
router.get('/global', getGlobalReviews); // Nueva ruta global

// Todas las demás rutas requieren autenticación
router.use(authMiddleware);

router.post('/', createReview);
router.get('/user', getUserReviews);
router.delete('/:id', deleteReview);

export default router;