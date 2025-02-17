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
    
    // Obtener reseñas y datos de la película en paralelo
    const [reviews, movieData] = await Promise.all([
      Review.find({ movieId })
        .populate('user', 'username')
        .sort({ createdAt: -1 }),
      getMovieDetailsFromTMDB(movieId)
    ]);

    res.json({
      movie: movieData,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id });
    res.json(reviews);
  } catch (error) {
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
