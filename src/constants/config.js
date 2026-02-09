export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || '/api/v1',
  TIMEOUT: 10000,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_PAGE: 0,
};

export const SORT_OPTIONS = [
  { value: '', label: 'Ordenar por' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
];

export const DEFAULT_FILTERS = {
  category: [],
  brand: [],
  minPrice: null,
  maxPrice: null,
  inStock: null,
};
