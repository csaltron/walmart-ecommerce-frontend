import { formatPrice, buildSearchParams } from '../utils/helpers';

describe('helpers', () => {
  describe('formatPrice', () => {
    it('debe formatear precios correctamente', () => {
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('debe manejar valores inválidos', () => {
      expect(formatPrice(null)).toBe('Precio no disponible');
      expect(formatPrice(undefined)).toBe('Precio no disponible');
      expect(formatPrice(NaN)).toBe('Precio no disponible');
    });

    it('debe manejar decimales correctamente', () => {
      expect(formatPrice(99.999)).toBe('$100.00');
      expect(formatPrice(99.1)).toBe('$99.10');
    });
  });

  describe('buildSearchParams', () => {
    it('debe construir parámetros básicos', () => {
      const filters = {
        category: [],
        brand: [],
        minPrice: null,
        maxPrice: null,
        inStock: null,
      };
      
      const params = buildSearchParams(0, filters, '', '', 20);
      
      expect(params.page).toBe(0);
      expect(params.size).toBe(20);
      expect(params.search).toBeUndefined();
    });

    it('debe incluir texto de búsqueda', () => {
      const filters = {
        category: [],
        brand: [],
        minPrice: null,
        maxPrice: null,
        inStock: null,
      };
      
      const params = buildSearchParams(0, filters, '', 'laptop', 20);
      
      expect(params.search).toBe('laptop');
    });

    it('debe incluir filtros de categoría y marca', () => {
      const filters = {
        category: ['Electrónica', 'Computadoras'],
        brand: ['Samsung', 'Apple'],
        minPrice: null,
        maxPrice: null,
        inStock: null,
      };
      
      const params = buildSearchParams(0, filters, '', '', 20);
      
      expect(params.category).toBe('Electrónica,Computadoras');
      expect(params.brand).toBe('Samsung,Apple');
    });

    it('debe incluir filtros de precio', () => {
      const filters = {
        category: [],
        brand: [],
        minPrice: 100,
        maxPrice: 500,
        inStock: null,
      };
      
      const params = buildSearchParams(0, filters, '', '', 20);
      
      expect(params.minPrice).toBe(100);
      expect(params.maxPrice).toBe(500);
    });

    it('debe incluir ordenamiento', () => {
      const filters = {
        category: [],
        brand: [],
        minPrice: null,
        maxPrice: null,
        inStock: null,
      };
      
      const params = buildSearchParams(0, filters, 'price-asc', '', 20);
      
      expect(params.sortBy).toBe('price');
      expect(params.sortDirection).toBe('asc');
    });

    it('debe incluir filtro de stock', () => {
      const filters = {
        category: [],
        brand: [],
        minPrice: null,
        maxPrice: null,
        inStock: true,
      };
      
      const params = buildSearchParams(0, filters, '', '', 20);
      
      expect(params.inStock).toBe(true);
    });
  });
});
