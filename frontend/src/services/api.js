import axios from 'axios';

const API_URL = 'http://localhost:3001';

// ========== PRODUCTOS ==========
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

// ========== USUARIOS ==========
export const login = async (email, password) => {
  const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
  return response.data[0]; // Retorna el primer usuario que coincida
};

export const register = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

// ========== ÓRDENES ==========
export const createOrder = async (order) => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};