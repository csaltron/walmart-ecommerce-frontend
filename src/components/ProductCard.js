import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductImage } from '../hooks/useProductImage';
import { formatPrice } from '../utils/helpers';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { getImageUrl, handleImageError, handleImageLoad } = useProductImage(product);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {product.discountPercentage && (
        <span className="product-badge">↓ Rebaja</span>
      )}
      
      <img
        src={getImageUrl()}
        alt={product.name || 'Producto'}
        className="product-image"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      
      <div className="product-name">{product.name}</div>
      
      <div className="product-price">
        {product.price !== undefined && product.price !== null && (
          <span className="current-price">{formatPrice(product.price)}</span>
        )}
        {product.oldPrice && product.oldPrice !== undefined && product.oldPrice !== null && (
          <span className="old-price">{formatPrice(product.oldPrice)}</span>
        )}
      </div>
      
      {product.stock !== undefined && (
        <div className={`stock-info ${!product.available ? 'out-of-stock' : ''}`}>
          {product.available ? `Stock: ${product.stock}` : 'Agotado'}
        </div>
      )}
    </div>
  );
}

export default React.memo(ProductCard);
