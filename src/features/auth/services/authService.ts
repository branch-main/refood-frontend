import { User } from "@/entities";
import { apiClient } from "@/shared/api";

type AuthResponse = {
  token: string;
  user: User;
};

class AuthService {
  me(): Promise<User> {
    return apiClient.get<User>("/users/me/");
  }

  login(username: string, password: string): Promise<AuthResponse> {
    return apiClient.post("/auth/login/", { username, password });
  }

  logout() {
    return apiClient.post("/auth/logout/");
  }
}

export const authService = new AuthService();
