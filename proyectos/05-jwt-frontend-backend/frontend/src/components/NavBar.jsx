import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth()
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">Mi Aplicación</Link>

          <div>
            <Link to="/" className="text-gray-700 hover:text-blue-500 mr-4">Inicio</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-500 mr-4">Iniciar Sesión</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500 mr-4">Registrarse</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
          </div>
        </div>

      </div>
      
    </nav>
  )
}

export default NavBar