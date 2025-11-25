import { apiClient } from "../api";
import { MenuItem, MenuItemOption, MenuItemChoice } from "../types";

const toMenuItem = (data: any): MenuItem => ({
  id: data.id,
  restaurantId: data.restaurant_id,
  name: data.name,
  description: data.description,
  price: Number(data.price),
  discountPrice: data.discounted_price && Number(data.discounted_price) > 0
    ? Number(data.discounted_price)
    : null,
  image: data.image,
  isAvailable: data.is_available,
  options: [],
});

const toMenuItemOption = (data: any): MenuItemOption => ({
  id: data.id,
  name: data.name,
  minChoices: data.min_choices,
  maxChoices: data.max_choices,
  isRequired: data.is_required,
  choices: data.choices ? data.choices.map(toMenuItemChoice) : [],
});

const toMenuItemChoice = (data: any): MenuItemChoice => ({
  id: data.id,
  name: data.name,
  price: Number(data.price),
  isAvailable: data.is_available,
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

export interface CreateOptionData {
  name: string;
  minChoices: number;
  maxChoices: number;
  isRequired: boolean;
}

export interface UpdateOptionData {
  name?: string;
  minChoices?: number;
  maxChoices?: number;
  isRequired?: boolean;
}

export interface CreateChoiceData {
  name: string;
  price: number;
  isAvailable: boolean;
}

export interface UpdateChoiceData {
  name?: string;
  price?: number;
  isAvailable?: boolean;
}

export const menuService = {
  getMenuItem: async (id: number): Promise<MenuItem> => {
    return apiClient.get<any>(`/menu/${id}`).then(toMenuItem);
  },

  getMenuOptions: async (menuItemId: number): Promise<MenuItemOption[]> => {
    return apiClient
      .get<any[]>(`/menu/${menuItemId}/options/`)
      .then((options) => options.map(toMenuItemOption));
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
    // Only send discounted_price if it's a valid number greater than 0
    if (data.discountedPrice !== undefined && data.discountedPrice !== null && data.discountedPrice > 0) {
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
    // Only send discounted_price if it's a valid number greater than 0
    if (data.discountedPrice !== undefined && data.discountedPrice !== null && data.discountedPrice > 0)
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

  // Options CRUD
  createOption: async (
    menuItemId: number,
    data: CreateOptionData
  ): Promise<void> => {
    return apiClient.post(`/menu/${menuItemId}/create_option/`, {
      name: data.name,
      min_choices: data.minChoices,
      max_choices: data.maxChoices,
      is_required: data.isRequired,
    });
  },

  updateOption: async (
    optionId: number,
    data: UpdateOptionData
  ): Promise<MenuItemOption> => {
    const payload: any = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.minChoices !== undefined) payload.min_choices = data.minChoices;
    if (data.maxChoices !== undefined) payload.max_choices = data.maxChoices;
    if (data.isRequired !== undefined) payload.is_required = data.isRequired;

    return apiClient
      .patch<any>(`/menu/options/${optionId}/`, payload)
      .then(toMenuItemOption);
  },

  deleteOption: async (optionId: number): Promise<void> => {
    return apiClient.delete(`/menu/options/${optionId}/`);
  },

  // Choices CRUD
  getOptionChoices: async (optionId: number): Promise<MenuItemChoice[]> => {
    return apiClient
      .get<any[]>(`/menu/options/${optionId}/choices/`)
      .then((choices) => choices.map(toMenuItemChoice));
  },

  createChoice: async (
    optionId: number,
    data: CreateChoiceData
  ): Promise<void> => {
    return apiClient.post(`/menu/options/${optionId}/create_choice/`, {
      name: data.name,
      price: data.price.toString(),
      is_available: data.isAvailable,
    });
  },

  updateChoice: async (
    choiceId: number,
    data: UpdateChoiceData
  ): Promise<MenuItemChoice> => {
    const payload: any = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.price !== undefined) payload.price = data.price.toString();
    if (data.isAvailable !== undefined) payload.is_available = data.isAvailable;

    return apiClient
      .patch<any>(`/menu/choices/${choiceId}/`, payload)
      .then(toMenuItemChoice);
  },

  deleteChoice: async (choiceId: number): Promise<void> => {
    return apiClient.delete(`/menu/choices/${choiceId}/`);
  },
};
