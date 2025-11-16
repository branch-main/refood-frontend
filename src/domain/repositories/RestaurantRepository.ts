import { Restaurant } from "../entities/Restaurant";

export interface RestaurantRepository {
  create(restaurant: Restaurant): Promise<void>;
  update(id: number, restaurant: Restaurant): Promise<void>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Restaurant | null>;
  getAll(): Promise<Restaurant[]>;
}
