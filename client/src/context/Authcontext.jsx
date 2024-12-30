import axios from "axios";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();
const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuthState = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        API_URL,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
        loading,
        setLoading,
        checkAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
