import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'blur',
  quality = 85,
  sizes = '100vw',
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generar URLs WebP con fallback
  const generateImageSources = (originalSrc) => {
    if (!originalSrc) return { webp: '', fallback: originalSrc };
    
    const isExternal = originalSrc.startsWith('http');
    if (isExternal) {
      return { webp: originalSrc, fallback: originalSrc };
    }

    const pathParts = originalSrc.split('.');
    const extension = pathParts.pop();
    const basePath = pathParts.join('.');
    
    return {
      webp: `${basePath}.webp`,
      fallback: originalSrc
    };
  };

  const { webp, fallback } = generateImageSources(src);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority]);

  // Manejar carga de imagen
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Manejar error de imagen
  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Generar placeholder blur
  const generateBlurDataURL = (w = 10, h = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    // Crear gradiente simple como placeholder
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    return canvas.toDataURL();
  };

  // Estilos para el contenedor
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6'
  };

  // Estilos para la imagen
  const imageStyle = {
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  // Estilos para el placeholder
  const placeholderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{
        ...containerStyle,
        width: width || 'auto',
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div style={placeholderStyle}>
          {placeholder === 'blur' && (
            <div 
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${generateBlurDataURL()})`,
                backgroundSize: 'cover',
                filter: 'blur(10px)',
                transform: 'scale(1.1)'
              }}
            />
          )}
          {placeholder === 'spinner' && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          )}
          {placeholder === 'skeleton' && (
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          )}
        </div>
      )}

      {/* Imagen optimizada */}
      {(isInView || priority) && (
        <picture>
          {/* Fuente WebP */}
          <source 
            srcSet={webp} 
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback */}
          <img
            src={imageSrc}
            alt={alt}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div style={placeholderStyle}>
          <div className="text-gray-400 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Error al cargar imagen</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook para precargar imágenes críticas
export const useImagePreload = (imageSources) => {
  useEffect(() => {
    if (!Array.isArray(imageSources)) return;

    const preloadImages = imageSources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(preloadImages).then(results => {
      const successful = results.filter(result => result.status === 'fulfilled').length;
      console.log(`Preloaded ${successful}/${imageSources.length} images`);
    });
  }, [imageSources]);
};

// Componente para hero images con prioridad
export const HeroImage = ({ src, alt, className, ...props }) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={true}
      placeholder="blur"
      quality={90}
      {...props}
    />
  );
};

// Componente para imágenes de contenido
export const ContentImage = ({ src, alt, className, ...props }) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority={false}
      placeholder="skeleton"
      quality={85}
      {...props}
    />
  );
};

export default OptimizedImage;
