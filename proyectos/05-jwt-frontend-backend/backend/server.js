//en server levanto el servidor
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server corriendo en ${URL}:${PORT}`);
});