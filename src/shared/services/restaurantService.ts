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
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const restaurantService = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    return apiClient
      .get<any>("/restaurants/")
      .then((restaurants) => restaurants.map(toRestaurant));
  },

  getRestaurant: async (id: number) => {
    return apiClient.get<any>(`/restaurants/${id}/`).then(toRestaurant);
  },
};
