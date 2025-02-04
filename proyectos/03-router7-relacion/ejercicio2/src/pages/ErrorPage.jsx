import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Error 404</h1>
                <p className="text-red-500 mb-4">La página que buscas no existe</p>
                <Link to="/" className="text-blue-500 hover:underline">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;