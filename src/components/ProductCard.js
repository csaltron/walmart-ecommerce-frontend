import React from 'react';
import { useNavigate } from 'react-router-dom';
import comingSoonImage from '../coming-soon.png';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'Precio no disponible';
    }
    return `$${price.toFixed(2)}`;
  };

  // Intentar diferentes nombres de campo para la imagen
  const getImageUrl = () => {
    const imageUrl = product.imageUrl || product.image || product.image_url || product.imageURL;
    if (imageUrl && imageUrl.trim() !== '') {
      // Si la URL es relativa (empieza con /), podría necesitar el dominio del backend
      // Si ya es una URL completa (http:// o https://), usarla tal cual
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      // Si es relativa, intentar con el proxy del backend
      if (imageUrl.startsWith('/')) {
        // El proxy está configurado en package.json para localhost:8080
        return imageUrl;
      }
      return imageUrl;
    }
    return comingSoonImage;
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
        src={getImageUrl()}
        alt={product.name || 'Producto'}
        className="product-image"
        onError={handleImageError}
        onLoad={() => console.log('Imagen cargada correctamente:', getImageUrl())}
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

export default ProductCard;
