FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Variables de entorno por defecto
ENV VITE_API_URL=http://localhost:3000/api

EXPOSE 5173

# Usar --host para permitir conexiones externas
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 