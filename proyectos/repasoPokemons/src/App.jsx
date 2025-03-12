import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { PokemonProvider } from "./context/PokemonContext"
const App = () => {
  return (
    <>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
    </>
  )
}

export default App