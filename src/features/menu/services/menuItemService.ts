import { MenuItem, MenuItemChoice, MenuItemOption } from "@/entities";
import { apiClient } from "@/shared/api";

function toMenuItemChoice(data: any): MenuItemChoice {
  return new MenuItemChoice(data.id, data.name, data.price, data.is_available);
}

function toMenuItemOption(data: any): MenuItemOption {
  return new MenuItemOption(
    data.id,
    data.name,
    data.min_choices,
    data.max_choices,
    data.is_required,
    data.choices.map(toMenuItemChoice),
  );
}

function toMenuItem(data: any): MenuItem {
  return new MenuItem(
    data.id,
    data.restaurant_id,
    data.name,
    data.description,
    data.price,
    data.image,
    data.is_available,
    [],
  );
}

class MenuItemService {
  async getMenuItem(id: number): Promise<MenuItem> {
    return apiClient.get(`/menu/${id}`).then(toMenuItem);
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return apiClient
      .get<any[]>("/menu/")
      .then((items) => items.map(toMenuItem));
  }
}

export const menuItemService = new MenuItemService();
