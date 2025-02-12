import { Link } from 'react-router-dom'
import { getImageUrl } from '../services/tmdb'

export const MovieCard = ({movie}) => {
    console.log(movie)
    const rating = movie.vote_average.toFixed(1)
  return (
    <Link to={`/movie/:${movie.id}`} className='bg-sky-800 p-4 rounded-lg'>
      <article className='card transform transition-transform duration-300 hover:scale-105'>
        <div className='relative aspect-[2/3]'>


          <img src={getImageUrl(movie.poster_path)} alt={movie.title} className='w-full h-full object-cover rounded-lg'></img>
          <div className='absolute top-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full'>
          ⭐{rating}
          </div>
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