import React from 'react'
import { useReviews } from '../contexts/ReviewsContext'
import { useFetch } from '../hooks/useFetch'
import { getMovieDetails } from '../services/tmdb'
import { PacmanLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import ReviewItem from '../components/ReviewItem'

const UserReviews = () => {
    const { reviews, deleteReview } = useReviews()
    const movieIds = Object.keys(reviews)
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
                        <div key={movieId} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">{movie.title}</h2>
                            {movieReviews.map(review => (
                                <ReviewItem 
                                    key={review.id}
                                    review={review}
                                    onDelete={() => deleteReview(movieId, review.id)}
                                />
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserReviews 