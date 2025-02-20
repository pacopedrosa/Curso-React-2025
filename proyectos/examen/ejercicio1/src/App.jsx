import { ProductProvider } from "./context/ProductContext"
import ProductList from "./components/ProductsList.jsx"

const App = () => {
  return (
    <ProductProvider>
      <ProductList></ProductList>
    </ProductProvider>
  )
}

export default App