export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        res.json({ message: 'Inicio de sesión exitoso', user });
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Cierre de sesión exitoso' });
}

export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
}

export const updateUserProfile = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { username, email, password }, { new: true });
    res.json(user);
}

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Usuario eliminado exitosamente' });
}











