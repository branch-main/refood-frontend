import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const favoriteService = {
  getFavorites: async (userId: number): Promise<number[]> => {
    try {
      const response = await apiClient.get(`/users/${userId}/favorites/`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching favorites:", error.response?.data || error.message);
      // Return empty array instead of throwing to prevent breaking the UI
      if (error.response?.status === 401) {
        console.warn("Unauthorized access to favorites");
      }
      return [];
    }
  },

  addFavorite: async (userId: number, restaurantId: number): Promise<void> => {
    await apiClient.post(`/users/${userId}/add-favorite/`, {
      restaurant_id: restaurantId,
    });
  },

  removeFavorite: async (
    userId: number,
    restaurantId: number
  ): Promise<void> => {
    await apiClient.delete(`/users/${userId}/remove-favorite/`, {
      data: { restaurant_id: restaurantId },
    });
  },
};
