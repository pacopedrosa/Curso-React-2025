import { useNavigate } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { useState } from "react"

const CreateProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: 0
    })
    const {createProduct} = useProducts()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createProduct(formData)
        navigate('/products')
    }
    const handleChange = (e) => {
        const {id, value} = e.target
        if(id === 'name'){
            setFormData({...formData, name: value})
        } else if(id === 'description'){
            setFormData({...formData, description: value})
        } else if(id === 'price'){
            setFormData({...formData, price: value})
        } else if(id === 'stock'){
            setFormData({...formData, stock: value})
        }
    }
  return (
    <div>
        <h1>Crear producto</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" name="name" id="name" onChange={handleChange} value={formData.name} />
            <input type="text" placeholder="Descripción" name="description" id="description" onChange={handleChange} value={formData.description} />
            <input type="number" placeholder="Precio" name="price" id="price" onChange={handleChange} value={formData.price} />
            <input type="number" placeholder="Stock" name="stock" id="stock" onChange={handleChange} value={formData.stock} />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" onClick={handleSubmit}>Crear</button>
        </form>
    </div>
  )
}

export default CreateProductPage