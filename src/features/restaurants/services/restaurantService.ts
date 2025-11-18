import {
  Restaurant,
  RestaurantOpeningHours,
  RestaurantStats,
} from "@/entities";
import { apiClient } from "@/shared/api";

function toOpeningHours(data: any): RestaurantOpeningHours {
  return new RestaurantOpeningHours(
    data.day,
    data.opening_time,
    data.closing_time,
  );
}

function toStats(data: any): RestaurantStats {
  return new RestaurantStats(
    data.total_sales,
    data.total_orders,
    data.total_items_sold,
    data.rating,
    data.total_reviews,
  );
}

function toRestaurant(data: any): Restaurant {
  return new Restaurant(
    data.id,
    data.name,
    data.description,
    data.email,
    data.phone,
    data.address,
    data.latitude,
    data.longitude,
    data.logo,
    data.banner,
    data.is_active,
    toStats(data.stats),
    data.opening_hours.map(toOpeningHours),
    data.is_open,
    data.next_opening_time,
    data.created_at,
    data.updated_at,
  );
}

class RestaurantService {
  async getRestaurant(id: number): Promise<Restaurant> {
    return apiClient.get(`/restaurants/${id}/`).then(toRestaurant);
  }

  async getRestaurantMenu(id: number): Promise<any> {
    return apiClient.get(`/menu?restaurant_id=${id}`);
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return apiClient
      .get<any[]>("/restaurants/")
      .then((restaurants) => restaurants.map(toRestaurant));
  }
}

export const restaurantService = new RestaurantService();
