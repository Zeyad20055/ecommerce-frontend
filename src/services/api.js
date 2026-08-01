// services/api.js
// Shared Axios instance: base URL, credentials (for the httpOnly JWT
// cookie), and a response interceptor that redirects to /admin/login
// on a 401 so expired sessions are handled in one place.

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheck = error.config?.url?.includes('/auth/me');
    const onAdminRoute = window.location.pathname.startsWith('/admin');
    const onLoginPage = window.location.pathname.includes('/admin/login');

    // A 401 from the silent "who am I" check just means "not logged in" —
    // that's the normal state for anonymous storefront visitors, so it
    // should never force a redirect. Only bounce to login when a 401
    // comes back while the user is actually inside the protected admin area.
    if (
      error.response?.status === 401 &&
      !isAuthCheck &&
      onAdminRoute &&
      !onLoginPage
    ) {
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
