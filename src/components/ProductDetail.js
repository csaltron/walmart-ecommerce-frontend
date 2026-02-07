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
        setError(null);
        const data = await catalogService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'No se pudo cargar el producto');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('ID de producto no válido');
      setLoading(false);
    }
  }, [id]);

  const formatPrice = (price) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'Precio no disponible';
    }
    return `$${price.toFixed(2)}`;
  };

  // Intentar diferentes nombres de campo para la imagen
  const getImageUrl = () => {
    if (!product) return comingSoonImage;
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
    console.log('Error cargando imagen del producto:', {
      imageUrl: product?.imageUrl,
      image: product?.image,
      image_url: product?.image_url,
      imageURL: product?.imageURL,
      srcIntentado: e.target.src
    });
    if (e.target.src !== comingSoonImage) {
      e.target.src = comingSoonImage;
    }
  };

  const handleBack = () => {
    navigate('/');
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
            src={getImageUrl()}
            alt={product.name || 'Producto'}
            className="product-detail-image"
            onError={handleImageError}
            onLoad={() => console.log('Imagen de detalle cargada correctamente:', getImageUrl())}
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
              {product.price !== undefined && product.price !== null && (
                <span className="current-price-large">{formatPrice(product.price)}</span>
              )}
              {product.oldPrice && product.oldPrice !== undefined && product.oldPrice !== null && (
                <span className="old-price-large">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            {product.discountPercentage && product.price !== undefined && product.price !== null && product.oldPrice !== undefined && product.oldPrice !== null && (
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
