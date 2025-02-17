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
            try {
                const { data } = await authService.verifyToken();
                setUser(data.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error al verificar autenticación:', error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const { user } = await authService.login(credentials);
            setUser(user);
            setIsAuthenticated(true);
            showToast('Inicio de sesión exitoso', 'success');
            return { user };
        } catch (error) {
            console.error('Error en login:', error);
            setUser(null);
            setIsAuthenticated(false);
            showToast(error.message || 'Error al iniciar sesión', 'error');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            showToast('Sesión cerrada exitosamente', 'success');
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            showToast('Error al cerrar sesión', 'error');
        }
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