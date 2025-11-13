import api from './api';

/**
 * Favorite Service
 * Handles favorite restaurants management
 */
const favoriteService = {
  /**
   * Get all favorite restaurants for current user
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated favorites
   */
  getFavorites: async (params = {}) => {
    const response = await api.get('/favorites/', { params });
    return response.data;
  },

  /**
   * Add a restaurant to favorites
   * @param {number} restaurantId - Restaurant ID
   * @returns {Promise} Created favorite object
   */
  addFavorite: async (restaurantId) => {
    const response = await api.post('/favorites/', {
      restaurant: restaurantId,
    });
    return response.data;
  },

  /**
   * Remove a restaurant from favorites
   * @param {number} id - Favorite ID
   * @returns {Promise}
   */
  removeFavorite: async (id) => {
    await api.delete(`/favorites/${id}/`);
  },

  /**
   * Check if a restaurant is favorited
   * @param {number} restaurantId - Restaurant ID
   * @returns {Promise<boolean>} True if favorited
   */
  isFavorite: async (restaurantId) => {
    try {
      const response = await api.get('/favorites/', {
        params: { restaurant: restaurantId },
      });
      return response.data.results.length > 0;
    } catch (error) {
      return false;
    }
  },

  /**
   * Toggle favorite status for a restaurant
   * @param {number} restaurantId - Restaurant ID
   * @param {number} favoriteId - Favorite ID (if already favorited)
   * @returns {Promise} Favorite object or null
   */
  toggleFavorite: async (restaurantId, favoriteId = null) => {
    if (favoriteId) {
      await favoriteService.removeFavorite(favoriteId);
      return null;
    } else {
      return await favoriteService.addFavorite(restaurantId);
    }
  },
};

export default favoriteService;
