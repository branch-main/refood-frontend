import api from './api';

/**
 * NGO Service
 * Handles NGO/Food Bank operations
 */
const ngoService = {
  /**
   * Get all NGOs
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated NGOs
   */
  getNGOs: async (params = {}) => {
    const response = await api.get('/ngos/', { params });
    return response.data;
  },

  /**
   * Get NGO by ID
   * @param {number} id - NGO ID
   * @returns {Promise} NGO object
   */
  getNGO: async (id) => {
    const response = await api.get(`/ngos/${id}/`);
    return response.data;
  },

  /**
   * Create a new NGO profile
   * @param {Object} ngoData - NGO data
   * @returns {Promise} Created NGO object
   */
  createNGO: async (ngoData) => {
    const response = await api.post('/ngos/', ngoData);
    return response.data;
  },

  /**
   * Update NGO profile
   * @param {number} id - NGO ID
   * @param {Object} ngoData - Updated NGO data
   * @returns {Promise} Updated NGO object
   */
  updateNGO: async (id, ngoData) => {
    const response = await api.patch(`/ngos/${id}/`, ngoData);
    return response.data;
  },

  /**
   * Delete NGO profile
   * @param {number} id - NGO ID
   * @returns {Promise}
   */
  deleteNGO: async (id) => {
    await api.delete(`/ngos/${id}/`);
  },
};

export default ngoService;
