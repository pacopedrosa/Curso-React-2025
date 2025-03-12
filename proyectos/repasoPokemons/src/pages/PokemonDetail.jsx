import { useLoaderData, useNavigate } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";

const PokemonDetail = () => {
    const pokemon = useLoaderData();
    // UseNavigate hook para la navegación programática.
    const navigate = useNavigate();
    // extraigo del contexto la función addToFavorites.
    const { addToFavorites } = usePokemon();
  
    return (
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <button
            className="mb-4 text-blue-800 hover:underline"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto"
          ></img>
          <h1 className="text-3xl font-bold text-center capitalize mb-4">
            {pokemon.name}
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl text-amber-600 font-semibold mb-2">
                Estadísticas
              </h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <span className="font-semibold capitalize">
                    {stat.stat.name}: {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl text-amber-600 font-semibold mb-2">Tipos</h2>
              <div>
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToFavorites(pokemon)}
              className="mt-4 text-center bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              Añadir a Favoritos
            </button>
          </div>
        </div>
      </div>
    );
}

export default PokemonDetail