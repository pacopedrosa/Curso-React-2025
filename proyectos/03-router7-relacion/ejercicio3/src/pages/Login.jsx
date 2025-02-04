import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const handleLogin = () => {
        login()
        navigate('/admin')
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
            <h1 className='text-2xl font-bold mb-4 text-center'>
                Login page 
            </h1>

            <button className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors' onClick={handleLogin}>
                Iniciar sesión
            </button>
        </div>

    </div>
  )
}

export default Login