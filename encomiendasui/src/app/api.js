import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Cambia esto si tu backend tiene otra URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Asegúrate de usar el formato correcto
  }
  return config;
});

export default api;