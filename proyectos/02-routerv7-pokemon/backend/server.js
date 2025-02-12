import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createFavoritosTable, createPokemonsTable } from "./models/Pokemon.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST', 'DELETE'], // Métodos permitidos
    credentials: true, // Permite credenciales
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo salió mal!',
        details: err.message
    });
});

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'API de Pokemon funcionando correctamente' });
});

// Rutas
app.use('/api', pokemonRoutes);

// Inicializar servidor y crear tablas
const initServer = async () => {
    try {
        // Crear tablas si no existen
        await createPokemonsTable();
        await createFavoritosTable();

        const PORT = process.env.PORT || 4000;
        const URL = process.env.URL || "http://localhost";

        app.listen(PORT, () => {
            console.log(`Server corriendo en la ruta ${URL}:${PORT}`);
            console.log('CORS está permitiendo conexiones desde:', corsOptions.origin);
        });
    } catch (error) {
        console.error("Error al inicializar el servidor:", error);
        process.exit(1);
    }
};

initServer();