import axios, { AxiosHeaders } from "axios";

// Axios instance oluştur
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: new AxiosHeaders({
        "Content-Type": "application/json",
    }),
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // headers kesinlikle AxiosHeaders olmalı
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        if (token) {
            (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Hatası:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
