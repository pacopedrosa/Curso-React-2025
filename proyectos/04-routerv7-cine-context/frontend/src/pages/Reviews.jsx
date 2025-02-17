import React, { useEffect, useState } from 'react'
import { useReviews } from '../contexts/ReviewsContext'
import { getMovieDetails } from '../services/tmdb'
import { PacmanLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import ReviewItem from '../components/ReviewItem'

const Reviews = () => {
  const { reviews, deleteReview } = useReviews()
  const [movieDetails, setMovieDetails] = useState({})
  const [loading, setLoading] = useState(true)
  
  // Obtener IDs únicos de películas con reseñas
  const movieIds = Object.keys(reviews)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = {}
        for (const id of movieIds) {
          const data = await getMovieDetails(Number(id))
          details[id] = data
        }
        setMovieDetails(details)
      } catch (error) {
        console.error('Error al cargar detalles de películas:', error)
      } finally {
        setLoading(false)
      }
    }

    if (movieIds.length > 0) {
      fetchMovieDetails()
    } else {
      setLoading(false)
    }
  }, [movieIds])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PacmanLoader color="blue" />
      </div>
    )
  }

  if (movieIds.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-sky-950">Mis Reseñas</h1>
        <p className="text-center text-gray-500">
          No has escrito ninguna reseña aún.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-sky-950">Mis Reseñas</h1>

      <div className="space-y-8">
        {movieIds.map(movieId => {
          const movieReviews = reviews[movieId]
          const movie = movieDetails[movieId]

          return (
            <div key={movieId} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                <Link to={`/movie/:${movieId}`} className="text-blue-600 hover:text-blue-800">
                  {movie?.title || 'Película no encontrada'}
                </Link>
              </h2>
              <div className="space-y-4">
                {movieReviews.map(review => (
                  <ReviewItem 
                    key={review._id} 
                    review={review}
                    movie={movie}
                    onDelete={() => deleteReview(movieId, review._id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Reviews