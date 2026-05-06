// src/api/payments.js

import axios from 'axios';
import { API_BASE_URLS } from '../utils/config';

const paymentApi = axios.create({
  baseURL: API_BASE_URLS.payment,
});

export const processPayment = async (paymentDetails) => {
  try {
    const response = await paymentApi.post('/payments', paymentDetails);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
