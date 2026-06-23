import apiClient from './apiClient';

// GET /api/debts
export const getDebtsApi = async ({
  debtType,
  status,
  search,
  page = 1,
  limit = 10,
} = {}) => {
  const response = await apiClient.get('/debts', {
    params: { debtType, status, search, page, limit },
  });
  return response.data;
};

// GET /api/debts/summary
export const getDebtSummaryApi = async () => {
  const response = await apiClient.get('/debts/summary');
  return response.data;
};

// GET /api/debts/overdue
export const getOverdueDebtsApi = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/debts/overdue', {
    params: { page, limit },
  });
  return response.data;
};

// GET /api/debts/upcoming
export const getUpcomingDebtsApi = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/debts/upcoming', {
    params: { page, limit },
  });
  return response.data;
};

// GET /api/debts/:id
export const getDebtByIdApi = async id => {
  const response = await apiClient.get(`/debts/${id}`);
  return response.data;
};

// POST /api/debts
export const createDebtApi = async ({
  debtType,
  counterpartyName,
  counterpartyEmail,
  description,
  totalAmount,
  interestRate,
  interestType,
  interestFrequency,
  startDate,
  dueDate,
  category,
  reminderDaysBefore,
  reminderFrequency,
  reminderChannels,
  notes,
  attachments,
}) => {
  const response = await apiClient.post('/debts', {
    debtType,
    counterpartyName,
    counterpartyEmail,
    description,
    totalAmount,
    interestRate,
    interestType,
    interestFrequency,
    startDate,
    dueDate,
    category,
    reminderDaysBefore,
    reminderFrequency,
    reminderChannels,
    notes,
    attachments,
  });
  return response.data;
};

// PUT /api/debts/:id
export const updateDebtApi = async (id, updates) => {
  const response = await apiClient.put(`/debts/${id}`, updates);
  return response.data;
};

// PATCH /api/debts/:id/pay
export const recordPaymentApi = async (
  id,
  { paymentAmount, accountId, note, notifyCounterparty = false },
) => {
  const response = await apiClient.patch(`/debts/${id}/pay`, {
    paymentAmount,
    accountId,
    note,
    notifyCounterparty,
  });
  return response.data;
};

// POST /api/debts/:id/settle
export const settleDebtApi = async (
  id,
  { finalPaymentAmount, accountId, note } = {},
) => {
  const response = await apiClient.post(`/debts/${id}/settle`, {
    finalPaymentAmount,
    accountId,
    note,
  });
  return response.data;
};

// POST /api/debts/:id/send-reminder
export const sendDebtReminderApi = async id => {
  const response = await apiClient.post(`/debts/${id}/send-reminder`);
  return response.data;
};

// DELETE /api/debts/:id
export const deleteDebtApi = async id => {
  const response = await apiClient.delete(`/debts/${id}`);
  return response.data;
};
