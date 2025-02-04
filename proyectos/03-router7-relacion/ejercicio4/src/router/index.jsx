import { createBrowserRouter } from "react-router-dom";
import ContactForm from "../pages/ContactForm";
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
                element: <ContactForm />,
                action: async ({ request }) => {
                    const formData = await request.formData();
                    const data = Object.fromEntries(formData);
                    const errors = {};

                    // Validaciones
                    if (!data.nombre) errors.nombre = "El nombre es requerido";
                    if (!data.email) errors.email = "El email es requerido";
                    if (!data.email?.includes("@")) errors.email = "Email no válido";
                    if (!data.asunto) errors.asunto = "El asunto es requerido";
                    if (!data.mensaje) errors.mensaje = "El mensaje es requerido";
                    if (data.mensaje?.length < 20) errors.mensaje = "El mensaje debe tener al menos 20 caracteres";

                    // Si hay errores, los devolvemos
                    if (Object.keys(errors).length > 0) {
                        return { errors, values: data };
                    }

                    // Si todo está bien, simulamos un envío exitoso
                    return { success: true };
                }
            }
        ]
    }
]);
