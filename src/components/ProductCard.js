import React from 'react';
import { useNavigate } from 'react-router-dom';
import comingSoonImage from '../coming-soon.png';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleImageError = (e) => {
    e.target.src = comingSoonImage;
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
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
