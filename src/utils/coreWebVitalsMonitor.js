// Sistema de monitoreo continuo de Core Web Vitals

/**
 * Monitor de Core Web Vitals con reporting avanzado
 */
export class CoreWebVitalsMonitor {
  constructor(config = {}) {
    this.config = {
      reportingEndpoint: config.reportingEndpoint || null,
      sampleRate: config.sampleRate || 1, // 100% por defecto
      thresholds: {
        lcp: { good: 2500, poor: 4000 },
        fid: { good: 100, poor: 300 },
        cls: { good: 0.1, poor: 0.25 },
        fcp: { good: 1800, poor: 3000 },
        ttfb: { good: 800, poor: 1800 }
      },
      ...config
    };

    this.metrics = new Map();
    this.observers = new Map();
    this.isMonitoring = false;
    
    this.init();
  }

  init() {
    if (Math.random() > this.config.sampleRate) {
      console.log('CWV Monitor: Skipped due to sampling rate');
      return;
    }

    this.setupObservers();
    this.setupPageLifecycleListeners();
    this.startMonitoring();
  }

  /**
   * Configurar observers para métricas
   */
  setupObservers() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
    
    // Custom metrics
    this.observeCustomMetrics();
  }

  /**
   * Observer para Largest Contentful Paint
   */
  observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.recordMetric('LCP', {
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown',
          url: lastEntry.url || 'unknown',
          timestamp: Date.now()
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', observer);
    } catch (error) {
      console.warn('CWV Monitor: LCP observation failed', error);
    }
  }

  /**
   * Observer para First Input Delay
   */
  observeFID() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          this.recordMetric('FID', {
            value: entry.processingStart - entry.startTime,
            eventType: entry.name,
            timestamp: Date.now()
          });
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', observer);
    } catch (error) {
      console.warn('CWV Monitor: FID observation failed', error);
    }
  }

  /**
   * Observer para Cumulative Layout Shift
   */
  observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];

      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          // Solo contar shifts sin input reciente
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            // Si han pasado más de 1 segundo desde el último entry
            // o más de 5 segundos desde el primero, iniciar nueva sesión
            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime > 1000 ||
                entry.startTime - firstSessionEntry.startTime > 5000) {
              
              // Finalizar sesión actual
              this.recordMetric('CLS', {
                value: sessionValue,
                entries: sessionEntries.length,
                timestamp: Date.now()
              });

              // Iniciar nueva sesión
              sessionValue = 0;
              sessionEntries = [];
            }

            sessionValue += entry.value;
            sessionEntries.push(entry);
            clsValue += entry.value;
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', observer);

      // Reportar CLS final al salir de la página
      addEventListener('beforeunload', () => {
        if (sessionValue > 0) {
          this.recordMetric('CLS', {
            value: sessionValue,
            entries: sessionEntries.length,
            timestamp: Date.now(),
            final: true
          });
        }
      });

    } catch (error) {
      console.warn('CWV Monitor: CLS observation failed', error);
    }
  }

  /**
   * Observer para First Contentful Paint
   */
  observeFCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', {
              value: entry.startTime,
              timestamp: Date.now()
            });
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', observer);
    } catch (error) {
      console.warn('CWV Monitor: FCP observation failed', error);
    }
  }

  /**
   * Observer para Time to First Byte
   */
  observeTTFB() {
    try {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        this.recordMetric('TTFB', {
          value: ttfb,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.warn('CWV Monitor: TTFB measurement failed', error);
    }
  }

  /**
   * Observer para métricas personalizadas
   */
  observeCustomMetrics() {
    // Time to Interactive (aproximación)
    this.measureTTI();
    
    // Resource loading performance
    this.measureResourcePerformance();
    
    // User interaction metrics
    this.measureUserInteractions();
  }

  /**
   * Medir Time to Interactive
   */
  measureTTI() {
    addEventListener('load', () => {
      // Esperar a que se estabilice la página
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const tti = navigation.loadEventEnd - navigation.navigationStart;
        
        this.recordMetric('TTI', {
          value: tti,
          timestamp: Date.now()
        });
      }, 100);
    });
  }

  /**
   * Medir performance de recursos
   */
  measureResourcePerformance() {
    addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      
      const slowResources = resources.filter(resource => resource.duration > 1000);
      const totalResourceTime = resources.reduce((sum, resource) => sum + resource.duration, 0);
      
      this.recordMetric('ResourcePerformance', {
        totalResources: resources.length,
        slowResources: slowResources.length,
        totalTime: totalResourceTime,
        averageTime: totalResourceTime / resources.length,
        timestamp: Date.now()
      });
    });
  }

  /**
   * Medir interacciones del usuario
   */
  measureUserInteractions() {
    let interactionCount = 0;
    let totalInteractionTime = 0;

    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      addEventListener(eventType, (event) => {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const interactionTime = endTime - startTime;
          
          interactionCount++;
          totalInteractionTime += interactionTime;
          
          // Reportar interacciones lentas
          if (interactionTime > 100) {
            this.recordMetric('SlowInteraction', {
              type: eventType,
              duration: interactionTime,
              target: event.target?.tagName || 'unknown',
              timestamp: Date.now()
            });
          }
        });
      });
    });

    // Reportar métricas de interacción periódicamente
    setInterval(() => {
      if (interactionCount > 0) {
        this.recordMetric('InteractionMetrics', {
          count: interactionCount,
          averageTime: totalInteractionTime / interactionCount,
          timestamp: Date.now()
        });
        
        // Reset counters
        interactionCount = 0;
        totalInteractionTime = 0;
      }
    }, 30000); // Cada 30 segundos
  }

  /**
   * Configurar listeners del ciclo de vida de la página
   */
  setupPageLifecycleListeners() {
    // Visibilidad de la página
    document.addEventListener('visibilitychange', () => {
      this.recordMetric('VisibilityChange', {
        hidden: document.hidden,
        timestamp: Date.now()
      });
    });

    // Antes de salir de la página
    addEventListener('beforeunload', () => {
      this.finalizeAndReport();
    });

    // Page freeze/resume (para mobile)
    addEventListener('freeze', () => {
      this.recordMetric('PageFreeze', { timestamp: Date.now() });
    });

    addEventListener('resume', () => {
      this.recordMetric('PageResume', { timestamp: Date.now() });
    });
  }

  /**
   * Registrar métrica
   */
  recordMetric(name, data) {
    const metric = {
      name,
      ...data,
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: this.getConnectionInfo(),
      viewport: this.getViewportInfo()
    };

    // Almacenar métrica
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name).push(metric);

    // Evaluar y reportar
    this.evaluateMetric(name, data.value);
    this.reportMetric(metric);

    // Log para desarrollo
    console.log(`CWV Monitor - ${name}:`, data.value, this.getMetricRating(name, data.value));
  }

  /**
   * Evaluar métrica contra thresholds
   */
  evaluateMetric(name, value) {
    const lowerName = name.toLowerCase();
    const threshold = this.config.thresholds[lowerName];
    
    if (!threshold || value === undefined) return;

    const rating = this.getMetricRating(name, value);
    
    // Alertar sobre métricas pobres
    if (rating === 'poor') {
      console.warn(`CWV Alert: ${name} is poor (${value}ms)`);
      
      // Trigger custom event para alertas
      window.dispatchEvent(new CustomEvent('cwv-poor-metric', {
        detail: { name, value, rating }
      }));
    }
  }

  /**
   * Obtener rating de métrica
   */
  getMetricRating(name, value) {
    const lowerName = name.toLowerCase();
    const threshold = this.config.thresholds[lowerName];
    
    if (!threshold) return 'unknown';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Obtener información de conexión
   */
  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return null;
  }

  /**
   * Obtener información del viewport
   */
  getViewportInfo() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    };
  }

  /**
   * Reportar métrica
   */
  reportMetric(metric) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Core Web Vitals',
        event_label: window.location.pathname,
        value: Math.round(metric.value || 0),
        custom_parameter_1: this.getMetricRating(metric.name, metric.value),
        non_interaction: true
      });
    }

    // Endpoint personalizado
    if (this.config.reportingEndpoint) {
      this.sendToEndpoint(metric);
    }
  }

  /**
   * Enviar a endpoint personalizado
   */
  async sendToEndpoint(metric) {
    try {
      await fetch(this.config.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metric),
        keepalive: true
      });
    } catch (error) {
      console.warn('CWV Monitor: Failed to send metric to endpoint', error);
    }
  }

  /**
   * Finalizar y reportar todas las métricas
   */
  finalizeAndReport() {
    const summary = this.generateSummary();
    
    // Reportar resumen final
    this.reportMetric({
      name: 'SessionSummary',
      ...summary,
      timestamp: Date.now()
    });

    console.log('CWV Monitor: Session Summary', summary);
  }

  /**
   * Generar resumen de la sesión
   */
  generateSummary() {
    const summary = {
      url: window.location.href,
      duration: Date.now() - performance.timing.navigationStart,
      metrics: {}
    };

    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        const lastValue = values[values.length - 1];
        summary.metrics[name] = {
          value: lastValue.value,
          rating: this.getMetricRating(name, lastValue.value),
          count: values.length
        };
      }
    });

    return summary;
  }

  /**
   * Obtener métricas actuales
   */
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Iniciar monitoreo
   */
  startMonitoring() {
    this.isMonitoring = true;
    console.log('CWV Monitor: Started monitoring Core Web Vitals');
  }

  /**
   * Detener monitoreo
   */
  stopMonitoring() {
    this.isMonitoring = false;
    
    // Desconectar observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    
    this.observers.clear();
    console.log('CWV Monitor: Stopped monitoring');
  }
}

/**
 * Instancia global del monitor
 */
let globalMonitor = null;

/**
 * Inicializar monitor global
 */
export const initializeCoreWebVitalsMonitor = (config = {}) => {
  if (!globalMonitor) {
    globalMonitor = new CoreWebVitalsMonitor(config);
  }
  return globalMonitor;
};

/**
 * Obtener monitor global
 */
export const getCoreWebVitalsMonitor = () => {
  return globalMonitor;
};

/**
 * Hook de React para usar el monitor
 */
export const useCoreWebVitalsMonitor = (config = {}) => {
  React.useEffect(() => {
    const monitor = initializeCoreWebVitalsMonitor(config);
    
    return () => {
      // No detener el monitor global al desmontar el componente
      // monitor.stopMonitoring();
    };
  }, []);

  return globalMonitor;
};

export default CoreWebVitalsMonitor;
