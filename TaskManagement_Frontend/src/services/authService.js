// authService.js - Authentication API calls using axios instance
import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    console.log("login res = " + response);

    return response.data; // Expected shape: { user, token? }
  },

  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/auth/me');

    return response.data.data.user; // Adjust if backend response differs
  },

  async updatePassword(currentPassword, newPassword) {
    await api.patch('/auth/update-password', { currentPassword, newPassword });
  },

  async logout() {
    await api.post('/auth/logout');
  },
};
