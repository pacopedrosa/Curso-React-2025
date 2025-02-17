// se encarga de los controles de la autenticacion

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//controlador para iniciar sesion
export const login = async (req, res) => {
    //extraemos el username y password
    const { username, password } = req.body;


    //buscamos el usuario en la base de datos
    const user = await User.findOne({ username });

    //si no existe el usuario
    if (!user || !(user.comparePassword(password))) {
        return res.status(401).json({ message: 'Credenciales invalidas' });
    }

    //generamos un token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    //creamos una cookie con el token
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hora
        sameSite: 'lax',
        path: '/'
    });

    //enviamos la respuesta
    res.status(200).json({ message: 'Inicio de sesion exitoso' });
}



//controlador para registrar un usuario
export const register = async (req, res) => {
    //extraemos el username y password
    const { username, password } = req.body;


    //verificamos si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    

    //creamos un nuevo usuario
    const user = new User({ username, password });

    //guardamos el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
}




export const logout = (req, res) => {
    //eliminamos la cookie
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,
    });

    res.status(200).json({ message: 'Cierre de sesion exitoso' });
}



