import express from 'express';
import { login, logout, register } from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
//Rutas de autenticacion
// /login /register /logout

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({
       message: "Usuario autenticado"
    });
});

//Aqui tendreis que añadir las rutas que faltan

export default router;
