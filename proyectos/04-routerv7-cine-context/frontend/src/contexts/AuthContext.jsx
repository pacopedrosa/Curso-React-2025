import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await authService.verifyToken();
                    setUser(data.user);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            console.log('Iniciando proceso de login con credenciales:', credentials);
            
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (!response.ok) {
                console.error('Error en la respuesta:', response.status);
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            console.log('Login exitoso, actualizando estado...');
            
            // Actualizar estado
            localStorage.setItem('token', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            
            console.log('Estado actualizado correctamente');
            showToast('Inicio de sesión exitoso', 'success');
            
            return data;

        } catch (error) {
            console.error('Error detallado en login:', error);
            showToast(error.message || 'Error al iniciar sesión', 'error');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        showToast('Sesión cerrada exitosamente', 'success');
        navigate('/login');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 