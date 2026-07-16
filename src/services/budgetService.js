import apiClient from './apiClient';

export const getCurrentBudgetApi = async () => {
  const response = await apiClient.get('/budgets/current');
  return response.data;
};

export const getBudgetApi = async ({ month, year }) => {
  const response = await apiClient.get('/budgets', {
    params: { month, year },
  });
  return response.data;
};

export const saveBudgetApi = async ({ month, year, totalLimit, categoryLimits }) => {
  const response = await apiClient.post('/budgets', {
    month,
    year,
    totalLimit,
    categoryLimits,
  });
  return response.data;
};

export const getBudgetTemplatesApi = async (totalBudget) => {
  const response = await apiClient.get('/budgets/templates', {
    params: { totalBudget },
  });
  return response.data;
};

export const getYearSummaryApi = async (year) => {
  const response = await apiClient.get(`/budgets/year/${year}`);
  return response.data;
};

export const deleteBudgetApi = async (id) => {
  const response = await apiClient.delete(`/budgets/${id}`);
  return response.data;
};
