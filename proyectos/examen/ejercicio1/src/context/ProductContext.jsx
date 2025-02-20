import { createContext, useContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

const ProductContext = createContext()

// Mover el hook useProducts fuera del ProductProvider
export const useProducts = () => {
    const context = useContext(ProductContext)
    if(!context){
        throw new Error("useProducts debe ser usado dentro de un ProductProvider")
    }
    return context
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/products`)
            if(!response.ok){
                throw new Error("Error al obtener los productos")
            }
            const data = await response.json()
            setProducts(data)
            setLoading(false)
        } catch (error) {
            setError("Error al obtener los productos")
            setLoading(false)
        }
    }

    return(
        <ProductContext.Provider value={{products, error, loading}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext
