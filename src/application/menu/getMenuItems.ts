import { MenuItem } from "../../domain/entities/MenuItem";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";

export class GetMenuItemsUseCase {
  constructor(private menuItemRepository: MenuItemRepository) {}

  async execute(restaurantId: number | null): Promise<MenuItem[]> {
    if (restaurantId !== null) {
      return this.menuItemRepository.getByRestaurant(restaurantId);
    }
    return this.menuItemRepository.getAll();
  }
}
