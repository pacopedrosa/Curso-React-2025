// import Contador from "./components/UseState/contador"
// import ContadorDoble from "./components/UseState/ContadorDoble"
// import ContinuacionNumeros from "./components/UseState/ContinuacionNumeros"
// import GuitarHeroe from "./components/UseState/GuitarHeroe"
// import RegistrarFormulario from "./components/UseState/RegistrarFormulario"

// import Timer from "./components/useEffectsCicloVida/Timer"
import ProductList from "./components/useEffects/ProductList"
// import UsersPlaceholder from "./components/useEffectsCicloVida/UsersPlaceholder"

// import { useState } from "react"
// import Hijo2 from "./components/props2/Hijo2"
// import Nieto2 from "./components/props2/Nieto2"
// import Padre2 from "./components/props2/Padre2"
// import Padre from "./components/UseState/props/Padre"


const App = () => {
  // const [contador, setContador] = useState(0)
  // const handleClick = () => {
  //   setContador(contador + 1)
  // }
  return (
    <>
      <div className="mx-auto">
        <div className="text-3xl font-bold underline">Hola mundo</div>
        {/* <Contador />
        <hr className="mb-10"></hr>
        <ContadorDoble />
        <hr className="mb-10"></hr>
        <ContinuacionNumeros />
        <hr className="mb-10"></hr>
        <RegistrarFormulario />
        <hr className="mb-10"></hr>
        <GuitarHeroe /> */}
        {/* <hr className="mb-10"></hr>
        <Padre/> */}
        {/* <hr className="mb-10"></hr>
        {/* <Padre2>
          <Hijo2>
            <Nieto2 handleClick={handleClick} contador={contador} />
          </Hijo2>
        </Padre2> */}
        {/* <Timer /> */}
        {/*<UsersPlaceholder /> */}
        <ProductList ></ProductList>
      </div>
    </>
  )
}

export default App