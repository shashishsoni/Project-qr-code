import axios from 'axios';

const api = axios.create({
  baseURL: 'https://project-qr-code.onrender.com', // Make sure this is correct
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors or other configurations here if needed

export default api;

export const signupUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', userData);
    return response.data;
};

export const resetPassword = async (email: string) => {
    const response = await api.post('/api/auth/reset-password', { email });
    return response.data;
};

export const updatePassword = async (token: string, newPassword: string) => {
    const response = await api.post('/api/auth/update-password', { token, newPassword });
    return response.data;
};

