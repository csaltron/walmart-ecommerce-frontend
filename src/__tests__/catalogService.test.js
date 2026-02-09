import catalogService from '../services/catalogService';
import axios from 'axios';

// Mock de axios con soporte para interceptores
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };

  return {
    create: jest.fn(() => mockAxiosInstance),
    __mockInstance: mockAxiosInstance,
  };
});

describe('catalogService', () => {
  let mockAxios;

  beforeEach(() => {
    // Recuperamos la instancia creada en el mock de axios
    mockAxios = axios.__mockInstance;
    mockAxios.get.mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('searchProducts', () => {
    it('debe buscar productos correctamente', async () => {
      const mockData = { 
        content: [], 
        totalElements: 0,
        page: 0,
        size: 20
      };
      mockAxios.get.mockResolvedValue({ data: mockData });
      
      const result = await catalogService.searchProducts({});
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products', { params: {} });
      expect(result).toEqual(mockData);
    });

    it('debe manejar errores correctamente', async () => {
      const mockError = new Error('Network error');
      mockAxios.get.mockRejectedValue(mockError);
      
      await expect(catalogService.searchProducts({})).rejects.toThrow('Network error');
    });
  });

  describe('getProductById', () => {
    it('debe obtener un producto por ID', async () => {
      const mockProduct = { 
        id: 1, 
        name: 'Test Product',
        price: 99.99
      };
      mockAxios.get.mockResolvedValue({ data: mockProduct });
      
      const result = await catalogService.getProductById(1);
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual(mockProduct);
    });

    it('debe manejar producto no encontrado', async () => {
      const mockError = { 
        response: { 
          status: 404, 
          data: { message: 'Producto no encontrado' } 
        } 
      };
      mockAxios.get.mockRejectedValue(mockError);
      
      await expect(catalogService.getProductById(999)).rejects.toMatchObject(mockError);
    });
  });

  describe('getCategories', () => {
    it('debe obtener lista de categorías', async () => {
      const mockCategories = ['Electrónica', 'Ropa', 'Hogar'];
      mockAxios.get.mockResolvedValue({ data: mockCategories });
      
      const result = await catalogService.getCategories();
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products/categories');
      expect(result).toEqual(mockCategories);
    });
  });

  describe('getBrands', () => {
    it('debe obtener lista de marcas', async () => {
      const mockBrands = ['Samsung', 'Apple', 'Sony'];
      mockAxios.get.mockResolvedValue({ data: mockBrands });
      
      const result = await catalogService.getBrands();
      
      expect(mockAxios.get).toHaveBeenCalledWith('/products/brands');
      expect(result).toEqual(mockBrands);
    });
  });
});
