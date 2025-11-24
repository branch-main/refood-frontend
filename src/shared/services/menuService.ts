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

export interface CreateMenuItemData {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  isAvailable: boolean;
  image?: File;
}

export interface UpdateMenuItemData {
  name?: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  isAvailable?: boolean;
  image?: File;
}

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

  createMenuItem: async (data: CreateMenuItemData): Promise<MenuItem> => {
    const formData = new FormData();
    formData.append("restaurant_id", data.restaurantId.toString());
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    if (data.discountedPrice !== undefined) {
      formData.append("discounted_price", data.discountedPrice.toString());
    }
    formData.append("is_available", data.isAvailable.toString());
    if (data.image) {
      formData.append("image", data.image);
    }

    return apiClient
      .post<any>("/menu/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(toMenuItem);
  },

  updateMenuItem: async (
    id: number,
    data: UpdateMenuItemData
  ): Promise<MenuItem> => {
    const formData = new FormData();

    if (data.name !== undefined) formData.append("name", data.name);
    if (data.description !== undefined)
      formData.append("description", data.description);
    if (data.price !== undefined)
      formData.append("price", data.price.toString());
    if (data.discountedPrice !== undefined)
      formData.append("discounted_price", data.discountedPrice.toString());
    if (data.isAvailable !== undefined)
      formData.append("is_available", data.isAvailable.toString());
    if (data.image) formData.append("image", data.image);

    return apiClient
      .patch<any>(`/menu/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(toMenuItem);
  },

  deleteMenuItem: async (id: number): Promise<void> => {
    return apiClient.delete(`/menu/${id}/`);
  },
};
