import axios from 'axios';

// Helper to determine base URL
const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    // If no env var, use local proxy (development)
    if (!envUrl) return '/api/v1';

    // If env var exists, ensure it ends with /api/v1
    if (envUrl.endsWith('/api/v1')) return envUrl;
    if (envUrl.endsWith('/')) return `${envUrl}api/v1`;
    return `${envUrl}/api/v1`;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            // Optional: Redirect to login
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;
