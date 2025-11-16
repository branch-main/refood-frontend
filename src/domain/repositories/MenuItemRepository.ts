import { MenuItem } from "../entities/MenuItem";

export interface MenuItemRepository {
  getById(id: number): Promise<MenuItem | null>;
  getAll(): Promise<MenuItem[]>;
  getByRestaurant(restaurantId: number): Promise<MenuItem[]>;
}
