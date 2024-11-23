import { createContext, useContext, useEffect, useState } from "react";
import UserEntity from "../entities/userEntity";
import AdminEntity from "../entities/adminEntity";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const admintoken = sessionStorage.getItem("admintoken");

    if (token) {
      const user = JSON.parse(token);
      setUser(new UserEntity(user));
    } else if (admintoken) {
      const admin = JSON.parse(admintoken);
      setAdmin(new AdminEntity(admin));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, admin, setAdmin, backendUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
