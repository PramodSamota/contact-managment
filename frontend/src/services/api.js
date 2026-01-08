// frontend/src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject({
      message,
      errors: error.response?.data?.errors,
      status: error.response?.status,
    });
  }
);

// Contact API methods
export const contactAPI = {
  // Get all contacts
  getAll: async (params = {}) => {
    return await api.get("/contacts", { params });
  },

  // Get single contact
  getById: async (id) => {
    return await api.get(`/contacts/${id}`);
  },

  // Create contact
  create: async (data) => {
    return await api.post("/contacts", data);
  },

  // Update contact
  update: async (id, data) => {
    return await api.put(`/contacts/${id}`, data);
  },

  // Delete contact
  delete: async (id) => {
    return await api.delete(`/contacts/${id}`);
  },
};

export default api;
