import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { reviewService } from '../services/api';
import { useAuth } from './AuthContext';

const ReviewsContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error('useReviews debe ser usado dentro de un ReviewsProvider');
    }
    return context;
};

export const ReviewsProvider = ({ children }) => {
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            loadUserReviews();
        }
    }, [isAuthenticated]);

    const loadUserReviews = async () => {
        try {
            const { data } = await reviewService.getUserReviews();
            const reviewsByMovie = data.reduce((acc, review) => {
                if (!acc[review.movieId]) {
                    acc[review.movieId] = [];
                }
                acc[review.movieId].push(review);
                return acc;
            }, {});
            setReviews(reviewsByMovie);
        } catch (error) {
            console.error('Error al cargar reseñas:', error);
            showToast('Error al cargar las reseñas', 'error');
        }
    };

    const addReview = async (movieId, text) => {
        try {
            const response = await reviewService.create({
                movieId: Number(movieId),
                text: text
            });
            
            setReviews(prev => ({
                ...prev,
                [movieId]: [...(prev[movieId] || []), response.data]
            }));
            
            showToast('Reseña añadida correctamente', 'success');
            return response.data;
        } catch (error) {
            console.error('Error al crear reseña:', error);
            showToast('Error al añadir la reseña', 'error');
            throw error;
        }
    };

    const deleteReview = async (movieId, reviewId) => {
        try {
            const response = await reviewService.delete(reviewId);
            if (response.status === 200) {
                setReviews(prev => {
                    const updatedMovieReviews = prev[movieId].filter(review => review._id !== reviewId);
                    if (updatedMovieReviews.length === 0) {
                        const { [movieId]: _, ...rest } = prev;
                        return rest;
                    }
                    return {
                        ...prev,
                        [movieId]: updatedMovieReviews
                    };
                });
                showToast('Reseña eliminada correctamente', 'warning');
            }
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
            showToast('Error al eliminar la reseña', 'error');
            throw error;
        }
    };

    return (
        <ReviewsContext.Provider value={{
            reviews,
            addReview,
            deleteReview,
            getMovieReviews: (movieId) => reviews[movieId] || []
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};    
    