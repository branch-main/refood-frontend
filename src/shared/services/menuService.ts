import { apiClient } from "../api";
import { MenuItem, MenuItemOption } from "../types";

const toMenuItem = (data: any): MenuItem => ({
  id: data.id,
  restaurantId: data.restaurant_id,
  name: data.name,
  description: data.description,
  price: Number(data.price),
  discountPrice: data.discounted_price && Number(data.discounted_price),
  image: data.image,
  isAvailable: data.is_available,
  options: [],
});

export const menuService = {
  getMenuItem: async (id: number): Promise<MenuItem> => {
    return apiClient.get<any>(`/menu/${id}`).then(toMenuItem);
  },

  getMenuOptions: async (id: number): Promise<MenuItemOption[]> => {
    return apiClient.get<any[]>(`/menu/${id}/options`).then((options) => {
      return options.map((option) => ({
        id: option.id,
        name: option.name,
        minChoices: option.min_choices,
        maxChoices: option.max_choices,
        isRequired: option.is_required,
        choices: option.choices.map((choice: any) => ({
          id: choice.id,
          name: choice.name,
          price: Number(choice.price),
          isAvailable: choice.is_available,
        })),
      }));
    });
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
