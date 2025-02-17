import { Link } from 'react-router-dom'
import { getImageUrl } from '../services/tmdb'
import { useFavorites } from '../contexts/FavoritesContext'

const MovieCard = ({ movie }) => {
    if (!movie) return null;
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const { toggleFavorite, isFavorite } = useFavorites();
    const isMovieFavorite = isFavorite(movie.id);
    const movieId = movie.movieId || movie.id;

    return (
        <Link to={`/movie/${movieId}`} className='bg-sky-800 p-4 rounded-lg'>
            <article className='card transform transition-transform duration-300 hover:scale-105'>
                <div className='relative aspect-[2/3]'>
                    <img src={getImageUrl(movie.poster_path)} alt={movie.title} className='w-full h-full object-cover rounded-lg'></img>
                    <div className='absolute top-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full'>
                        ⭐{rating}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(movie);
                        }}
                        className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
                            isMovieFavorite 
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                    >
                        ⭐
                    </button>
                </div>
                <div className='p-4'>
                    <h3 className='text-lg font-bold text-white'>{movie.title}</h3>
                    <p className='text-sm text-white'>{movie.release_date}</p>
                </div>
            </article>
        </Link>
    )
}

export default MovieCard