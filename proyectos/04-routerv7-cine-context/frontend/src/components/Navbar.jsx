import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">
                        Inicio
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/favorites" className="text-white hover:text-gray-300">
                                Favoritos
                            </Link>
                            <Link to="/my-reviews" className="text-white hover:text-gray-300">
                                Mis Reseñas
                            </Link>
                            <Link to="/profile" className="text-white hover:text-gray-300">
                                Perfil
                            </Link>
                        </>
                    )}
                </div>
                <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
                    <input
                        type="search"
                        placeholder="Buscar películas..."
                        className="w-full px-4 py-1 rounded-md text-gray-900"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                <div>
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLogout}
                            className="text-white hover:text-gray-300"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link to="/login" className="text-white hover:text-gray-300">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 