import { Form, useActionData, useNavigation } from 'react-router-dom';

const ContactForm = () => {
    // Obtenemos los datos del action (errores y valores)
    const actionData = useActionData();
    // Obtenemos el estado de navegación (para saber si está enviando)
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            {/* Si el envío fue exitoso, mostramos el mensaje */}
            {actionData?.success && (
                <div className="bg-green-100 p-4 mb-4 rounded">
                    <p className="text-green-700">¡Mensaje enviado con éxito!</p>
                </div>
            )}

            <h1 className="text-2xl font-bold mb-4">Formulario de Contacto</h1>
            
            {/* El Form de react-router maneja el envío automáticamente */}
            <Form method="post" className="space-y-4">
                {/* Campo Nombre */}
                <div>
                    <label className="block text-gray-700 mb-2">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        defaultValue={actionData?.values?.nombre}
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Si hay error en nombre, lo mostramos */}
                    {actionData?.errors?.nombre && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.nombre}</p>
                    )}
                </div>

                {/* Campo Email */}
                <div>
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={actionData?.values?.email}
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {actionData?.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>
                    )}
                </div>

                {/* Campo Asunto */}
                <div>
                    <label className="block text-gray-700 mb-2">Asunto:</label>
                    <input
                        type="text"
                        name="asunto"
                        defaultValue={actionData?.values?.asunto}
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {actionData?.errors?.asunto && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.asunto}</p>
                    )}
                </div>

                {/* Campo Mensaje */}
                <div>
                    <label className="block text-gray-700 mb-2">Mensaje:</label>
                    <textarea
                        name="mensaje"
                        defaultValue={actionData?.values?.mensaje}
                        className="border p-2 w-full h-32 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {actionData?.errors?.mensaje && (
                        <p className="text-red-500 text-sm mt-1">{actionData.errors.mensaje}</p>
                    )}
                </div>

                {/* Botón que se deshabilita durante el envío */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>
            </Form>
        </div>
    );
};

export default ContactForm; 