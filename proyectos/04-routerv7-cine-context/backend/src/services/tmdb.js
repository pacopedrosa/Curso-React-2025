import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbAPI = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'es-ES'
  }
});

export const getMovieDetailsFromTMDB = async (movieId) => {
  const response = await tmdbAPI.get(`/movie/${movieId}`);
  return response.data;
};

export const getPopularMoviesFromTMDB = async (page = 1) => {
  const response = await tmdbAPI.get('/movie/popular', {
    params: { page }
  });
  return response.data;
};

export const searchMoviesFromTMDB = async (query, page = 1) => {
  const response = await tmdbAPI.get('/search/movie', {
    params: { query, page }
  });
  return response.data;
}; 