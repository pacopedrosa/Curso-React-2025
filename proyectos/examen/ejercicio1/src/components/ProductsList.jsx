import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const ProductList = ({children}) => {
    const { products, error, loading } = useProducts()
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            <h1 className='text-2xl font-bold text-center my-4' >Lista de productos</h1>
            {
                loading ? <p>Cargando</p> : 
                error ? <p>Error: {error}</p> : 
                products?.map((product) => (
                    <div key={product._id} className='border-2 border-gray-300 rounded-md p-2'>
                        <h2 className='text-lg font-bold'>  nombre: {product.name}</h2>
                        <p className='text-sm'>descripcion: {product.description}</p>
                        <p className='text-sm'>precio: {product.price}</p>
                        <p className='text-sm'>stock: {product.stock}</p>
                        <Link to={`/product/${product._id}`} className='bg-blue-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>Editar</Link>
                        <Link to={`/delete-product/${product._id}`} className='bg-red-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>Eliminar</Link>
                        <Link to={`/productDetails/${product._id}`} className='bg-green-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>Ver detalles</Link>
                        <Link to={`/dashboard`} className='bg-green-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>Dashboard</Link>
                    </div>
                ))
            }
            <button onClick={handleLogout} className='bg-blue-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>logout</button>
        </>
    )
}

export default ProductList