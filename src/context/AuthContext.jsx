// context/AuthContext.jsx
// Global auth state (Context API). On mount it tries to fetch the
// current admin profile (relies on the httpOnly cookie) so refreshing
// the page keeps the admin logged in. Exposes login/logout helpers.

import { createContext, useContext, useEffect, useState } from 'react';
import { loginAdmin, logoutAdmin, fetchMe } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchMe();
        setAdmin(profile);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const login = async (email, password) => {
    const { admin: loggedInAdmin } = await loginAdmin(email, password);
    setAdmin(loggedInAdmin);
    return loggedInAdmin;
  };

  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
