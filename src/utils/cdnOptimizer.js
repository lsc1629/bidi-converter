// Sistema de optimización CDN global para mercados internacionales

/**
 * Configuración de CDN por región
 */
export const CDN_CONFIG = {
  // Proveedores CDN por región
  providers: {
    global: {
      name: 'Cloudflare',
      baseUrl: 'https://cdn.bidiconverter.com',
      regions: ['global'],
      features: ['auto-minify', 'brotli', 'webp-conversion', 'polish']
    },
    
    asia: {
      name: 'Cloudflare Asia',
      baseUrl: 'https://asia-cdn.bidiconverter.com',
      regions: ['IN', 'ID', 'KR', 'JP', 'SG'],
      features: ['china-network', 'mobile-optimization']
    },
    
    americas: {
      name: 'Cloudflare Americas',
      baseUrl: 'https://americas-cdn.bidiconverter.com',
      regions: ['US', 'CA', 'BR', 'MX', 'CL', 'AR', 'CO'],
      features: ['http3', 'early-hints']
    },
    
    europe: {
      name: 'Cloudflare Europe',
      baseUrl: 'https://europe-cdn.bidiconverter.com',
      regions: ['GB', 'DE', 'FR', 'ES', 'IT', 'RU'],
      features: ['gdpr-compliant', 'eu-data-residency']
    }
  },

  // Configuración de assets por tipo
  assets: {
    images: {
      formats: ['webp', 'avif', 'jpg', 'png'],
      qualities: {
        high: 90,
        medium: 75,
        low: 60,
        'data-saver': 45
      },
      sizes: [320, 640, 768, 1024, 1280, 1920],
      lazyLoad: true,
      placeholder: 'blur'
    },
    
    scripts: {
      minify: true,
      compress: 'brotli',
      bundle: true,
      treeshake: true,
      cacheTime: '1y'
    },
    
    styles: {
      minify: true,
      compress: 'brotli',
      purge: true,
      critical: true,
      cacheTime: '1y'
    },
    
    fonts: {
      preload: ['inter-var.woff2'],
      display: 'swap',
      subset: true,
      cacheTime: '1y'
    }
  },

  // Configuración de caché por mercado
  caching: {
    'IN': {
      strategy: 'aggressive',
      ttl: '7d',
      staleWhileRevalidate: true,
      reason: 'slow-connections'
    },
    
    'ID': {
      strategy: 'aggressive',
      ttl: '7d',
      staleWhileRevalidate: true,
      reason: 'data-consciousness'
    },
    
    'RU': {
      strategy: 'balanced',
      ttl: '3d',
      staleWhileRevalidate: false,
      reason: 'quality-focus'
    },
    
    'KR': {
      strategy: 'performance',
      ttl: '1d',
      staleWhileRevalidate: true,
      reason: 'speed-focus'
    },
    
    'US': {
      strategy: 'performance',
      ttl: '1d',
      staleWhileRevalidate: true,
      reason: 'high-bandwidth'
    }
  }
};

/**
 * Clase principal para optimización CDN
 */
export class CDNOptimizer {
  constructor() {
    this.currentRegion = null;
    this.cdnProvider = null;
    this.deviceCapabilities = {};
    this.connectionInfo = {};
    this.optimizationLevel = 'medium';
    this.init();
  }

  async init() {
    await this.detectRegion();
    this.detectDeviceCapabilities();
    this.detectConnectionInfo();
    this.selectCDNProvider();
    this.determineOptimizationLevel();
    this.setupAssetOptimization();
    this.setupCacheStrategy();
  }

  /**
   * Detectar región del usuario
   */
  async detectRegion() {
    try {
      const marketManager = window.internationalMarketManager;
      if (marketManager) {
        const currentMarket = marketManager.getCurrentMarket();
        this.currentRegion = currentMarket?.code || 'US';
      } else {
        this.currentRegion = await this.detectRegionFromIP();
      }
      
      console.log('CDN Optimizer: Region detected', this.currentRegion);
    } catch (error) {
      console.warn('CDN Optimizer: Region detection failed', error);
      this.currentRegion = 'US';
    }
  }

  /**
   * Detectar región desde IP
   */
  async detectRegionFromIP() {
    try {
      const response = await fetch('https://ipapi.co/country_code/');
      const countryCode = await response.text();
      return countryCode.trim().toUpperCase();
    } catch (error) {
      return 'US';
    }
  }

  /**
   * Detectar capacidades del dispositivo
   */
  detectDeviceCapabilities() {
    this.deviceCapabilities = {
      // Soporte de formatos de imagen
      supportsWebP: this.checkWebPSupport(),
      supportsAVIF: this.checkAVIFSupport(),
      
      // Información del dispositivo
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isTablet: /iPad|Android(?=.*Tablet)|Windows(?=.*Touch)/i.test(navigator.userAgent),
      
      // Capacidades de red
      supportsHTTP3: 'serviceWorker' in navigator,
      supportsBrotli: 'CompressionStream' in window,
      
      // Información de pantalla
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio || 1,
      
      // Memoria disponible
      deviceMemory: navigator.deviceMemory || 4,
      hardwareConcurrency: navigator.hardwareConcurrency || 4
    };

    console.log('CDN Optimizer: Device capabilities', this.deviceCapabilities);
  }

  /**
   * Verificar soporte WebP
   */
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Verificar soporte AVIF
   */
  checkAVIFSupport() {
    return new Promise((resolve) => {
      const avif = new Image();
      avif.onload = avif.onerror = () => resolve(avif.height === 2);
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  /**
   * Detectar información de conexión
   */
  detectConnectionInfo() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      this.connectionInfo = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    } else {
      this.connectionInfo = {
        effectiveType: 'unknown',
        downlink: 10,
        rtt: 100,
        saveData: false
      };
    }

    console.log('CDN Optimizer: Connection info', this.connectionInfo);
  }

  /**
   * Seleccionar proveedor CDN
   */
  selectCDNProvider() {
    const regionMapping = {
      'IN': 'asia',
      'ID': 'asia', 
      'KR': 'asia',
      'JP': 'asia',
      'US': 'americas',
      'CA': 'americas',
      'BR': 'americas',
      'MX': 'americas',
      'CL': 'americas',
      'AR': 'americas',
      'CO': 'americas',
      'GB': 'europe',
      'DE': 'europe',
      'FR': 'europe',
      'ES': 'europe',
      'RU': 'europe'
    };

    const providerKey = regionMapping[this.currentRegion] || 'global';
    this.cdnProvider = CDN_CONFIG.providers[providerKey];
    
    console.log('CDN Optimizer: Selected provider', this.cdnProvider.name);
  }

  /**
   * Determinar nivel de optimización
   */
  determineOptimizationLevel() {
    const { effectiveType, saveData, downlink } = this.connectionInfo;
    const { isMobile, deviceMemory } = this.deviceCapabilities;

    // Factores para determinar optimización
    let score = 0;

    // Conexión
    if (effectiveType === '4g') score += 3;
    else if (effectiveType === '3g') score += 2;
    else if (effectiveType === '2g') score += 1;
    else score += 2; // unknown

    // Ancho de banda
    if (downlink > 10) score += 3;
    else if (downlink > 5) score += 2;
    else score += 1;

    // Dispositivo
    if (!isMobile) score += 2;
    if (deviceMemory >= 8) score += 2;
    else if (deviceMemory >= 4) score += 1;

    // Save Data
    if (saveData) score -= 2;

    // Mercado específico
    const dataConsciousMarkets = ['IN', 'ID'];
    if (dataConsciousMarkets.includes(this.currentRegion)) {
      score -= 1;
    }

    // Determinar nivel
    if (score >= 8) {
      this.optimizationLevel = 'high';
    } else if (score >= 5) {
      this.optimizationLevel = 'medium';
    } else {
      this.optimizationLevel = 'low';
    }

    console.log('CDN Optimizer: Optimization level', this.optimizationLevel, 'Score:', score);
  }

  /**
   * Configurar optimización de assets
   */
  setupAssetOptimization() {
    // Configurar optimización de imágenes
    this.setupImageOptimization();
    
    // Configurar optimización de scripts
    this.setupScriptOptimization();
    
    // Configurar optimización de estilos
    this.setupStyleOptimization();
    
    // Configurar optimización de fuentes
    this.setupFontOptimization();
  }

  /**
   * Configurar optimización de imágenes
   */
  setupImageOptimization() {
    const imageConfig = CDN_CONFIG.assets.images;
    
    // Determinar formato óptimo
    let optimalFormat = 'jpg';
    if (this.deviceCapabilities.supportsAVIF && this.optimizationLevel === 'high') {
      optimalFormat = 'avif';
    } else if (this.deviceCapabilities.supportsWebP) {
      optimalFormat = 'webp';
    }

    // Determinar calidad
    let quality = imageConfig.qualities.medium;
    if (this.connectionInfo.saveData || this.optimizationLevel === 'low') {
      quality = imageConfig.qualities['data-saver'];
    } else if (this.optimizationLevel === 'high') {
      quality = imageConfig.qualities.high;
    }

    // Configurar lazy loading
    this.setupLazyLoading();

    // Guardar configuración
    this.imageOptimization = {
      format: optimalFormat,
      quality,
      sizes: this.getOptimalImageSizes(),
      lazyLoad: true
    };

    console.log('CDN Optimizer: Image optimization configured', this.imageOptimization);
  }

  /**
   * Obtener tamaños óptimos de imagen
   */
  getOptimalImageSizes() {
    const { screenWidth, devicePixelRatio } = this.deviceCapabilities;
    const maxWidth = screenWidth * devicePixelRatio;
    
    return CDN_CONFIG.assets.images.sizes.filter(size => size <= maxWidth * 1.5);
  }

  /**
   * Configurar lazy loading
   */
  setupLazyLoading() {
    // Configurar Intersection Observer para lazy loading
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadOptimizedImage(img);
            lazyImageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: this.optimizationLevel === 'low' ? '50px' : '100px'
      });

      // Observar imágenes lazy
      document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
      });

      // Observar nuevas imágenes
      const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const lazyImages = node.querySelectorAll ? 
                node.querySelectorAll('img[data-src]') : 
                (node.tagName === 'IMG' && node.hasAttribute('data-src') ? [node] : []);
              
              lazyImages.forEach(img => lazyImageObserver.observe(img));
            }
          });
        });
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  /**
   * Cargar imagen optimizada
   */
  loadOptimizedImage(img) {
    const originalSrc = img.dataset.src;
    if (!originalSrc) return;

    const optimizedSrc = this.getOptimizedImageUrl(originalSrc);
    
    // Crear imagen temporal para precargar
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = optimizedSrc;
      img.classList.add('loaded');
    };
    tempImg.onerror = () => {
      // Fallback a imagen original
      img.src = originalSrc;
      img.classList.add('loaded');
    };
    
    tempImg.src = optimizedSrc;
  }

  /**
   * Obtener URL de imagen optimizada
   */
  getOptimizedImageUrl(originalUrl) {
    const { format, quality } = this.imageOptimization;
    const { screenWidth, devicePixelRatio } = this.deviceCapabilities;
    
    const optimalWidth = Math.min(screenWidth * devicePixelRatio, 1920);
    
    // Construir URL con parámetros de optimización
    const params = new URLSearchParams({
      format,
      quality: quality.toString(),
      width: optimalWidth.toString(),
      dpr: devicePixelRatio.toString()
    });

    return `${this.cdnProvider.baseUrl}/image/${encodeURIComponent(originalUrl)}?${params}`;
  }

  /**
   * Configurar optimización de scripts
   */
  setupScriptOptimization() {
    const scripts = document.querySelectorAll('script[src]');
    
    scripts.forEach(script => {
      const originalSrc = script.src;
      if (originalSrc.includes(window.location.origin)) {
        const optimizedSrc = this.getOptimizedScriptUrl(originalSrc);
        script.src = optimizedSrc;
      }
    });
  }

  /**
   * Obtener URL de script optimizado
   */
  getOptimizedScriptUrl(originalUrl) {
    const params = new URLSearchParams({
      minify: 'true',
      compress: 'brotli'
    });

    return `${this.cdnProvider.baseUrl}/js/${encodeURIComponent(originalUrl)}?${params}`;
  }

  /**
   * Configurar optimización de estilos
   */
  setupStyleOptimization() {
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    
    styles.forEach(style => {
      const originalHref = style.href;
      if (originalHref.includes(window.location.origin)) {
        const optimizedHref = this.getOptimizedStyleUrl(originalHref);
        style.href = optimizedHref;
      }
    });
  }

  /**
   * Obtener URL de estilo optimizado
   */
  getOptimizedStyleUrl(originalUrl) {
    const params = new URLSearchParams({
      minify: 'true',
      compress: 'brotli',
      purge: 'true'
    });

    return `${this.cdnProvider.baseUrl}/css/${encodeURIComponent(originalUrl)}?${params}`;
  }

  /**
   * Configurar optimización de fuentes
   */
  setupFontOptimization() {
    const fontConfig = CDN_CONFIG.assets.fonts;
    
    // Preload fuentes críticas
    fontConfig.preload.forEach(fontFile => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = `${this.cdnProvider.baseUrl}/fonts/${fontFile}`;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Configurar estrategia de caché
   */
  setupCacheStrategy() {
    const cacheConfig = CDN_CONFIG.caching[this.currentRegion] || CDN_CONFIG.caching['US'];
    
    // Configurar headers de caché
    this.cacheStrategy = {
      strategy: cacheConfig.strategy,
      ttl: cacheConfig.ttl,
      staleWhileRevalidate: cacheConfig.staleWhileRevalidate
    };

    console.log('CDN Optimizer: Cache strategy configured', this.cacheStrategy);
  }

  /**
   * Optimizar recurso específico
   */
  optimizeResource(url, type = 'auto') {
    if (type === 'auto') {
      type = this.detectResourceType(url);
    }

    switch (type) {
      case 'image':
        return this.getOptimizedImageUrl(url);
      case 'script':
        return this.getOptimizedScriptUrl(url);
      case 'style':
        return this.getOptimizedStyleUrl(url);
      default:
        return url;
    }
  }

  /**
   * Detectar tipo de recurso
   */
  detectResourceType(url) {
    const extension = url.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(extension)) {
      return 'image';
    } else if (['js', 'mjs'].includes(extension)) {
      return 'script';
    } else if (['css'].includes(extension)) {
      return 'style';
    } else {
      return 'unknown';
    }
  }

  /**
   * Obtener estadísticas de optimización
   */
  getOptimizationStats() {
    return {
      region: this.currentRegion,
      cdnProvider: this.cdnProvider.name,
      optimizationLevel: this.optimizationLevel,
      deviceCapabilities: this.deviceCapabilities,
      connectionInfo: this.connectionInfo,
      imageOptimization: this.imageOptimization,
      cacheStrategy: this.cacheStrategy
    };
  }

  /**
   * Purgar caché de CDN
   */
  async purgeCDNCache(urls = []) {
    try {
      const response = await fetch(`${this.cdnProvider.baseUrl}/purge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ urls })
      });

      return response.ok;
    } catch (error) {
      console.error('CDN Optimizer: Cache purge failed', error);
      return false;
    }
  }
}

/**
 * Inicializar optimizador CDN
 */
export const initializeCDNOptimizer = async () => {
  const optimizer = new CDNOptimizer();
  await optimizer.init();
  
  // Hacer disponible globalmente
  window.cdnOptimizer = optimizer;
  
  return optimizer;
};

export default CDNOptimizer;
