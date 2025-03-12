import { useNavigate, useParams } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { useState } from "react"

const EditProductPage = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: 0
    })
    const {updateProduct} = useProducts()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {id, value} = e.target
        if(id === 'name'){
            setFormData({...formData, name: value})
        } else if(id === 'description'){
            setFormData({...formData, description: value})
        }else if(id === 'price'){
            setFormData({...formData, price: value})
        }else if(id === 'stock'){
            setFormData({...formData, stock: value})
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await updateProduct(id, formData)
        navigate('/products')
    }
  return (
    <div>
        <h1>Editar producto</h1>
        <form>
            <input type="text" placeholder="Nombre" name="name" id="name" value={formData.name} onChange={handleChange} className="border-2 border-gray-300 rounded-md p-2" />
            <input type="text" placeholder="Descripción" name="description" id="description" value={formData.description} onChange={handleChange} className="border-2 border-gray-300 rounded-md p-2" />
            <input type="number" placeholder="Precio" name="price" id="price" value={formData.price} onChange={handleChange} className="border-2 border-gray-300 rounded-md p-2" />
            <input type="number" placeholder="Stock" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="border-2 border-gray-300 rounded-md p-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" onClick={handleSubmit}>Editar</button>
            <button type="button" className="bg-red-500 text-white p-2 rounded-md" onClick={() => navigate('/products')}>Cancelar</button>
        </form>
    </div>
  )
}

export default EditProductPage