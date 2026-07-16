import apiClient from './apiClient';

export const getNotificationsApi = async ({ page = 1, limit = 20, unreadOnly = false } = {}) => {
  const response = await apiClient.get('/notifications', {
    params: { page, limit, unreadOnly },
  });
  return response.data;
};

export const getUnreadCountApi = async () => {
  const response = await apiClient.get('/notifications/unread-count');
  return response.data;
};

export const markAsReadApi = async (id) => {
  const response = await apiClient.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsReadApi = async () => {
  const response = await apiClient.patch('/notifications/read-all');
  return response.data;
};
