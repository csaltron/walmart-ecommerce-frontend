import axios from 'axios';
import { API_CONFIG } from '../constants/config';
import { logger } from '../utils/helpers';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Agregar token si existe en localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    logger.log('Request:', config.method?.toUpperCase(), config.url, config.params);
    return config;
  },
  (error) => {
    logger.error('Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    logger.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      logger.error('Error response:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        // Sesión expirada - limpiar token y redirigir a login si es necesario
        localStorage.removeItem('authToken');
        // Aquí podrías dispatchar un evento o usar un context para manejar el logout
      } else if (error.response.status === 404) {
        logger.error('Recurso no encontrado');
      } else if (error.response.status >= 500) {
        logger.error('Error del servidor');
      }
    } else if (error.request) {
      // Request hecho pero sin respuesta
      logger.error('No response:', error.request);
    } else {
      // Error en la configuración del request
      logger.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const catalogService = {
  searchProducts: async (params) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBrands: async () => {
    try {
      const response = await api.get('/products/brands');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default catalogService;
