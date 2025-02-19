#Guion para poder saber si todo se almacena en la base de datos
- cuando el proyecto esta running con el compose, en la terminal usa este comando docker exec -it 04-routerv7-cine-context-mongodb-1 mongosh

- 2. Una vez pongas ese comando veras la terminal de la base de datos de mongodb, pondras use moviedb para ver la base de datos que se esta usando. Luego show collections para ver las colecciones que se estan usando. Luego db.ElNombreDeLaColeccionQueQuieras.find() para ver los datos que se estan guardando en la base de datos.

- De esta manera podras ver qe todo se almacena en la bd. cada movie que añadas a favoritos se añade a la bd ya que no podemos almacenar todas las peliculas cada vez que inicies el proyecto porque seria demasiado pesado.