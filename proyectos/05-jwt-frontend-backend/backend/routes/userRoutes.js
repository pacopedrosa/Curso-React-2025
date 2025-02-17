import express from 'express';
import { addUser, getUserProfile } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addUser);
router.get('/me', authMiddleware, getUserProfile);

export default router;