import React from 'react'

const LiProductList = (props) => {
    const {products, key} = props
  return (
    <li key={key} className='text-gray-600 mb-2 bg-white p-4 rounded-lg shadow-md'>{products.name}, {products.price}
    <span className='text-gray-600 mb-2'>{products.price}</span>
    <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => addToCart(product)}>Agregar al carrito</button>
    <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => removeFromCart(product)}>Eliminar del carrito</button>
    </li>
  )
}

export default LiProductList