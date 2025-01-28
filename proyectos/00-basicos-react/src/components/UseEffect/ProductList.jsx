import { useState, useEffect } from 'react'
import ProductCard2 from './ProductCard2'

const ProductList = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product])
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    const fetchProducts = async () => {
        try {
            const response = await fetch('/src/Data/db2.json')
            if (!response.ok) {
                throw new Error('Error al obtener los productos')
            }
            const data = await response.json()
            setProducts(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener los productos:', error)
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )

    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
            <h1 className='text-4xl font-bold text-center text-indigo-800 mb-8 drop-shadow-lg'>Lista de Productos</h1>
            
            {/* Grid de productos */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((product) => (
                    <ProductCard2 
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </div>

            {/* Carrito */}
            <div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-indigo-800 mb-4'>Carrito de Compras</h2>
                <p className='text-gray-600 mb-4'>Total: ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}</p>
                <div className='space-y-2'>
                    {cart.map((product) => (
                        <div key={product.id} className='flex justify-between items-center bg-gray-50 p-3 rounded'>
                            <span>{product.name}</span>
                            <div className='flex items-center gap-4'>
                                <span>${product.price}</span>
                                <button 
                                    onClick={() => removeFromCart(product.id)}
                                    className='text-red-500 hover:text-red-700'
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList