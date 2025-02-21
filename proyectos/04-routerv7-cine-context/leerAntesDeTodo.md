# 🔍 Guía para Verificar la Base de Datos MongoDB

## 📝 Pasos para Acceder a MongoDB

1. **Acceder al Contenedor de MongoDB**
   ```bash
   docker exec -it 04-routerv7-cine-context-mongodb-1 mongosh
   ```

2. **Comandos Útiles de MongoDB**
   - Seleccionar base de datos:
     ```bash
     use moviedb
     ```
   - Ver colecciones disponibles:
     ```bash
     show collections
     ```
   - Ver datos de una colección específica:
     ```bash
     db.nombreColeccion.find()
     ```

## 📌 Nota Importante
- Las películas se almacenan en favoritos de manera individual
- No se almacenan todas las películas de TMDB por razones de espacio
- Solo se guardan en la base de datos las películas que los usuarios marcan como favoritas

## 💡 Ejemplo de Uso
```bash
# Acceder al contenedor
docker exec -it 04-routerv7-cine-context-mongodb-1 mongosh

# Ver datos de favoritos
use moviedb
show collections
db.favorites.find()
```
