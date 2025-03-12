import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { usePokemon } from "../context/PokemonContext"

const Home = () => {
    const [pokemons, setPokemons] = useState([])
    const {addToFavorites} = usePokemon()

    
    const fetchPokemons = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        if(!response.ok){
            throw new Error("Failed to fetch pokemon")
        }
        const data = await response.json()
        
        // Fetch details for each pokemon
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url)
                return res.json()
            })
        )
        setPokemons(pokemonDetails)
    }

    useEffect(() => {
        fetchPokemons()
    }, [])

    if(!pokemons.length){
        return <div>Loading...</div>
    }
    
    return (
        <div className="flex flex-wrap justify-center items-center gap-8 mt-10 mx-8 mb-10">
            {pokemons.map((pokemon) => (
                <div 
                    key={pokemon.name} 
                    className="w-72 border-2 border-gray-300 rounded-lg p-6 hover:bg-gray-100 cursor-pointer shadow-lg flex flex-col gap-4"
                >
                    <h2 className="text-2xl font-bold text-center capitalize mb-2">{pokemon.name}</h2>
                    <img 
                        src={pokemon.sprites.other.dream_world.front_default} 
                        alt={pokemon.name} 
                        className="w-40 h-40 mx-auto object-contain" 
                    />
                    <div className="flex flex-col gap-3 mt-2">
                        <button 
                            onClick={() => addToFavorites({
                                id: pokemon.id,
                                name: pokemon.name,
                                sprites: {
                                    other: {
                                        dream_world: {
                                            front_default: pokemon.sprites.other.dream_world.front_default
                                        }
                                    }
                                }
                            })} 
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 w-full"
                        >
                            Añadir a favoritos
                        </button>

                        <Link 
                            to={`/pokemon/${pokemon.name}`} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-center w-full"
                        >
                            Ver detalles
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Home