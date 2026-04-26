export interface SignUp {
  username: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export type UserRole = 'admin' | 'user';

export interface HgsTypes {
  id: string;
  name: string;
  grievancetypes: string;
  room: number;
  course: string;
  mobile: number;
  description: string;
  userEmail?: string;
  status?: 'pending' | 'in-progress' | 'resolved';
}

export interface AuthResponse {
  token: string;
  username?: string;
  email?: string;
  role?: UserRole;
}

export interface User {
  token: string;
  username?: string;
  email?: string;
  role?: UserRole;
}
