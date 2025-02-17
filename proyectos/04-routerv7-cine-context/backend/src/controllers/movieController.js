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
    let movie = await Movie.findOne({ movieId: Number(id) });

    if (!movie) {
      // Si no existe en nuestra BD, lo buscamos en TMDB
      const tmdbMovie = await getMovieDetailsFromTMDB(id);
      
      // Asegurarnos de que el movieId está correctamente asignado
      const movieToCreate = {
        ...tmdbMovie,
        movieId: Number(id)  // Aseguramos que se guarde como movieId
      };
      
      movie = await Movie.create(movieToCreate);
    }

    res.json(movie);
  } catch (error) {
    console.error('Error al obtener película:', error);
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
