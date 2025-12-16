import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition duration-300"
        />
      </Link>
      
      <div className="p-4">
        <span className="text-xs text-blue-600 font-semibold uppercase">
          {product.brand}
        </span>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold mt-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          {/* 🐛 BUG 19: Precio siempre muestra $0 */}
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;