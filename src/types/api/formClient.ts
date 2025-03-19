import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL
  // baseURL: "http://localhost:8000/", // Updated base URL with port number
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
