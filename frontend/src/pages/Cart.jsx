import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">¡Agrega algunos productos para empezar!</p>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-4 border-b last:border-b-0"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{formatPrice(item.price)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-lg">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-red-600 hover:text-red-800"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Resumen</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-600">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Proceder al Pago
            </button>

            <Link
              to="/products"
              className="block text-center mt-4 text-blue-600 hover:text-blue-800"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;