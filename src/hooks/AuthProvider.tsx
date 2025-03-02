import React, { createContext, useContext, useState, useEffect } from "react";

export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const mockEmail = "teste@gmail.com";
    const mockPassword = "192837465";

    console.log("passou aqui"); // Esse console.log deve aparecer no login

    if (email === mockEmail && password === mockPassword) {
      const mockUser: MockUser = {
        uid: "mock-user-id",
        email,
        displayName: "Admin FunilaTOP",
        emailVerified: true
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setLoading(false);
      return true;
    } else {
      setError("Usuário ou senha inválidos");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
