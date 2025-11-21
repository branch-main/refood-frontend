import { apiClient } from "../api/client";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  restaurantId: number;
}

export interface CreateMenuItemData {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available?: boolean;
}

export const menuService = {
  // Customer - Get menu items
  getMenuItems: async (restaurantId?: number) => {
    const params = restaurantId ? { restaurantId } : {};
    const { data } = await apiClient.get("/menu-items", { params });
    return data;
  },

  getMenuItem: async (id: number) => {
    const { data } = await apiClient.get(`/menu-items/${id}`);
    return data;
  },

  // Partner - Manage menu items
  createMenuItem: async (itemData: CreateMenuItemData) => {
    const { data } = await apiClient.post("/partner/menu-items", itemData);
    return data;
  },

  updateMenuItem: async (id: number, itemData: Partial<CreateMenuItemData>) => {
    const { data } = await apiClient.put(`/partner/menu-items/${id}`, itemData);
    return data;
  },

  deleteMenuItem: async (id: number) => {
    const { data } = await apiClient.delete(`/partner/menu-items/${id}`);
    return data;
  },

  toggleAvailability: async (id: number, available: boolean) => {
    const { data } = await apiClient.patch(`/partner/menu-items/${id}/availability`, {
      available,
    });
    return data;
  },
};
