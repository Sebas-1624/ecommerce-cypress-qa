// Formatear precio en pesos colombianos
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(price);
};

// Validar email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Generar número de orden aleatorio
export const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `ORD-${year}-${random}`;
};

// Truncar texto
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};