import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/pokemonContext";
import Spinner from "../components/spinner";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites } = usePokemon();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch-pokemons`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      setPokemons(data.pokemons); // Ahora data.pokemons contiene el array de pokémons completo
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setError("Error al cargar los Pokémon. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pokemons disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="bg-white shadow-md rounded-md p-6 group">
            <div>
              <img
                src={pokemon.sprites?.other?.dream_world?.front_default || pokemon.url} 
                alt={pokemon.name}
                className="w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h2 className="text-lg font-bold text-center mb-2">{pokemon.name}</h2>
            <div className="flex justify-center space-x-2 mt-4">
              <button 
                onClick={() => addToFavorites(pokemon)} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
              >
                Añadir a favoritos
              </button>
              <Link 
                to={`/search/${pokemon.name}`} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
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

export default Home;
















  // const fetchPokemons = async () => {
  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemons`);
  //     if (!response.ok) {
  //       throw new Error("Error fetching data");
  //     }
  //     const data = await response.json();
  //     const pokemonsDetails = await Promise.all(
  //       data.results.map(async (pokemon) => {
  //         const repon = await fetch(pokemon.url);
  //         if (!repon.ok) {
  //           throw new Error(`Error fetching data for ${pokemon.name}`);
  //         }
  //         return await repon.json();
  //       })
  //     );

  //     setPokemons(pokemonsDetails);
  //   } catch (error) {
  //     console.log("Error fetching pokemons", error);
  //     setError("Error al cargar los Pokémon. Por favor, intenta de nuevo.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };