import { createContext, useState } from "react";
import {useNavigate} from "react-router-dom"
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const navigate = useNavigate()
  // Funkcja logowania
  const login = (userData) => {
    setUser(userData);
  };

  // Funkcja wylogowania
  const logout = () => {
    setUser(null);
    navigate("/")
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
