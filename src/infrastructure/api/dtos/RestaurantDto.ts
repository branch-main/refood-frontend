import {
  OpeningHours,
  Restaurant,
  RestaurantStats,
} from "../../../domain/entities/Restaurant";

export type RestaurantResponse = {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  logo: string | null;
  banner: string | null;
  is_active: boolean;
  stats: {
    total_sales: number;
    total_orders: number;
    total_items_sold: number;
    rating: number;
    total_reviews: number;
  };
  opening_hours: {
    day: number;
    opening_time: string;
    closing_time: string;
  }[];
  is_open: boolean;
  next_opening_time: string;
  created_at: string | null;
  updated_at: string | null;
};

export type RestaurantUpdateRequest = {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  logo?: string | null;
  banner?: string | null;
};

export function toRestaurant(dto: RestaurantResponse): Restaurant {
  return new Restaurant(
    dto.id,
    dto.name,
    dto.description,
    dto.email,
    dto.phone,
    dto.address,
    dto.latitude,
    dto.longitude,
    dto.logo,
    dto.banner,
    dto.is_active,
    new RestaurantStats(
      dto.stats.total_sales,
      dto.stats.total_orders,
      dto.stats.total_items_sold,
      dto.stats.rating,
      dto.stats.total_reviews,
    ),
    dto.opening_hours.map(
      (oh) => new OpeningHours(oh.day, oh.opening_time, oh.closing_time),
    ),
    dto.is_open,
    dto.next_opening_time,
    dto.created_at,
    dto.updated_at,
  );
}

export function toRestaurantUpdateDto(
  restaurant: Restaurant,
): RestaurantUpdateRequest {
  return {
    name: restaurant.name,
    description: restaurant.description,
    email: restaurant.email,
    phone: restaurant.phone,
    address: restaurant.address,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    logo: restaurant.logo,
    banner: restaurant.banner,
  };
}
