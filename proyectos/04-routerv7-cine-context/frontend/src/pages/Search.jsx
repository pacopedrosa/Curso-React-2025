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
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-sky-800 text-white rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-sky-950">Página {page} de {data.total_pages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= data.total_pages}
              className="px-4 py-2 bg-sky-800 text-white rounded-lg disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : searchQuery && !loading ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">No se encontraron películas para "{searchQuery}"</p>
          <p className="text-gray-500">Sugerencias:</p>
          <ul className="text-gray-500">
            <li>Verifica que no haya errores de escritura</li>
            <li>Intenta usar términos más generales</li>
            <li>Prueba con el título original de la película</li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default Search