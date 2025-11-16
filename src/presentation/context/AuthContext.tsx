import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { User } from "../../domain/entities/User";
import { TokenRepository } from "../../domain/repositories/TokenRepository";
import { AuthGateway } from "../../domain/gateways/AuthGateway";
import { container } from "../../container";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authGateway = container.resolve<AuthGateway>("AuthGateway");
  const tokenRepository = container.resolve<TokenRepository>("TokenRepository");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const u = await authGateway.me().catch(() => null);
      setUser(u);
      setLoading(false);
    })();
  }, [authGateway]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token, user: u } = await authGateway.login(email, password);
      await tokenRepository.set(token);
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authGateway.logout();
      await tokenRepository.set(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading, user);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
