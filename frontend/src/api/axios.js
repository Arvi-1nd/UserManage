import axios from "axios";

const api = axios.create({
  baseURL: "https://usermanage-production.up.railway.app/api/",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
