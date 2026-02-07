import React, { useState, useEffect } from 'react';
import catalogService from '../services/catalogService';

function FilterSidebar({ filters, onFilterChange, onApplyFilters, onClearFilters }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const [categoriesData, brandsData] = await Promise.all([
        catalogService.getCategories(),
        catalogService.getBrands(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error cargando opciones de filtros:', error);
    }
  };

  const handleCategoryChange = (category, isChecked) => {
    const currentCategories = filters.category || [];
    let newCategories;
    if (isChecked) {
      newCategories = [...currentCategories, category];
    } else {
      newCategories = currentCategories.filter((c) => c !== category);
    }
    onFilterChange('category', newCategories);
  };

  const handleBrandChange = (brand, isChecked) => {
    const currentBrands = filters.brand || [];
    let newBrands;
    if (isChecked) {
      newBrands = [...currentBrands, brand];
    } else {
      newBrands = currentBrands.filter((b) => b !== brand);
    }
    onFilterChange('brand', newBrands);
  };

  const handleInStockChange = (e) => {
    onFilterChange('inStock', e.target.checked ? true : null);
  };

  const handlePriceFilter = () => {
    onFilterChange('minPrice', minPrice ? parseFloat(minPrice) : null);
    onFilterChange('maxPrice', maxPrice ? parseFloat(maxPrice) : null);
  };

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
              /><br />
              <input
                type="number"
                className="price-input"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className="filter-button" onClick={handlePriceFilter}>
              Aplicar Precio
            </button>
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
          />
          Solo en stock
        </label>
      </div>

      <button className="filter-button" onClick={onApplyFilters}>
        Aplicar Filtros
      </button>
      
      <button className="clear-filters" onClick={onClearFilters}>
        Limpiar Filtros
      </button>
    </div>
  );
}

export default FilterSidebar;
