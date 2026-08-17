const CATEGORY_LABELS_ES = {
  'Food': 'Comida',
  'Accounts and Payments': 'Cuentas y Pagos',
  'Home': 'Hogar',
  'Transport': 'Transporte',
  'Clothing': 'Ropa',
  'Health and Hygiene': 'Salud e Higiene',
  'Shopping': 'Compras',
  'Fun': 'Diversión',
};

const getCategoryLabel = (category) => CATEGORY_LABELS_ES[category] || category;

export { CATEGORY_LABELS_ES, getCategoryLabel };
