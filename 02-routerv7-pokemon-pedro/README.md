# 🎮 Pokédex App - Node.js y React

## 📝 Descripción
Pokédex web fullstack que permite explorar y buscar información detallada sobre Pokémon. El backend está construido con Node.js y Express, consumiendo datos de la PokeAPI y almacenándolos en MongoDB. El frontend está desarrollado con React y TailwindCSS 4.0.

La aplicación permite visualizar los Pokémon por generaciones, buscarlos por nombre, ver sus detalles completos y marcarlos como favoritos. Todo esto con una interfaz moderna y responsive.

## 🚀 Características Principales
- Exploración de Pokémon por generaciones (1-5)
- Búsqueda por nombre con autocompletado
- Visualización detallada de:
  - Estadísticas base
  - Tipos
  - Altura y peso
  - Imágenes oficiales
- Sistema de favoritos
- Interfaz responsive adaptada a todos los dispositivos
- Optimización de carga mediante Promise.all
- Caché de datos en MongoDB

## 🛠 Tecnologías Utilizadas

### Backend
- Node.js (v20+)
- Express.js
- MongoDB
- Docker
- PokeAPI

### Frontend
- React 18
- TailwindCSS 4.0
- React Router v7
- Vite
- Context API para estado global

## 📦 Instalación y Uso con Docker

### Requisitos Previos
- Docker y Docker Compose instalados en el sistema
- Puertos 5173 (frontend), 3000 (backend) y 27017 (MongoDB) disponibles

### Pasos para Ejecutar
1. Clonar o descargar el repositorio:
```bash
git clone <url-del-repositorio>
cd pokedex-app
```

2. Iniciar la aplicación con Docker Compose:
```bash
docker-compose down -v
docker-compose up --build
```

3. Esperar a que todos los servicios estén listos:
   - ✅ MongoDB: Mensaje "MongoDB Connected"
   - ✅ Backend: Mensaje "Server running on port 3000"
   - ✅ Frontend: Mensaje "Local: http://localhost:5173/"

4. Acceder a la aplicación:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Endpoint de prueba: http://localhost:3000/api

### Verificación de Funcionamiento
1. La página principal mostrará los primeros 151 Pokémon (1ª generación)
2. El selector de generaciones permite cambiar entre diferentes grupos
3. La barra de búsqueda permite encontrar Pokémon por nombre
4. Cada tarjeta de Pokémon muestra:
   - Imagen del Pokémon
   - Nombre
   - Número de Pokédex
   - Tipos
   - Botón para ver detalles

### Solución de Problemas Comunes
- Si los Pokémon no cargan, verificar en la consola del navegador que la URL de la API es correcta
- Si el backend no conecta con MongoDB, esperar unos segundos más para que MongoDB termine de inicializarse
- Para reiniciar completamente la aplicación:
```bash
docker-compose down
```

## 🔌 API Endpoints

### Pokémon
- `GET /api/pokemons?start=1&end=151` - Obtener Pokémon por rango
- `GET /api/pokemon/:name` - Obtener Pokémon por nombre
- `GET /api/pokemon/search/:term` - Buscar Pokémon

### Favoritos
- `GET /api/favorites` - Obtener favoritos
- `POST /api/favorites` - Añadir a favoritos
- `DELETE /api/favorites/:id` - Eliminar de favoritos

## 🎯 Funcionalidades Implementadas

### Backend
- ✅ Conexión y almacenamiento en MongoDB
- ✅ Consumo optimizado de PokeAPI
- ✅ Sistema de caché para reducir llamadas
- ✅ Endpoints REST completos
- ✅ Manejo de errores robusto
- ✅ Dockerización completa

### Frontend
- ✅ Interfaz responsive con TailwindCSS
- ✅ Navegación entre generaciones
- ✅ Búsqueda en tiempo real
- ✅ Vista detallada de Pokémon
- ✅ Sistema de favoritos
- ✅ Optimización de rendimiento
- ✅ Manejo de estados con Context

## 🎨 Estructura del Proyecto

```
pokedex-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── pokemon.controller.js
│   │   ├── models/
│   │   │   └── pokemon.model.js
│   │   ├── routes/
│   │   │   └── pokemon.routes.js
│   │   └── app.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 📱 Capturas de Pantalla

[Aquí irían las capturas de pantalla de la aplicación mostrando las diferentes vistas y funcionalidades]

## 🔍 Características Destacadas
- Carga optimizada usando Promise.all
- Caché en MongoDB para mejor rendimiento
- Interfaz moderna y responsive
- Sistema robusto de manejo de errores
- Dockerización para fácil despliegue
- Búsqueda en tiempo real
- Navegación fluida entre vistas

## 🚀 Uso
1. Al iniciar, la aplicación carga la primera generación de Pokémon
2. Usa el selector superior para cambiar entre generaciones
3. Utiliza la barra de búsqueda para encontrar Pokémon específicos
4. Haz clic en cualquier Pokémon para ver sus detalles
5. Marca tus favoritos usando el botón de estrella
6. Navega entre diferentes vistas usando el menú superior

## ⚙️ Variables de Entorno

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/pokedex
POKEAPI_URL=https://pokeapi.co/api/v2
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## 👥 Autor
[Pedro Javier Marquez Lizana]

