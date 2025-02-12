import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'pokedex', // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para inicializar la base de datos
const initDatabase = async () => {
    try {
        // Crear la base de datos si no existe
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await connection.query("CREATE DATABASE IF NOT EXISTS pokedex");
        console.log("Base de datos 'pokedex' asegurada.");

        // Cerrar la conexión inicial
        await connection.end();

        // Verificar la conexión al pool
        const [result] = await pool.query('SELECT 1');
        if (result) {
            console.log("Conectado exitosamente a la base de datos 'pokedex'.");
        }

    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        process.exit(1); // Terminar el proceso si hay un error crítico
    }
};

// Inicializar la base de datos
initDatabase();

export default pool;