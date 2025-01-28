const ProductCard2 = ({ product, addToCart, removeFromCart }) => {
  return (
      <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300'>
          <div className='p-4'>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  {product.name}
              </h3>
              <p className='text-gray-600 mb-2'>
                  ${product.price}
              </p>
              <div className='flex flex-wrap gap-2 mb-4'>
                  {product.tags && product.tags.map((tag, index) => (
                      <span
                          key={index}
                          className='px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded-full'
                      >
                          {tag}
                      </span>
                  ))}
              </div>
              <div className='flex justify-between items-center'>
                  <button 
                      onClick={() => addToCart(product)}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'
                  >
                      Añadir al carrito
                  </button>
                  <button 
                      onClick={() => removeFromCart(product.id)}
                      className='text-gray-500 hover:text-red-500 transition-colors duration-300'
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                  </button>
              </div>
          </div>
      </div>
  )
}

export default ProductCard2