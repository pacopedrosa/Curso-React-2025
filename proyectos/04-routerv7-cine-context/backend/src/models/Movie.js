import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    default: false
  },
  backdrop_path: String,
  genre_ids: [{
    type: Number
  }],
  id: {
    type: Number,
    required: true,
    unique: true
  },
  original_language: String,
  original_title: String,
  overview: String,
  popularity: {
    type: Number,
    index: true
  },
  poster_path: String,
  release_date: String,
  title: {
    type: String,
    required: true
  },
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Índices para optimizar búsquedas comunes
movieSchema.index({ popularity: -1 });
movieSchema.index({ title: 'text', original_title: 'text' });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
