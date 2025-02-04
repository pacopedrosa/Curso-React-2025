import React from 'react'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Producto 1</h2>
          <Link 
            to="/product/1"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ver detalles
          </Link>
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Producto 2</h2>
          <Link 
            to="/product/2"
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage