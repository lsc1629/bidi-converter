// Sistema para reducir Cumulative Layout Shift (CLS) y mejorar Core Web Vitals

/**
 * Clase principal para estabilizar el layout y reducir CLS
 */
export class LayoutStabilizer {
  constructor() {
    this.observedElements = new Set();
    this.layoutShiftScore = 0;
    this.observer = null;
    this.init();
  }

  init() {
    this.setupLayoutShiftObserver();
    this.stabilizeCommonElements();
    this.preventFontLayoutShifts();
    this.stabilizeImages();
    this.stabilizeDynamicContent();
  }

  /**
   * Observer para medir layout shifts
   */
  setupLayoutShiftObserver() {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            this.layoutShiftScore += entry.value;
            console.log('Layout Shift detected:', entry.value, 'Total:', this.layoutShiftScore);
            
            // Reportar a analytics si el score es alto
            if (this.layoutShiftScore > 0.1) {
              this.reportHighCLS(entry);
            }
          }
        }
      });

      this.observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Layout Shift Observer not supported:', error);
    }
  }

  /**
   * Estabilizar elementos comunes que causan layout shift
   */
  stabilizeCommonElements() {
    // Reservar espacio para elementos que se cargan dinámicamente
    this.reserveSpaceForElement('.dynamic-content', { minHeight: '200px' });
    this.reserveSpaceForElement('.ad-container', { minHeight: '250px' });
    this.reserveSpaceForElement('.social-widgets', { minHeight: '100px' });
    
    // Estabilizar navegación
    this.stabilizeNavigation();
    
    // Estabilizar footer
    this.stabilizeFooter();
  }

  /**
   * Reservar espacio para un elemento específico
   */
  reserveSpaceForElement(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      Object.assign(element.style, {
        ...styles,
        transition: 'none' // Evitar transiciones que causen shifts
      });
    });
  }

  /**
   * Prevenir layout shifts causados por fuentes
   */
  preventFontLayoutShifts() {
    // Usar font-display: swap para fuentes web
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
      }
      
      /* Fallback font matching para reducir shifts */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Reservar espacio para texto crítico */
      .hero-title {
        min-height: 3.5rem;
        line-height: 1.2;
      }
      
      .hero-subtitle {
        min-height: 1.5rem;
        line-height: 1.5;
      }
    `;
    document.head.appendChild(style);

    // Preload de fuentes críticas
    this.preloadCriticalFonts();
  }

  /**
   * Preload de fuentes críticas
   */
  preloadCriticalFonts() {
    const fonts = [
      {
        href: '/fonts/inter-var.woff2',
        type: 'font/woff2'
      }
    ];

    fonts.forEach(font => {
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
   * Estabilizar imágenes para prevenir layout shifts
   */
  stabilizeImages() {
    // Aplicar aspect-ratio a todas las imágenes sin dimensiones
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
      // Aplicar aspect ratio por defecto
      img.style.aspectRatio = '16/9';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      
      // Placeholder mientras carga
      if (!img.complete) {
        img.style.backgroundColor = '#f3f4f6';
      }
    });

    // Observer para imágenes que se cargan dinámicamente
    this.observeNewImages();
  }

  /**
   * Observer para nuevas imágenes que se agregan dinámicamente
   */
  observeNewImages() {
    if (!('MutationObserver' in window)) return;

    const imageObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const images = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
            images.forEach(img => {
              this.stabilizeImage(img);
            });
          }
        });
      });
    });

    imageObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Estabilizar una imagen específica
   */
  stabilizeImage(img) {
    if (!img.width && !img.height) {
      img.style.aspectRatio = '16/9';
      img.style.width = '100%';
      img.style.height = 'auto';
    }
    
    // Placeholder mientras carga
    if (!img.complete) {
      img.style.backgroundColor = '#f3f4f6';
      img.style.minHeight = '200px';
    }
  }

  /**
   * Estabilizar navegación
   */
  stabilizeNavigation() {
    const nav = document.querySelector('nav, header');
    if (nav) {
      nav.style.minHeight = '64px'; // Altura mínima para navegación
      nav.style.position = 'relative';
    }

    // Estabilizar menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.style.position = 'absolute';
      mobileMenu.style.top = '100%';
      mobileMenu.style.width = '100%';
    }
  }

  /**
   * Estabilizar footer
   */
  stabilizeFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.minHeight = '200px';
    }
  }

  /**
   * Estabilizar contenido dinámico
   */
  stabilizeDynamicContent() {
    // Contenedores de herramientas
    this.reserveSpaceForElement('.tool-container', { 
      minHeight: '400px',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb'
    });

    // Áreas de drag & drop
    this.reserveSpaceForElement('.drop-zone', {
      minHeight: '200px',
      border: '2px dashed #d1d5db',
      borderRadius: '0.5rem'
    });

    // Contenedores de resultados
    this.reserveSpaceForElement('.result-container', {
      minHeight: '150px'
    });
  }

  /**
   * Reportar CLS alto a analytics
   */
  reportHighCLS(entry) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'high_cls_detected', {
        event_category: 'Core Web Vitals',
        event_label: 'Layout Shift',
        value: Math.round(entry.value * 1000),
        custom_parameter_1: entry.sources?.[0]?.node?.tagName || 'unknown'
      });
    }
  }

  /**
   * Obtener score actual de CLS
   */
  getCurrentCLS() {
    return this.layoutShiftScore;
  }

  /**
   * Reset del score de CLS
   */
  resetCLS() {
    this.layoutShiftScore = 0;
  }

  /**
   * Cleanup
   */
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Utilidades específicas para prevenir layout shifts
 */
export const LayoutUtils = {
  /**
   * Aplicar dimensiones fijas a un elemento
   */
  fixDimensions(element, { width, height, aspectRatio }) {
    if (!element) return;

    if (width) element.style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) element.style.height = typeof height === 'number' ? `${height}px` : height;
    if (aspectRatio) element.style.aspectRatio = aspectRatio;
  },

  /**
   * Crear placeholder para contenido que se carga dinámicamente
   */
  createPlaceholder(container, { height = '200px', className = 'content-placeholder' }) {
    if (!container) return;

    const placeholder = document.createElement('div');
    placeholder.className = className;
    placeholder.style.cssText = `
      height: ${height};
      background-color: #f3f4f6;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-size: 0.875rem;
    `;
    placeholder.textContent = 'Cargando...';

    container.appendChild(placeholder);
    return placeholder;
  },

  /**
   * Remover placeholder cuando el contenido real está listo
   */
  removePlaceholder(placeholder) {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
  },

  /**
   * Aplicar skeleton loading
   */
  applySkeleton(element, lines = 3) {
    if (!element) return;

    element.innerHTML = '';
    element.style.cssText = `
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 0.25rem;
      min-height: ${lines * 1.5}rem;
    `;

    // Agregar animación CSS si no existe
    if (!document.querySelector('#skeleton-styles')) {
      const style = document.createElement('style');
      style.id = 'skeleton-styles';
      style.textContent = `
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

/**
 * Hook de React para usar el estabilizador de layout
 */
export const useLayoutStabilizer = (config = {}) => {
  const { autoInit = true, elements = [] } = config;

  React.useEffect(() => {
    if (!autoInit) return;

    const stabilizer = new LayoutStabilizer();

    // Aplicar estabilización a elementos específicos
    elements.forEach(({ selector, styles }) => {
      stabilizer.reserveSpaceForElement(selector, styles);
    });

    return () => {
      stabilizer.cleanup();
    };
  }, [autoInit, elements]);
};

/**
 * Función para inicializar estabilización global
 */
export const initializeLayoutStabilization = () => {
  // Aplicar estilos CSS globales para prevenir layout shifts
  const globalStyles = document.createElement('style');
  globalStyles.id = 'layout-stabilizer-global';
  globalStyles.textContent = `
    /* Prevenir layout shifts globales */
    * {
      box-sizing: border-box;
    }
    
    /* Estabilizar imágenes */
    img {
      max-width: 100%;
      height: auto;
    }
    
    img:not([width]):not([height]) {
      aspect-ratio: 16/9;
      background-color: #f3f4f6;
    }
    
    /* Estabilizar contenedores flexibles */
    .flex-container {
      min-height: 0;
    }
    
    /* Prevenir shifts en elementos con contenido dinámico */
    .dynamic-height {
      min-height: 1px;
    }
    
    /* Estabilizar transiciones */
    .transition-all {
      transition-property: transform, opacity;
    }
    
    /* Reservar espacio para elementos críticos */
    .hero-section {
      min-height: 400px;
    }
    
    .tool-section {
      min-height: 300px;
    }
    
    .footer-section {
      min-height: 200px;
    }
  `;

  if (!document.querySelector('#layout-stabilizer-global')) {
    document.head.appendChild(globalStyles);
  }

  // Inicializar estabilizador
  return new LayoutStabilizer();
};

export default LayoutStabilizer;
