import apiClient from './apiClient';

export const signupApi = async ({ name, email, password }) => {
  const response = await apiClient.post('/auth/signup', {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginApi = async ({ email, password }) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const getMeApi = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const forgotPasswordApi = async ({ email }) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifyOtpApi = async ({ email, otp }) => {
  const response = await apiClient.post('/auth/verify-otp', { email, otp });
  return response.data;
  // returns { message, resetToken }
};

export const resetPasswordApi = async ({ resetToken, newPassword }) => {
  const response = await apiClient.post('/auth/reset-password', {
    resetToken,
    newPassword,
  });
  return response.data;
};

export const verifySignupOtpApi = async ({ email, otp }) => {
  const response = await apiClient.post('/auth/verify-signup-otp', {
    email,
    otp,
  });
  return response.data;
};

export const resendSignupOtpApi = async ({ email }) => {
  const response = await apiClient.post('/auth/resend-signup-otp', { email });
  return response.data;
};
