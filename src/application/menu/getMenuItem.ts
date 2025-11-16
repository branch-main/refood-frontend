import { MenuItem } from "../../domain/entities/MenuItem";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";

export class GetMenuItemUseCase {
  constructor(private menuItemRepository: MenuItemRepository) {}

  async execute(id: number): Promise<MenuItem | null> {
    return this.menuItemRepository.getById(id);
  }
}
