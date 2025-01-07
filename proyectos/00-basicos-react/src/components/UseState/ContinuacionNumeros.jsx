import { useState } from "react"

/**
 * @description Crear una funcion que añada el numero siguiente a mi array de numeros (hay que ordenar los numeros)
 */
const ContinuacionNumeros = () => {

    const [numbers, setNumbers] = useState([5,2,3,1,4])

    function addNextNumber(){
        const maxNumber = Math.max(...numbers)
        setNumbers([...numbers, maxNumber + 1])
    }

  return (
    <>
        <div>
            <button className="bg-slate-400 rounded mb-2 my-2" onClick={addNextNumber}>Añade el siguiete numero</button>
            <ul className="flex gap-2 my-2">
                {numbers.map((number, index)=> <li key={index}>{number}</li>)}
            </ul>
        </div>
    </>
  )
}

export default ContinuacionNumeros