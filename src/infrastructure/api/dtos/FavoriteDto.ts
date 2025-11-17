import { Favorite } from "../../../domain/entities/Favorite";

export type FavoriteResponse = {
  id: number;
  user?: number;
  restaurant?: number;
  restaurant_info?: {
    id?: number;
    name: string;
    logo: string | null;
    description: string;
  };
  created_at: string;
};

export type FavoriteCreateRequest = {
  restaurant: number;
};

export function toFavorite(dto: FavoriteResponse): Favorite {
  return new Favorite(
    dto.id,
    0,
    dto.restaurant || 0,
    dto.restaurant_info?.name || "",
    dto.restaurant_info?.logo || null,
    dto.restaurant_info?.description || "",
    dto.created_at,
  );
}

export function toFavoriteCreateRequest(
  restaurantId: number,
): FavoriteCreateRequest {
  return {
    restaurant: restaurantId,
  };
}
