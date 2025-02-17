import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true
  },
  title: String,
  overview: String,
  poster_path: String,
  backdrop_path: String,
  release_date: String,
  vote_average: Number
});

// Índices para optimizar búsquedas comunes
movieSchema.index({ popularity: -1 });
movieSchema.index({ title: 'text', original_title: 'text' });

const Movie = mongoose.model('Movie', movieSchema);
export { Movie };  