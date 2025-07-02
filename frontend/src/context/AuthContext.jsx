import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('isAdmin', data.role === 'admin');
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://mini-product-feedback-board.onrender.com/api/auth/me", {
          credentials: "include", 
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('isAdmin', data.role === 'admin');
        } else {
          logoutUser();
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};



