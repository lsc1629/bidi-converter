// Sistema completo de optimización de performance para Core Web Vitals

/**
 * Clase principal para optimización de performance
 */
export class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null
    };
    this.optimizations = new Set();
    this.init();
  }

  init() {
    this.optimizeCSS();
    this.optimizeJavaScript();
    this.optimizeImages();
    this.optimizeFonts();
    this.setupCriticalResourceHints();
    this.measurePerformance();
  }

  /**
   * Optimización de CSS para reducir render blocking
   */
  optimizeCSS() {
    // Identificar CSS crítico
    const criticalCSS = this.extractCriticalCSS();
    
    // Inline CSS crítico
    if (criticalCSS) {
      this.inlineCriticalCSS(criticalCSS);
    }
    
    // Lazy load CSS no crítico
    this.lazyLoadNonCriticalCSS();
    
    // Preload CSS importante
    this.preloadImportantCSS();
  }

  /**
   * Extraer CSS crítico para above-the-fold
   */
  extractCriticalCSS() {
    const criticalSelectors = [
      'body', 'html',
      '.hero-section',
      '.navigation',
      '.header',
      '.main-content',
      '.tool-container',
      '.btn-primary',
      '.loading-spinner'
    ];

    let criticalCSS = '';
    
    // Extraer reglas CSS críticas
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.type === CSSRule.STYLE_RULE) {
            const selector = rule.selectorText;
            if (criticalSelectors.some(critical => selector.includes(critical))) {
              criticalCSS += rule.cssText + '\n';
            }
          }
        });
      } catch (e) {
        // Ignorar errores de CORS
      }
    });

    return criticalCSS;
  }

  /**
   * Inline CSS crítico en el head
   */
  inlineCriticalCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);
  }

  /**
   * Lazy load CSS no crítico
   */
  lazyLoadNonCriticalCSS() {
    const nonCriticalCSS = [
      '/css/animations.css',
      '/css/print.css',
      '/css/dark-mode.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  }

  /**
   * Preload CSS importante
   */
  preloadImportantCSS() {
    const importantCSS = [
      '/css/main.css',
      '/css/components.css'
    ];

    importantCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimización de JavaScript
   */
  optimizeJavaScript() {
    // Defer scripts no críticos
    this.deferNonCriticalScripts();
    
    // Preload scripts importantes
    this.preloadImportantScripts();
    
    // Code splitting virtual
    this.implementVirtualCodeSplitting();
  }

  /**
   * Defer scripts no críticos
   */
  deferNonCriticalScripts() {
    const scripts = document.querySelectorAll('script[src]:not([async]):not([defer])');
    scripts.forEach(script => {
      const src = script.src;
      
      // No defer para scripts críticos
      if (src.includes('critical') || src.includes('main')) {
        return;
      }
      
      script.defer = true;
    });
  }

  /**
   * Preload scripts importantes
   */
  preloadImportantScripts() {
    const importantScripts = [
      '/js/main.js',
      '/js/components.js'
    ];

    importantScripts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'script';
      document.head.appendChild(link);
    });
  }

  /**
   * Code splitting virtual para reducir bundle size
   */
  implementVirtualCodeSplitting() {
    // Simular lazy load de módulos por ruta
    const routeModules = {
      '/converter': () => Promise.resolve({ default: 'ImageConverter' }),
      '/editor': () => Promise.resolve({ default: 'ImageEditor' }),
      '/dev-tools': () => Promise.resolve({ default: 'DevTools' })
    };

    // Preload módulo de la ruta actual
    const currentPath = window.location.pathname;
    if (routeModules[currentPath]) {
      routeModules[currentPath]().catch(console.error);
    }
  }

  /**
   * Optimización de imágenes
   */
  optimizeImages() {
    // Lazy loading nativo
    this.enableNativeLazyLoading();
    
    // Optimización de formatos
    this.optimizeImageFormats();
    
    // Responsive images
    this.implementResponsiveImages();
    
    // Image preloading inteligente
    this.setupIntelligentImagePreloading();
  }

  /**
   * Habilitar lazy loading nativo
   */
  enableNativeLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      // Primeras 3 imágenes con loading eager
      if (index < 3) {
        img.loading = 'eager';
      } else {
        img.loading = 'lazy';
      }
    });
  }

  /**
   * Optimizar formatos de imagen
   */
  optimizeImageFormats() {
    // Detectar soporte WebP
    const supportsWebP = this.checkWebPSupport();
    
    if (supportsWebP) {
      document.documentElement.classList.add('webp');
    }

    // Detectar soporte AVIF
    const supportsAVIF = this.checkAVIFSupport();
    
    if (supportsAVIF) {
      document.documentElement.classList.add('avif');
    }
  }

  /**
   * Detectar soporte WebP
   */
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Detectar soporte AVIF
   */
  checkAVIFSupport() {
    return new Promise((resolve) => {
      const avif = new Image();
      avif.onload = avif.onerror = () => {
        resolve(avif.height === 2);
      };
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  /**
   * Implementar responsive images
   */
  implementResponsiveImages() {
    const images = document.querySelectorAll('img:not([srcset])');
    images.forEach(img => {
      const src = img.src;
      if (!src) return;

      // Generar srcset para diferentes densidades
      const srcset = this.generateSrcSet(src);
      if (srcset) {
        img.srcset = srcset;
        img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
      }
    });
  }

  /**
   * Generar srcset para una imagen
   */
  generateSrcSet(src) {
    const basePath = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();
    
    return [
      `${basePath}-400w.${extension} 400w`,
      `${basePath}-800w.${extension} 800w`,
      `${basePath}-1200w.${extension} 1200w`,
      `${basePath}-1600w.${extension} 1600w`
    ].join(', ');
  }

  /**
   * Preloading inteligente de imágenes
   */
  setupIntelligentImagePreloading() {
    // Preload imágenes hero
    const heroImages = document.querySelectorAll('.hero img, .banner img');
    heroImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = img.src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimización de fuentes
   */
  optimizeFonts() {
    // Preload fuentes críticas
    this.preloadCriticalFonts();
    
    // Optimizar font-display
    this.optimizeFontDisplay();
    
    // Font matching para reducir layout shift
    this.implementFontMatching();
  }

  /**
   * Preload fuentes críticas
   */
  preloadCriticalFonts() {
    const criticalFonts = [
      {
        href: '/fonts/inter-var.woff2',
        type: 'font/woff2'
      }
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.href;
      link.as = 'font';
      link.type = font.type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Optimizar font-display
   */
  optimizeFontDisplay() {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Font matching para reducir layout shift
   */
  implementFontMatching() {
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 16px;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Configurar resource hints críticos
   */
  setupCriticalResourceHints() {
    // DNS prefetch
    this.setupDNSPrefetch();
    
    // Preconnect
    this.setupPreconnect();
    
    // Prefetch de rutas probables
    this.setupRoutePrefetch();
  }

  /**
   * DNS prefetch para dominios externos
   */
  setupDNSPrefetch() {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }

  /**
   * Preconnect para recursos críticos
   */
  setupPreconnect() {
    const connections = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    connections.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Prefetch de rutas probables
   */
  setupRoutePrefetch() {
    const currentPath = window.location.pathname;
    const likelyRoutes = this.getLikelyRoutes(currentPath);
    
    setTimeout(() => {
      likelyRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    }, 2000);
  }

  /**
   * Obtener rutas probables
   */
  getLikelyRoutes(currentPath) {
    const routeMap = {
      '/': ['/converter', '/editor'],
      '/converter': ['/png-to-jpg', '/jpg-to-png'],
      '/png-to-jpg': ['/jpg-to-png', '/png-to-webp']
    };

    return routeMap[currentPath] || [];
  }

  /**
   * Medir performance y Core Web Vitals
   */
  measurePerformance() {
    // Usar PerformanceObserver nativo
    this.setupPerformanceObserver();
    
    // Medir métricas personalizadas
    this.measureCustomMetrics();
    
    // Reportar métricas
    this.setupMetricsReporting();
  }

  /**
   * Configurar PerformanceObserver
   */
  setupPerformanceObserver() {
    if (!('PerformanceObserver' in window)) return;

    // LCP Observer
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        this.reportMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }

    // FID Observer
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.reportMetric('FID', this.metrics.fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }

    // CLS Observer
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        this.reportMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  }

  /**
   * Medir métricas personalizadas
   */
  measureCustomMetrics() {
    // Time to Interactive (aproximación)
    this.measureTTI();
    
    // Resource loading times
    this.measureResourceTimes();
    
    // Custom timing marks
    this.setupCustomTimings();
  }

  /**
   * Medir Time to Interactive
   */
  measureTTI() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const tti = navigation.loadEventEnd - navigation.navigationStart;
        this.reportMetric('TTI', tti);
      }, 0);
    });
  }

  /**
   * Medir tiempos de recursos
   */
  measureResourceTimes() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      
      resources.forEach(resource => {
        if (resource.duration > 1000) { // Recursos lentos
          console.warn('Slow resource:', resource.name, resource.duration);
        }
      });
    });
  }

  /**
   * Configurar timing marks personalizados
   */
  setupCustomTimings() {
    // Mark cuando el contenido crítico está listo
    const observer = new MutationObserver(() => {
      const criticalContent = document.querySelector('.hero-section, .main-content');
      if (criticalContent) {
        performance.mark('critical-content-ready');
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  /**
   * Configurar reporte de métricas
   */
  setupMetricsReporting() {
    // Reportar a Google Analytics
    window.addEventListener('beforeunload', () => {
      this.reportAllMetrics();
    });

    // Reportar periódicamente
    setInterval(() => {
      this.reportAllMetrics();
    }, 30000); // Cada 30 segundos
  }

  /**
   * Reportar métrica individual
   */
  reportMetric(name, value) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', name, {
        event_category: 'Core Web Vitals',
        value: Math.round(value),
        non_interaction: true
      });
    }

    // Console para desarrollo
    console.log(`Performance Metric - ${name}:`, value);
  }

  /**
   * Reportar todas las métricas
   */
  reportAllMetrics() {
    Object.entries(this.metrics).forEach(([name, value]) => {
      if (value !== null) {
        this.reportMetric(name.toUpperCase(), value);
      }
    });
  }

  /**
   * Obtener métricas actuales
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Cleanup
   */
  cleanup() {
    // Limpiar observers y timers si es necesario
  }
}

/**
 * Hook de React para usar el optimizador
 */
export const usePerformanceOptimizer = (config = {}) => {
  React.useEffect(() => {
    const optimizer = new PerformanceOptimizer();
    
    return () => {
      optimizer.cleanup();
    };
  }, []);
};

/**
 * Función para inicializar optimización global
 */
export const initializePerformanceOptimization = () => {
  return new PerformanceOptimizer();
};

export default PerformanceOptimizer;
