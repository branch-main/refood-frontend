import api from './api';

/**
 * Restaurant Service
 * Handles restaurant-related API calls
 */
const restaurantService = {
  /**
   * Get list of restaurants with optional filters
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated restaurant list
   */
  getRestaurants: async (params = {}) => {
    const response = await api.get('/restaurants/', { params });
    return response.data;
  },

  /**
   * Get restaurant by ID
   * @param {number} id - Restaurant ID
   * @returns {Promise} Restaurant object
   */
  getRestaurant: async (id) => {
    const response = await api.get(`/restaurants/${id}/`);
    return response.data;
  },

  /**
   * Create a new restaurant profile
   * @param {Object} restaurantData - Restaurant data
   * @returns {Promise} Created restaurant object
   */
  createRestaurant: async (restaurantData) => {
    const response = await api.post('/restaurants/', restaurantData);
    return response.data;
  },

  /**
   * Update restaurant profile
   * @param {number} id - Restaurant ID
   * @param {Object} restaurantData - Updated restaurant data
   * @returns {Promise} Updated restaurant object
   */
  updateRestaurant: async (id, restaurantData) => {
    const response = await api.patch(`/restaurants/${id}/`, restaurantData);
    return response.data;
  },

  /**
   * Delete restaurant profile
   * @param {number} id - Restaurant ID
   * @returns {Promise}
   */
  deleteRestaurant: async (id) => {
    await api.delete(`/restaurants/${id}/`);
  },

  /**
   * Get restaurant statistics
   * @param {number} id - Restaurant ID
   * @returns {Promise} Restaurant statistics
   */
  getRestaurantStats: async (id) => {
    const response = await api.get(`/restaurants/${id}/stats/`);
    return response.data;
  },

  /**
   * Get restaurant listings
   * @param {number} id - Restaurant ID
   * @returns {Promise} List of food listings
   */
  getRestaurantListings: async (id) => {
    const response = await api.get(`/restaurants/${id}/listings/`);
    return response.data;
  },

  /**
   * Search restaurants nearby
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} radius - Search radius in km
   * @returns {Promise} List of nearby restaurants
   */
  searchNearby: async (lat, lng, radius = 10) => {
    const response = await api.get('/restaurants/', {
      params: { lat, lng, radius },
    });
    return response.data;
  },
};

export default restaurantService;
