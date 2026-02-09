import React, { useState, useEffect } from 'react';
import catalogService from '../services/catalogService';
import { logger } from '../utils/helpers';

function FilterSidebar({ filters, onFilterChange, onApplyFilters, onClearFilters }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      setLoading(true);
      const [categoriesData, brandsData] = await Promise.all([
        catalogService.getCategories(),
        catalogService.getBrands(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      logger.error('Error cargando opciones de filtros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category, isChecked) => {
    const currentCategories = filters.category || [];
    const newCategories = isChecked
      ? [...currentCategories, category]
      : currentCategories.filter((c) => c !== category);
    onFilterChange('category', newCategories);
  };

  const handleBrandChange = (brand, isChecked) => {
    const currentBrands = filters.brand || [];
    const newBrands = isChecked
      ? [...currentBrands, brand]
      : currentBrands.filter((b) => b !== brand);
    onFilterChange('brand', newBrands);
  };

  const handleInStockChange = (e) => {
    onFilterChange('inStock', e.target.checked ? true : null);
  };

  const handleApplyPriceAndFilters = () => {
    onFilterChange('minPrice', minPrice ? parseFloat(minPrice) : null);
    onFilterChange('maxPrice', maxPrice ? parseFloat(maxPrice) : null);
    // Pequeño delay para asegurar que los filtros se actualicen
    setTimeout(() => {
      onApplyFilters();
    }, 50);
  };

  const handleClearAll = () => {
    setMinPrice('');
    setMaxPrice('');
    onClearFilters();
  };

  if (loading) {
    return (
      <div className="sidebar">
        <div className="loading">Cargando filtros...</div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="filter-section">
        <details className="filter-accordion">
          <summary className="filter-accordion-summary">
            <h3>Precio</h3>
            {(filters.minPrice || filters.maxPrice) && (
              <span className="filter-count">✓</span>
            )}
          </summary>
          <div className="filter-accordion-content">
            <div className="price-inputs">
              <input
                type="number"
                className="price-input"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
                aria-label="Precio mínimo"
              />
              <input
                type="number"
                className="price-input"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
                aria-label="Precio máximo"
              />
            </div>
          </div>
        </details>
      </div>

      <div className="filter-section">
        <details className="filter-accordion">
          <summary className="filter-accordion-summary">
            <h3>Categoría</h3>
            {filters.category && filters.category.length > 0 && (
              <span className="filter-count">({filters.category.length})</span>
            )}
          </summary>
          <div className="filter-accordion-content">
            {categories.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.category && filters.category.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  aria-label={`Filtrar por categoría ${category}`}
                />
                {category}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div className="filter-section">
        <details className="filter-accordion">
          <summary className="filter-accordion-summary">
            <h3>Marca</h3>
            {filters.brand && filters.brand.length > 0 && (
              <span className="filter-count">({filters.brand.length})</span>
            )}
          </summary>
          <div className="filter-accordion-content">
            {brands.map((brand) => (
              <label key={brand} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.brand && filters.brand.includes(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  aria-label={`Filtrar por marca ${brand}`}
                />
                {brand}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div className="filter-section">
        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={handleInStockChange}
            aria-label="Solo productos en stock"
          />
          Solo en stock
        </label>
      </div>

      <button className="filter-button" onClick={handleApplyPriceAndFilters}>
        Aplicar Filtros
      </button>
      
      <button className="clear-filters" onClick={handleClearAll}>
        Limpiar Filtros
      </button>
    </div>
  );
}

export default FilterSidebar;
