// const VITE_API_TOKEN=import.meta.env.VITE_API_TOKEN
// const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
// const VITE_BASE_IMAGE_URL=import.meta.env.VITE_BASE_IMAGE_URL

// //objeto que permite decidir el tamaño de la imagen
// export const IMAGES_SIZES = {
//     POSTER: "w500",
//     BACKDROP: "original"
// }

// //funcion para obtener la url de la imagen
// export const getImageUrl = (path, size = IMAGES_SIZES.POSTER) => {
//     if(!path) return "/placeholder-movie.png"
//     return `${VITE_BASE_IMAGE_URL}/${size}${path}`
// }


// const fetchFromApi = async (endpoint, options = {}) => {
//         const params = new URLSearchParams(options).toString();
//         const url = `${VITE_BASE_URL}/${endpoint}?api_key=${VITE_API_TOKEN}&language=es-ES&${params}`;
//         const response = await fetch(url);
        
//         if (!response.ok) {
//             throw new Error("Error al obtener los datos");
//         }
        
//         const data = await response.json();
//         return data;    
// }

// // obtener las peliculas populares
// export const getPopularMovies = async (page=1) => {
//     return await fetchFromApi("movie/popular", {page})
// }

// //detalles de las peliculas 

// export const getMovieDetails = async (movieId) => {
//     return await fetchFromApi(`movie/${movieId}`)
// }

//busqueda de una pelicula
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/movies/search?query=${encodeURIComponent(query)}&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error en la búsqueda de películas');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    throw error;
  }
};

// export const getMoviesVideos = async (movieId) => {
//     return await fetchFromAPI(`movie/${movieId}/videos`)
// }

import { movieService } from './api';

const VITE_API_TOKEN = import.meta.env.VITE_API_TOKEN;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

// objeto que me permite decidir el tamaño de las imágenes
export const IMAGES_SIZES = {
  POSTER: "w500",
  BACKDROP: "original"
};

// ------------- FUNCIONES QUE VOY A CREAR PARA LA API -------------
// función para obtener la url de una imagen
// le paso un path : /sssss
export const getImageUrl = (path, size = IMAGES_SIZES.POSTER) => {
  if (!path) return "/placeholder-movie.png";
  return `${VITE_BASE_IMAGE_URL}/${size}${path}`;
};

const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const params = new URLSearchParams(options).toString();
    const url = `${VITE_BASE_URL}${endpoint}?api_key=${VITE_API_TOKEN}&language=es-ES&${params}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en fetchFromAPI:', error);
    throw error;
  }
};

// función para obtener las películas populares
export const getPopularMovies = async (page = 1, sortBy = 'popularity.desc') => {
  try {
    const TMDB_BASE_URL = import.meta.env.VITE_BASE_URL;
    const TMDB_API_KEY = import.meta.env.VITE_API_TOKEN;
    
    const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}&sort_by=${sortBy}&include_adult=false&vote_count.gte=100`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener las películas');
    }

    const data = await response.json();
    return {
      page: data.page,
      results: data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average
      })),
      total_pages: data.total_pages,
      total_results: data.total_results
    };
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    throw error;
  }
};

// detalles de las películas
export const getMovieDetails = async (id) => {
  try {
    const { data } = await movieService.getMovie(id);
    return data;
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
    throw error;
  }
};

export const getMovieVideos = async (id) => {
  if (!id) throw new Error('Se requiere un ID de película');
  return fetchFromAPI(`/movie/${id}/videos`);
};


