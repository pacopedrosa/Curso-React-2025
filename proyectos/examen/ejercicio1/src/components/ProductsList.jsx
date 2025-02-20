import { useProducts } from '../context/ProductContext.jsx'

const ProductList = () => {
    const { products, error, loading } = useProducts()
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
        </>
    )
}

export default ProductList