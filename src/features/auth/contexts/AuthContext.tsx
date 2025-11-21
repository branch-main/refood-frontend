import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { User } from "@/entities";
import { authService } from "@/shared/services";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  partnerLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isPartner: boolean;
  isCustomer: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing auth on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid token
        localStorage.removeItem("auth_token");
        localStorage.removeItem("partner_user");
        localStorage.removeItem("customer_user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user: u } = await authService.login({ email, password });
      localStorage.setItem("auth_token", token);
      localStorage.setItem("customer_user", JSON.stringify(u));
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const partnerLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user: u } = await authService.partnerLogin({
        email,
        password,
      });
      localStorage.setItem("auth_token", token);
      localStorage.setItem("partner_user", JSON.stringify(u));
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

  const isPartner = user?.role === "restaurant_owner";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        partnerLogin,
        logout,
        isPartner,
        isCustomer,
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
