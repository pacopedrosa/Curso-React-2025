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
            <div className="text-center p-10 ">
                <h2 className="text-red-600 text-2xl font-bold">Error</h2>
                <p className="text-red-600 text-2xl font-medium ">{error.message}</p>
                <Link to="/" className="text-blue-600 text-2xl font-medium ">Volver a la pagina principal</Link>
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
                <h1 className="text-2xl font-bold text-sky-950">Bienvenido al Videoclub</h1>
                <p className="text-lg font-medium text-sky-900">En esta pagina podras ver las peliculas mas populares</p>
            </header>

            <section className="">
                <h2 className="text-2xl font-bold text-sky-950">Peliculas populares</h2>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <PacmanLoader color="blue" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {data?.results?.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center items-center mt-8 gap-2">
                    <button 
                        className="px-4 py-2 rounded-lg bg-sky-800 transition-colors hover:bg-sky-950 text-white" 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-sky-950">{page}</span>

                    <button 
                        className="px-4 py-2 rounded-lg bg-sky-800 transition-colors hover:bg-sky-950 text-white" 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page === data?.total_pages}
                    >
                        Siguiente
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Home