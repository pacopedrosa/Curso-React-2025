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

// //busqueda de una pelicula
// export const searchMovies = async (query, page=1) => {
//     return await fetchFromApi("search/movie", {query, page})
// }

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
export const getPopularMovies = async (page = 1) => {
  try {
    const { data } = await movieService.getPopular(page);
    return data;
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    return null;
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

// búsqueda de una película
export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await movieService.searchMovies(query, page);
    return data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return null;
  }
};

export const getMovieVideos = async (id) => {
  if (!id) throw new Error('Se requiere un ID de película');
  return fetchFromAPI(`/movie/${id}/videos`);
};


