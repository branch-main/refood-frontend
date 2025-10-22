import api from './api';

/**
 * Order Service
 * Handles order management and operations
 */
const orderService = {
  /**
   * Get all orders for current user
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated orders
   */
  getOrders: async (params = {}) => {
    const response = await api.get('/orders/', { params });
    return response.data;
  },

  /**
   * Get order by ID
   * @param {number} id - Order ID
   * @returns {Promise} Order object
   */
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  /**
   * Create a new order
   * @param {Object} orderData - Order data with restaurant_id, items, pickup_time, notes
   * @returns {Promise} Created order object
   */
  createOrder: async (orderData) => {
    const response = await api.post('/orders/', orderData);
    return response.data;
  },

  /**
   * Cancel an order
   * @param {number} id - Order ID
   * @returns {Promise} Success message
   */
  cancelOrder: async (id) => {
    const response = await api.post(`/orders/${id}/cancel/`);
    return response.data;
  },

  /**
   * Confirm an order (restaurant only)
   * @param {number} id - Order ID
   * @returns {Promise} Success message
   */
  confirmOrder: async (id) => {
    const response = await api.post(`/orders/${id}/confirm/`);
    return response.data;
  },

  /**
   * Mark order as ready for pickup (restaurant only)
   * @param {number} id - Order ID
   * @returns {Promise} Success message
   */
  markOrderReady: async (id) => {
    const response = await api.post(`/orders/${id}/ready/`);
    return response.data;
  },

  /**
   * Complete an order
   * @param {number} id - Order ID
   * @returns {Promise} Success message
   */
  completeOrder: async (id) => {
    const response = await api.post(`/orders/${id}/complete/`);
    return response.data;
  },

  /**
   * Get order history with filters
   * @param {string} status - Order status filter
   * @returns {Promise} Filtered orders
   */
  getOrderHistory: async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get('/orders/', { params });
    return response.data;
  },
};

export default orderService;
