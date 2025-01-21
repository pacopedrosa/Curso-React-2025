import { useEffect, useState } from "react"

const Timer = () => {
    const [counter, setCounter] = useState(0)

    // useEffect(() => {
    //  //Nunca usar async await dentro de useEffect 
    //  console.log("Componente montado");
    //  //Si no le paso un array de dependencia se ejecuta cada vez se renderiza el componente
    // })

    // useEffect(() => {
    //     console.log("Componente montado solo una vez");
    //    },[])

    useEffect(() => {
        console.log("Componente renderizado cada vez que se cambia algo del array de dependencias");
       },[])
    
  return (
    <>
        <div>Timer</div>
        <div>{counter}</div>
        <button onClick={()=>setCounter((prevCounter)=>prevCounter+1)}>Iniciar</button>
        <p></p>
        <button onClick={()=>setCounter((prevCounter)=>prevCounter+1)}>Iniciar contador 2</button>

    </>
  )
}

export default Timer