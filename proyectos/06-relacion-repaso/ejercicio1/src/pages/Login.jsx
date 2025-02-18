import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await login(formData)
            navigate("/products")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="container flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login