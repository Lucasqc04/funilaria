import { useState, useEffect } from "react";

export interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true); // Adicionado estado de loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Define loading como falso após verificar localStorage
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true); // Define loading como true durante a tentativa de login
    setError(null);

    const mockEmail = import.meta.env.VITE_APP_MOCK_EMAIL ;
    const mockPassword = import.meta.env.VITE_APP_MOCK_PASSWORD ;
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

  return { user, loading, error, login, logout }; // Agora retornamos `loading`
};
