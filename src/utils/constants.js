/**
 * Application Constants
 */

export const USER_TYPES = {
  CONSUMER: 'consumer',
  RESTAURANT: 'restaurant',
  NGO: 'ngo',
};

export const LISTING_TYPES = {
  SALE: 'sale',
  DONATION: 'donation',
};

export const LISTING_STATUS = {
  AVAILABLE: 'available',
  SOLD_OUT: 'sold_out',
  EXPIRED: 'expired',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const NOTIFICATION_TYPES = {
  NEW_LISTING: 'new_listing',
  ORDER_UPDATE: 'order_update',
  REVIEW_RECEIVED: 'review_received',
  PROMOTION: 'promotion',
};

export const ALLERGENS = [
  'gluten',
  'dairy',
  'eggs',
  'nuts',
  'soy',
  'fish',
  'shellfish',
  'sesame',
];

export const DEFAULT_RADIUS = 10; // km
export const MAX_RADIUS = 50; // km
export const COMMISSION_RATE = 0.05; // 5%

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export const TIME_FORMAT = 'HH:mm';
