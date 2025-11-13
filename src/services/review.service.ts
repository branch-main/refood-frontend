import api from './api';

/**
 * Review Service
 * Handles review and rating operations
 */
const reviewService = {
  /**
   * Get all reviews with optional restaurant filter
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated reviews
   */
  getReviews: async (params = {}) => {
    const response = await api.get('/reviews/', { params });
    return response.data;
  },

  /**
   * Get reviews for a specific restaurant
   * @param {number} restaurantId - Restaurant ID
   * @returns {Promise} Restaurant reviews
   */
  getRestaurantReviews: async (restaurantId) => {
    const response = await api.get('/reviews/', {
      params: { restaurant: restaurantId },
    });
    return response.data;
  },

  /**
   * Get review by ID
   * @param {number} id - Review ID
   * @returns {Promise} Review object
   */
  getReview: async (id) => {
    const response = await api.get(`/reviews/${id}/`);
    return response.data;
  },

  /**
   * Create a new review
   * @param {Object} reviewData - Review data with order, rating, comment, food_quality, service_rating
   * @returns {Promise} Created review object
   */
  createReview: async (reviewData) => {
    const response = await api.post('/reviews/', reviewData);
    return response.data;
  },

  /**
   * Update a review
   * @param {number} id - Review ID
   * @param {Object} reviewData - Updated review data
   * @returns {Promise} Updated review object
   */
  updateReview: async (id, reviewData) => {
    const response = await api.patch(`/reviews/${id}/`, reviewData);
    return response.data;
  },

  /**
   * Delete a review
   * @param {number} id - Review ID
   * @returns {Promise}
   */
  deleteReview: async (id) => {
    await api.delete(`/reviews/${id}/`);
  },
};

export default reviewService;
