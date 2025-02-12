import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <NavBar />
      <main className='container mx-auto px-4 py-8'>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout