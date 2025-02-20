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
    console.log("API URL:", import.meta.env.VITE_API_URL);
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      console.log("Intentando fetch a:", import.meta.env.VITE_API_URL);
      
      // Primero intentamos obtener los pokémon de nuestra base de datos
      const response = await fetch('http://localhost:4000/api/pokemons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Datos recibidos:", data);
      
      if (Array.isArray(data)) {
        setPokemons(data);
      } else {
        console.error("La respuesta no es un array:", data);
        setError("Formato de datos incorrecto");
      }
      
    } catch (error) {
      console.error("Error detallado:", error);
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
                onClick={() => addToFavorites({
                    id: pokemon.id,
                    name: pokemon.name,
                    sprites: {
                        other: {
                            dream_world: {
                                front_default: pokemon.url
                            }
                        },
                        front_default: pokemon.url
                    }
                })} 
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