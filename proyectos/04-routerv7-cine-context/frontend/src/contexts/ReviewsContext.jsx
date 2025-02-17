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
            const { data } = await reviewService.createReview({ movieId, text });
            setReviews(prev => ({
                ...prev,
                [movieId]: [...(prev[movieId] || []), data]
            }));
            showToast('Reseña añadida correctamente', 'success');
        } catch (error) {
            showToast('Error al añadir la reseña', 'error');
        }
    };

    const deleteReview = async (movieId, reviewId) => {
        try {
            await reviewService.deleteReview(reviewId);
            setReviews(prev => ({
                ...prev,
                [movieId]: prev[movieId].filter(review => review.id !== reviewId)
            }));
            showToast('Reseña eliminada correctamente', 'warning');
        } catch (error) {
            showToast('Error al eliminar la reseña', 'error');
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
    