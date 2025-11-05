import api from "./api";

class RestaurantService {
  async getRestaurants() {
    const response = await api.get("/restaurants/");
    return response.data;
  }

  async getRestaurant(id) {
    const response = await api.get(`/restaurants/${id}/`);
    return response.data;
  }

  async getRestaurantStats(id) {
    const response = await api.get(`/restaurants/${id}/stats/`);
    return response.data;
  }

  async getRestaurantCategories(id) {
    const response = await api.get(`/restaurants/${id}/categories/`);
    return response.data;
  }

  async getRestaurantOpeningHours(id) {
    const response = await api.get(`/restaurants/${id}/opening-hours/`);
    return response.data;
  }

  async toggleActive(id) {
    const response = await api.post(`/restaurants/${id}/toggle-active/`);
    return response.data;
  }
}

export default new RestaurantService();
