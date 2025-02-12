import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

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
    // Cargar reseñas desde localStorage
    const [reviews, setReviews] = useState(() => {
        const storedReviews = localStorage.getItem('reviews');
        return storedReviews ? JSON.parse(storedReviews) : {};
    });

    // Guardar reseñas en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }, [reviews]);

    // Añadir una nueva reseña
    const addReview = (movieId, review) => {
        const newReview = {
            id: Date.now(),
            text: review,
            date: new Date().toISOString(),
            movieId: movieId
        };

        setReviews(prevReviews => ({
            ...prevReviews,
            [movieId]: [...(prevReviews[movieId] || []), newReview]
        }));
        
        showToast("Reseña añadida correctamente", "success");
    };

    // Eliminar una reseña
    const deleteReview = (movieId, reviewId) => {
        setReviews(prevReviews => ({
            ...prevReviews,
            [movieId]: prevReviews[movieId].filter(review => review.id !== reviewId)
        }));
        
        showToast("Reseña eliminada correctamente", "warning");
    };

    // Obtener reseñas de una película específica
    const getMovieReviews = (movieId) => {
        return reviews[movieId] || [];
    };

    const contextValue = {
        reviews,
        addReview,
        deleteReview,
        getMovieReviews
    };

    return (
        <ReviewsContext.Provider value={contextValue}>
            {children}
        </ReviewsContext.Provider>
    );
};    
    