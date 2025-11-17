import { Favorite } from "../entities/Favorite";

export interface FavoriteRepository {
  create(restaurantId: number): Promise<Favorite>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Favorite[]>;
  getByRestaurantId(restaurantId: number): Promise<Favorite | null>;
  isFavorite(restaurantId: number): Promise<boolean>;
  toggle(restaurantId: number): Promise<Favorite | null>;
}
