import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 1000
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
reviewSchema.index({ movieId: 1, user: 1 });
reviewSchema.index({ user: 1, createdAt: -1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;

