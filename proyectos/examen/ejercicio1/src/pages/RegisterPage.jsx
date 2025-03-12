import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const {register} = useAuth()

    const handleChange = (e) => {
        const {id, value, name} = e.target
        if(id === 'name'){
            setFormData({...formData, name: value})
        } else if(id === 'email'){
            setFormData({...formData, email: value})
        } else if(id === 'password'){
            setFormData({...formData, password: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(formData)
        navigate('/login')
    }
  return (
    <div>
        <h1 className='text-center text-2xl font-bold my-4'>Register</h1>
        <form className='flex flex-col gap-4 max-w-md mx-auto py-8 border-2 border-gray-300 rounded-md p-4'>
            <input type="text" placeholder='Name' className='border-2 border-gray-300 rounded-md p-2' id="name" onChange={handleChange} value={formData.name} required/>
            <input type="email" placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' id="email" onChange={handleChange} value={formData.email} required/>
            <input type="password" placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' id="password" onChange={handleChange} value={formData.password} required/>
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md' onClick={handleSubmit}>Register</button>
            <p className='text-center'>Ya tienes una cuenta? <Link to="/login" className='text-blue-500'>Inicia sesión</Link></p>
        </form>
    </div>
  )
}


export default RegisterPage