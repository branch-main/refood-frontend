/**
 * Format price with currency symbol
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted price
 */
export const formatPrice = (
  price: number,
  currency: string = "S/ ",
): string => {
  const numPrice = parseFloat(price.toString());
  if (isNaN(numPrice)) return `${currency}0.00`;
  return `${currency}${numPrice.toFixed(2)}`;
};

/**
 * Calculate discount percentage
 * @param {number} original - Original price
 * @param {number} discounted - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (
  original: number,
  discounted: number,
): number => {
  const originalPrice = parseFloat(original.toString());
  const discountedPrice = parseFloat(discounted.toString());
  if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice === 0)
    return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Format distance
 * @param {number} distance - Distance in km
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance: number): string => {
  const dist = parseFloat(distance.toString());
  if (isNaN(dist)) return "N/A";
  if (dist < 1) return `${Math.round(dist * 1000)}m`;
  return `${dist.toFixed(1)}km`;
};

/**
 * Format date to readable Spanish string (e.g., "Martes, 18 de noviembre de 2025")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const formatted = d.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Format datetime to time string (e.g., "18:33")
 * @param {string|Date} datetime - DateTime to format
 * @returns {string} Formatted time in 24-hour format
 */
export const formatTimeFromDate = (datetime: string | Date): string => {
  if (!datetime) return "";
  const d = new Date(datetime);
  return d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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
 * Format time in 24-hour format without AM/PM
 * @param {string} time - Time in HH:MM:SS format in UTC (e.g., "09:00:00")
 * @returns {string} Formatted time in 24-hour format (e.g., "04:00")
 */
export const formatTime24 = (time: string): string => {
  if (!time) return "";
  const [h, m, s] = time.split(":").map(Number);
  const date = new Date();
  date.setUTCHours(h!, m, s);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date: string | Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();

  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 1) return "Hace un momento";
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  return formatDate(date);
};

/**
 * Format rating to one decimal place (no decimals for whole numbers)
 * @param {number} rating - Rating value
 * @returns {string} Formatted rating
 */
export const formatRating = (rating: number): string => {
  const num = parseFloat(rating.toString());
  if (isNaN(num)) return "0";
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};
