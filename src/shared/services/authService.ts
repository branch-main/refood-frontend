import { apiClient } from "../api";
import { User } from "../types";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: File | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const toUser = (data: any): User => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  email: data.email,
  phone: data.phone,
  image: data.image,
  role: data.role,
  addresses: [],
  favorites: data.favorites,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const authService = {
  register: async (request: RegisterRequest): Promise<AuthResponse> => {
    return apiClient
      .post<any>("/auth/register/", {
        first_name: request.firstName,
        last_name: request.lastName,
        email: request.email,
        phone: request.phone,
        password: request.password,
        password2: request.password2,
      })
      .then(({ token, user }) => ({ token, user: toUser(user) }));
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiClient
      .post<any>("/auth/login/", { email, password })
      .then(({ token, user }) => ({ token, user: toUser(user) }));
  },

  logout: async () => {
    await apiClient.post("/auth/logout/");
    localStorage.removeItem("auth_token");
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("No token");
    return apiClient.get<any>("/users/me").then(toUser);
  },

  updateUser: async (userId: number, request: UpdateUserRequest): Promise<User> => {
    const formData = new FormData();
    
    if (request.firstName !== undefined) {
      formData.append("first_name", request.firstName);
    }
    if (request.lastName !== undefined) {
      formData.append("last_name", request.lastName);
    }
    if (request.phone !== undefined) {
      formData.append("phone", request.phone);
    }
    if (request.image) {
      formData.append("image", request.image);
    }

    return apiClient
      .patch<any>(`/users/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(toUser);
  },
};
