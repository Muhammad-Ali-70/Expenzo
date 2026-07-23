import apiClient from './apiClient';

export const createInvestmentApi = async payload => {
  const response = await apiClient.post('/investments', payload);
  return response.data;
};

export const getInvestmentsApi = async ({ status, page = 1, limit = 20 } = {}) => {
  const response = await apiClient.get('/investments', {
    params: { status, page, limit },
  });
  return response.data;
};

export const getInvestmentByIdApi = async id => {
  const response = await apiClient.get(`/investments/${id}`);
  return response.data;
};

export const updateInvestmentApi = async (id, fields) => {
  const response = await apiClient.put(`/investments/${id}`, fields);
  return response.data;
};

export const approveReturnApi = async (investmentId, returnId) => {
  const response = await apiClient.post(`/investments/${investmentId}/returns/${returnId}/approve`);
  return response.data;
};

export const rejectReturnApi = async (investmentId, returnId, action) => {
  const response = await apiClient.post(`/investments/${investmentId}/returns/${returnId}/reject`, { action });
  return response.data;
};

export const getInvestmentSummaryApi = async () => {
  const response = await apiClient.get('/investments/summary');
  return response.data;
};
