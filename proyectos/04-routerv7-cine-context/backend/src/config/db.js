import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/moviedb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB conectado: ${conn.connection.host}`);
        
        // Verificar la conexión
        mongoose.connection.on('error', err => {
            console.error('Error de MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB desconectado');
        });

        return true;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        throw error;
    }
};

export default connectDB;
