import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_URL}/items?q=${query}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/items/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/create`, productData);
  return response.data;
};