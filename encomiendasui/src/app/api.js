import axios from "axios";

const api = axios.create({
  baseURL:
    "https://encomiendasapi-fehjgmfbgpguc7dm.canadacentral-01.azurewebsites.net", // Cambia esto si tu backend tiene otra URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Asegúrate de usar el formato correcto
  }
  return config;
});

export default api;
