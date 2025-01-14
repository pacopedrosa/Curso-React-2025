import { useState } from "react"
import  { ToastContainer, toast } from 'react-toastify';

const stateInital= {
    nombre: '',
    email: '',
    password: ''
}

const RegistrarFormulario = () => {
    
    const [formData, setFormData] = useState(stateInital)

    const handleOnSubmit = (e) => {
        e.preventDefault();

        //validacion basica
        if(formData.nombre.trim() === '' || formData.email.trim() === '' || formData.password.trim() === ''){
            toast.error('Todos los campos son obligatorios')
            return
        }
        toast.success(`Usuario registrado con exito con el nombre: ${formData.nombre}`)
        //Reiniciamos el formulario a su valor inicial
        setFormData(stateInital)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

  return (
    <>
    <div className="max-w-md mx-auto p-6">
        <ToastContainer />
        <form className="p-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleOnSubmit}
        >
            <h2 className="text-xl font-bold text-center text-green-700 mb-4">Registrar usuario</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border"
                    placeholder="Ingrese su nombre"
                ></input>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border"
                    placeholder="Ingrese su email"
                ></input>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">password</label>
                <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border"
                    placeholder="Ingrese su passsword"
                ></input>
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
            >Enviar</button>
        </form>
    </div>
    </>
  )
}

export default RegistrarFormulario