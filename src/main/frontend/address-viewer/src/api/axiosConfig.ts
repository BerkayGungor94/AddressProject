import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

// Request interceptor: her isteğe token ekle
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
// Bu kod, Axios'u kullanarak API isteklerini yapılandırmak için kullanılır.