import axios from 'axios';
import { SignUp, Login, AuthResponse, UserRole } from '../models/types';

const API_BASE = 'https://hgs-dotnet-2026.onrender.com/api/User';

// @hgs.com domain wale sab admin
const getRole = (email: string): UserRole => {
  return email.toLowerCase().endsWith('@hgs.com') ? 'admin' : 'user';
};

export const userService = {

  signup: async (data: SignUp): Promise<AuthResponse> => {
    if (data.email.toLowerCase().endsWith('@hgs.com')) {
      throw new Error('Admin accounts cannot be created via signup. Please contact administrator.');
    }

    const response = await axios.post(`${API_BASE}/signup`, data);

    return {
      token: 'dummy-token',
      username: response.data.username,
      email: response.data.email,
      role: 'user'
    };
  },

  login: async (data: Login): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_BASE}/login`, data);

      return {
        token: 'dummy-token',
        username: response.data.username,
        email: response.data.email,
        role: getRole(response.data.email)
      };
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || 'Invalid credentials'
      );
    }
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE}/reset-password`, {
      email,
      newPassword
    });
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'Failed to reset password'
    );
  }
}
};