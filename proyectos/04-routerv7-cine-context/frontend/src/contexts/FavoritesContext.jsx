import { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "./ToastContext";
import { favoriteService } from '../services/api';
import { useAuth } from './AuthContext';
import { movieService } from '../services/api';
import { Link } from "react-router-dom";

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

    const loadFavoriteDetails = async (favorite) => {
        try {
            const movieId = Number(favorite.movieId || favorite.id);
            if (!movieId || isNaN(movieId)) {
                console.error('Favorito sin ID válido:', favorite);
                return favorite;
            }
            const { data: movieDetails } = await movieService.getMovie(movieId);
            return {
                ...favorite,
                movieId: movieId,
                movie: movieDetails
            };
        } catch (error) {
            console.error(`Error al cargar detalles de película ${favorite.movieId}:`, error);
            return favorite;
        }
    };

    useEffect(() => {
        const loadFavorites = async () => {
            if (!isAuthenticated) return;
            
            try {
                const { data } = await favoriteService.getFavorites();
                const favoritesWithDetails = await Promise.all(
                    data.map(loadFavoriteDetails)
                );
                setFavorites(favoritesWithDetails);
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
                if (error.response?.status === 404) {
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
        if (!movie || (!movie.id && !movie.movieId)) {
            showToast('Datos de película no válidos', 'error');
            return;
        }
        
        const movieId = movie.id || movie.movieId;
        const token = localStorage.getItem('token');
        if (!token) {
            showToast('Sesión expirada, por favor vuelve a iniciar sesión', 'error');
            return;
        }

        try {
            const isFav = favorites.some(fav => Number(fav.movieId) === Number(movieId));
            if (isFav) {
                const response = await favoriteService.remove(movieId);
                if (response.data) {
                    setFavorites(prev => prev.filter(fav => Number(fav.movieId) !== Number(movieId)));
                    showToast(`${movie.title} eliminada de favoritos`, "warning");
                }
            } else {
                const response = await favoriteService.add(movie);
                if (response.data) {
                    setFavorites(prev => [...prev, { movieId, movie }]);
                    showToast(`${movie.title} añadida a favoritos`, "success");
                }
            }
        } catch (error) {
            console.error('Error detallado al gestionar favorito:', error);
            if (error.response?.status === 401) {
                showToast('Sesión expirada, por favor vuelve a iniciar sesión', 'error');
            } else {
                showToast('Error al gestionar favorito', 'error');
            }
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite: (movieId) => {
                if (!movieId) return false;
                const numericId = Number(movieId);
                return favorites.some(fav => Number(fav.movieId) === numericId);
            },
            getFavorites: () => favorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};




