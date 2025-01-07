import { useState } from "react";

const Contador = () => {

    //Espacio para los hooks

    const [total, setTotal] = useState(0);

    //Espacio para declarar funciones
    function handlerClickIncrementar(numero) {
        setTotal(total + numero) 
    }

    function handlerClickDecrementar(numero) {
        setTotal(total - numero)
    }

  return (
    <>
    <h1>contador</h1>
    <h2>{total}</h2>
    <button onClick={()=>handlerClickIncrementar(1)}>Incrementar</button>   
    <button onClick={()=>handlerClickDecrementar(1)}>Decrementar</button>
    </>
  )
}

export default Contador