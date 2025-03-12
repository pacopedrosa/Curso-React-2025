import { useNavigate, useParams } from "react-router-dom"
import { useProducts } from "../context/ProductContext"

const DeleteProduct = () => {
    const {id} = useParams()
    const {deleteProduct} = useProducts()
    const navigate = useNavigate()

    const handleDelete = () => {
        deleteProduct(id)
    }
  return (
    <div>
        <p className="text-center">¿Estás seguro de querer eliminar este producto?</p>
        <button className="bg-red-500 text-white p-2 rounded-md mx-auto block w-fit my-4" onClick={handleDelete}>Eliminar</button>
        <button className="bg-blue-500 text-white p-2 rounded-md mx-auto block w-fit my-4" onClick={() => navigate('/products')}>Cancelar</button>
    </div>
  )
}

export default DeleteProduct