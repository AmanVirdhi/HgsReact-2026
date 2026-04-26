import { useState, useEffect, useCallback } from 'react';
import { User } from '../models/types';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback((userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const checkAuth = useCallback((): boolean => {
    return !!localStorage.getItem('user');
  }, []);

  const isAdmin = user?.role === 'admin';

  return { isAuthenticated, user, login, logout, checkAuth, isAdmin };
};
