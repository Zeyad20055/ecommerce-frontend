// services/authService.js

import api from "./api";

export const loginAdmin = async (email, password) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  // حفظ التوكن
  localStorage.setItem(
    "token",
    data.data.token
  );

  return data.data; // { admin, token }
};


export const logoutAdmin = async () => {
  const { data } = await api.post("/auth/logout");

  localStorage.removeItem("token");

  return data;
};


export const fetchMe = async () => {
  const { data } = await api.get("/auth/me");
  return data.data;
};