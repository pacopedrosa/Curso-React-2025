import React from 'react'
import { useReviews } from '../contexts/ReviewsContext'
import { useFetch } from '../hooks/useFetch'
import { getMovieDetails } from '../services/tmdb'
import { PacmanLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import ReviewItem from '../components/ReviewItem'

const Reviews = () => {
  const { reviews, deleteReview } = useReviews()
  
  // Obtener IDs únicos de películas con reseñas
  const movieIds = Object.keys(reviews)

  // Usar useFetch para cada película
  const movieDetails = {}
  movieIds.forEach(id => {
    const { data } = useFetch(() => getMovieDetails(Number(id)), [id])
    if (data) {
      movieDetails[id] = data
    }
  })

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

          if (!movie) {
            return (
              <div key={movieId} className="flex justify-center">
                <PacmanLoader color="blue" />
              </div>
            )
          }

          return (
            <div key={movieId} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <Link 
                  to={`/movie/:${movieId}`}
                  className="text-xl font-bold text-sky-950 hover:text-sky-700"
                >
                  {movie.title}
                </Link>
                <span className="text-gray-500">
                  ({movie.release_date?.split('-')[0]})
                </span>
              </div>

              <div className="space-y-4">
                {movieReviews.map(review => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    onDelete={(reviewId) => deleteReview(movieId, reviewId)}
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