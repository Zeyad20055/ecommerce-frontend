// services/productService.js
// Thin wrapper around the /api/products endpoints, including the
// multipart/form-data calls used for create/update with image upload.

import api from './api';

export const getProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data; // { success, message, data: [...], meta: {...} }
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
};

export const getProductStats = async () => {
  const { data } = await api.get('/products/stats/summary');
  return data.data;
};

const toFormData = (product) => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    if (key === 'image') {
      if (value instanceof File) formData.append('image', value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const createProduct = async (product) => {
  const { data } = await api.post('/products', toFormData(product), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, toFormData(product), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
