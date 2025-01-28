const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-4">
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Dashboard
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Usuarios
            </button>
            <button className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Configuración
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
