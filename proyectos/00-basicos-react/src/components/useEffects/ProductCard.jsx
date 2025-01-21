
const ProductCard = (props) => {
  const { product, addCard } = props

  const handleClick = () => {
    addCard(product)
  }
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between">
      <h2 className="text-xl font-bold ">
        {product.name}
        <p className="text-gray-600 mb-4">{product.price}</p>
        <button className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300"
        onClick={handleClick}>añadir al carrito</button>
      </h2>
    </div>
  )
}

export default ProductCard