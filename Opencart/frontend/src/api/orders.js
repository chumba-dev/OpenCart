// src/api/orders.js

import axios from 'axios';
import { API_BASE_URLS } from '../utils/config';

const orderApi = axios.create({
  baseURL: API_BASE_URLS.order,
});

export const getAllOrders = async () => {
  try {
    const response = await orderApi.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (order) => {
  try {
    const response = await orderApi.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
