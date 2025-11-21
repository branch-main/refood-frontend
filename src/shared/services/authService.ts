import { apiClient } from "../api/client";
import { mockAuthAPI, useMockAPI } from "../api/mockAuth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "customer" | "partner";
  };
}

export const authService = {
  // Customer Auth
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (useMockAPI()) {
      return mockAuthAPI.customerLogin(credentials.email, credentials.password);
    }
    const { data } = await apiClient.post("/auth/login/", credentials);
    return data;
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post("/auth/register/", registerData);
    return data;
  },

  logout: async () => {
    await apiClient.post("/auth/logout/");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("partner_user");
    localStorage.removeItem("customer_user");
  },

  getCurrentUser: async () => {
    if (useMockAPI()) {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("No token");
      return mockAuthAPI.getCurrentUser(token);
    }
    const { data } = await apiClient.get("/auth/me");
    return data;
  },
};
