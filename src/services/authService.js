// services/authService.js
// Thin wrapper around the /api/auth endpoints.

import api from './api';

export const loginAdmin = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data; // { admin, token }
};

export const logoutAdmin = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const fetchMe = async () => {
  const { data } = await api.get('/auth/me');
  return data.data;
};
