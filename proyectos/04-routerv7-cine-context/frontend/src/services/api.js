import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },
  login: async (credentials) => {
    return await api.post('/auth/login', {
      username: credentials.username,
      password: credentials.password
    });
  },
  verifyToken: () => api.get('/auth/verify'),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};

// Movie services
export const movieService = {
  getPopular: (page) => api.get(`/movies/popular?page=${page}`),
  getMovie: (id) => api.get(`/movies/${id}`),
  searchMovies: (query, page) => api.get(`/movies/search?query=${query}&page=${page}`)
};

// Review services
export const reviewService = {
  getUserReviews: () => api.get('/reviews/user'),
  getMovieReviews: (movieId) => api.get(`/reviews/movie/${movieId}`),
  createReview: (review) => api.post('/reviews', review),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

// Favorite services
export const favoriteService = {
  getFavorites: () => api.get('/favorites'),
  add: (movieId) => api.post('/favorites', { movieId }),
  remove: (movieId) => api.delete(`/favorites/${movieId}`)
}; 