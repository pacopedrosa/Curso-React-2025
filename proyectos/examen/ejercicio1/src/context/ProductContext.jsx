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
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/api/products`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            console.log(data);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError("Error al obtener los productos");
            setLoading(false);
        }
    }

    const createProduct = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiUrl}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });
            if(!response.ok){
                throw new Error("Error al crear el producto");
            }
            const data = await response.json();
            setProducts([...products, data]);
        } catch (error) {
            setError("Error al crear el producto");
        }
    }

    const updateProduct = async (id, product) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });
            if(!response.ok){
                throw new Error("Error al actualizar el producto");
            }
            const data = await response.json();
            setProducts(products.map((p) => p._id === id ? data : p));
        }catch(err){
            setError("Error al actualizar el producto", err);
        }
    }
    const deleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if(!response.ok){
                throw new Error("Error al eliminar el producto");
            }
            const data = await response.json();
            setProducts(products.filter((p) => p._id === id ? data : p));
            
        }catch(err){
            setError("Error al eliminar el producto", err);
        }
    }
    const getProductById = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/api/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error("Error al obtener el producto");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Error al obtener el producto");
        }
    }

    return(
        <ProductContext.Provider value={{products, error, loading, createProduct, updateProduct, deleteProduct, getProductById}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext
