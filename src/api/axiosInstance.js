import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
    baseURL: config.API_URL
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export default axiosInstance