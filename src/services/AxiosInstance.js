import axios from "axios";
import { getToken, refreshAuthToken } from "./AuthService";

const BASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const api = axios.create({
    baseURL: BASE_URL
});

// Interceptor: Tambahkan token ke setiap request
api.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.url += `?auth=${token}`; // Tambahkan token ke setiap request
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: Jika token expired (401), refresh token otomatis
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          error.config.url = error.config.url.replace(/auth=[^&]+/, `auth=${newToken}`);
          localStorage.setItem("token", newToken); // Simpan token yang baru
          return api(error.config); // Kirim ulang request
        }
      }
      return Promise.reject(error);
    }
  );
  

export default api;
