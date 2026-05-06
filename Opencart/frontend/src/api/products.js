// src/api/products.js

import axios from 'axios';

const productApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // points to backend
});

export const getAllProducts = async () => {
  try {
    const response = await productApi.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await productApi.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
