import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext"

const Favorites = () => {
    const { favorites, removeFromFavorites } = usePokemon();
    
    if (favorites.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold mb-6">Tus Pokémon Favoritos</h1>
                <p className="text-xl text-gray-600">No tienes ningún Pokémon en favoritos</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Tus Pokémon Favoritos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((pokemon) => (
                    <div
                        key={pokemon.name}
                        className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-200 flex flex-col gap-4"
                    >
                        <h2 className="text-2xl font-bold text-center capitalize">{pokemon.name}</h2>
                        <img 
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}
                            className="w-40 h-40 mx-auto object-contain"
                        />
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => removeFromFavorites(pokemon.name)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                            >
                                Eliminar de favoritos
                            </button>
                            <Link
                                to={`/pokemon/${pokemon.name}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
                            >
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;