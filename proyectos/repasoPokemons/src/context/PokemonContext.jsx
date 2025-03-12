import { createContext, useContext, useState, useEffect } from "react";

const PokemonContext = createContext()

export const PokemonProvider = ({children}) => {
    const [favorites, setFavorites] = useState(() => {
        // Recuperar favoritos del localStorage al iniciar
        const savedFavorites = localStorage.getItem('pokemonFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Guardar en localStorage cada vez que favorites cambie
    useEffect(() => {
        localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (pokemon) => {
        setFavorites([...favorites, pokemon]);
    }

    const removeFromFavorites = (pokemonName) => {
        setFavorites(favorites.filter((fav) => fav.name !== pokemonName));
    }   

    const isFavorite = (pokemon) => {   
        return favorites.some((fav) => fav.id === pokemon.id);
    }

    return (
        <PokemonContext.Provider value={{
            favorites, 
            addToFavorites, 
            setFavorites, 
            removeFromFavorites, 
            isFavorite
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemon = () => {
    return useContext(PokemonContext)
}

