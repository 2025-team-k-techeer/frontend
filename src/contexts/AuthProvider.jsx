import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'; // 위에서 만든 context import

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const isLoggedIn = !!user;

  const authValue = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
