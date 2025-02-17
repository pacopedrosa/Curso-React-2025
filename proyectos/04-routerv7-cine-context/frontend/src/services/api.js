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

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Auth services
export const authService = {
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
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
  getFavorites: () => {
    const token = localStorage.getItem('token');
    return api.get('/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  add: (movie) => {
    const movieData = {
      id: movie.id,
      movieId: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    };
    
    const token = localStorage.getItem('token');
    return api.post('/favorites', movieData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  remove: (movie) => {
    const movieId = movie.id || movie.movieId;
    const token = localStorage.getItem('token');
    return api.delete(`/favorites/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};


export default api; 