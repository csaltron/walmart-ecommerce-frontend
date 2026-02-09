import { useCallback } from 'react';
import comingSoonImage from '../public/images/coming-soon.png';
import { logger } from '../utils/helpers';

export const useProductImage = (product) => {
  const getImageUrl = useCallback(() => {
    if (!product) {
      return comingSoonImage;
    }

    const imageUrl = product.imageUrl || product.image || product.image_url || product.imageURL;
    
    if (!imageUrl || imageUrl.trim() === '') {
      return comingSoonImage;
    }

    // Si es una URL completa, usarla directamente
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si es una ruta relativa que empieza con /, usar el proxy
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    return imageUrl;
  }, [product]);

  const handleImageError = useCallback((e) => {
    logger.error('Error cargando imagen del producto:', {
      imageUrl: product?.imageUrl,
      image: product?.image,
      image_url: product?.image_url,
      imageURL: product?.imageURL,
      srcIntentado: e.target.src
    });
    
    if (e.target.src !== comingSoonImage) {
      e.target.src = comingSoonImage;
    }
  }, [product]);

  const handleImageLoad = useCallback(() => {
    logger.log('Imagen cargada correctamente:', getImageUrl());
  }, [getImageUrl]);

  return { getImageUrl, handleImageError, handleImageLoad };
};
