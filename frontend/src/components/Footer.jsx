import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🛒 TechStore</h3>
            <p className="text-gray-400">
              Tu tienda de electrónica de confianza
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre Nosotros</li>
              <li>Términos y Condiciones</li>
              <li>Política de Privacidad</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">Email: info@techstore.com</p>
            <p className="text-gray-400">Tel: +57 300 123 4567</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 TechStore - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;