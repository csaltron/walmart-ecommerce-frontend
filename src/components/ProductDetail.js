import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import catalogService from '../services/catalogService';
import comingSoonImage from '../coming-soon.png';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await catalogService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error cargando producto:', err);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const handleImageError = (e) => {
    e.target.src = comingSoonImage;
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <p>{error || 'Producto no encontrado'}</p>
          <button onClick={handleBack} className="back-button">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={handleBack} className="back-button">
        ← Volver
      </button>

      <div className="product-detail">
        <div className="product-detail-image-section">
          <img
            src={product.imageUrl || comingSoonImage}
            alt={product.name}
            className="product-detail-image"
            onError={handleImageError}
          />
          {product.discountPercentage && (
            <span className="product-detail-badge">↓ Rebaja {product.discountPercentage}%</span>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>

          {product.brand && (
            <div className="product-detail-brand">
              <strong>Marca:</strong> {product.brand}
            </div>
          )}

          {product.category && (
            <div className="product-detail-category">
              <strong>Categoría:</strong> {product.category}
            </div>
          )}

          <div className="product-detail-price-section">
            <div className="product-detail-price">
              <span className="current-price-large">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="old-price-large">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            {product.discountPercentage && (
              <div className="discount-info">
                Ahorras {formatPrice(product.oldPrice - product.price)} ({product.discountPercentage}% de descuento)
              </div>
            )}
          </div>

          {product.stock !== undefined && (
            <div className={`product-detail-stock ${!product.available ? 'out-of-stock' : 'in-stock'}`}>
              {product.available ? (
                <>
                  <span className="stock-icon">✓</span>
                  <span>En stock: {product.stock} unidades disponibles</span>
                </>
              ) : (
                <>
                  <span className="stock-icon">✗</span>
                  <span>Agotado</span>
                </>
              )}
            </div>
          )}

          {product.description && (
            <div className="product-detail-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>
          )}

          {product.sku && (
            <div className="product-detail-sku">
              <strong>SKU:</strong> {product.sku}
            </div>
          )}

          <div className="product-detail-actions">
            <button 
              className="add-to-cart-button"
              disabled={!product.available}
            >
              {product.available ? 'Agregar al carrito' : 'No disponible'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
