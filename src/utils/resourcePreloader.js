// Sistema avanzado de preload de recursos críticos para Core Web Vitals

/**
 * Preload de recursos críticos para mejorar LCP y FCP
 */
export class ResourcePreloader {
  constructor() {
    this.preloadedResources = new Set();
    this.criticalResources = new Map();
    this.observer = null;
    this.init();
  }

  init() {
    // Inicializar preloads críticos inmediatamente
    this.preloadCriticalResources();
    
    // Configurar preload inteligente basado en navegación
    this.setupIntelligentPreloading();
    
    // Preload de rutas probables
    this.preloadLikelyRoutes();
  }

  /**
   * Preload de recursos críticos para la primera carga
   */
  preloadCriticalResources() {
    const criticalResources = [
      // Fuentes críticas
      {
        href: '/fonts/inter-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      },
      
      // CSS crítico
      {
        href: '/css/critical.css',
        as: 'style'
      },
      
      // JavaScript crítico
      {
        href: '/js/critical.js',
        as: 'script'
      },
      
      // Imágenes hero críticas
      {
        href: '/images/hero-bg.webp',
        as: 'image',
        type: 'image/webp'
      },
      
      // Iconos críticos
      {
        href: '/images/logo.svg',
        as: 'image',
        type: 'image/svg+xml'
      }
    ];

    criticalResources.forEach(resource => {
      this.preloadResource(resource);
    });
  }

  /**
   * Preload individual de recurso
   */
  preloadResource({ href, as, type, crossorigin, media }) {
    if (this.preloadedResources.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (type) link.type = type;
    if (crossorigin) link.crossOrigin = crossorigin;
    if (media) link.media = media;
    
    // Manejar errores de preload
    link.onerror = () => {
      console.warn(`Failed to preload resource: ${href}`);
    };
    
    link.onload = () => {
      console.log(`Successfully preloaded: ${href}`);
    };

    document.head.appendChild(link);
    this.preloadedResources.add(href);
  }

  /**
   * Preload inteligente basado en interacciones del usuario
   */
  setupIntelligentPreloading() {
    // Preload al hover sobre enlaces
    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'A' && e.target.href) {
        this.preloadRoute(e.target.href);
      }
    });

    // Preload al focus en enlaces (navegación por teclado)
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'A' && e.target.href) {
        this.preloadRoute(e.target.href);
      }
    });

    // Preload basado en Intersection Observer
    this.setupViewportPreloading();
  }

  /**
   * Preload de rutas que están a punto de ser visibles
   */
  setupViewportPreloading() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.tagName === 'A') {
          this.preloadRoute(entry.target.href);
        }
      });
    }, {
      rootMargin: '100px 0px' // Preload 100px antes de ser visible
    });

    // Observar todos los enlaces
    document.querySelectorAll('a[href]').forEach(link => {
      this.observer.observe(link);
    });
  }

  /**
   * Preload de rutas específicas
   */
  preloadRoute(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      
      // Solo preload de rutas internas
      if (urlObj.origin !== window.location.origin) return;
      
      const path = urlObj.pathname;
      
      // Evitar preload duplicado
      if (this.preloadedResources.has(path)) return;

      // Crear link de prefetch para la ruta
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      
      document.head.appendChild(link);
      this.preloadedResources.add(path);
      
    } catch (error) {
      console.warn('Error preloading route:', error);
    }
  }

  /**
   * Preload de rutas más probables basado en la página actual
   */
  preloadLikelyRoutes() {
    const currentPath = window.location.pathname;
    const likelyRoutes = this.getLikelyRoutes(currentPath);
    
    // Delay para no interferir con la carga inicial
    setTimeout(() => {
      likelyRoutes.forEach(route => {
        this.preloadRoute(route);
      });
    }, 2000);
  }

  /**
   * Determinar rutas probables basado en la página actual
   */
  getLikelyRoutes(currentPath) {
    const routeMap = {
      '/': ['/converter', '/editor', '/dev-tools', '/viewer'],
      '/converter': ['/png-to-jpg', '/jpg-to-png', '/png-to-webp', '/editor'],
      '/png-to-jpg': ['/jpg-to-png', '/png-to-webp', '/converter'],
      '/jpg-to-png': ['/png-to-jpg', '/webp-to-jpg', '/converter'],
      '/png-to-webp': ['/jpg-to-webp', '/gif-to-webp', '/converter'],
      '/editor': ['/converter', '/dev-tools'],
      '/dev-tools': ['/converter', '/editor'],
      '/viewer': ['/converter', '/editor']
    };

    return routeMap[currentPath] || ['/converter', '/editor'];
  }

  /**
   * Preload de imágenes críticas para una página específica
   */
  preloadPageImages(images) {
    if (!Array.isArray(images)) return;

    images.forEach(({ src, priority = false }) => {
      if (priority) {
        // Preload inmediato para imágenes críticas
        this.preloadResource({
          href: src,
          as: 'image'
        });
      } else {
        // Preload diferido para imágenes no críticas
        setTimeout(() => {
          this.preloadResource({
            href: src,
            as: 'image'
          });
        }, 1000);
      }
    });
  }

  /**
   * Preload de recursos específicos para herramientas
   */
  preloadToolResources(toolName) {
    const toolResources = {
      converter: [
        '/js/image-converter.js',
        '/wasm/image-processor.wasm'
      ],
      editor: [
        '/js/image-editor.js',
        '/js/filters.js'
      ],
      devtools: [
        '/js/base64-encoder.js',
        '/js/favicon-generator.js'
      ]
    };

    const resources = toolResources[toolName] || [];
    resources.forEach(href => {
      this.preloadResource({
        href,
        as: href.endsWith('.js') ? 'script' : 'fetch'
      });
    });
  }

  /**
   * Cleanup de recursos no utilizados
   */
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Remover preloads antiguos para liberar memoria
    const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
    preloadLinks.forEach(link => {
      // Remover preloads de más de 5 minutos
      if (Date.now() - link.dataset.timestamp > 300000) {
        link.remove();
      }
    });
  }
}

/**
 * Hook de React para usar el preloader
 */
export const useResourcePreloader = (config = {}) => {
  const { images = [], toolName, routes = [] } = config;
  
  React.useEffect(() => {
    const preloader = new ResourcePreloader();
    
    // Preload de imágenes específicas
    if (images.length > 0) {
      preloader.preloadPageImages(images);
    }
    
    // Preload de recursos de herramienta
    if (toolName) {
      preloader.preloadToolResources(toolName);
    }
    
    // Preload de rutas específicas
    routes.forEach(route => {
      preloader.preloadRoute(route);
    });
    
    return () => {
      preloader.cleanup();
    };
  }, [images, toolName, routes]);
};

/**
 * Función para preload manual de recursos críticos
 */
export const preloadCriticalResource = (resource) => {
  const preloader = new ResourcePreloader();
  preloader.preloadResource(resource);
};

/**
 * DNS Prefetch para dominios externos
 */
export const setupDNSPrefetch = () => {
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://cdnjs.cloudflare.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Inicializar preloader global
let globalPreloader = null;

export const initializeGlobalPreloader = () => {
  if (!globalPreloader) {
    globalPreloader = new ResourcePreloader();
    setupDNSPrefetch();
  }
  return globalPreloader;
};

export default ResourcePreloader;
