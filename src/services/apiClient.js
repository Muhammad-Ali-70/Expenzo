import axios from 'axios';
import { storage } from './storage';
import { ENV } from '../config/env';

// Resolved from APP_ENV in .env (android-emulator / development / production-onrender).
// Changing .env requires restarting Metro with --reset-cache.
const apiClient = axios.create({
  baseURL: ENV.BASE_URL,
  // Render's free tier spins the server down when idle; the first request
  // after a cold start can take 20-30s to wake it back up.
  timeout: 30000,
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

    // Expired/invalid session: clear local auth so the app returns to the
    // login screen instead of silently failing every request.
    // (Guarded on a stored token so failed logins don't trigger it.)
    if (errorInfo.status === 401 && storage.getString('token')) {
      // Lazy require to avoid a circular import at module init
      const useAuthStore = require('../store/useAuthStore').default;
      useAuthStore.getState().logout();
    }

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
