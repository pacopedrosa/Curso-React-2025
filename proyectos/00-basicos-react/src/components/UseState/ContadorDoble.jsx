import { useState } from "react";

/**
 * @description Contador que aumenta los amigos de Juan y María, y calcula su promedio.
 */
const ContadorDoble = () => {
  // Declaración de hooks
  const [friends, setFriends] = useState({ Juan: 0, Pedro: 0, Maria: 0 });
  const [pAmigos, setpAmigos] = useState(0);

  // Declaración de funciones
  function handlerClick(nombre, valor) {
    setFriends((prevFriends) => {
      return {
        ...prevFriends,
        [nombre]: Math.max(0, prevFriends[nombre] + valor), // Evita valores negativos
      };
    });
    promedioAmigos();
  }

  function promedioAmigos() {
    const numAmigosArray = Object.values(friends);
    const sumaAmigos = numAmigosArray.reduce((acc, numAmigos) => acc + numAmigos, 0);
    setpAmigos(numAmigosArray.length > 0 ? sumaAmigos / numAmigosArray.length : 0);
  }

  return (
    <>
      <h1 className="text-2xl bg-cyan-600 text-center">Contador de amigos</h1>
      <div className="text-center">
        <span className="mb-5 py-10">
          Juan tiene <strong>{friends.Juan}</strong> amigos
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          onClick={() => handlerClick("Juan", 1)}
        >
          Incrementar amigos
        </button>
        <button
          className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-2 rounded"
          onClick={() => handlerClick("Juan", -1)}
        >
          Decrementar amigos
        </button>
      </div>
      <div className="text-center">
        <span className="mb-5 py-10">
          Maria tiene <strong>{friends.Maria}</strong> amigos
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
          onClick={() => handlerClick("Maria", 1)}
        >
          Incrementar amigos
        </button>
        <button
          className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-2 rounded"
          onClick={() => handlerClick("Maria", -1)}
        >
          Decrementar amigos
        </button>
      </div>
      <br />
      <div className="text-center">
        <h2 className="text-2xl bg-pink-600">Promedio de amigos</h2>
        <span>El promedio de amigos es: {pAmigos.toFixed(2)}</span>
      </div>
    </>
  );
};

export default ContadorDoble;
