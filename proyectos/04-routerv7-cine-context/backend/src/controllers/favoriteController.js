import Favorite from '../models/Favorite.js';
import Movie from '../models/Movie.js';

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id });
        const movies = await Movie.find({
            id: { $in: favorites.map(f => f.movieId) }
        });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.user.id;

        const favorite = await Favorite.create({
            user: userId,
            movieId
        });

        res.status(201).json(favorite);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Esta película ya está en favoritos' });
        }
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { movieId } = req.params;
        await Favorite.findOneAndDelete({
            user: req.user.id,
            movieId
        });
        res.json({ message: 'Película eliminada de favoritos' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFavorites = async (req, res) => {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
}

export const getFavoriteMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ user: userId });
    
    // Obtener detalles de las películas
    const movies = await Movie.find({
      id: { $in: favorites.map(f => f.movieId) }
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






