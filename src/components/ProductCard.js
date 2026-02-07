import React from 'react';
import comingSoonImage from '../coming-soon.png';

function ProductCard({ product }) {
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleImageError = (e) => {
    e.target.src = comingSoonImage;
  };

  return (
    <div className="product-card">
      {product.discountPercentage && (
        <span className="product-badge">↓ Rebaja</span>
      )}
      
      <img
        src={product.imageUrl || comingSoonImage}
        alt={product.name}
        className="product-image"
        onError={handleImageError}
      />
      
      <div className="product-name">{product.name}</div>
      
      <div className="product-price">
        <span className="current-price">{formatPrice(product.price)}</span>
        {product.oldPrice && (
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

export default ProductCard;
