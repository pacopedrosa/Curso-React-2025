import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token de autenticación' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            
            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const authorizeUser = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' });
        }
        next();
    }
}





