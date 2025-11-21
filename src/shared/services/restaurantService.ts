import { apiClient } from "../api/client";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  totalReviews: number;
}

export interface UpdateRestaurantData {
  name?: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export const restaurantService = {
  // Customer - Browse restaurants
  getRestaurants: async () => {
    const { data } = await apiClient.get("/restaurants");
    return data;
  },

  getRestaurant: async (id: number) => {
    const { data } = await apiClient.get(`/restaurants/${id}`);
    return data;
  },

  searchRestaurants: async (query: string) => {
    const { data } = await apiClient.get("/restaurants/search", {
      params: { q: query },
    });
    return data;
  },

  // Partner - Manage own restaurant
  getMyRestaurant: async () => {
    const { data } = await apiClient.get("/partner/restaurant");
    return data;
  },

  updateMyRestaurant: async (restaurantData: UpdateRestaurantData) => {
    const { data } = await apiClient.put("/partner/restaurant", restaurantData);
    return data;
  },

  getRestaurantAnalytics: async (period: "week" | "month" | "year") => {
    const { data } = await apiClient.get("/partner/restaurant/analytics", {
      params: { period },
    });
    return data;
  },
};
