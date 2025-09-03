// AuthContext.jsx - React Auth Context and Provider
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authService } from "../services/authService"
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const userData = await authService.getProfile();
        setUser(userData);
        console.log(user);

      } catch (error) {
        console.log('Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, []);


  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      console.log("login context = " + response.data.user);

      const userData = response.data.user; // correctly access user inside data
      setUser(userData);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };


  const register = async (name, email, password) => {
    try {
      const { user: userData } = await authService.register(name, email, password);
      setUser(userData);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore errors on logout
    } finally {
      setUser(null);
      toast.info('Logged out successfully');
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await authService.updatePassword(currentPassword, newPassword);
      // toast.success('Password updated successfully!');
    } catch (error) {
      // toast.error(error.message || 'Password update failed');
      throw error;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updatePassword,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
