// Utilidades para optimizaciones SEO avanzadas

/**
 * Preload de recursos críticos para mejorar Core Web Vitals
 */
export const preloadCriticalResources = () => {
  // Preload de fuentes críticas
  const preloadFont = (href, type = 'font/woff2') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'font';
    link.type = type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };

  // Preload de CSS crítico
  const preloadCSS = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    document.head.appendChild(link);
  };

  // Preload de JavaScript crítico
  const preloadJS = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'script';
    document.head.appendChild(link);
  };

  // Implementar preloads según sea necesario
  // preloadFont('/fonts/inter-var.woff2');
  // preloadCSS('/css/critical.css');
};

/**
 * Optimizar imágenes con lazy loading y WebP
 */
export const optimizeImages = () => {
  // Detectar soporte para WebP
  const supportsWebP = () => {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  };

  // Lazy loading para imágenes
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Ejecutar optimizaciones
  supportsWebP().then(supported => {
    if (supported) {
      document.documentElement.classList.add('webp');
    }
  });

  if ('IntersectionObserver' in window) {
    lazyLoadImages();
  }
};

/**
 * Configurar Service Worker para caché inteligente
 */
export const setupServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

/**
 * Métricas de Core Web Vitals - Implementación básica sin dependencias externas
 */
export const measureCoreWebVitals = () => {
  // Función para enviar métricas a analytics
  const sendToAnalytics = (metric) => {
    // Enviar a Google Analytics 4 si está disponible
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id || 'unknown',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
    
    // Log para desarrollo
    console.log(`Core Web Vital - ${metric.name}:`, metric.value);
  };

  // Implementación básica de métricas sin librería externa
  const measureBasicMetrics = () => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          sendToAnalytics({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'lcp-' + Date.now()
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP measurement not supported');
      }

      // First Input Delay (FID) - aproximación
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            sendToAnalytics({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              id: 'fid-' + Date.now()
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID measurement not supported');
      }

      // Cumulative Layout Shift (CLS) - aproximación básica
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          sendToAnalytics({
            name: 'CLS',
            value: clsValue,
            id: 'cls-' + Date.now()
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS measurement not supported');
      }
    }

    // Métricas básicas de navegación
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          // Time to First Byte
          sendToAnalytics({
            name: 'TTFB',
            value: navigation.responseStart - navigation.requestStart,
            id: 'ttfb-' + Date.now()
          });

          // First Contentful Paint (aproximación)
          sendToAnalytics({
            name: 'FCP',
            value: navigation.loadEventStart - navigation.navigationStart,
            id: 'fcp-' + Date.now()
          });
        }
      }, 0);
    });
  };

  // Ejecutar medición básica
  measureBasicMetrics();
};

/**
 * Optimizaciones de rendimiento adicionales
 */
export const additionalPerformanceOptimizations = () => {
  // Prefetch de páginas importantes
  const prefetchPage = (href) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  // Prefetch de rutas principales
  const mainRoutes = ['/converter', '/editor', '/dev-tools', '/viewer'];
  mainRoutes.forEach(route => {
    setTimeout(() => prefetchPage(route), 2000);
  });

  // Optimizar scroll performance
  if (CSS.supports('scroll-behavior', 'smooth')) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // Reducir layout shifts
  const preventLayoutShifts = () => {
    // Reservar espacio para imágenes
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      img.style.aspectRatio = '16/9'; // Ratio por defecto
    });
  };

  // Ejecutar después de que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preventLayoutShifts);
  } else {
    preventLayoutShifts();
  }
};

/**
 * SEO técnico avanzado
 */
export const advancedTechnicalSEO = () => {
  // Agregar meta viewport optimizado
  let viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(viewportMeta);
  }

  // Agregar meta theme-color
  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = '#3b82f6';
    document.head.appendChild(themeColorMeta);
  }

  // Agregar meta para PWA
  let appleMobileWebAppCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
  if (!appleMobileWebAppCapable) {
    appleMobileWebAppCapable = document.createElement('meta');
    appleMobileWebAppCapable.name = 'apple-mobile-web-app-capable';
    appleMobileWebAppCapable.content = 'yes';
    document.head.appendChild(appleMobileWebAppCapable);
  }

  // DNS prefetch para dominios externos
  const dnsPrefetchDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

/**
 * Inicializar todas las optimizaciones SEO
 */
export const initializeSEOOptimizations = () => {
  // Ejecutar optimizaciones críticas inmediatamente
  advancedTechnicalSEO();
  preloadCriticalResources();

  // Ejecutar optimizaciones no críticas después del load
  window.addEventListener('load', () => {
    optimizeImages();
    additionalPerformanceOptimizations();
    measureCoreWebVitals();
  });

  // Setup service worker
  setupServiceWorker();
};
