import apiClient from './apiClient';

export const getCategoriesApi = async ({ type, includeArchived } = {}) => {
  const response = await apiClient.get('/categories', {
    params: { type, includeArchived },
  });
  return response.data;
};

export const createCategoryApi = async ({
  name,
  type,
  iconName,
  iconBg,
  iconColor,
}) => {
  const response = await apiClient.post('/categories', {
    name,
    type,
    iconName,
    iconBg,
    iconColor,
  });
  return response.data;
};

export const updateCategoryApi = async (id, fields) => {
  const response = await apiClient.put(`/categories/${id}`, fields);
  return response.data;
};

export const deleteCategoryApi = async id => {
  const response = await apiClient.delete(`/categories/${id}`);
  return response.data;
};
