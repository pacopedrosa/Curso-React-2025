# Etapa de construcción
FROM node:18-alpine as build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Establecer la variable de entorno para la construcción
ARG VITE_API_URL=http://localhost:4000/api
ENV VITE_API_URL=${VITE_API_URL}

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar los archivos de construcción y las dependencias necesarias
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

# Establecer la variable de entorno para la construcción
ARG VITE_API_URL=http://localhost:4000/api
ENV VITE_API_URL=${VITE_API_URL}

# Exponer el puerto que usa Vite (5173 por defecto)
EXPOSE 5173

# Comando para ejecutar la aplicación en modo preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
