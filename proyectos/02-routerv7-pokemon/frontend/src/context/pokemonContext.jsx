import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]); // Mueve el useState aquí

    const addToFavorites = (pokemon) => {
        if(favorites.some((p) => p?.id === pokemon.id)){
            toast.error("Este Pokémon ya está en tus favoritos", {
                style: {
                    background: 'red',
                    color: 'white',
                    border: '1px solid black',
                    icon: '⭐',
                }
            });
            return;
        }
        setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
        toast.success("Pokemon añadido a favoritos"), {
            style: {
                background: 'green',
                color: 'white',
                border: '1px solid black',
            }
        }
        console.log(favorites);
    }

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
        <PokemonContext.Provider value={{ favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if(context === undefined){
        throw new Error("usePokemon must be used within a PokemonProvider");
    }
    return context;
}