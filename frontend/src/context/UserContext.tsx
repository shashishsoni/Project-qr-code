"use client";

// context/UserContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  };

  // Check for token on initial load
  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpiration = localStorage.getItem("tokenExpiration");

    if (storedToken && storedExpiration) {
      const expirationTime = parseInt(storedExpiration, 10);
      if (Date.now() < expirationTime) {
        setToken(storedToken);
      } else {
        logout(); // Token expired
      }
    }
  };

  // Call checkToken on component mount
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};