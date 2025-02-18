import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { searchMovies } from '../services/tmdb'
import SearchBox from '../components/SearchBox'
import MovieCard from '../components/MovieCard'
import { PacmanLoader } from 'react-spinners'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [page, setPage] = useState(1)
  
  const { data, loading, error } = useFetch(
    () => searchQuery ? searchMovies(searchQuery, page) : null,
    [searchQuery, page]
  )

  useEffect(() => {
    const query = searchParams.get('query')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setSearchParams({ query })
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setPage(newPage)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-sky-950">Buscar Películas</h1>
      
      <SearchBox onSearch={handleSearch} initialValue={searchQuery} />

      {error && (
        <div className="text-center text-red-600">
          <p>Error: {error.message}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <PacmanLoader color="blue" />
        </div>
      ) : data?.results?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Paginación */}
          <div className="flex justify-center items-center mt-8 gap-2">
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
      ) : searchQuery && !loading && (
        <div className="text-center text-gray-600">
          <p>No se encontraron películas para &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  )
}

export default Search