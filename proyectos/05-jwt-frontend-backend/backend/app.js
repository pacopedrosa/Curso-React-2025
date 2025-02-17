import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const app = express();

//cors:
const allowOrigins = ["http://localhost:5173", "http://localhost:5174"]

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }, 
    credentials: true, //permite que se puedan enviar cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(express.json());


//conexion con la base de datos
connectDB();

//rutas

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
