import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // 🐛 BUG 4: Eliminar producto del carrito - elimina TODO
  const removeFromCart = (productId) => {
    setCart([]); // BUG: Vacía todo el carrito en vez de eliminar solo uno
  };

  // 🐛 BUG 3: Actualizar cantidad - permite negativos
  const updateQuantity = (productId, quantity) => {
    // BUG: Comenté la validación de cantidad <= 0
    // if (quantity <= 0) {
    //   removeFromCart(productId);
    //   return;
    // }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  // 🐛 BUG 2: Limpiar carrito - no funciona
  const clearCart = () => {
    // setCart([]); // BUG: Comenté la línea que vacía el carrito
    console.log('Intentando vaciar carrito...');
  };

  // 🐛 BUG 1: Calcular total - multiplica por 1.5 extra
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity * 1.5), 0); // BUG: Multiplica por 1.5
  };

  // 🐛 BUG 5: Obtener cantidad total de items - siempre retorna 0
  const getCartCount = () => {
    return 0; // BUG: Siempre retorna 0 en vez de contar items
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};