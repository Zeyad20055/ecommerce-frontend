// services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-lilac-one.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة التوكن مع كل Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheck = error.config?.url?.includes("/auth/me");

    const onAdminRoute = window.location.pathname.startsWith(
      "/ecommerce-frontend/admin"
    );

    const onLoginPage = window.location.pathname.includes(
      "/ecommerce-frontend/admin/login"
    );

    if (
      error.response?.status === 401 &&
      !isAuthCheck &&
      onAdminRoute &&
      !onLoginPage
    ) {
      window.location.href = "/ecommerce-frontend/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;