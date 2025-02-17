import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite
} from '../controllers/favoriteController.js';

const router = express.Router();

// Middleware de autenticación
router.use(authMiddleware);

// Definición de rutas
router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:movieId', removeFavorite);

export default router;
