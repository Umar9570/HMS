import { createContext, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('luxurystay_user')) || null
  );

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.status) {
      setUser(data.user);
      localStorage.setItem('luxurystay_user', JSON.stringify(data.user));
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxurystay_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
