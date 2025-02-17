import { Link, useParams, useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { getImageUrl, getMovieDetails, getMovieVideos, IMAGES_SIZES } from "../services/tmdb"
import { PacmanLoader } from "react-spinners"
import { useFavorites } from '../contexts/FavoritesContext'
import { useReviews } from '../contexts/ReviewsContext'
import { useState, useEffect } from 'react'
import ReviewForm from '../components/ReviewForm'
import ReviewItem from '../components/ReviewItem'
import { reviewService, favoriteService } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

const MovieDetail = () => {
  const { id } = useParams()
  const movieId = id ? Number(id) : null;
  const [newReview, setNewReview] = useState('')
  const [movieData, setMovieData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const {data: videoData} = useFetch(() => getMovieVideos(movieId), [movieId])
  const { toggleFavorite, isFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movieData?.id)
  const { addReview, deleteReview, getMovieReviews } = useReviews()
  const movieReviews = getMovieReviews(movieId)
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId || isNaN(movieId) || movieId <= 0) {
        console.error('ID inválido:', { id, movieId });
        setError(new Error('ID de película no válido'));
        showToast('ID de película no válido', 'error');
        navigate('/');
        return;
      }
      
      setLoading(true)
      try {
        const data = await getMovieDetails(movieId);
        if (!data) {
          throw new Error('No se encontraron datos de la película');
        }
        setMovieData(data);
      } catch (err) {
        console.error('Error al obtener la película:', err);
        setError(err);
        showToast('Error al cargar los detalles de la película', 'error');
      } finally {
        setLoading(false)
      }
    };

    fetchMovie();
  }, [movieId, navigate]);

  if(error){
    return <div className="text-center p-10">
      <Link to="/" className="text-red-500">Error: {error.message}. Volver a la página principal</Link>
    </div>
  }

  if(loading){
    return <div className="flex justify-center items-center min-h-screen">
      <PacmanLoader color="blue"/>
    </div>
  }

  if(!movieData){
    return <div className="text-center p-10">
      <p>No se encontraron datos de la película</p>
      <Link to="/" className="text-blue-500">Volver a la página principal</Link>
    </div>
  }

  // Encontrar el trailer oficial o el primer video disponible
  const trailer = videoData?.results?.find(video => 
    video.type === "Trailer" && video.site === "YouTube"
  ) || videoData?.results?.[0]
    
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
        showToast('Debes iniciar sesión para escribir reseñas', 'error');
        navigate('/login');
        return;
    }
    
    try {
        await addReview(movieId, newReview);
        setNewReview('');
    } catch (error) {
        console.error('Error al crear reseña:', error);
        showToast('Error al crear la reseña', 'error');
    }
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
        showToast('Debes iniciar sesión para gestionar favoritos', 'error');
        navigate('/login');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        showToast('Sesión expirada, por favor vuelve a iniciar sesión', 'error');
        navigate('/login');
        return;
    }

    try {
        await toggleFavorite(movieData);
    } catch (error) {
        console.error('Error al gestionar favorito:', error);
        showToast('Error al gestionar favorito', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section con imagen de fondo */}
      <div className="relative h-[500px]">
        <img
          src={getImageUrl(movieData?.backdrop_path, IMAGES_SIZES.BACKDROP)}
          alt={movieData?.title}
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Movie Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{movieData?.title}</h1>
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite(movieData?.id) 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/20 text-white'
              }`}
            >
              ⭐
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span>{movieData?.release_date?.split('-')[0]}</span>
            <span>•</span>
            <span>{movieData?.runtime} min</span>
            <span>•</span>
            <span>⭐ {movieData?.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna izquierda - Póster */}
          <div className="md:col-span-1">
            <img 
              src={getImageUrl(movieData?.poster_path)} 
              alt={movieData?.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Columna derecha - Información y comentarios */}
          <div className="md:col-span-2 space-y-8">
            {/* Información de la película */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
                <p className="text-gray-700">{movieData?.overview}</p>
              </div>

              {/* Detalles adicionales */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {movieData?.genres?.map(genre => (
                      <span key={genre.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Estado</h3>
                  <p>{movieData?.status}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Presupuesto</h3>
                  <p>${movieData?.budget?.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Ingresos</h3>
                  <p>${movieData?.revenue?.toLocaleString()}</p>
                </div>
              </div>

              {/* Trailer */}
              {trailer && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="Trailer"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sección de comentarios */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
              <div className="space-y-4">
                <ReviewForm onSubmit={(text) => addReview(movieId, text)} />
                
                {/* Lista de comentarios */}
                <div className="space-y-4 mt-6">
                  {movieReviews.length === 0 ? (
                    <p className="text-gray-500">
                      No hay comentarios aún. ¡Sé el primero en comentar!
                    </p>
                  ) : (
                    movieReviews.map(review => (
                      <ReviewItem 
                        key={review.id} 
                        review={review} 
                        onDelete={(reviewId) => deleteReview(movieId, reviewId)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail