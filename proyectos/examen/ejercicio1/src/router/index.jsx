import { createBrowserRouter, Navigate } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import RootLayout from "../layout/RootLayout"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ProtectedRoute from "../components/ProtectedRoute"
import ProductsPage from "../pages/ProductsPage"
import { DashboardPage } from "../pages/DashboardPage"
import CreateProductPage from "../pages/CreateProductPage"
import EditProductPage from "../pages/EditProductPage"
import DeleteProduct from "../pages/DeleteProduct"
import ProductDetail from "../pages/ProductDetail"

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
                ),
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )

            },
            {
                path: "create-product",
                element: (
                    <ProtectedRoute>
                        <CreateProductPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "product/:id",
                element: (
                    <ProtectedRoute>
                        <EditProductPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "delete-product/:id",
                element: (
                    <ProtectedRoute>
                        <DeleteProduct />
                    </ProtectedRoute>
                )
            },
            {
                path: "productDetails/:id",
                element: (
                    <ProtectedRoute>
                        <ProductDetail />
                    </ProtectedRoute>
                )
            }
        ]
    }
])
