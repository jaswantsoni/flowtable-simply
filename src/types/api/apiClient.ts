import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use VITE_API_URL or fallback to default

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
