import { MenuItem } from "../../domain/entities/MenuItem";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";

export class GetRestaurantMenuUseCase {
  constructor(private menuItemRepository: MenuItemRepository) {}

  async execute(restaurantId: number): Promise<MenuItem[]> {
    // Get all menu items and filter by restaurant
    // In a real scenario, the API would have a dedicated endpoint
    const allItems = await this.menuItemRepository.getAll();
    return allItems.filter((item) => item.restaurantId === restaurantId);
  }
}
