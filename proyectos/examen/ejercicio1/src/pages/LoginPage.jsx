import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const {login} = useAuth()

    const handleChange = (e) => {
        const {id, value} = e.target
        if(id === 'email'){
            setFormData({...formData, email: value})
        } else if(id === 'password'){
            setFormData({...formData, password: value})
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await login(formData)
            navigate('/products')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h1 className='text-center text-2xl font-bold my-4'>Login</h1>
        <form className='flex flex-col gap-4 max-w-md mx-auto py-8 border-2 border-gray-300 rounded-md p-4'>
            <input type="email" placeholder='Email' className='border-2 border-gray-300 rounded-md p-2' id="email" onChange={handleChange} value={formData.email}/>
            <input type="password" placeholder='Password' className='border-2 border-gray-300 rounded-md p-2' id="password" onChange={handleChange} value={formData.password} />
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md' onClick={handleSubmit}>Login</button>
            <p className='text-center'>No tienes una cuenta? <Link to="/register" className='text-blue-500'>Regístrate</Link></p>
        </form>
    </div>
  )
}

export default LoginPage