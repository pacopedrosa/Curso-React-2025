import { Link } from 'react-router-dom'
import ProductList from '../components/ProductsList'

const ProductsPage = () => {
  return (
    <div>
        <ProductList />
        <Link to="/create-product" className='bg-blue-500 text-white p-2 rounded-md mx-auto block w-fit my-4'>Crear producto</Link>
    </div>
  )
}

export default ProductsPage