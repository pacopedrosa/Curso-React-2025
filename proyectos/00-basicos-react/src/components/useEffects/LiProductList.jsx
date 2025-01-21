import React from "react";

const LiProductList = (props) => {
  const { product, key } = props;
  return (
  <li 
    className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col 
    justify-between mb-10"
    key={product.id}>
    <span className="text-xl font-bold">{product.name}</span>
    <span className="text-gray-600 mb-4">{product.price}</span>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
      Eliminar
    </button>
   
  </li>);
};

export default LiProductList;