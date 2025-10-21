import axios, { AxiosInstance } from "axios";

export const apiBaseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Create a shared axios instance
const api: AxiosInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false,
});

export default api;
