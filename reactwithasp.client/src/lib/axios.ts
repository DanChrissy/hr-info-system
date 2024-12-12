import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5119/api",  // Change to your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the JWT token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");  // Retrieve token from local storage (or session storage)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  // Attach the token to the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the token is invalid or expired, redirect to login
    console.log({ error });
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (401), such as redirecting to login
      window.location.href = "/auth/login";  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
