import Review from '../models/Review.js';
import { getMovieDetailsFromTMDB } from '../services/tmdb.js';

export const createReview = async (req, res) => {
  try {
    const { movieId, text } = req.body;
    const review = await Review.create({
      user: req.user.id,
      movieId,
      text
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params;
    
    const reviews = await Review.find({ movieId })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    const movieData = await getMovieDetailsFromTMDB(movieId);

    res.json({
      movie: movieData,
      reviews: reviews.map(review => ({
        _id: review._id,
        text: review.text,
        rating: review.rating,
        createdAt: review.createdAt,
        user: {
          _id: review.user._id,
          username: review.user.username
        },
        movieId: review.movieId
      }))
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });
      
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas del usuario:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGlobalReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username email')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        console.error('Error al obtener reseñas globales:', error);
        res.status(500).json({ message: error.message });
    }
};
