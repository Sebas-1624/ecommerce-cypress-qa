import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Verificar usuario cada vez que cambia la ruta
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
            🛒 TechStore
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>
            {/* 🐛 BUG 15: Link "Productos" redirige a home en vez de /products */}
            <Link to="/" className="hover:text-blue-200 transition">
              Productos
            </Link>
            <Link to="/cart" className="relative hover:text-blue-200 transition">
              Carrito
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">
                  👤 {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm hover:text-blue-200 transition border border-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-sm hover:text-blue-200 transition border border-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;