/**
 * Utility functions for formatting data
 */

/**
 * Format price with currency symbol
 * @param {number|string} price - Price value
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = "S/ ") => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return `${currency}0.00`;
  return `${currency}${numPrice.toFixed(2)}`;
};

/**
 * Calculate discount percentage
 * @param {number} original - Original price
 * @param {number} discounted - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (original, discounted) => {
  const originalPrice = parseFloat(original);
  const discountedPrice = parseFloat(discounted);
  if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice === 0)
    return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Format distance
 * @param {number} distance - Distance in km
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance) => {
  const dist = parseFloat(distance);
  if (isNaN(dist)) return "N/A";
  if (dist < 1) return `${Math.round(dist * 1000)}m`;
  return `${dist.toFixed(1)}km`;
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format datetime to readable string
 * @param {string|Date} datetime - Datetime to format
 * @returns {string} Formatted datetime
 */
export const formatDateTime = (datetime) => {
  if (!datetime) return "";
  const d = new Date(datetime);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format time to readable string
 * @param {string} time - Time in HH:MM:SS format in UTC (e.g., "09:00:00")
 * @returns {string} Formatted time in local timezone (e.g., "9:00 AM")
 */
export const formatTime = (time: string): string => {
  if (!time) return "";
  const [h, m, s] = time.split(":").map(Number);
  const date = new Date();
  date.setUTCHours(h!, m, s);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60)
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  return formatDate(date);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

/**
 * Format rating to one decimal place (no decimals for whole numbers)
 * @param {number|string} rating - Rating value
 * @returns {string} Formatted rating
 */
export const formatRating = (rating) => {
  const num = parseFloat(rating);
  if (isNaN(num)) return "0";
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};
