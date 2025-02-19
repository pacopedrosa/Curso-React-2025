import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      console.log('Error de autenticación detectado');
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  logout: () => {
    localStorage.removeItem('token');
    return api.post('/auth/logout');
  },
  verifyToken: () => api.get('/auth/verify')
};

// Movie services
export const movieService = {
  getPopular: (page) => api.get(`/movies/popular?page=${page}`),
  getMovie: (id) => api.get(`/movies/${id}`),
  searchMovies: (query, page) => api.get(`/movies/search?query=${query}&page=${page}`)
};

// Review services
export const reviewService = {
  getUserReviews: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('No hay token disponible'));
    }
    return api.get('/reviews/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  create: (reviewData) => {
    const token = localStorage.getItem('token');
    return api.post('/reviews', reviewData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  delete: (reviewId) => {
    const token = localStorage.getItem('token');
    return api.delete(`/reviews/${reviewId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

// Favorite services
export const favoriteService = {
  getFavorites: () => api.get('/favorites'),
  add: (movieData) => api.post('/favorites', movieData),
  remove: (movieId) => api.delete(`/favorites/${movieId}`)
};

export default api; 