const CATEGORY_ICONS = {
  'Food': '🍽️',
  'Transport': '🚌',
  'Home': '🏠',
  'Accounts and Payments': '⚡',
  'Fun': '🎟️',
  'Clothing': '👕',
  'Shopping': '🛍️',
  'Health and Hygiene': '🧴',
};

const DEFAULT_CATEGORY_ICON = '💳';

const getCategoryIcon = (category) => CATEGORY_ICONS[category] || DEFAULT_CATEGORY_ICON;

const PRIMARY_CATEGORY_IDS = ['Food', 'Transport', 'Home', 'Accounts and Payments'];

export { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON, getCategoryIcon, PRIMARY_CATEGORY_IDS };
