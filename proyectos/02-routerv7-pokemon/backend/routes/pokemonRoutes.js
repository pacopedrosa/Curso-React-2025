import express from 'express';
import {
    fetchPokemons,
    getPokemons,
    addToFavorites,
    getFavorites,
    getPokemonByName,
    removeFromFavorites
} from '../controller/pokemonController.js';

const router = express.Router();

router.get('/fetch-pokemons', fetchPokemons);
router.get('/pokemons', getPokemons);
router.post('/favorites', addToFavorites);
router.get('/favorites', getFavorites);
router.get('/search/:name', getPokemonByName);
router.delete('/favorites/:pokemonId', removeFromFavorites);

export default router;