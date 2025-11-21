import { apiClient } from "../api";
import { MenuItem } from "../types";

const toMenuItem = (data: any): MenuItem => ({
  id: data.id,
  restaurantId: data.restaurant_id,
  name: data.name,
  description: data.description,
  price: data.price,
  image: data.image,
  isAvailable: data.is_available,
  options: [],
});

export const menuService = {
  getMenuItem: async (id: number) => {
    return apiClient.get<any>(`/menu/${id}`).then(toMenuItem);
  },

  getMenu: async (): Promise<MenuItem[]> => {
    return apiClient
      .get<any[]>("/menu/")
      .then((items) => items.map(toMenuItem));
  },

  getMenuByRestaurant: async (restaurantId: number): Promise<MenuItem[]> => {
    return apiClient
      .get<any[]>(`/menu?restaurant_id=${restaurantId}`)
      .then((items) => items.map(toMenuItem));
  },
};
