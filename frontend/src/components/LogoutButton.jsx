import React from 'react';
import { logout } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    logoutUser();
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
