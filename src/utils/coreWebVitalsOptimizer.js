// Optimizador de Core Web Vitals

export const CORE_WEB_VITALS_CONFIG = {
  // Thresholds oficiales de Google
  thresholds: {
    lcp: { good: 2500, needs_improvement: 4000 }, // ms
    fid: { good: 100, needs_improvement: 300 },   // ms
    cls: { good: 0.1, needs_improvement: 0.25 }   // score
  },

  // Optimizaciones por mercado
  marketOptimizations: {
    'IN': { // India - conexiones lentas
      imageQuality: 0.7,
      enableWebP: true,
      lazyLoadThreshold: '200px',
      preloadCritical: 2
    },
    'ID': { // Indonesia - móvil first
      imageQuality: 0.75,
      enableWebP: true,
      lazyLoadThreshold: '150px',
      preloadCritical: 3
    },
    'RU': { // Rusia - calidad premium
      imageQuality: 0.85,
      enableWebP: true,
      lazyLoadThreshold: '100px',
      preloadCritical: 4
    },
    'KR': { // Corea - ultra velocidad
      imageQuality: 0.8,
      enableWebP: true,
      lazyLoadThreshold: '50px',
      preloadCritical: 5
    },
    'US': { // US - balanceado
      imageQuality: 0.8,
      enableWebP: true,
      lazyLoadThreshold: '100px',
      preloadCritical: 4
    }
  },

  // Recursos críticos por página
  criticalResources: {
    'homepage': ['hero-image', 'main-css', 'primary-font'],
    'converter': ['tool-css', 'conversion-js', 'upload-icon'],
    'viewer': ['viewer-css', 'pdf-js', 'viewer-controls'],
    'qr-generator': ['qr-css', 'qr-js', 'generator-icon']
  }
};

export class CoreWebVitalsOptimizer {
  constructor() {
    this.metrics = {};
    this.observer = null;
    this.currentMarket = 'US';
    this.optimizations = new Map();
    this.performanceEntries = [];
    this.init();
  }

  async init() {
    this.detectMarket();
    this.setupPerformanceObserver();
    this.optimizeLCP();
    this.optimizeFID();
    this.optimizeCLS();
    this.setupImageOptimization();
    this.setupCodeSplitting();
    this.setupResourcePreloading();
    this.startMonitoring();
  }

  detectMarket() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentMarket = market?.code || 'US';
    }
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Observar Core Web Vitals
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.handlePerformanceEntry(entry);
        });
      });

      // Observar diferentes tipos de métricas
      try {
        this.observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        console.warn('Performance Observer not fully supported');
      }
    }
  }

  handlePerformanceEntry(entry) {
    switch (entry.entryType) {
      case 'largest-contentful-paint':
        this.metrics.lcp = entry.startTime;
        this.evaluateLCP(entry.startTime);
        break;
      case 'first-input':
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.evaluateFID(this.metrics.fid);
        break;
      case 'layout-shift':
        if (!entry.hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + entry.value;
          this.evaluateCLS(this.metrics.cls);
        }
        break;
    }

    this.performanceEntries.push({
      type: entry.entryType,
      value: entry.value || entry.startTime,
      timestamp: Date.now()
    });
  }

  // OPTIMIZACIÓN LCP (Largest Contentful Paint)
  optimizeLCP() {
    console.log('🎯 Optimizing LCP (Largest Contentful Paint)');
    
    // 1. Preload critical resources
    this.preloadCriticalResources();
    
    // 2. Optimize images
    this.optimizeCriticalImages();
    
    // 3. Optimize fonts
    this.optimizeFontLoading();
    
    // 4. Remove render-blocking resources
    this.removeRenderBlockingResources();
  }

  preloadCriticalResources() {
    const pageType = this.detectPageType();
    const criticalResources = CORE_WEB_VITALS_CONFIG.criticalResources[pageType] || [];
    const marketConfig = CORE_WEB_VITALS_CONFIG.marketOptimizations[this.currentMarket];
    
    criticalResources.slice(0, marketConfig.preloadCritical).forEach(resource => {
      this.preloadResource(resource);
    });
  }

  preloadResource(resourceId) {
    const resourceMap = {
      'hero-image': '/images/hero-optimized.webp',
      'main-css': '/css/critical.css',
      'primary-font': '/fonts/inter-var.woff2',
      'tool-css': '/css/tools.css',
      'conversion-js': '/js/converter.js'
    };

    const resourceUrl = resourceMap[resourceId];
    if (!resourceUrl) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resourceUrl.includes('.woff2')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resourceUrl.includes('.css')) {
      link.as = 'style';
    } else if (resourceUrl.includes('.js')) {
      link.as = 'script';
    } else if (resourceUrl.includes('.webp') || resourceUrl.includes('.jpg')) {
      link.as = 'image';
    }
    
    link.href = resourceUrl;
    document.head.appendChild(link);
  }

  optimizeCriticalImages() {
    const marketConfig = CORE_WEB_VITALS_CONFIG.marketOptimizations[this.currentMarket];
    
    // Optimizar imágenes above-the-fold
    const criticalImages = document.querySelectorAll('img[data-critical="true"], .hero img, .above-fold img');
    
    criticalImages.forEach(img => {
      // Preload critical images
      if (!img.loading) {
        img.loading = 'eager';
      }
      
      // Add fetchpriority for LCP candidates
      img.fetchPriority = 'high';
      
      // Optimize for market
      if (marketConfig.enableWebP && !img.src.includes('.webp')) {
        this.convertToWebP(img);
      }
    });
  }

  convertToWebP(img) {
    // Simular conversión a WebP (en implementación real sería server-side)
    const originalSrc = img.src;
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Verificar si WebP está disponible
    const webpSupported = this.supportsWebP();
    if (webpSupported) {
      img.src = webpSrc;
    }
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  optimizeFontLoading() {
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-latin.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });

    // Add font-display: swap to CSS
    this.addFontDisplaySwap();
  }

  addFontDisplaySwap() {
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

  removeRenderBlockingResources() {
    // Defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = function() { this.media = 'all'; };
    });

    // Defer non-critical JavaScript
    const nonCriticalJS = document.querySelectorAll('script:not([data-critical]):not([async]):not([defer])');
    nonCriticalJS.forEach(script => {
      if (!script.src.includes('critical') && !script.src.includes('inline')) {
        script.defer = true;
      }
    });
  }

  // OPTIMIZACIÓN FID (First Input Delay)
  optimizeFID() {
    console.log('⚡ Optimizing FID (First Input Delay)');
    
    // 1. Code splitting
    this.implementCodeSplitting();
    
    // 2. Reduce JavaScript execution time
    this.optimizeJavaScriptExecution();
    
    // 3. Use web workers for heavy tasks
    this.setupWebWorkers();
    
    // 4. Optimize event listeners
    this.optimizeEventListeners();
  }

  implementCodeSplitting() {
    // Dynamic imports for non-critical functionality
    const lazyLoadModules = [
      'analytics',
      'social-sharing',
      'advanced-features',
      'admin-panel'
    ];

    lazyLoadModules.forEach(module => {
      this.lazyLoadModule(module);
    });
  }

  async lazyLoadModule(moduleName) {
    try {
      // Simular lazy loading sin dynamic imports reales
      if (this.shouldLoadModule(moduleName)) {
        // Simular carga del módulo
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`Lazy loaded: ${moduleName}`);
        
        // Marcar como cargado
        this.loadedModules = this.loadedModules || new Set();
        this.loadedModules.add(moduleName);
      }
    } catch (error) {
      console.warn(`Failed to lazy load ${moduleName}:`, error);
    }
  }

  shouldLoadModule(moduleName) {
    // Cargar módulos basado en interacción del usuario
    const triggers = {
      'analytics': () => window.gtag !== undefined,
      'social-sharing': () => document.querySelector('.share-button') !== null,
      'advanced-features': () => localStorage.getItem('user-level') === 'advanced'
    };

    return triggers[moduleName] ? triggers[moduleName]() : false;
  }

  optimizeJavaScriptExecution() {
    // Usar requestIdleCallback para tareas no críticas
    if ('requestIdleCallback' in window) {
      this.scheduleNonCriticalTasks();
    }

    // Debounce expensive operations
    this.setupDebouncedOperations();
  }

  scheduleNonCriticalTasks() {
    const nonCriticalTasks = [
      () => this.initializeAnalytics(),
      () => this.setupSocialSharing(),
      () => this.preloadNextPageResources()
    ];

    nonCriticalTasks.forEach(task => {
      requestIdleCallback(task, { timeout: 5000 });
    });
  }

  setupDebouncedOperations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = (event) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (originalScrollHandler) originalScrollHandler(event);
      }, 16); // ~60fps
    };
  }

  setupWebWorkers() {
    if ('Worker' in window) {
      // Web Worker para tareas pesadas
      const workerCode = `
        self.onmessage = function(e) {
          const { type, data } = e.data;
          
          switch(type) {
            case 'heavy-calculation':
              const result = performHeavyCalculation(data);
              self.postMessage({ type: 'calculation-result', result });
              break;
          }
        };
        
        function performHeavyCalculation(data) {
          // Simular cálculo pesado
          let result = 0;
          for(let i = 0; i < 1000000; i++) {
            result += Math.random();
          }
          return result;
        }
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));
      
      this.worker.onmessage = (e) => {
        console.log('Worker result:', e.data);
      };
    }
  }

  optimizeEventListeners() {
    // Usar passive listeners para scroll y touch
    const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    
    passiveEvents.forEach(eventType => {
      this.makeEventListenersPassive(eventType);
    });
  }

  makeEventListenersPassive(eventType) {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === eventType && typeof options !== 'object') {
        options = { passive: true };
      } else if (type === eventType && typeof options === 'object') {
        options.passive = true;
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  // OPTIMIZACIÓN CLS (Cumulative Layout Shift)
  optimizeCLS() {
    console.log('📐 Optimizing CLS (Cumulative Layout Shift)');
    
    // 1. Reserve space for images
    this.reserveImageSpace();
    
    // 2. Reserve space for ads
    this.reserveAdSpace();
    
    // 3. Avoid inserting content above existing content
    this.preventContentInsertion();
    
    // 4. Use CSS containment
    this.applyCSSContainment();
  }

  reserveImageSpace() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    
    images.forEach(img => {
      // Set aspect ratio to prevent layout shift
      if (!img.style.aspectRatio) {
        img.style.aspectRatio = '16/9'; // Default aspect ratio
      }
      
      // Add loading placeholder
      if (!img.complete) {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '200px';
      }
    });
  }

  reserveAdSpace() {
    const adSlots = document.querySelectorAll('.ad-slot, [data-ad]');
    
    adSlots.forEach(slot => {
      if (!slot.style.minHeight) {
        slot.style.minHeight = '250px'; // Standard ad height
        slot.style.backgroundColor = '#f8f8f8';
        slot.style.border = '1px solid #e0e0e0';
      }
    });
  }

  preventContentInsertion() {
    // Monitor DOM changes that could cause layout shifts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          this.handleDynamicContent(mutation);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  handleDynamicContent(mutation) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Ensure dynamic content doesn't cause layout shift
        if (!node.style.position) {
          node.style.transform = 'translateZ(0)'; // Force GPU layer
        }
      }
    });
  }

  applyCSSContainment() {
    const style = document.createElement('style');
    style.textContent = `
      .tool-container {
        contain: layout style paint;
      }
      
      .ad-container {
        contain: layout size;
      }
      
      .image-gallery {
        contain: layout;
      }
    `;
    document.head.appendChild(style);
  }

  // EVALUACIÓN DE MÉTRICAS
  evaluateLCP(value) {
    const threshold = CORE_WEB_VITALS_CONFIG.thresholds.lcp;
    let status = 'poor';
    
    if (value <= threshold.good) {
      status = 'good';
    } else if (value <= threshold.needs_improvement) {
      status = 'needs-improvement';
    }
    
    this.reportMetric('lcp', value, status);
  }

  evaluateFID(value) {
    const threshold = CORE_WEB_VITALS_CONFIG.thresholds.fid;
    let status = 'poor';
    
    if (value <= threshold.good) {
      status = 'good';
    } else if (value <= threshold.needs_improvement) {
      status = 'needs-improvement';
    }
    
    this.reportMetric('fid', value, status);
  }

  evaluateCLS(value) {
    const threshold = CORE_WEB_VITALS_CONFIG.thresholds.cls;
    let status = 'poor';
    
    if (value <= threshold.good) {
      status = 'good';
    } else if (value <= threshold.needs_improvement) {
      status = 'needs-improvement';
    }
    
    this.reportMetric('cls', value, status);
  }

  reportMetric(metric, value, status) {
    console.log(`Core Web Vital - ${metric.toUpperCase()}: ${value} (${status})`);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'core_web_vital', {
        event_category: 'Performance',
        event_label: metric,
        value: Math.round(value),
        custom_parameter_1: status,
        custom_parameter_2: this.currentMarket
      });
    }
  }

  // MONITOREO CONTINUO
  startMonitoring() {
    // Monitor performance every 30 seconds
    setInterval(() => {
      this.collectPerformanceMetrics();
    }, 30000);

    // Monitor on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportFinalMetrics();
      }
    });
  }

  collectPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    if (navigation) {
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstByte: navigation.responseStart - navigation.requestStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart
      };
      
      this.optimizations.set('navigation-timing', metrics);
    }
  }

  reportFinalMetrics() {
    const finalReport = {
      cwv: this.metrics,
      optimizations: Object.fromEntries(this.optimizations),
      market: this.currentMarket,
      timestamp: Date.now(),
      performanceEntries: this.performanceEntries.slice(-10) // Last 10 entries
    };
    
    console.log('Final Performance Report:', finalReport);
    
    // Send final report to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_report', {
        event_category: 'Core Web Vitals',
        event_label: 'final_report',
        custom_parameter_1: JSON.stringify(finalReport)
      });
    }
  }

  // MÉTODOS AUXILIARES
  detectPageType() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '') return 'homepage';
    if (path.includes('/converter')) return 'converter';
    if (path.includes('/viewer')) return 'viewer';
    if (path.includes('/qr-generator')) return 'qr-generator';
    
    return 'generic';
  }

  initializeAnalytics() {
    // Initialize analytics in idle time
    console.log('Analytics initialized during idle time');
  }

  setupSocialSharing() {
    // Setup social sharing during idle time
    console.log('Social sharing setup during idle time');
  }

  preloadNextPageResources() {
    // Preload likely next page resources
    const likelyNextPages = ['/converter', '/viewer', '/qr-generator'];
    
    likelyNextPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }

  // API PÚBLICA
  getMetrics() {
    return {
      cwv: this.metrics,
      market: this.currentMarket,
      optimizations: Array.from(this.optimizations.keys()),
      status: this.getOverallStatus()
    };
  }

  getOverallStatus() {
    const { lcp, fid, cls } = this.metrics;
    const thresholds = CORE_WEB_VITALS_CONFIG.thresholds;
    
    let goodCount = 0;
    let totalCount = 0;
    
    if (lcp !== undefined) {
      totalCount++;
      if (lcp <= thresholds.lcp.good) goodCount++;
    }
    
    if (fid !== undefined) {
      totalCount++;
      if (fid <= thresholds.fid.good) goodCount++;
    }
    
    if (cls !== undefined) {
      totalCount++;
      if (cls <= thresholds.cls.good) goodCount++;
    }
    
    const score = totalCount > 0 ? (goodCount / totalCount) * 100 : 0;
    
    if (score >= 75) return 'good';
    if (score >= 50) return 'needs-improvement';
    return 'poor';
  }

  forceOptimization() {
    // Force immediate optimization
    this.optimizeLCP();
    this.optimizeFID();
    this.optimizeCLS();
  }
}

export const initializeCoreWebVitalsOptimizer = async () => {
  const optimizer = new CoreWebVitalsOptimizer();
  await optimizer.init();
  
  window.coreWebVitalsOptimizer = optimizer;
  return optimizer;
};

export default CoreWebVitalsOptimizer;
