import { Movie } from '../models/Movie.js';
import { getMovieDetailsFromTMDB, getPopularMoviesFromTMDB } from '../services/tmdb.js';

export const getPopularMovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await getPopularMoviesFromTMDB(page);
    res.json(movies);
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    let movie = await Movie.findOne({ id: Number(id) });

    if (!movie) {
      // Si no existe en nuestra BD, lo buscamos en TMDB
      const tmdbMovie = await getMovieDetailsFromTMDB(id);
      movie = await Movie.create(tmdbMovie);
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { overview: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
