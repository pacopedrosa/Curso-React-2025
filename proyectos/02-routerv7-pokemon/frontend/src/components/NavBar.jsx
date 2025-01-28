import { NavLink } from "react-router-dom"
import { ROUTES } from "../routes/paths"
import { useState } from "react"

const NavBar = () => {
    const [isActive, setIsActive] = useState()
  return (
  <>
    <nav className="bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg">  
        {/* Buscar un icono */}
        <div className="container flex mx-auto p-4 justify-between items-center">
        <NavLink to={ROUTES.HOME} className="text-white text-2xl font-bold">POKEDEX</NavLink> 
        </div>
        <div className="space-x-4">
        <NavLink to={ROUTES.HOME} className="text-white text-2xl font-bold">INICIO</NavLink> 
        <NavLink to={ROUTES.FAVORITES} className="text-white text-2xl font-bold">FAVORITOS</NavLink> 
        <NavLink to={ROUTES.SEARCH} className="text-white text-2xl font-bold">BUSCAR</NavLink> 
        <NavLink to={ROUTES.ABOUT } className="text-white text-2xl font-bold">ABOUT</NavLink> 
        </div>
    </nav>
  </>
  )
}

export default NavBar