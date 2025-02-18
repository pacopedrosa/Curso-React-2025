import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { getPopularMovies } from "../services/tmdb";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { PacmanLoader } from "react-spinners";

const Home = () => {
    const [page, setPage] = useState(1);
    const {data, loading, error} = useFetch(() => getPopularMovies(page), [page]);

    if(error){
        return(
            <div className="text-center p-10">
                <h2 className="text-red-600 text-2xl font-bold">Error</h2>
                <p className="text-red-600 text-2xl font-medium">{error.message}</p>
                <Link to="/" className="text-blue-600 text-2xl font-medium">Volver a la página principal</Link>
            </div>
        )
    }

    const handlePageChange = (newPage) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setPage(newPage);
    }

    return (
        <div className="space-y-8">
            <header className="text-center">
                <h1 className="text-2xl font-bold text-sky-950">Bienvenido al VideoClub</h1>
                <p className="text-lg font-medium text-sky-900">Descubre nuestro catálogo completo de películas</p>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <PacmanLoader color="#0369a1" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {data?.results?.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-sky-800 text-white rounded-lg disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className="px-4 py-2 bg-sky-800 text-white rounded-lg"
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Home