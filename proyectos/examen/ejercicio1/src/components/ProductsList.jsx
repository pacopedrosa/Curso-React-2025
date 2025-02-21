import { useNavigate } from 'react-router-dom'
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
            <h1>Lista de productos</h1>
            {
                loading ? <p>Cargando</p> : 
                error ? <p>Error: {error}</p> : 
                products?.map((product) => (
                    <div key={product._id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </div>
                ))
            }
            <button onClick={handleLogout} className='bg-blue-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>logout</button>
        </>
    )
}

export default ProductList