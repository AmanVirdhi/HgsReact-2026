import axios from 'axios';
import { SignUp, Login, AuthResponse, UserRole } from '../models/types';

const API_BASE = 'https://localhost:7289/api';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// @hgs.com domain wale sab admin
const getRole = (email: string): UserRole => {
  return email.toLowerCase().endsWith('@hgs.com') ? 'admin' : 'user';
};

export const userService = {
  signup: async (data: SignUp): Promise<AuthResponse> => {
    // Block admin domain signup
    if (data.email.toLowerCase().endsWith('@hgs.com')) {
      throw new Error('Admin accounts cannot be created via signup. Please contact administrator.');
    }
    
    const response = await axios.post<User>(`${API_BASE}/User`, data);
    return {
      token: 'dummy-token',
      username: response.data.username,
      email: response.data.email,
      role: 'user' // Always user via signup
    };
  },

  login: async (data: Login): Promise<AuthResponse> => {
    // Get all users and check credentials (demo approach)
    const response = await axios.get<User[]>(`${API_BASE}/User`);
    const user = response.data.find(
      u => u.email === data.email && u.password === data.password
    );
    
    if (user) {
      return {
        token: 'dummy-token',
        username: user.username,
        email: user.email,
        role: getRole(user.email)
      };
    }
    throw new Error('Invalid credentials');
  },

  resetPassword: async (email: string, newPassword: string): Promise<void> => {
    // Get all users and find by email
    const response = await axios.get<User[]>(`${API_BASE}/User`);
    const user = response.data.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Email not found');
    }

    // Update user password
    await axios.put(`${API_BASE}/User/${user.id}`, {
      ...user,
      password: newPassword
    });
  }
};
