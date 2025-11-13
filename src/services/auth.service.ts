import api from "./api";
import { User, AuthResponse, RegisterData, ProfileData } from "../types";

const authService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register/", userData);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login/", { email, password });
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout/");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/profile/");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData: ProfileData): Promise<User> => {
    const response = await api.put("/auth/profile/", profileData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  /**
   * Get stored user
   */
  getStoredUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },
};

export default authService;
