import { useState, useEffect } from 'react';
import { favoriteAPI } from '../services/api';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const { data } = await favoriteAPI.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  };

  const toggleFavorite = async (movieId) => {
    try {
      const isFav = favorites.some(fav => fav.id === movieId);
      if (isFav) {
        await favoriteAPI.remove(movieId);
        setFavorites(favorites.filter(fav => fav.id !== movieId));
      } else {
        await favoriteAPI.add(movieId);
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