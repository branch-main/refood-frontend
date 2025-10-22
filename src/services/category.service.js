import api from './api';

/**
 * Category Service
 * Handles food categories
 */
const categoryService = {
  /**
   * Get all food categories
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated categories
   */
  getCategories: async (params = {}) => {
    const response = await api.get('/categories/', { params });
    return response.data;
  },

  /**
   * Get category by ID
   * @param {number} id - Category ID
   * @returns {Promise} Category object
   */
  getCategory: async (id) => {
    const response = await api.get(`/categories/${id}/`);
    return response.data;
  },
};

export default categoryService;
