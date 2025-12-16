import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // 🐛 BUG 6 y 8: Búsqueda no funciona bien (busca en campo equivocado y es case-sensitive)
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.brand.includes(searchTerm) // BUG 6: Busca en 'brand' en vez de 'name'
        // BUG 8: Quitamos .toLowerCase() para que sea case-sensitive
      );
    }

    // 🐛 BUG 7: Filtro de categoría "laptops" muestra phones
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'laptops') {
        filtered = filtered.filter(product => product.category === 'phones'); // BUG: laptops muestra phones
      } else {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }

    // ✅ CORREGIDO: BUG 9 - Ahora muestra todos los productos cuando la categoría es "all"
    // COMENTADO: if (selectedCategory === 'all') {
    //   filtered = filtered.slice(0, 3); // BUG: Muestra solo los primeros 3 productos
    // }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros Productos</h1>

      {/* Filtros */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filtro de categoría */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas las categorías</option>
          <option value="laptops">Laptops</option>
          <option value="phones">Celulares</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>

      {/* Resultados */}
      <div className="mb-4 text-gray-600">
        Mostrando {filteredProducts.length} productos
      </div>

      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default Products;