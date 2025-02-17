import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  overview: String,
  poster_path: String,
  backdrop_path: String,
  release_date: String,
  vote_average: Number
}, {
  timestamps: true
});

// Asegurarnos de que no haya índices anteriores
movieSchema.indexes().forEach(index => {
  if (index[0] !== '_id') {
    movieSchema.index(index[0], { background: true });
  }
});

// Crear nuevo índice
movieSchema.index({ movieId: 1 }, { 
  unique: true,
  background: true,
  partialFilterExpression: { movieId: { $exists: true, $type: "number" } }
});

const Movie = mongoose.model('Movie', movieSchema);

// Forzar la recreación de índices al iniciar
Movie.syncIndexes().then(() => {
  console.log('Índices sincronizados correctamente');
}).catch(err => {
  console.error('Error al sincronizar índices:', err);
});

export { Movie };  