import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
        <nav className='flex justify-center items-center gap-4 bg-red-500 py-4'>
            <NavLink to={"/"} className="text-2xl font-bold text-white">Home</NavLink>
            <NavLink to={"/favorites"} className="text-2xl font-bold text-white">Favorites</NavLink>
            <NavLink to={"/search"} className="text-2xl font-bold text-white">Search</NavLink>
            <NavLink to={"/about"} className="text-2xl font-bold text-white">About</NavLink>
        </nav>
  )
}

export default NavBar