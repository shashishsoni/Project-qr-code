import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth';

export const signupUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};
