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
  getUserReviews: () => api.get('/reviews/user'),
  getMovieReviews: (movieId) => api.get(`/reviews/movie/${movieId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  delete: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

// Favorite services
export const favoriteService = {
  getFavorites: () => api.get('/favorites'),
  add: (movie) => {
    const movieData = {
      id: movie.movieId || movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    };
    
    if (!movieData.id) {
      console.error('No se encontró ID de película válido:', movie);
      throw new Error('ID de película no válido');
    }
    
    console.log('Datos formateados para favoritos:', movieData);
    const token = localStorage.getItem('token');
    
    return api.post('/favorites', movieData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  remove: (movie) => {
    const movieId = movie.movieId || movie.id;
    if (!movieId) {
      console.error('No se encontró ID de película válido para eliminar:', movie);
      throw new Error('ID de película no válido');
    }
    
    const token = localStorage.getItem('token');
    return api.delete(`/favorites/${movieId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};


export default api; 