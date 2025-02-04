import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "admin",

                element: (
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    }
                ]

            }
        ]
    }
])
