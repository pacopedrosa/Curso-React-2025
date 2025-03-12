import { Link, useParams } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { useEffect, useState } from "react"

const ProductDetail = () => {
    const {id} = useParams()
    const {getProductById} = useProducts()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            const product = await getProductById(id)
            setProduct(product)
        }
        fetchProduct()
    }, [id])


  return (
    <div>
        {
            product && (
                <div className="border-2 border-gray-300 rounded-md p-2">
                    <h1 className="text-2xl font-bold text-center my-4">{product.name}</h1>
                    <p className="text-sm text-center my-4">descripcion: {product.description}</p>
                    <p className="text-sm text-center my-4">Precio: {product.price}</p>
                    <p className="text-sm text-center my-4">Stock: {product.stock}</p>
                    <Link to={"/products"} className="bg-green-500 text-white p-2 rounded-md mx-auto block w-fit my-4">Volver</Link>
                </div>
            )
        }
    </div>
  )
}

export default ProductDetail