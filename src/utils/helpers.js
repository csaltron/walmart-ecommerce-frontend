export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return 'Precio no disponible';
  }
  return `$${price.toFixed(2)}`;
};

export const buildSearchParams = (page, filters, sortBy, searchText, pageSize = 20) => {
  const params = {
    page,
    size: pageSize,
    search: searchText || undefined,
    category: filters.category && filters.category.length > 0 ? filters.category.join(',') : undefined,
    brand: filters.brand && filters.brand.length > 0 ? filters.brand.join(',') : undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
    inStock: filters.inStock || undefined,
  };

  if (sortBy) {
    const [field, direction] = sortBy.split('-');
    params.sortBy = field;
    params.sortDirection = direction;
  }

  return params;
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const logger = {
  log: (...args) => {
    if (isDevelopment()) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (isDevelopment()) {
      console.error(...args);
    }
  },
  warn: (...args) => {
    if (isDevelopment()) {
      console.warn(...args);
    }
  },
};
