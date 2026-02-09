import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import logo from '../public/images/logo.png';
import '../styles/App.css';

function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  
  const {
    state,
    filters,
    currentPage,
    sortBy,
    updateFilters,
    applyFilters,
    clearFilters,
    handlePageChange,
    handleSortChange,
    handleSearch,
  } = useProducts();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleClearFiltersAndInput = () => {
    setSearchInput('');
    clearFilters();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src={logo} alt="Logo" width={100} height={100} />
          </div>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
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
          onFilterChange={updateFilters}
          onApplyFilters={applyFilters}
          onClearFilters={handleClearFiltersAndInput}
        />

        {state.loading ? (
          <div className="loading">Cargando productos...</div>
        ) : state.error ? (
          <div className="error-message">
            <p>Error: {state.error}</p>
            <button onClick={applyFilters} className="retry-button">
              Reintentar
            </button>
          </div>
        ) : (
          <ProductList
            data={state.data}
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

export default HomePage;
