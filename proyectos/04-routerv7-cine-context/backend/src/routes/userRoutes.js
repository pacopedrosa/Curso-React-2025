import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
    getUserProfile,
    updateUserProfile 
} from '../controllers/userController.js';

const router = express.Router();

// Rutas protegidas que requieren autenticación
router.use(authMiddleware);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
