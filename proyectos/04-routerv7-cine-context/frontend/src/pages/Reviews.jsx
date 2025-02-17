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
  const [error, setError] = useState(null)
  
  const movieIds = Object.keys(reviews)

  const fetchMovieDetails = async () => {
    const details = {}
    setLoading(true)
    
    try {
      const promises = movieIds.map(async (id) => {
        try {
          const data = await getMovieDetails(Number(id))
          details[id] = data
        } catch (err) {
          console.error(`Error al cargar detalles de película ${id}:`, err)
          details[id] = null
        }
      })

      await Promise.all(promises)
      setMovieDetails(details)
    } catch (error) {
      console.error('Error al cargar detalles de películas:', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (movieIds.length > 0) {
      fetchMovieDetails()
    } else {
      setLoading(false)
    }
  }, [movieIds.length])

  const handleDeleteReview = async (movieId, reviewId) => {
    try {
      await deleteReview(movieId, reviewId)
      // Actualizamos los detalles de las películas después de eliminar
      fetchMovieDetails()
    } catch (error) {
      console.error('Error al eliminar la reseña:', error)
    }
  }

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

          if (!movie) return null

          return (
            <div key={movieId} className="border p-4 rounded-lg shadow">
              <Link to={`/movie/:${movieId}`} className="text-xl font-semibold text-blue-600">
                {movie.title}
              </Link>
              <div className="space-y-4 mt-4">
                {movieReviews.map(review => (
                  <ReviewItem
                    key={review._id}
                    review={review}
                    onDelete={() => handleDeleteReview(movieId, review._id)}
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