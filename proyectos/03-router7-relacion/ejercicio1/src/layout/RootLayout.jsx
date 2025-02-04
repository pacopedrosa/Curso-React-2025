import { Link, Outlet, useNavigate } from "react-router-dom"
import { isAuthenticated } from "../helpers/scripts";


const RootLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">

        <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                <Link to="/" className="text-gray-700 font-bold text-2xl">Home</Link>
                <Link to="/profile" className="text-gray-700 font-bold text-2xl">Profile</Link>
                <Link to="/dashboard" className="text-gray-700 font-bold text-2xl">Dashboard</Link>

                {/* boton de logout si esta logueado */}
                {
                    isAuthenticated && (
                        <button className="text-red-700 font-bold text-2xl bg-red-500 px-4 py-2 rounded-md text-white"
                        onClick={handleLogout}
                        >Logout</button>
                    )
                }
            </div>

        </div>

      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

    </div>

  )
}


export default RootLayout