import { useState, useEffect } from "react";
import { authService } from "../services";
import { User, AuthResponse, RegisterData, ProfileData } from "../types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await authService.login(email, password);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await authService.register(userData);
    setUser(response.user);
    setIsAuthenticated(true);
    return response;
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUser = async (): Promise<User> => {
    const updatedUser = await authService.getCurrentUser();
    setUser(updatedUser);
    return updatedUser;
  };

  const updateUser = async (profileData: ProfileData): Promise<User> => {
    const updatedUser = await authService.updateProfile(profileData);
    setUser(updatedUser);
    return updatedUser;
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updateUser,
  };
};
