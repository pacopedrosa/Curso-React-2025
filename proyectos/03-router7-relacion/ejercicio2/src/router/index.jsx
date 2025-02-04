import { createBrowserRouter } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import ProductDetail from "../pages/ProductDetail";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ProductsPage />
            },
            {
                path: "product/:id",
                element: <ProductDetail />,
                loader: async ({ params }) => {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula 1 segundo de carga
                    const id = parseInt(params.id);
                    if (id > 5) throw new Error("Producto no encontrado");
                    return { id };
                }
            }
        ]
    }
]);

