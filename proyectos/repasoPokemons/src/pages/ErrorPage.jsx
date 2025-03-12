import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-2xl">La página que buscas no existe</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700">Volver al inicio</Link>
    </div>
  )
}

export default ErrorPage