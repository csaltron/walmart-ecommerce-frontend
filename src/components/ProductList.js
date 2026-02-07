import React from 'react';
import ProductCard from './ProductCard';

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
        <select className="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name-asc">Nombre: A-Z</option>
          <option value="name-desc">Nombre: Z-A</option>
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
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
