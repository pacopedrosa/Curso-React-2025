import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import LiProductList from './LiProductList';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCart, settotalCart] = useState(0);

  useEffect(() => {
    
  }, [cart])
  

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5173/src/data/db.json');
      if (!response.ok) throw new Error('Error en la petición', response.status);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error en la petición', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addCard = (product) => {
    setCart([...cart, product]);
  };

  const deleteProduct = (id) => {

  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-4">
        <h1>Lista de libros</h1>

        {/**Div para las product card */}
        <div>
          {products.map((product) => (
            //Aqui llamo al componente productCard
            <ProductCard key={product.id} product={product} addCard={addCard} />
          ))}
        </div>

        {/**Div para el UL del carrito */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Carrito de compras</h2>
          <p className="text-xl font-bold text-center mb-6">Total carrito:{totalCart}</p>
          {cart.length === 0 ? (
            <p className="text-center">No hay productos en el carrito</p>
          ) : (
            <ul>
              {cart.map((product) => (
                <LiProductList key={product.id} product={product} deleteProduct={deleteProduct} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;