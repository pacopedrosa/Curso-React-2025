import { useState } from "react"
import Hijo from "./Hijo"

const Padre = () => {
    const [counter, setCounter] = useState(0)
  return (
    <>
    <div>Yo soy tu padre</div>
    <Hijo counter={counter} setCounter={setCounter} />
    </>
  )
}

export default Padre