import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'
import { ReviewsProvider } from '../contexts/ReviewsContext'
import { useAuth } from '../contexts/AuthContext'

const RootLayoutContent = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-blue-900 text-white shadow-lg'>
        <div className='mx-w-7xl mx-auto px-4'>
          <div className='flex justify-between h-16'>
            <div className='flex items-center'>
              <NavLink to="/" className="text-lg font-bold">VideoClub</NavLink>
              <div className='flex space-x-4 ml-10'>
                <NavLink to="/movies" className="hover:text-amber-600">Películas</NavLink>
                <NavLink to="/search" className="hover:text-amber-600">Buscar</NavLink>
                <NavLink to="/favorites" className="hover:text-amber-600">Favoritos</NavLink>
                <NavLink to="/reviews" className="hover:text-amber-600">Reseñas</NavLink>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout}
                  className="hover:text-amber-600"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="hover:text-amber-600">Iniciar Sesión</NavLink>
                  <NavLink to="/register" className="hover:text-amber-600">Registrarse</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <Outlet />
      </main>
      <footer className='bg-sky-950 text-white text-center p-4 mt-auto'>
        <div className='mx-auto max-w-7xl px-4 py-6'>
          <p className='text-center'>VideoClub 2025 ©</p>
        </div>
      </footer>
    </div>
  );
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ReviewsProvider>
          <RootLayoutContent />
        </ReviewsProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default RootLayout