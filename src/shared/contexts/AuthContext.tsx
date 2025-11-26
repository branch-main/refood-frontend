import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { User } from "@/shared/types";
import { authService, RegisterRequest, UpdateUserRequest } from "@/shared/services";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (request: RegisterRequest) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (request: UpdateUserRequest) => Promise<void>;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const u = await authService.getCurrentUser();
        setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (request: RegisterRequest) => {
    setLoading(true);
    try {
      const { token, user: u } = await authService.register(request);
      localStorage.setItem("auth_token", token);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user: u } = await authService.login(email, password);
      localStorage.setItem("auth_token", token);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("partner_user");
      localStorage.removeItem("customer_user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (request: UpdateUserRequest) => {
    if (!user) return;
    const updatedUser = await authService.updateUser(user.id, request);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
