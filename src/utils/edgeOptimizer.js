// Sistema de optimización Edge Computing para mercados globales

/**
 * Configuración de Edge Computing por región
 */
export const EDGE_CONFIG = {
  regions: {
    'americas': {
      locations: ['us-east-1', 'us-west-2', 'sa-east-1'],
      markets: ['US', 'CA', 'BR', 'MX', 'CL', 'AR', 'CO'],
      features: ['image-optimization', 'compression', 'caching']
    },
    'europe': {
      locations: ['eu-west-1', 'eu-central-1', 'eu-north-1'],
      markets: ['GB', 'DE', 'FR', 'ES', 'IT', 'RU'],
      features: ['gdpr-compliance', 'data-residency', 'compression']
    },
    'asia-pacific': {
      locations: ['ap-southeast-1', 'ap-northeast-1', 'ap-south-1'],
      markets: ['IN', 'ID', 'KR', 'JP', 'SG', 'AU'],
      features: ['mobile-optimization', 'bandwidth-adaptation', 'caching']
    }
  },

  // Funciones Edge específicas por mercado
  edgeFunctions: {
    'image-optimization': {
      markets: ['IN', 'ID', 'BR', 'MX'],
      function: 'optimizeImageForMarket',
      priority: 'high'
    },
    'compression': {
      markets: ['ALL'],
      function: 'compressResponse',
      priority: 'medium'
    },
    'geo-routing': {
      markets: ['ALL'],
      function: 'routeByGeography',
      priority: 'high'
    },
    'a-b-testing': {
      markets: ['US', 'GB', 'DE'],
      function: 'runABTest',
      priority: 'low'
    }
  },

  // Configuración de caché por mercado
  cacheStrategies: {
    'data-conscious': {
      markets: ['IN', 'ID'],
      ttl: '7d',
      compression: 'aggressive',
      imageQuality: 60
    },
    'performance': {
      markets: ['KR', 'US'],
      ttl: '1d',
      compression: 'balanced',
      imageQuality: 85
    },
    'quality': {
      markets: ['RU', 'DE'],
      ttl: '3d',
      compression: 'minimal',
      imageQuality: 90
    }
  }
};

/**
 * Clase principal para Edge Computing
 */
export class EdgeOptimizer {
  constructor() {
    this.currentRegion = null;
    this.edgeLocation = null;
    this.activeFeatures = [];
    this.performanceMetrics = {};
    this.init();
  }

  async init() {
    await this.detectOptimalEdge();
    this.setupEdgeFunctions();
    this.initializePerformanceMonitoring();
    this.setupRequestInterception();
  }

  /**
   * Detectar edge óptimo
   */
  async detectOptimalEdge() {
    try {
      const marketManager = window.internationalMarketManager;
      if (marketManager) {
        const currentMarket = marketManager.getCurrentMarket();
        this.currentRegion = this.getRegionForMarket(currentMarket?.code || 'US');
      }

      // Detectar edge location más cercano
      this.edgeLocation = await this.findNearestEdge();
      
      console.log('Edge Optimizer: Optimal edge detected', {
        region: this.currentRegion,
        location: this.edgeLocation
      });
    } catch (error) {
      console.warn('Edge Optimizer: Detection failed', error);
      this.currentRegion = 'americas';
      this.edgeLocation = 'us-east-1';
    }
  }

  /**
   * Obtener región para mercado
   */
  getRegionForMarket(marketCode) {
    for (const [region, config] of Object.entries(EDGE_CONFIG.regions)) {
      if (config.markets.includes(marketCode)) {
        return region;
      }
    }
    return 'americas'; // fallback
  }

  /**
   * Encontrar edge más cercano
   */
  async findNearestEdge() {
    const regionConfig = EDGE_CONFIG.regions[this.currentRegion];
    if (!regionConfig) return 'us-east-1';

    // Medir latencia a cada location
    const latencies = await Promise.all(
      regionConfig.locations.map(async (location) => {
        const latency = await this.measureLatency(location);
        return { location, latency };
      })
    );

    // Seleccionar el de menor latencia
    const optimal = latencies.reduce((best, current) => 
      current.latency < best.latency ? current : best
    );

    return optimal.location;
  }

  /**
   * Medir latencia a edge location
   */
  async measureLatency(location) {
    try {
      const start = performance.now();
      const response = await fetch(`https://${location}.bidiconverter.com/ping`, {
        method: 'HEAD',
        cache: 'no-cache'
      });
      const end = performance.now();
      
      return response.ok ? end - start : 9999;
    } catch (error) {
      return 9999; // Penalizar errores
    }
  }

  /**
   * Configurar funciones edge
   */
  setupEdgeFunctions() {
    const regionConfig = EDGE_CONFIG.regions[this.currentRegion];
    this.activeFeatures = regionConfig.features;

    // Configurar funciones específicas
    Object.entries(EDGE_CONFIG.edgeFunctions).forEach(([name, config]) => {
      if (this.shouldEnableFunction(config)) {
        this.enableEdgeFunction(name, config);
      }
    });

    console.log('Edge Optimizer: Functions configured', this.activeFeatures);
  }

  /**
   * Verificar si habilitar función
   */
  shouldEnableFunction(config) {
    const marketManager = window.internationalMarketManager;
    const currentMarket = marketManager?.getCurrentMarket()?.code || 'US';
    
    return config.markets.includes('ALL') || config.markets.includes(currentMarket);
  }

  /**
   * Habilitar función edge específica
   */
  enableEdgeFunction(name, config) {
    switch (name) {
      case 'image-optimization':
        this.setupImageOptimization();
        break;
      case 'compression':
        this.setupCompression();
        break;
      case 'geo-routing':
        this.setupGeoRouting();
        break;
      case 'a-b-testing':
        this.setupABTesting();
        break;
    }
  }

  /**
   * Configurar optimización de imágenes en edge
   */
  setupImageOptimization() {
    // Interceptar requests de imágenes
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      if (this.isImageRequest(url)) {
        return this.optimizeImageRequest(url, options, originalFetch);
      }
      return originalFetch(url, options);
    };

    console.log('Edge Optimizer: Image optimization enabled');
  }

  /**
   * Verificar si es request de imagen
   */
  isImageRequest(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    return imageExtensions.some(ext => url.toLowerCase().includes(ext));
  }

  /**
   * Optimizar request de imagen
   */
  async optimizeImageRequest(url, options, originalFetch) {
    const marketManager = window.internationalMarketManager;
    const currentMarket = marketManager?.getCurrentMarket()?.code || 'US';
    
    // Obtener estrategia de caché para el mercado
    const cacheStrategy = this.getCacheStrategy(currentMarket);
    
    // Construir URL optimizada
    const optimizedUrl = this.buildOptimizedImageUrl(url, cacheStrategy);
    
    // Agregar headers de optimización
    const optimizedOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
        'Save-Data': cacheStrategy.compression === 'aggressive' ? '1' : '0'
      }
    };

    return originalFetch(optimizedUrl, optimizedOptions);
  }

  /**
   * Obtener estrategia de caché para mercado
   */
  getCacheStrategy(marketCode) {
    for (const [strategy, config] of Object.entries(EDGE_CONFIG.cacheStrategies)) {
      if (config.markets.includes(marketCode)) {
        return config;
      }
    }
    return EDGE_CONFIG.cacheStrategies.performance; // fallback
  }

  /**
   * Construir URL de imagen optimizada
   */
  buildOptimizedImageUrl(originalUrl, strategy) {
    const params = new URLSearchParams({
      quality: strategy.imageQuality.toString(),
      compression: strategy.compression,
      format: 'auto',
      edge: this.edgeLocation
    });

    return `https://${this.edgeLocation}.bidiconverter.com/optimize?url=${encodeURIComponent(originalUrl)}&${params}`;
  }

  /**
   * Configurar compresión en edge
   */
  setupCompression() {
    // Interceptar responses para aplicar compresión
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      const response = await originalFetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Accept-Encoding': 'br, gzip, deflate'
        }
      });

      return this.handleCompressedResponse(response);
    };

    console.log('Edge Optimizer: Compression enabled');
  }

  /**
   * Manejar response comprimido
   */
  async handleCompressedResponse(response) {
    // Verificar si la respuesta está comprimida
    const encoding = response.headers.get('content-encoding');
    
    if (encoding && ['br', 'gzip', 'deflate'].includes(encoding)) {
      // La respuesta ya está comprimida por el edge
      this.recordCompressionMetric(encoding, response.headers.get('content-length'));
    }

    return response;
  }

  /**
   * Configurar geo-routing
   */
  setupGeoRouting() {
    // Interceptar navegación para routing geográfico
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (state, title, url) => {
      const optimizedUrl = this.optimizeUrlForRegion(url);
      return originalPushState.call(history, state, title, optimizedUrl);
    };

    history.replaceState = (state, title, url) => {
      const optimizedUrl = this.optimizeUrlForRegion(url);
      return originalReplaceState.call(history, state, title, optimizedUrl);
    };

    console.log('Edge Optimizer: Geo-routing enabled');
  }

  /**
   * Optimizar URL para región
   */
  optimizeUrlForRegion(url) {
    if (!url || typeof url !== 'string') return url;

    // Agregar parámetros de edge
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('edge', this.edgeLocation);
    urlObj.searchParams.set('region', this.currentRegion);

    return urlObj.toString();
  }

  /**
   * Configurar A/B testing en edge
   */
  setupABTesting() {
    // Solo para mercados premium
    const premiumMarkets = ['US', 'GB', 'DE'];
    const marketManager = window.internationalMarketManager;
    const currentMarket = marketManager?.getCurrentMarket()?.code || 'US';

    if (!premiumMarkets.includes(currentMarket)) return;

    // Configurar experimentos
    this.setupExperiments();

    console.log('Edge Optimizer: A/B Testing enabled');
  }

  /**
   * Configurar experimentos
   */
  setupExperiments() {
    const experiments = [
      {
        name: 'hero-cta-color',
        variants: ['blue', 'green', 'purple'],
        traffic: 0.1 // 10% del tráfico
      },
      {
        name: 'pricing-display',
        variants: ['monthly', 'yearly'],
        traffic: 0.05 // 5% del tráfico
      }
    ];

    experiments.forEach(experiment => {
      if (Math.random() < experiment.traffic) {
        this.runExperiment(experiment);
      }
    });
  }

  /**
   * Ejecutar experimento
   */
  runExperiment(experiment) {
    const variant = experiment.variants[Math.floor(Math.random() * experiment.variants.length)];
    
    // Aplicar variante
    document.body.setAttribute(`data-experiment-${experiment.name}`, variant);
    
    // Trackear experimento
    if (typeof gtag !== 'undefined') {
      gtag('event', 'experiment_view', {
        experiment_name: experiment.name,
        variant_name: variant,
        edge_location: this.edgeLocation
      });
    }

    console.log('Edge Optimizer: Experiment running', { experiment: experiment.name, variant });
  }

  /**
   * Inicializar monitoreo de performance
   */
  initializePerformanceMonitoring() {
    // Monitorear métricas de edge
    this.monitorEdgePerformance();
    
    // Reportar métricas periódicamente
    setInterval(() => {
      this.reportPerformanceMetrics();
    }, 60000); // Cada minuto
  }

  /**
   * Monitorear performance del edge
   */
  monitorEdgePerformance() {
    // Observar requests
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.name.includes(this.edgeLocation)) {
          this.recordPerformanceMetric(entry);
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'resource'] });
  }

  /**
   * Registrar métrica de performance
   */
  recordPerformanceMetric(entry) {
    const metric = {
      name: entry.name,
      duration: entry.duration,
      transferSize: entry.transferSize || 0,
      timestamp: Date.now(),
      edgeLocation: this.edgeLocation
    };

    if (!this.performanceMetrics[this.edgeLocation]) {
      this.performanceMetrics[this.edgeLocation] = [];
    }

    this.performanceMetrics[this.edgeLocation].push(metric);

    // Mantener solo las últimas 100 métricas
    if (this.performanceMetrics[this.edgeLocation].length > 100) {
      this.performanceMetrics[this.edgeLocation].shift();
    }
  }

  /**
   * Registrar métrica de compresión
   */
  recordCompressionMetric(encoding, size) {
    if (!this.performanceMetrics.compression) {
      this.performanceMetrics.compression = [];
    }

    this.performanceMetrics.compression.push({
      encoding,
      size: parseInt(size) || 0,
      timestamp: Date.now(),
      edgeLocation: this.edgeLocation
    });
  }

  /**
   * Reportar métricas de performance
   */
  reportPerformanceMetrics() {
    const metrics = this.calculateAverageMetrics();
    
    // Enviar a analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'edge_performance', {
        event_category: 'Performance',
        average_duration: metrics.averageDuration,
        average_transfer_size: metrics.averageTransferSize,
        edge_location: this.edgeLocation,
        region: this.currentRegion
      });
    }

    console.log('Edge Optimizer: Performance metrics', metrics);
  }

  /**
   * Calcular métricas promedio
   */
  calculateAverageMetrics() {
    const locationMetrics = this.performanceMetrics[this.edgeLocation] || [];
    
    if (locationMetrics.length === 0) {
      return { averageDuration: 0, averageTransferSize: 0 };
    }

    const totalDuration = locationMetrics.reduce((sum, metric) => sum + metric.duration, 0);
    const totalTransferSize = locationMetrics.reduce((sum, metric) => sum + metric.transferSize, 0);

    return {
      averageDuration: Math.round(totalDuration / locationMetrics.length),
      averageTransferSize: Math.round(totalTransferSize / locationMetrics.length),
      sampleSize: locationMetrics.length
    };
  }

  /**
   * Configurar interceptación de requests
   */
  setupRequestInterception() {
    // Service Worker message handler
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CONFIGURE_EDGE',
        payload: {
          edgeLocation: this.edgeLocation,
          region: this.currentRegion,
          features: this.activeFeatures
        }
      });
    }
  }

  /**
   * Obtener estadísticas del edge
   */
  getEdgeStats() {
    return {
      currentRegion: this.currentRegion,
      edgeLocation: this.edgeLocation,
      activeFeatures: this.activeFeatures,
      performanceMetrics: this.performanceMetrics,
      cacheStrategy: this.getCacheStrategy(
        window.internationalMarketManager?.getCurrentMarket()?.code || 'US'
      )
    };
  }

  /**
   * Cambiar edge location manualmente
   */
  async switchEdgeLocation(newLocation) {
    this.edgeLocation = newLocation;
    
    // Reconfigurar funciones
    this.setupEdgeFunctions();
    
    // Notificar cambio
    console.log('Edge Optimizer: Switched to edge location', newLocation);
    
    return true;
  }
}

/**
 * Inicializar optimizador de edge
 */
export const initializeEdgeOptimizer = async () => {
  const optimizer = new EdgeOptimizer();
  await optimizer.init();
  
  // Hacer disponible globalmente
  window.edgeOptimizer = optimizer;
  
  return optimizer;
};

export default EdgeOptimizer;
