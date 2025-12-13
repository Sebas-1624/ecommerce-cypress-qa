import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { formatPrice, generateOrderNumber, isValidEmail } from '../utils/helpers';

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'credit-card'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const order = {
        orderNumber: generateOrderNumber(),
        customer: formData,
        items: cart,
        total: getTotal(),
        date: new Date().toISOString(),
        status: 'pending'
      };

      await createOrder(order);
      setOrderNumber(order.orderNumber);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar la orden');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderNumber) {
    navigate('/cart');
    return null;
  }

  if (orderNumber) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-4">¡Orden Confirmada!</h2>
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Tu orden ha sido procesada exitosamente.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Número de Orden:</p>
            <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Información de Envío</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Nombre Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Teléfono *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Dirección *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Ciudad *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <h2 className="text-2xl font-bold mb-4">Método de Pago</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={formData.paymentMethod === 'credit-card'}
                  onChange={handleChange}
                  className="mr-2"
                />
                💳 Tarjeta de Crédito
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit-card"
                  checked={formData.paymentMethod === 'debit-card'}
                  onChange={handleChange}
                  className="mr-2"
                />
                💳 Tarjeta de Débito
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                  className="mr-2"
                />
                💵 Efectivo
              </label>
            </div>
          </form>
        </div>

        {/* Resumen */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Resumen de Orden</h2>
            
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mb-6">
              <div className="flex justify-between text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-blue-600">
                  {formatPrice(getTotal())}
                </span>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Procesando...' : 'Confirmar Orden'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;