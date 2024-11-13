import { createContext, useContext, useEffect, useState } from "react";
import UserEntity from "../entities/userEntity";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const user = JSON.parse(token);
      setUser(new UserEntity(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
