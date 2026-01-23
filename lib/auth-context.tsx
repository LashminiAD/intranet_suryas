'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  designation?: string;
  id?: string;
  profilePhoto?: string;
  fullName?: string;
  profilePictureUploaded?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: string) => void;
  guestLogin: (guestData: any) => void;
  logout: () => void;
  updateProfile: (data: any) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
      }
    }
  }, []);

  const generateUserId = (role: string) => {
    const roleCode: Record<string, string> = {
      admin: 'MIB-A',
      user: 'MIB-U',
      intern: 'MIB-I',
      freelancer: 'MIB-F',
      founder: 'MIB-FD',
    };
    const code = roleCode[role] || 'MIB-U';
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `${code}-${randomNum}`;
  };

  const login = async (username: string, password: string, role: string) => {
    try {
      // Call backend API for authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      
      // User authenticated successfully
      setUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const guestLogin = (guestData: any) => {
    const newUser: User = {
      username: guestData.name,
      email: `${guestData.name.toLowerCase().replace(/\s+/g, '.')}@guest.suryasmib.com`,
      role: 'guest',
      designation: guestData.designation,
      id: generateUserId('guest'),
      fullName: guestData.name,
    };

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (data: any) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, guestLogin, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
