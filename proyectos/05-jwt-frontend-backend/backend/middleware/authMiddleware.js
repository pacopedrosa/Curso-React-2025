import jwt from 'jsonwebtoken';

//middleware para verificar el token
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //si no existe el token
        if (!token) {
            return res.status(401).json({ message: 'No hay token' });
        }
        //verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //añadimos el userId al request
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(402).json({ message: 'Token invalido' });
    }
}