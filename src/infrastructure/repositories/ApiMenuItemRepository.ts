import { MenuItem } from "../../domain/entities/MenuItem";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";
import { ApiClient } from "../api/ApiClient";
import { MenuItemResponse, toMenuItem } from "../responses/MenuItemResponse";

export class ApiMenuItemRepository implements MenuItemRepository {
  constructor(private apiClient: ApiClient) {}

  async getById(id: number): Promise<MenuItem | null> {
    return this.apiClient
      .get<MenuItemResponse>(`/menu/${id}/`)
      .then(toMenuItem)
      .catch(() => null);
  }

  async getAll(): Promise<MenuItem[]> {
    return this.apiClient
      .get<MenuItemResponse[]>(`/menu/`)
      .then((response) => response.map(toMenuItem));
  }

  async getByRestaurant(restaurantId: number): Promise<MenuItem[]> {
    return this.apiClient
      .get<MenuItemResponse[]>(`/restaurants/${restaurantId}/menu/`)
      .then((response) => response.map(toMenuItem));
  }
}
