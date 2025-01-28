const NavUser = () => {
    return (
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold">Panel de Administración</span>
          <div className="flex items-center gap-4">
            <span>Admin</span>
            <button className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default NavUser