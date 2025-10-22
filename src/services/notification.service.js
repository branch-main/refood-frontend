import api from './api';

/**
 * Notification Service
 * Handles user notifications
 */
const notificationService = {
  /**
   * Get all notifications for current user
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated notifications
   */
  getNotifications: async (params = {}) => {
    const response = await api.get('/notifications/', { params });
    return response.data;
  },

  /**
   * Get notification by ID
   * @param {number} id - Notification ID
   * @returns {Promise} Notification object
   */
  getNotification: async (id) => {
    const response = await api.get(`/notifications/${id}/`);
    return response.data;
  },

  /**
   * Mark a notification as read
   * @param {number} id - Notification ID
   * @returns {Promise} Success message
   */
  markAsRead: async (id) => {
    const response = await api.post(`/notifications/${id}/mark_read/`);
    return response.data;
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} Success message
   */
  markAllAsRead: async () => {
    const response = await api.post('/notifications/mark_all_read/');
    return response.data;
  },

  /**
   * Get unread notification count
   * @returns {Promise} Count of unread notifications
   */
  getUnreadCount: async () => {
    const response = await api.get('/notifications/', {
      params: { is_read: false },
    });
    return response.data.count || 0;
  },
};

export default notificationService;
