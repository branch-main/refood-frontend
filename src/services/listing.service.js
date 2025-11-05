import api from "./api";

/**
 * Food Listing Service
 * Handles food listing operations
 */
const listingService = {
  /**
   * Get all food listings with optional filters
   * @param {Object} params - Query parameters
   * @returns {Promise} Paginated listings
   */
  getListings: async (params = {}) => {
    const response = await api.get("/menu/items", { params });
    return response.data;
  },

  /**
   * Get listing by ID
   * @param {number} id - Listing ID
   * @returns {Promise} Listing object
   */
  getListing: async (id) => {
    const response = await api.get(`/listings/${id}/`);
    return response.data;
  },

  /**
   * Get nearby listings
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} radius - Search radius in km
   * @returns {Promise} List of nearby listings
   */
  getNearbyListings: async (lat, lng, radius = 10) => {
    const response = await api.get("/listings/nearby/", {
      params: { lat, lng, radius },
    });
    return response.data;
  },

  /**
   * Create a new food listing
   * @param {Object} listingData - Listing data
   * @returns {Promise} Created listing object
   */
  createListing: async (listingData) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(listingData).forEach((key) => {
      if (key === "allergens") {
        formData.append(key, JSON.stringify(listingData[key]));
      } else if (key === "image" && listingData[key] instanceof File) {
        formData.append(key, listingData[key]);
      } else {
        formData.append(key, listingData[key]);
      }
    });

    const response = await api.post("/listings/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Update a listing
   * @param {number} id - Listing ID
   * @param {Object} listingData - Updated listing data
   * @returns {Promise} Updated listing object
   */
  updateListing: async (id, listingData) => {
    const formData = new FormData();

    Object.keys(listingData).forEach((key) => {
      if (key === "allergens") {
        formData.append(key, JSON.stringify(listingData[key]));
      } else if (key === "image" && listingData[key] instanceof File) {
        formData.append(key, listingData[key]);
      } else if (listingData[key] !== undefined && listingData[key] !== null) {
        formData.append(key, listingData[key]);
      }
    });

    const response = await api.patch(`/listings/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Delete a listing
   * @param {number} id - Listing ID
   * @returns {Promise}
   */
  deleteListing: async (id) => {
    await api.delete(`/listings/${id}/`);
  },

  /**
   * Search listings with filters
   * @param {Object} filters - Search filters
   * @returns {Promise} Filtered listings
   */
  searchListings: async (filters) => {
    const response = await api.get("/listings/", { params: filters });
    return response.data;
  },
};

export default listingService;
