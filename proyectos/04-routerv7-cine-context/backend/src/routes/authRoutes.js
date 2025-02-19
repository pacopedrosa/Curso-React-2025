import express from 'express';
import { register, login, logout, verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authMiddleware, verifyToken);

export default router;