import Contador from "./components/UseState/contador"
import ContadorDoble from "./components/UseState/ContadorDoble"
import ContinuacionNumeros from "./components/UseState/ContinuacionNumeros"
import GuitarHeroe from "./components/UseState/GuitarHeroe"
import RegistrarFormulario from "./components/UseState/RegistrarFormulario"


const App = () => {
  return (
    <>
      <div className="mx-auto">
        <div className="text-3xl font-bold underline">Hola mundo</div>
        <Contador />
        <hr className="mb-10"></hr>
        <ContadorDoble />
        <hr className="mb-10"></hr>
        <ContinuacionNumeros />
        <hr className="mb-10"></hr>
        <RegistrarFormulario />
        <hr className="mb-10"></hr>
        <GuitarHeroe />
      </div>
    </>
  )
}

export default App