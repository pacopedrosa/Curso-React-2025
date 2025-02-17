import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  createReview,
  getMovieReviews,
  getUserReviews,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Todas las rutas de reseñas requieren autenticación
router.use(authMiddleware);

router.post('/', createReview);
router.get('/movie/:movieId', getMovieReviews);
router.get('/user', getUserReviews);
router.delete('/:id', deleteReview);

export default router;
