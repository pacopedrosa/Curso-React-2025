import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    //Contenedor principal
    <div className='min-h-screen bg-gray-100'>
        <nav className='bg-blue-900 text-white shadow-lg'>
            <div className='mx-w-7xl mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    {/* seccion izquierda */}

                    <div className='flex items-center'>
                        {/*Titulos*/}
                        <NavLink to="/" className="text-lg font-bold">VideoClub</NavLink>
                        {isAuthenticated && (
                            <div className='flex space-x-4 ml-10'>
                                <NavLink to="/movies" className="hover:text-amber-600">Películas</NavLink>
                                <NavLink to="/search" className="hover:text-amber-600">Buscar</NavLink>
                                <NavLink to="/favorites" className="hover:text-amber-600">Favoritos</NavLink>
                                <NavLink to="/reviews" className="hover:text-amber-600">Reseñas</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        {/* Contenido principal */}
        <main className='max-w-7xl mx-auto px-4 py-6'>
            <Outlet />
        </main>
        <footer className='bg-sky-950 text-white text-center p-4 mt-auto'>
            <div className='mx-auto max-w-7xl px-4 py-6'>
                <p className='text-center'>VideoClub 2025 ©</p>
            </div>
        </footer>
    </div>
  )
}

export default RootLayout