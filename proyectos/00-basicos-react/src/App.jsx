import Contador from "./components/UseState/contador"
import ContadorDoble from "./components/UseState/ContadorDoble"
import ContinuacionNumeros from "./components/UseState/ContinuacionNumeros"


const App = () => {
  return (
    <>
      <div className="text-3xl font-bold underline">Hola mundo</div>
      <Contador />
      <hr className="mb-10"></hr>
      <ContadorDoble />
      <hr className="mb-10"></hr>
      <ContinuacionNumeros />
    </>
  )
}

export default App