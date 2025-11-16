import { User } from "../entities/User";

export interface AuthResult {
  token: string;
  user: User;
}

export interface AuthGateway {
  me(): Promise<User | null>;
  login(email: string, password: string): Promise<AuthResult>;
  logout(): Promise<void>;
}
