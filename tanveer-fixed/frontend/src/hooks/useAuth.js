import { useState, useCallback } from 'react';
import { adminApi } from '../services/api.js';

/**
 * Lightweight auth state managed in localStorage.
 * For a larger app, lift this into a Context provider.
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('authToken')
  );

  const login = useCallback(async (username, password) => {
    const data = await adminApi.login({ username, password });
    if (data.success && data.token) {
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      return data;
    }
    throw new Error(data.message || 'Login failed');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
};
