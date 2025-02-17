import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/favoriteController.js';

const router = express.Router();

// Todas las rutas de favoritos requieren autenticación
router.use(authMiddleware);

router.get('/', getFavorites);
router.post('/:movieId', addFavorite);
router.delete('/:movieId', removeFavorite);

export default router;
