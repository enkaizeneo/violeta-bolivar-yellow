import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

// Ejemplo de login
export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data.token;
};