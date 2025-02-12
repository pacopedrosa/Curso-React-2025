import pool from "../config/db.js";

// Crear tabla 'pokemons' si no existe
export const createPokemonsTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS pokemons (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL
        )
    `;

    try {
        await pool.query(sql);
        console.log("Tabla 'pokemons' asegurada.");
    } catch (err) {
        console.error("Error al crear la tabla pokemons:", err);
        throw err;
    }
};

// Crear tabla 'favoritos' si no existe
export const createFavoritosTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS favoritos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pokemon_id INT NOT NULL,
            FOREIGN KEY (pokemon_id) REFERENCES pokemons(id) ON DELETE CASCADE
        )
    `;

    try {
        await pool.query(sql);
        console.log("Tabla 'favoritos' asegurada.");
    } catch (err) {
        console.error("Error al crear la tabla favoritos:", err);
        throw err;
    }
};