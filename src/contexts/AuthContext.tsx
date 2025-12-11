import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/services/api';

export type UserRole = 'admin' | 'cliente' | 'operator' | 'propietario';

export interface User {
  id: number;
  name: string;
  email: string;
  phonePrefix: string;
  phone: string;
  cedulaType: string;
  cedula: string;
  dateOfBirth?: string;
  city?: string;
  role: UserRole;
  isVerified: boolean;
  profilePhotoUrl?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phonePrefix: string;
  phone: string;
  cedulaType: string;
  cedula: string;
  dateOfBirth?: string;
  city?: string;
  role?: 'cliente' | 'operator' | 'admin' | 'propietario';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        api.setToken(storedToken);
        try {
          const response = await api.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            // Token invalid, clear it
            api.setToken(null);
            localStorage.removeItem('token');
          }
        } catch {
          api.setToken(null);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      
      if (response.success && response.data) {
        const { user: userData, token: newToken } = response.data;
        setUser(userData);
        setToken(newToken);
        api.setToken(newToken);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error?.message || 'Error al iniciar sesión' 
      };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      const response = await api.register(userData);
      
      if (response.success && response.data) {
        const { user: newUser, token: newToken } = response.data;
        setUser(newUser);
        setToken(newToken);
        api.setToken(newToken);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: response.error?.message || 'Error al registrarse' 
      };
    } catch {
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    api.setToken(null);
  }, []);

  const getRedirectPath = useCallback(() => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'operator':
        return '/operator';
      case 'propietario':
        return '/propietario';
      case 'cliente':
      default:
        return '/estudiante';
    }
  }, [user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token,
        isAuthenticated: !!user, 
        isLoading,
        login, 
        register, 
        logout,
        getRedirectPath
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Backward compatibility - alias for useAuth
export const useUser = useAuth;
