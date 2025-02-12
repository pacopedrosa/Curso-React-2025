import { useState, useEffect, useContext, createContext } from "react";
import { useToast } from "./ToastContext";

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
    const [favorites, setFavorites] = useState(() =>{
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    })

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const toggleFavorite = (movie) => {
        setFavorites(prevFavorites => {
          const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
          if (isFavorite) {
            showToast(`${movie.title} eliminada de favoritos`, "warning");
            return prevFavorites.filter(fav => fav.id !== movie.id);
          } else {
            showToast(`${movie.title} añadida a favoritos`, "success");
            return [...prevFavorites, movie];
          }
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some(fav => fav.id === movieId);
    }

    const getFavorites = () => {
        return favorites;
    }

    const contextValue = {
        favorites,
        toggleFavorite,
        isFavorite,
        getFavorites
    }

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    )
}




