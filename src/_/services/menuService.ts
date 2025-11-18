import api from "./api";

class MenuService {
  async getRestaurantMenu(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/`);
    return response.data;
  }

  async getMenuItems(search) {
    const response = await api.get("/menu/items/", { params: { search } });
    return response.data;
  }

  async getMenuItem(itemId) {
    const response = await api.get(`/menu/items/${itemId}/`);
    return response.data;
  }
}

export default new MenuService();
