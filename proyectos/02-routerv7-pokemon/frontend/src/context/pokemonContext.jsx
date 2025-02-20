import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = async (pokemon) => {
        try {
            const response = await fetch('http://localhost:4000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: pokemon.id,
                    name: pokemon.name,
                    sprites: pokemon.sprites || { 
                        other: {
                            dream_world: {
                                front_default: pokemon.url
                            }
                        },
                        front_default: pokemon.url
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Error al añadir a favoritos');
            }

            // Actualizar el estado local de favoritos
            setFavorites(prev => [...prev, pokemon]);
            toast.success('Pokemon añadido a favoritos');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al añadir a favoritos');
        }
    };

    const removeFromFavorites = (pokemonId) => {
        setFavorites(prevFavorites => prevFavorites.filter(pokemon => pokemon.id!== pokemonId));
        toast.info("Pokemon eliminado de favoritos"), {
            style: {
                background: 'orange',
                color: 'white',
                border: '1px solid black',
            }
        }
    }

    return (
        <PokemonContext.Provider value={{ 
            favorites, 
            setFavorites,
            addToFavorites, 
            removeFromFavorites 
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if(context === undefined){
        throw new Error("usePokemon must be used within a PokemonProvider");
    }
    return context;
}