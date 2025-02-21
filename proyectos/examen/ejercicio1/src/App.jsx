import { ProductProvider } from "./context/ProductContext"
import AuthProvider from "./context/AuthContext.jsx"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/index.jsx"

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <RouterProvider router={router}/>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App