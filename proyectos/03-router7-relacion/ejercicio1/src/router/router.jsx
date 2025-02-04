//proteccion de rutas a traves de uun componente isando la funcion isAuthenticated()

import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import RootLayout from "../layout/rootLayout";
import { isAuthenticated } from "../helpers/scripts";



const ProtectedRoute = ({ children }) => {
    //condicion de autenticacion
    if (!isAuthenticated()) {
        return <Navigate to="/" replace={true} />
    }
    return children;
}




export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true, //esto significa que es la ruta por defecto
                element: <Home />
            },
            {
                
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )

            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]
    }
])
