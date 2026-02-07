import React, { useState, useEffect } from 'react';
import './styles/App.css';
import catalogService from './services/catalogService';
import FilterSidebar from './components/FilterSidebar';
import ProductList from './components/ProductList';
import logo from './logo.png';

function App() {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    minPrice: null,
    maxPrice: null,
    inStock: null,
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchText, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        size: 20,
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

      const data = await catalogService.searchProducts(params);
      setProductsData(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchInput);
    setCurrentPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(0);
    fetchProducts();
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      minPrice: null,
      maxPrice: null,
      inStock: null,
    });
    setSearchText('');
    setSearchInput('');
    setSortBy('');
    setCurrentPage(0);
    setTimeout(() => fetchProducts(), 100);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(0);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="Logo" width={100} height={100} />
          </div>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>
      </header>

      <div className="main-container">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : (
          <ProductList
            data={productsData}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
