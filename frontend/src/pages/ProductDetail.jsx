import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Información */}
        <div>
          <span className="text-sm text-blue-600 font-semibold uppercase">
            {product.brand}
          </span>
          
          <h1 className="text-4xl font-bold mt-2 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-2xl">★ {product.rating}</span>
            <span className="text-gray-500 ml-2">({product.rating}/5)</span>
          </div>

          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
            </div>
            
            <div className="mt-4">
              <span className={`text-sm ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
              </span>
            </div>
          </div>

          {/* Cantidad */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Cantidad:</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-lg font-bold text-white text-lg transition ${
              product.stock > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;