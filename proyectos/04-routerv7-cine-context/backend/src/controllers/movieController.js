import { Movie } from '../models/Movie.js';
import { getMovieDetailsFromTMDB, getPopularMoviesFromTMDB } from '../services/tmdb.js';

export const getHome = async (req, res) => {
    try {
        const featuredContent = {
            welcome: true,
            message: "Bienvenido al VideoClub",
        };
        
        res.json(featuredContent);
    } catch (error) {
        console.error('Error al obtener contenido del home:', error);
        res.status(500).json({ message: 'Error al cargar la página de inicio' });
    }
};

export const getPopularMovies = async (req, res) => {
    try {
        // Lógica existente para obtener películas populares
        const popularMovies = await getPopularMoviesFromTMDB(req.query.page);
        res.json(popularMovies);
    } catch (error) {
        console.error('Error al obtener películas populares:', error);
        res.status(500).json({ message: 'Error al cargar las películas populares' });
    }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: 'ID de película no válido' });
    }

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
