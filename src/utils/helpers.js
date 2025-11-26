import { IMAGE_BASE_URL } from '../services/networkModule';

/**
 * Get the icon URL for an item (24x24)
 */
export const getItemIconUrl = (itemId) => {
  return `${IMAGE_BASE_URL}/items/images/item/${itemId}.png`;
};

/**
 * Get the full image URL for an item
 */
export const getItemImageUrl = (itemId) => {
  return `${IMAGE_BASE_URL}/items/images/collection/${itemId}.png`;
};

/**
 * Format a display name for an item with slots
 */
export const formatItemName = (name, slots) => {
  return slots > 0 ? `${name} [${slots}]` : name;
};

/**
 * Format a number with commas
 */
export const formatNumber = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Get period display name
 */
export const getPeriodDisplayName = (period) => {
  const periods = {
    today: 'Today',
    yesterday: 'Yesterday',
    last7days: 'Last 7 Days',
    last30days: 'Last 30 Days',
  };
  return periods[period] || period;
};
