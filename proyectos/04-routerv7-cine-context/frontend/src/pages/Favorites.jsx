import { useFavorites } from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { getFavorites } = useFavorites();
  const favorites = getFavorites();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-sky-950">Mis Películas Favoritas</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes películas favoritas aún.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map(favorite => (
            <MovieCard 
              key={favorite.movieId} 
              movie={favorite.movie} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;


