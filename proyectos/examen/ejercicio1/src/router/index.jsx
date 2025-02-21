import { createBrowserRouter, Navigate } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import RootLayout from "../layout/RootLayout"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ProtectedRoute from "../components/ProtectedRoute"
import ProductsPage from "../pages/ProductsPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace/>
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "products",
                element:(
                  <ProtectedRoute>
                    <ProductsPage />
                  </ProtectedRoute>
                )
            }
        ]
    }
])
