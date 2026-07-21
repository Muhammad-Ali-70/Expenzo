import apiClient from './apiClient';

export const createTransactionApi = async ({
  accountId,
  type,
  amount,
  category,
  description,
  note,
  date,
}) => {
  const response = await apiClient.post('/transactions', {
    accountId,
    type,
    amount,
    category,
    description,
    note,
    date,
  });
  return response.data;
};

export const getTransactionsApi = async ({
  accountId,
  categoryIds,
  type,
  month,
  year,
  dateFrom,
  dateTo,
  minAmount,
  maxAmount,
  search,
  page = 1,
  limit = 20,
} = {}) => {
  const params = { 
    accountId, 
    type, 
    month, 
    year, 
    dateFrom, 
    dateTo, 
    minAmount, 
    maxAmount, 
    search, 
    page, 
    limit 
  };

  if (categoryIds && categoryIds.length > 0) {
    params.categoryIds = categoryIds.join(',');
  }

  const response = await apiClient.get('/transactions', { params });
  return response.data;
};

export const getSingleTransactionApi = async id => {
  const response = await apiClient.get(`/transactions/${id}`);
  return response.data;
};

export const updateTransactionApi = async (id, fields) => {
  const response = await apiClient.put(`/transactions/${id}`, fields);
  return response.data;
};

export const deleteTransactionApi = async id => {
  const response = await apiClient.delete(`/transactions/${id}`);
  return response.data;
};

export const getTransactionsSummaryApi = async ({ month, year } = {}) => {
  const response = await apiClient.get('/transactions/summary', {
    params: { month, year },
  });
  return response.data;
};

export const getHomeDataApi = async ({ month, year } = {}) => {
  const response = await apiClient.get('/dashboard', {
    params: { month, year },
  });
  return response.data;
};

export const exportCSVApi = async () => {
  const response = await apiClient.get('/export/transactions/csv', {
    responseType: 'text',
    headers: { Accept: 'text/csv' },
  });
  const text = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
  return text;
};

export const exportEmailApi = async ({ dateFrom, dateTo } = {}) => {
  const response = await apiClient.post('/export/transactions/email', {
    dateFrom,
    dateTo,
  });
  return response.data;
};
