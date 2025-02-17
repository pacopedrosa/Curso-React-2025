import User from '../models/User.js';

//controlador para añadir un usuario
export const addUser = async (req, res) => {
    try {
        //extraemos el username y password
    const { username, password } = req.body;

    //creamos un nuevo usuario
    const user = new User({ username, password });

    //guardamos el usuario en la base de datos
    await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });

    }
}

//controlador para obtener el perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
   try {
     //extraemos el usuario autenticado
     const user = await User.findById(req.userId).select('-password');

     //si no existe el usuario
     if (!user) {
         return res.status(401).json({ message: 'Usuario no autenticado' });
     }

     //enviamos la respuesta
     res.status(200).json({ id: user._id, username: user.username });
   } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
   }
}

