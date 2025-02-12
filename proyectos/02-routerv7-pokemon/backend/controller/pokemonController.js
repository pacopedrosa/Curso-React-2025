import axios from 'axios';
import pool from '../config/db.js';
import { createPokemonsTable, createFavoritosTable } from '../models/Pokemon.js';

// Función para obtener y guardar los primeros 20 Pokémon
// En pokemonController.js
// Modificar la función fetchPokemons

const fetchPokemons = async (req, res) => {
  try {
      // Obtener los pokémon de la API
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const pokemons = response.data.results;

      // Obtener los detalles de cada Pokémon
      const pokemonDetails = await Promise.all(
          pokemons.map(async (pokemon) => {
              const detailsResponse = await axios.get(pokemon.url);
              return detailsResponse.data;
          })
      );

      // Guardar los datos en la base de datos y devolver los detalles completos
      await Promise.all(pokemonDetails.map(async (pokemon) => {
          try {
              await pool.query(
                  `INSERT INTO pokemons (id, name, url) 
                   VALUES (?, ?, ?) 
                   ON DUPLICATE KEY UPDATE name = ?, url = ?`,
                  [
                      pokemon.id,
                      pokemon.name,
                      pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default,
                      pokemon.name,
                      pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default
                  ]
              );
          } catch (err) {
              console.error('Error al guardar el Pokémon:', err);
          }
      }));

      res.status(200).json({
          message: 'Pokémons obtenidos y guardados en la base de datos',
          count: pokemonDetails.length,
          pokemons: pokemonDetails
      });

  } catch (error) {
      console.error('Error en fetchPokemons:', error);
      res.status(500).json({
          error: 'Error al obtener o guardar los Pokémon',
          details: error.message
      });
  }
};

// Función para obtener todos los Pokémon de la base de datos
const getPokemons = async (req, res) => {
    try {
        const [pokemons] = await pool.query('SELECT * FROM pokemons ORDER BY id LIMIT 20');
        res.status(200).json(pokemons);
    } catch (error) {
        console.error('Error en getPokemons:', error);
        res.status(500).json({
            error: 'Error al obtener los Pokémon de la base de datos',
            details: error.message
        });
    }
};

// Función para añadir un Pokémon a favoritos
const addToFavorites = async (req, res) => {
    const { pokemonId } = req.body;

    if (!pokemonId) {
        return res.status(400).json({ error: 'Se requiere el ID del Pokémon' });
    }

    try {
        // Verificar si el Pokémon existe antes de añadirlo a favoritos
        const [pokemonExists] = await pool.query('SELECT id FROM pokemons WHERE id = ?', [pokemonId]);

        if (pokemonExists.length === 0) {
            return res.status(404).json({ error: 'Pokémon no encontrado' });
        }

        // Verificar si ya está en favoritos
        const [existingFavorite] = await pool.query(
            'SELECT id FROM favoritos WHERE pokemon_id = ?',
            [pokemonId]
        );

        if (existingFavorite.length > 0) {
            return res.status(400).json({ error: 'Este Pokémon ya está en favoritos' });
        }

        // Añadir a favoritos
        await pool.query('INSERT INTO favoritos (pokemon_id) VALUES (?)', [pokemonId]);
        res.status(200).json({ message: 'Pokémon añadido a favoritos exitosamente' });

    } catch (error) {
        console.error('Error en addToFavorites:', error);
        res.status(500).json({
            error: 'Error al añadir el Pokémon a favoritos',
            details: error.message
        });
    }
};

// Función para obtener todos los Pokémon favoritos
const getFavorites = async (req, res) => {
    try {
        const [favorites] = await pool.query(`
            SELECT pokemons.* 
            FROM favoritos
            JOIN pokemons ON favoritos.pokemon_id = pokemons.id
            ORDER BY pokemons.id
        `);
        res.status(200).json(favorites);
    } catch (error) {
        console.error('Error en getFavorites:', error);
        res.status(500).json({
            error: 'Error al obtener los Pokémon favoritos',
            details: error.message
        });
    }
};

// Función para obtener un Pokémon por nombre
const getPokemonByName = async (req, res) => {
    const { name } = req.params;
    
    try {
        const [pokemon] = await pool.query(
            'SELECT * FROM pokemons WHERE name = ?',
            [name]
        );

        if (pokemon.length === 0) {
            return res.status(404).json({ error: 'Pokémon no encontrado' });
        }

        res.status(200).json(pokemon[0]);
    } catch (error) {
        console.error('Error en getPokemonByName:', error);
        res.status(500).json({
            error: 'Error al buscar el Pokémon por nombre',
            details: error.message
        });
    }
};

// Función para eliminar un Pokémon de favoritos
const removeFromFavorites = async (req, res) => {
    const { pokemonId } = req.params;

    try {
        await pool.query(
            'DELETE FROM favoritos WHERE pokemon_id = ?',
            [pokemonId]
        );
        res.status(200).json({ message: 'Pokémon eliminado de favoritos exitosamente' });
    } catch (error) {
        console.error('Error en removeFromFavorites:', error);
        res.status(500).json({
            error: 'Error al eliminar el Pokémon de favoritos',
            details: error.message
        });
    }
};

export {
    fetchPokemons,
    getPokemons,
    addToFavorites,
    getFavorites,
    getPokemonByName,
    removeFromFavorites
};