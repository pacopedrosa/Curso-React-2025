import { Movie } from '../models/Movie.js';
import { Favorite } from '../models/Favorite.js';

export const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Favorite.find({ user: userId });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    console.log('[addFavorite] Starting with data:', {
        body: req.body,
        user: req.user,
        headers: req.headers
    });
    
    try {
        const movieData = req.body;
        const userId = req.user.id;
        
        if (!movieData.id) {
            console.error('[addFavorite] No movieId provided');
            return res.status(400).json({ message: 'Se requiere movieId' });
        }

        await Movie.findOneAndUpdate(
            { movieId: movieData.id },
            {
                movieId: movieData.id,
                title: movieData.title,
                overview: movieData.overview,
                poster_path: movieData.poster_path,
                backdrop_path: movieData.backdrop_path,
                release_date: movieData.release_date,
                vote_average: movieData.vote_average
            },
            { upsert: true }
        );

        const favorite = await Favorite.create({
            user: userId,
            movieId: movieData.id
        });

        console.log('[addFavorite] Created successfully:', favorite);
        res.status(201).json(favorite);
    } catch (error) {
        console.error('[addFavorite] Error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Esta película ya está en favoritos' });
        }
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        const result = await Favorite.findOneAndDelete({
            user: userId,
            movieId: Number(movieId)
        });

        if (!result) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }

        res.json({ message: 'Favorito eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFavorites = async (req, res) => {
    const favorites = await Favorite.find({ user: req.user.id });
    res.json(favorites);
}








