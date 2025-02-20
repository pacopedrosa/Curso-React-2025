import axios from 'axios';
import pool from '../config/db.js';
import { createPokemonsTable, createFavoritosTable } from '../models/Pokemon.js';

// Función para obtener y guardar los primeros 20 Pokémon
// En pokemonController.js
// Modificar la función fetchPokemons

export const fetchPokemons = async (req, res) => {
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
export const getPokemons = async (req, res) => {
    try {
        const [pokemons] = await pool.query('SELECT * FROM pokemons ORDER BY id LIMIT 20');
        res.status(200).json(pokemons);
    } catch (error) {
        console.error('Error en getPokemons:', error);
        res.status(500).json({
            error: 'Error al obtener los Pokémon',
            details: error.message
        });
    }
};

// Función para añadir un Pokémon a favoritos
export const addToFavorites = async (req, res) => {
    try {
        const pokemon = req.body;
        await pool.query(
            `INSERT INTO favoritos (id, name, sprites) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE name = ?, sprites = ?`,
            [
                pokemon.id,
                pokemon.name,
                JSON.stringify({
                    other: {
                        dream_world: {
                            front_default: pokemon.sprites?.other?.dream_world?.front_default
                        }
                    },
                    front_default: pokemon.sprites?.front_default
                }),
                pokemon.name,
                JSON.stringify({
                    other: {
                        dream_world: {
                            front_default: pokemon.sprites?.other?.dream_world?.front_default
                        }
                    },
                    front_default: pokemon.sprites?.front_default
                })
            ]
        );

        res.status(200).json({ message: 'Pokemon añadido a favoritos' });
    } catch (error) {
        console.error('Error en addToFavorites:', error);
        res.status(500).json({
            error: 'Error al añadir el Pokémon a favoritos',
            details: error.message
        });
    }
};

// Función para obtener todos los Pokémon favoritos
export const getFavorites = async (req, res) => {
    try {
        const [favorites] = await pool.query('SELECT * FROM favoritos ORDER BY id');
        
        // Parsear los sprites JSON a objeto
        const parsedFavorites = favorites.map(favorite => ({
            ...favorite,
            sprites: typeof favorite.sprites === 'string' ? JSON.parse(favorite.sprites) : favorite.sprites
        }));
        
        res.status(200).json(parsedFavorites);
    } catch (error) {
        console.error('Error en getFavorites:', error);
        res.status(500).json({
            error: 'Error al obtener los Pokémon favoritos',
            details: error.message
        });
    }
};

// Función para obtener un Pokémon por nombre
export const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.params;
        
        // Primero buscar en nuestra base de datos
        const [localPokemon] = await pool.query(
            'SELECT * FROM pokemons WHERE name LIKE ?',
            [`%${name.toLowerCase()}%`]
        );

        if (localPokemon.length > 0) {
            return res.status(200).json(localPokemon[0]);
        }

        // Si no está en nuestra base de datos, buscar en la API externa
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemon = response.data;

        // Guardar en nuestra base de datos
        await pool.query(
            `INSERT INTO pokemons (id, name, sprites) 
             VALUES (?, ?, ?) 
             ON DUPLICATE KEY UPDATE name = ?, sprites = ?`,
            [
                pokemon.id,
                pokemon.name,
                JSON.stringify({
                    other: {
                        dream_world: {
                            front_default: pokemon.sprites.other.dream_world.front_default
                        }
                    },
                    front_default: pokemon.sprites.front_default
                }),
                pokemon.name,
                JSON.stringify({
                    other: {
                        dream_world: {
                            front_default: pokemon.sprites.other.dream_world.front_default
                        }
                    },
                    front_default: pokemon.sprites.front_default
                })
            ]
        );

        res.status(200).json({
            id: pokemon.id,
            name: pokemon.name,
            sprites: {
                other: {
                    dream_world: {
                        front_default: pokemon.sprites.other.dream_world.front_default
                    }
                },
                front_default: pokemon.sprites.front_default
            }
        });
    } catch (error) {
        console.error('Error en getPokemonByName:', error);
        res.status(404).json({
            error: 'Pokemon no encontrado',
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
    removeFromFavorites
};