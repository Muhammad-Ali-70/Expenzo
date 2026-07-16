import axios from 'axios';
import { storage } from './storage';
import { ENV } from '../config/env';

const apiClient = axios.create({
  // baseURL: 'https://expenzo-backend-production.up.railway.app/api',
  baseURL: 'http://10.0.2.2:3000/api', // Use this for Android emulator
  // baseURL: ENV.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = storage.getString('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    const errorInfo = handleAxiosError(error);
    console.error('[API Error]', errorInfo.message);
    return Promise.reject(errorInfo);
  },
);

export const handleAxiosError = error => {
  if (error.response) {
    return {
      type: 'server',
      status: error.response.status,
      message:
        error.response.data?.message ||
        error.response.statusText ||
        'Server error',
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      type: 'network',
      status: null,
      message: 'No response from server. Check your connection.',
      data: null,
    };
  } else {
    return {
      type: 'client',
      status: null,
      message: error.message || 'Something went wrong',
      data: null,
    };
  }
};

export default apiClient;
