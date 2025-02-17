import express from 'express';
import { login, register, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;