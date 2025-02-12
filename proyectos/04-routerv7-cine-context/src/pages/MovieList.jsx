import { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getPopularMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'
import { PacmanLoader } from 'react-spinners'

const MovieList = () => {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [minRating, setMinRating] = useState(0)
  
  const { data, loading, error } = useFetch(
    () => getPopularMovies(page, sortBy),
    [page, sortBy]
  )

  const filteredMovies = data?.results?.filter(
    movie => movie.vote_average >= minRating
  )

  const handlePageChange = (newPage) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setPage(newPage)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setPage(1)
  }

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value))
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-sky-950">Catálogo de Películas</h1>
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity.desc">Más populares</option>
            <option value="popularity.asc">Menos populares</option>
            <option value="vote_average.desc">Mejor valoradas</option>
            <option value="vote_average.asc">Peor valoradas</option>
            <option value="release_date.desc">Más recientes</option>
            <option value="release_date.asc">Más antiguas</option>
          </select>

          <div className="flex items-center gap-2">
            <label htmlFor="rating">Valoración mínima:</label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              step="0.5"
              value={minRating}
              onChange={handleRatingChange}
              className="w-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <PacmanLoader color="blue" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-sky-800 transition-colors hover:bg-sky-950 text-white disabled:opacity-50"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="text-sky-950">{page}</span>
            <button
              className="px-4 py-2 rounded-lg bg-sky-800 transition-colors hover:bg-sky-950 text-white disabled:opacity-50"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === data?.total_pages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieList