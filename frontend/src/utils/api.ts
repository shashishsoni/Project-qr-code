import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors or other configurations here if needed

export default api;

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api/auth';

export const signupUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
    const response = await api.post(`${API_URL}/login`, userData);
    return response.data;
};

export const resetPassword = async (email: string) => {
    const response = await api.post(`${API_URL}/reset-password`, { email });
    return response.data;
};

export const updatePassword = async (token: string, newPassword: string) => {
    const response = await api.post(`${API_URL}/update-password`, { token, newPassword });
    return response.data;
};

