import { useState, useEffect, useCallback } from 'react';
import catalogService from '../services/catalogService';
import { buildSearchParams } from '../utils/helpers';
import { DEFAULT_FILTERS, PAGINATION } from '../constants/config';

export const useProducts = () => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [sortBy, setSortBy] = useState('');

  const fetchProducts = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const params = buildSearchParams(
        currentPage,
        filters,
        sortBy,
        searchText,
        PAGINATION.DEFAULT_PAGE_SIZE
      );
      
      const data = await catalogService.searchProducts(params);
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error cargando productos';
      setState({ data: null, loading: false, error: errorMessage });
    }
  }, [currentPage, filters, sortBy, searchText]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
    fetchProducts();
  }, [fetchProducts]);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchText('');
    setSortBy('');
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortBy(newSort);
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  }, []);

  const handleSearch = useCallback((text) => {
    setSearchText(text);
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
  }, []);

  return {
    state,
    filters,
    searchText,
    currentPage,
    sortBy,
    updateFilters,
    applyFilters,
    clearFilters,
    handlePageChange,
    handleSortChange,
    handleSearch,
  };
};
