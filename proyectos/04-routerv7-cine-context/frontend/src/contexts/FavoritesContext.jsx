import { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "./ToastContext";
import { favoriteService } from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if(!context){
        throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
    }
    return context;
}

export const FavoritesProvider = ({children}) => {
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            if (!isAuthenticated) return;
            
            try {
                const { data } = await favoriteService.getFavorites();
                console.log('Favoritos cargados:', data);
                setFavorites(data);
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
                if (error.response?.status === 404) {
                    console.error('Endpoint de favoritos no encontrado');
                    showToast('Servicio de favoritos no disponible', 'error');
                } else if (error.response?.status === 401) {
                    showToast('Error de autenticación', 'error');
                } else {
                    showToast('Error al cargar favoritos', 'error');
                }
            }
        };

        loadFavorites();
    }, [isAuthenticated]);

    const toggleFavorite = async (movie) => {
        if (!isAuthenticated) {
            showToast('Debes iniciar sesión para gestionar favoritos', 'error');
            return;
        }

        try {
            console.log('Intentando gestionar favorito para película:', movie);
            
            const isFav = favorites.some(fav => fav.movieId === movie.id);
            if (isFav) {
                await favoriteService.remove(movie.id);
                setFavorites(prev => prev.filter(fav => fav.movieId !== movie.id));
                showToast(`${movie.title} eliminada de favoritos`, "warning");
            } else {
                const response = await favoriteService.add(movie.id);
                if (response.data) {
                    setFavorites(prev => [...prev, { movieId: movie.id, movie }]);
                    showToast(`${movie.title} añadida a favoritos`, "success");
                }
            }
        } catch (error) {
            console.error('Error detallado al gestionar favorito:', error);
            if (error.response?.status === 404) {
                showToast('Servicio de favoritos no disponible', 'error');
            } else {
                showToast('Error al gestionar favorito', 'error');
            }
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite: (movieId) => favorites.some(fav => fav.movieId === movieId),
            getFavorites: () => favorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};




