import React from 'react';
import ProductCard from './ProductCard';
import { SORT_OPTIONS } from '../constants/config';

function ProductList({ data, currentPage, onPageChange, sortBy, onSortChange }) {
  if (!data || !data.content) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (data.content.length === 0) {
    return (
      <div className="empty-state">
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar tus filtros de búsqueda</p>
      </div>
    );
  }

  const { content, totalElements, totalPages, page, size } = data;
  const startItem = page * size + 1;
  const endItem = Math.min((page + 1) * size, totalElements);

  return (
    <div className="products-area">
      <div className="results-header">
        <div className="results-info">
          Mostrando {startItem}-{endItem} de {totalElements} resultados
        </div>
        <select 
          className="sort-select" 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Ordenar productos"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {content.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            aria-label="Página anterior"
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => {
            if (
              index === 0 ||
              index === totalPages - 1 ||
              (index >= page - 1 && index <= page + 1)
            ) {
              return (
                <button
                  key={index}
                  className={page === index ? 'active' : ''}
                  onClick={() => onPageChange(index)}
                  aria-label={`Página ${index + 1}`}
                  aria-current={page === index ? 'page' : undefined}
                >
                  {index + 1}
                </button>
              );
            } else if (index === page - 2 || index === page + 2) {
              return <span key={index}>...</span>;
            }
            return null;
          })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ProductList);
