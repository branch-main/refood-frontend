import { apiClient } from "../api";
import { OpeningHours, Restaurant } from "../types";

const toOpeningHours = (data: any): OpeningHours => ({
  day: data.day,
  openingTime: data.opening_time,
  closingTime: data.closing_time,
});

const toRestaurant = (data: any): Restaurant => ({
  id: data.id,
  name: data.name,
  description: data.description,
  email: data.email,
  phone: data.phone,
  minPreparationTime: data.min_preparation_time,
  maxPreparationTime: data.max_preparation_time,
  address: data.address,
  latitude: data.latitude,
  longitude: data.longitude,
  logo: data.logo,
  banner: data.banner,
  isActive: data.is_active,
  stats: {
    totalSales: data.stats.total_sales,
    totalOrders: data.stats.total_orders,
    totalItemsSold: data.stats.total_items_sold,
    rating: data.stats.rating,
    totalReviews: data.stats.total_reviews,
  },
  openingHours: data.opening_hours.map(toOpeningHours),
  isOpen: data.is_open,
  nextOpeningTime: data.next_opening_time,
  bestDiscount: data.best_discount || 0,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export interface CreateRestaurantData {
  name: string;
  description: string;
  email: string;
  phone: string;
  minPreparationTime: number;
  maxPreparationTime: number;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateRestaurantData {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  minPreparationTime?: number;
  maxPreparationTime?: number;
  address?: string;
  latitude?: number;
  longitude?: number;
  logo?: File;
  banner?: File;
}

export const restaurantService = {
  getRestaurants: async (search?: string): Promise<Restaurant[]> => {
    const params = search ? { search } : {};
    return apiClient
      .get<any>("/restaurants/", { params })
      .then((restaurants) => restaurants.map(toRestaurant));
  },

  getRestaurant: async (id: number) => {
    return apiClient.get<any>(`/restaurants/${id}/`).then(toRestaurant);
  },

  getMyRestaurants: async (): Promise<Restaurant[]> => {
    return apiClient
      .get<any>("/restaurants/me/")
      .then((restaurants) => restaurants.map(toRestaurant));
  },

  createRestaurant: async (data: CreateRestaurantData): Promise<Restaurant> => {
    const payload = {
      name: data.name,
      description: data.description,
      email: data.email,
      phone: data.phone,
      min_preparation_time: data.minPreparationTime,
      max_preparation_time: data.maxPreparationTime,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    };
    return apiClient.post<any>("/restaurants/", payload).then(toRestaurant);
  },

  updateRestaurant: async (
    id: number,
    data: UpdateRestaurantData
  ): Promise<Restaurant> => {
    const formData = new FormData();
    
    if (data.name !== undefined) formData.append("name", data.name);
    if (data.description !== undefined) formData.append("description", data.description);
    if (data.email !== undefined) formData.append("email", data.email);
    if (data.phone !== undefined) formData.append("phone", data.phone);
    if (data.minPreparationTime !== undefined) formData.append("min_preparation_time", data.minPreparationTime.toString());
    if (data.maxPreparationTime !== undefined) formData.append("max_preparation_time", data.maxPreparationTime.toString());
    if (data.address !== undefined) formData.append("address", data.address);
    if (data.latitude !== undefined) formData.append("latitude", data.latitude.toString());
    if (data.longitude !== undefined) formData.append("longitude", data.longitude.toString());
    if (data.logo) formData.append("logo", data.logo);
    if (data.banner) formData.append("banner", data.banner);

    return apiClient
      .patch<any>(`/restaurants/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(toRestaurant);
  },

  deleteRestaurant: async (id: number): Promise<void> => {
    return apiClient.delete(`/restaurants/${id}/`);
  },

  updateOpeningHours: async (
    restaurantId: number,
    day: number,
    openingTime: string,
    closingTime: string
  ): Promise<void> => {
    return apiClient.patch(`/restaurants/${restaurantId}/opening-hours/`, {
      day,
      opening_time: openingTime,
      closing_time: closingTime,
    });
  },
};
