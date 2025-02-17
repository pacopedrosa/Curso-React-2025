import { useState, useEffect } from 'react';
import { favoriteService } from '../services/api';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const { data } = await favoriteService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const toggleFavorite = async (movieId) => {
    try {
      const isFav = favorites.some(fav => fav.id === movieId);
      if (isFav) {
        await favoriteService.removeFavorite(movieId);
        setFavorites(favorites.filter(fav => fav.id !== movieId));
      } else {
        await favoriteService.addFavorite(movieId);
        setFavorites([...favorites, { id: movieId }]);
      }
    } catch (error) {
      console.error('Error al gestionar favorito:', error);
      throw error;
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return { favorites, toggleFavorite, isFavorite };
}; 