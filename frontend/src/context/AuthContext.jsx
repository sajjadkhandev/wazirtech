import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('wazirtech_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('wazirtech_token') || null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const closeNotification = () => setNotification(null);

  // Validate existing token on load
  useEffect(() => {
    const verifyUserSession = async () => {
      const storedToken = localStorage.getItem('wazirtech_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem('wazirtech_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out...');
          logout();
        }
      }
      setLoading(false);
    };

    verifyUserSession();

    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
      showNotification('Your session has expired. Please sign in again.', 'info');
    };

    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const { token: receivedToken, ...userData } = res.data.data;

      localStorage.setItem('wazirtech_token', receivedToken);
      localStorage.setItem('wazirtech_user', JSON.stringify(userData));

      setToken(receivedToken);
      setUser(userData);
      showNotification(`Welcome back, ${userData.name}!`, 'success');
      return { success: true, user: userData };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      showNotification(msg, 'error');
      throw new Error(msg);
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const res = await authAPI.register({ name, email, password, phone });
      const { token: receivedToken, ...userData } = res.data.data;

      localStorage.setItem('wazirtech_token', receivedToken);
      localStorage.setItem('wazirtech_user', JSON.stringify(userData));

      setToken(receivedToken);
      setUser(userData);
      showNotification('Account created successfully! Welcome to WazirTech.', 'success');
      return { success: true, user: userData };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Please try again.';
      showNotification(msg, 'error');
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('wazirtech_token');
    localStorage.removeItem('wazirtech_user');
    setUser(null);
    setToken(null);
    showNotification('You have been logged out successfully.', 'info');
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await userAPI.updateProfile(profileData);
      const updated = res.data.data;
      setUser(updated);
      localStorage.setItem('wazirtech_user', JSON.stringify(updated));
      showNotification('Profile updated successfully.', 'success');
      return updated;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile.';
      showNotification(msg, 'error');
      throw new Error(msg);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        notification,
        showNotification,
        closeNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
