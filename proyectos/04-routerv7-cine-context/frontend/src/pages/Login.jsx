import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (loading) return;
        
        setLoading(true);
        console.log('Iniciando proceso de login...', credentials);
        
        try {
            const result = await login(credentials);
            console.log('Resultado del login:', result);
            
            // Esperar a que el estado se actualice
            setTimeout(() => {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }, 100);
            
        } catch (error) {
            console.error('Error en login:', error);
            showToast(error.message || 'Error al iniciar sesión', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Iniciar Sesión
                </h2>
                <div className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={credentials.username}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            value={credentials.password}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {loading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </div>
                <div className="text-center">
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 