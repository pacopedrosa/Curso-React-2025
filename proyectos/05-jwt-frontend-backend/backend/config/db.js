// Uso variables de entorno´

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const connectDB = async () =>{
    try {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

        console.log("Conexion a mongoDB exitosa");
    } catch (error) {
        console.log("Error con la conexion de base de datos: " + error);
    }
}

export default connectDB;