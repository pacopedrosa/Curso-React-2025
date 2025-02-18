import { createBrowserRouter, Navigate } from "react-router-dom"
import RootLayout from "../layout/RootLayout";
import ProductsPage from "../pages/ProductsPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateProductPage from "../pages/CreateProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import EditProductPage from "../pages/EditProductPage";
import DeleteProductPage from "../pages/DeleteProductPage";
import ErrorPage from "../pages/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace/>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "products",
                children: [
                    {
                        index: true,
                        element: <ProductsPage />
                    },
                    {
                        path: "new",
                        element: (
                            <ProtectedRoute>
                                <CreateProductPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: ":id",
                        element: <ProductDetailPage />
                    },
                    {
                        path: ":id/edit",
                        element: (
                            <ProtectedRoute>
                                <EditProductPage />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: ":id/delete",
                        element: (
                            <ProtectedRoute>
                                <DeleteProductPage />
                            </ProtectedRoute>
                        )
                    }
                ]
            }
        ]
    }
]);


