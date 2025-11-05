import api from "./api";

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} User object and token
   */
  register: async (userData) => {
    const response = await api.post("/auth/register/", userData);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   * @param {string} email - Email
   * @param {string} password - Password
   * @returns {Promise} User object and token
   */
  login: async (email, password) => {
    const response = await api.post("/auth/login/", { email, password });
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logout current user
   * @returns {Promise}
   */
  logout: async () => {
    try {
      await api.post("/auth/logout/");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  /**
   * Get current authenticated user
   * @returns {Promise} User object
   */
  getCurrentUser: async () => {
    const response = await api.get("/auth/profile/");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile data to update
   * @returns {Promise} Updated user object
   */
  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile/", profileData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Get stored token
   * @returns {string|null} Token
   */
  getToken: () => {
    return localStorage.getItem("auth_token");
  },

  /**
   * Get stored user
   * @returns {Object|null} User object
   */
  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};

export default authService;
