import apiClient from './apiClient';

// GET /api/accounts
export const getAccountsApi = async type => {
  const params = type ? { type } : {};
  const response = await apiClient.get('/accounts', { params });
  return response.data;
};

// POST /api/accounts/seed  (onboarding bulk create)
export const seedAccountsApi = async ({ accounts }) => {
  const response = await apiClient.post('/accounts/seed', { accounts });
  return response.data;
};

// POST /api/accounts
export const createAccountApi = async accountData => {
  const response = await apiClient.post('/accounts', accountData);
  return response.data;
};

// PUT /api/accounts/:id
export const updateAccountApi = async (id, updates) => {
  const response = await apiClient.put(`/accounts/${id}`, updates);
  return response.data;
};

// PATCH /api/accounts/:id/balance
export const updateBalanceApi = async (id, balance) => {
  const response = await apiClient.patch(`/accounts/${id}/balance`, {
    balance,
  });
  return response.data;
};

// DELETE /api/accounts/:id
export const deleteAccountApi = async id => {
  const response = await apiClient.delete(`/accounts/${id}`);
  return response.data;
};

// POST /api/accounts/transfer
export const transferFundsApi = async ({ fromAccountId, toAccountId, amount, description }) => {
  const response = await apiClient.post('/accounts/transfer', {
    fromAccountId,
    toAccountId,
    amount,
    description,
  });
  return response.data;
};
