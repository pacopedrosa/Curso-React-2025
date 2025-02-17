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
        if (isAuthenticated) {
            loadFavorites();
        }
    }, [isAuthenticated]);

    const loadFavorites = async () => {
        try {
            const { data } = await favoriteService.getFavorites();
            setFavorites(data);
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
            if (error.response?.status === 401) {
                showToast('Debes iniciar sesión para ver tus favoritos', 'error');
            }
        }
    };

    const toggleFavorite = async (movie) => {
        if (!isAuthenticated) {
            showToast('Debes iniciar sesión para gestionar favoritos', 'error');
            return;
        }

        try {
            const isFav = favorites.some(fav => fav.id === movie.id);
            if (isFav) {
                await favoriteService.remove(movie.id);
                setFavorites(prev => prev.filter(fav => fav.id !== movie.id));
                showToast(`${movie.title} eliminada de favoritos`, "warning");
            } else {
                await favoriteService.add(movie.id);
                setFavorites(prev => [...prev, movie]);
                showToast(`${movie.title} añadida a favoritos`, "success");
            }
        } catch (error) {
            console.error('Error al gestionar favorito:', error);
            showToast('Error al gestionar favorito', 'error');
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite: (movieId) => favorites.some(fav => fav.id === movieId),
            getFavorites: () => favorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};




