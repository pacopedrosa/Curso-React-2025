import React from 'react'
import { Link, useLoaderData, useNavigation } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ProductDetail = () => {
    const { id } = useLoaderData();
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">Detalle del Producto {id}</h1>
                <p className="text-gray-700 mb-6">
                    Esta es la página de detalle del producto {id}
                </p>
                <Link to="/"className="bg-blue-500 text-white px-4 py-2 rounded">Volver a la lista</Link>
            </div>
        </div>
    );
};

export default ProductDetail