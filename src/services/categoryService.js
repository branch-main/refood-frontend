import api from "./api";

class CategoryService {
  async getCategories(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/categories/`);
    return response.data;
  }
}

export default new CategoryService();
