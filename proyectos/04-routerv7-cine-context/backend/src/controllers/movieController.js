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
    const { page = 1, sort_by = 'popularity.desc' } = req.query;
    
    const TMDB_API_URL = 'https://api.themoviedb.org/3';
    const url = `${TMDB_API_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=es-ES&page=${page}&sort_by=${sort_by}&include_adult=false&vote_count.gte=100`;
    
    console.log('URL de la petición:', url); // Para debugging
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error en la API de TMDB');
    }

    const data = await response.json();
    
    const results = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }));

    res.json({
      page: data.page,
      results,
      total_pages: data.total_pages,
      total_results: data.total_results
    });
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    res.status(500).json({ 
      message: 'Error al obtener películas populares',
      error: error.message 
    });
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
    const { query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        message: 'El parámetro de búsqueda es requerido' 
      });
    }

    const TMDB_API_URL = 'https://api.themoviedb.org/3';
    const url = `${TMDB_API_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=es-ES&include_adult=false`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error en la API de TMDB');
    }

    const data = await response.json();
    
    // Transformamos los resultados para incluir solo los campos necesarios
    const results = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    }));

    res.json({
      page: data.page,
      results,
      total_pages: data.total_pages,
      total_results: data.total_results
    });
  } catch (error) {
    console.error('Error en la búsqueda de películas:', error);
    res.status(500).json({ 
      message: 'Error al buscar películas',
      error: error.message 
    });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID de película no válido' 
      });
    }

    const TMDB_API_URL = 'https://api.themoviedb.org/3';
    const url = `${TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=es-ES`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error en la API de TMDB');
    }

    const movieData = await response.json();
    
    // Transformamos los datos para incluir solo los campos necesarios
    const movie = {
      id: movieData.id,
      title: movieData.title,
      original_title: movieData.original_title,
      poster_path: movieData.poster_path,
      backdrop_path: movieData.backdrop_path,
      overview: movieData.overview,
      release_date: movieData.release_date,
      vote_average: movieData.vote_average,
      genres: movieData.genres,
      runtime: movieData.runtime
    };

    res.json(movie);
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
    res.status(500).json({ 
      message: 'Error al obtener detalles de la película',
      error: error.message 
    });
  }
};
export const getMovieVideos = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID de película no válido' 
      });
    }

    const TMDB_API_URL = 'https://api.themoviedb.org/3';
    const url = `${TMDB_API_URL}/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=es-ES`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error en la API de TMDB');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener videos de la película:', error);
    res.status(500).json({ 
      message: 'Error al obtener videos de la película',
      error: error.message 
    });
  }
};
