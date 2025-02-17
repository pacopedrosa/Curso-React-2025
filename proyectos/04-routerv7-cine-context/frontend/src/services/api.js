import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    console.log('Respuesta exitosa:', response.status);
    return response;
  },
  (error) => {
    console.error('Error en la respuesta:', error.response?.status);
    if (error.response?.status === 401) {
      console.log('Error de autenticación detectado');
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
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },
  verifyToken: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout')
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
  create: (reviewData) => api.post('/reviews', reviewData),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

// Favorite services
export const favoriteService = {
  getFavorites: () => api.get('/favorites'),
  add: (movieId) => {
    console.log('Añadiendo película a favoritos:', movieId);
    return api.post('/favorites', { movieId });
  },
  remove: (movieId) => api.delete(`/favorites/${movieId}`)
};

export default api; 