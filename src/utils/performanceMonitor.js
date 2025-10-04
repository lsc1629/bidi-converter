// Monitor de Performance en tiempo real

export const PERFORMANCE_CONFIG = {
  // Budgets de performance por mercado
  budgets: {
    'US': {
      maxBundleSize: 250, // KB
      maxImageSize: 500,  // KB
      maxTotalSize: 2000, // KB
      maxRequests: 50
    },
    'IN': { // India - conexiones lentas
      maxBundleSize: 150,
      maxImageSize: 300,
      maxTotalSize: 1000,
      maxRequests: 30
    },
    'ID': { // Indonesia - móvil
      maxBundleSize: 180,
      maxImageSize: 350,
      maxTotalSize: 1200,
      maxRequests: 35
    },
    'RU': { // Rusia - calidad
      maxBundleSize: 300,
      maxImageSize: 600,
      maxTotalSize: 2500,
      maxRequests: 60
    },
    'KR': { // Corea - velocidad
      maxBundleSize: 200,
      maxImageSize: 400,
      maxTotalSize: 1500,
      maxRequests: 40
    }
  },

  // Alertas de performance
  alerts: {
    lcp_warning: 2500,
    lcp_critical: 4000,
    fid_warning: 100,
    fid_critical: 300,
    cls_warning: 0.1,
    cls_critical: 0.25,
    bundle_warning: 0.8, // 80% del budget
    bundle_critical: 1.0  // 100% del budget
  },

  // Optimizaciones automáticas
  autoOptimizations: {
    enableImageCompression: true,
    enableCodeSplitting: true,
    enableLazyLoading: true,
    enableResourceHints: true,
    enableCriticalCSS: true
  }
};

export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.alerts = [];
    this.optimizations = new Map();
    this.currentMarket = 'US';
    this.resourceTimings = [];
    this.observers = [];
    this.init();
  }

  async init() {
    this.detectMarket();
    this.setupResourceTimingObserver();
    this.setupNavigationObserver();
    this.setupLongTaskObserver();
    this.monitorResourceBudgets();
    this.setupPerformanceAlerts();
    this.startContinuousMonitoring();
  }

  detectMarket() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentMarket = market?.code || 'US';
    }
  }

  setupResourceTimingObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.analyzeResourceTiming(entry);
        });
      });

      try {
        observer.observe({ entryTypes: ['resource'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('Resource timing observer not supported');
      }
    }
  }

  analyzeResourceTiming(entry) {
    const resource = {
      name: entry.name,
      type: this.getResourceType(entry.name),
      size: entry.transferSize || 0,
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now()
    };

    this.resourceTimings.push(resource);
    this.checkResourceBudget(resource);
    this.optimizeResource(resource);
  }

  getResourceType(url) {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) return 'image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('api/') || url.includes('.json')) return 'api';
    return 'other';
  }

  checkResourceBudget(resource) {
    const budget = PERFORMANCE_CONFIG.budgets[this.currentMarket];
    const alerts = PERFORMANCE_CONFIG.alerts;

    // Check individual resource size
    if (resource.type === 'script' && resource.size > budget.maxBundleSize * 1024) {
      this.createAlert('bundle_size_exceeded', {
        resource: resource.name,
        size: resource.size,
        budget: budget.maxBundleSize * 1024
      });
    }

    if (resource.type === 'image' && resource.size > budget.maxImageSize * 1024) {
      this.createAlert('image_size_exceeded', {
        resource: resource.name,
        size: resource.size,
        budget: budget.maxImageSize * 1024
      });
    }

    // Check total page weight
    const totalSize = this.getTotalPageSize();
    if (totalSize > budget.maxTotalSize * 1024) {
      this.createAlert('total_size_exceeded', {
        totalSize,
        budget: budget.maxTotalSize * 1024
      });
    }
  }

  getTotalPageSize() {
    return this.resourceTimings.reduce((total, resource) => total + resource.size, 0);
  }

  optimizeResource(resource) {
    const config = PERFORMANCE_CONFIG.autoOptimizations;

    switch (resource.type) {
      case 'image':
        if (config.enableImageCompression) {
          this.optimizeImage(resource);
        }
        break;
      case 'script':
        if (config.enableCodeSplitting) {
          this.optimizeScript(resource);
        }
        break;
      case 'stylesheet':
        if (config.enableCriticalCSS) {
          this.optimizeStylesheet(resource);
        }
        break;
    }
  }

  optimizeImage(resource) {
    // Lazy loading para imágenes no críticas
    const images = document.querySelectorAll(`img[src*="${resource.name}"]`);
    
    images.forEach(img => {
      if (!img.hasAttribute('data-critical')) {
        img.loading = 'lazy';
        img.decoding = 'async';
      }
    });

    this.optimizations.set(`image_${resource.name}`, {
      type: 'lazy_loading',
      applied: true,
      savings: resource.size * 0.3 // Estimado
    });
  }

  optimizeScript(resource) {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll(`script[src*="${resource.name}"]`);
    
    scripts.forEach(script => {
      if (!script.hasAttribute('data-critical') && !script.defer && !script.async) {
        script.defer = true;
      }
    });

    this.optimizations.set(`script_${resource.name}`, {
      type: 'defer_loading',
      applied: true,
      savings: resource.duration * 0.5 // Estimado
    });
  }

  optimizeStylesheet(resource) {
    // Load non-critical CSS asynchronously
    const links = document.querySelectorAll(`link[href*="${resource.name}"]`);
    
    links.forEach(link => {
      if (!link.hasAttribute('data-critical')) {
        link.media = 'print';
        link.onload = function() { this.media = 'all'; };
      }
    });

    this.optimizations.set(`css_${resource.name}`, {
      type: 'async_loading',
      applied: true,
      savings: resource.duration * 0.4 // Estimado
    });
  }

  setupNavigationObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.analyzeNavigationTiming(entry);
        });
      });

      try {
        observer.observe({ entryTypes: ['navigation'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('Navigation timing observer not supported');
      }
    }
  }

  analyzeNavigationTiming(entry) {
    const timing = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domProcessing: entry.domContentLoadedEventStart - entry.responseEnd,
      onload: entry.loadEventEnd - entry.loadEventStart
    };

    this.metrics.set('navigation', timing);
    this.analyzeNavigationBottlenecks(timing);
  }

  analyzeNavigationBottlenecks(timing) {
    const bottlenecks = [];

    if (timing.dns > 100) {
      bottlenecks.push({ type: 'dns', value: timing.dns, suggestion: 'Consider DNS prefetch' });
    }

    if (timing.ttfb > 600) {
      bottlenecks.push({ type: 'ttfb', value: timing.ttfb, suggestion: 'Optimize server response time' });
    }

    if (timing.domProcessing > 1000) {
      bottlenecks.push({ type: 'dom', value: timing.domProcessing, suggestion: 'Optimize DOM complexity' });
    }

    if (bottlenecks.length > 0) {
      this.createAlert('navigation_bottlenecks', { bottlenecks });
    }
  }

  setupLongTaskObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.analyzeLongTask(entry);
        });
      });

      try {
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('Long task observer not supported');
      }
    }
  }

  analyzeLongTask(entry) {
    const longTask = {
      duration: entry.duration,
      startTime: entry.startTime,
      attribution: entry.attribution || []
    };

    if (entry.duration > 50) { // Tasks longer than 50ms
      this.createAlert('long_task_detected', {
        duration: entry.duration,
        startTime: entry.startTime
      });

      // Suggest optimization
      this.suggestLongTaskOptimization(longTask);
    }
  }

  suggestLongTaskOptimization(task) {
    const suggestions = [];

    if (task.duration > 100) {
      suggestions.push('Break this task into smaller chunks using setTimeout or requestIdleCallback');
    }

    if (task.duration > 200) {
      suggestions.push('Consider moving this task to a Web Worker');
    }

    this.optimizations.set(`longtask_${Date.now()}`, {
      type: 'task_optimization',
      suggestions,
      duration: task.duration
    });
  }

  monitorResourceBudgets() {
    setInterval(() => {
      this.checkCurrentBudgets();
    }, 10000); // Check every 10 seconds
  }

  checkCurrentBudgets() {
    const budget = PERFORMANCE_CONFIG.budgets[this.currentMarket];
    const current = this.getCurrentResourceUsage();

    // Check bundle budget
    const bundleUsage = current.scripts / (budget.maxBundleSize * 1024);
    if (bundleUsage > PERFORMANCE_CONFIG.alerts.bundle_warning) {
      this.createAlert('bundle_budget_warning', {
        usage: bundleUsage,
        current: current.scripts,
        budget: budget.maxBundleSize * 1024
      });
    }

    // Check total budget
    const totalUsage = current.total / (budget.maxTotalSize * 1024);
    if (totalUsage > PERFORMANCE_CONFIG.alerts.bundle_warning) {
      this.createAlert('total_budget_warning', {
        usage: totalUsage,
        current: current.total,
        budget: budget.maxTotalSize * 1024
      });
    }
  }

  getCurrentResourceUsage() {
    const usage = {
      scripts: 0,
      stylesheets: 0,
      images: 0,
      fonts: 0,
      total: 0,
      requests: this.resourceTimings.length
    };

    this.resourceTimings.forEach(resource => {
      usage.total += resource.size;
      
      switch (resource.type) {
        case 'script':
          usage.scripts += resource.size;
          break;
        case 'stylesheet':
          usage.stylesheets += resource.size;
          break;
        case 'image':
          usage.images += resource.size;
          break;
        case 'font':
          usage.fonts += resource.size;
          break;
      }
    });

    return usage;
  }

  setupPerformanceAlerts() {
    // Monitor Core Web Vitals from the optimizer
    if (window.coreWebVitalsOptimizer) {
      setInterval(() => {
        this.checkCoreWebVitalsAlerts();
      }, 5000);
    }
  }

  checkCoreWebVitalsAlerts() {
    const metrics = window.coreWebVitalsOptimizer.getMetrics();
    const alerts = PERFORMANCE_CONFIG.alerts;

    if (metrics.cwv.lcp > alerts.lcp_critical) {
      this.createAlert('lcp_critical', { value: metrics.cwv.lcp });
    } else if (metrics.cwv.lcp > alerts.lcp_warning) {
      this.createAlert('lcp_warning', { value: metrics.cwv.lcp });
    }

    if (metrics.cwv.fid > alerts.fid_critical) {
      this.createAlert('fid_critical', { value: metrics.cwv.fid });
    } else if (metrics.cwv.fid > alerts.fid_warning) {
      this.createAlert('fid_warning', { value: metrics.cwv.fid });
    }

    if (metrics.cwv.cls > alerts.cls_critical) {
      this.createAlert('cls_critical', { value: metrics.cwv.cls });
    } else if (metrics.cwv.cls > alerts.cls_warning) {
      this.createAlert('cls_warning', { value: metrics.cwv.cls });
    }
  }

  createAlert(type, data) {
    const alert = {
      type,
      data,
      timestamp: Date.now(),
      market: this.currentMarket,
      severity: this.getAlertSeverity(type)
    };

    this.alerts.push(alert);
    
    // Log critical alerts
    if (alert.severity === 'critical') {
      console.error('Performance Alert:', alert);
    } else {
      console.warn('Performance Warning:', alert);
    }

    // Send to analytics
    this.reportAlert(alert);

    // Auto-fix if possible
    this.attemptAutoFix(alert);
  }

  getAlertSeverity(type) {
    const criticalAlerts = ['lcp_critical', 'fid_critical', 'cls_critical', 'total_size_exceeded'];
    return criticalAlerts.includes(type) ? 'critical' : 'warning';
  }

  reportAlert(alert) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_alert', {
        event_category: 'Performance',
        event_label: alert.type,
        value: alert.data.value || 0,
        custom_parameter_1: alert.severity,
        custom_parameter_2: this.currentMarket
      });
    }
  }

  attemptAutoFix(alert) {
    switch (alert.type) {
      case 'bundle_size_exceeded':
        this.enableCodeSplitting();
        break;
      case 'image_size_exceeded':
        this.enableImageOptimization();
        break;
      case 'long_task_detected':
        this.optimizeLongTasks();
        break;
    }
  }

  enableCodeSplitting() {
    // Enable dynamic imports for large bundles
    const largeScripts = document.querySelectorAll('script[src]:not([data-split])');
    
    largeScripts.forEach(script => {
      if (script.src.includes('bundle') || script.src.includes('vendor')) {
        script.setAttribute('data-split', 'true');
        // In real implementation, this would trigger build-time code splitting
      }
    });

    this.optimizations.set('code_splitting_enabled', {
      type: 'auto_fix',
      applied: true,
      timestamp: Date.now()
    });
  }

  enableImageOptimization() {
    // Enable aggressive image optimization
    const images = document.querySelectorAll('img:not([data-optimized])');
    
    images.forEach(img => {
      img.setAttribute('data-optimized', 'true');
      img.loading = 'lazy';
      img.decoding = 'async';
    });

    this.optimizations.set('image_optimization_enabled', {
      type: 'auto_fix',
      applied: true,
      timestamp: Date.now()
    });
  }

  optimizeLongTasks() {
    // Schedule non-critical tasks for idle time
    if ('requestIdleCallback' in window) {
      const nonCriticalTasks = this.identifyNonCriticalTasks();
      
      nonCriticalTasks.forEach(task => {
        requestIdleCallback(task, { timeout: 5000 });
      });
    }

    this.optimizations.set('long_task_optimization', {
      type: 'auto_fix',
      applied: true,
      timestamp: Date.now()
    });
  }

  identifyNonCriticalTasks() {
    // Return array of non-critical tasks that can be deferred
    return [
      () => this.preloadNextPageResources(),
      () => this.initializeAnalytics(),
      () => this.setupSocialSharing()
    ];
  }

  startContinuousMonitoring() {
    // Monitor performance every minute
    setInterval(() => {
      this.generatePerformanceReport();
    }, 60000);

    // Monitor on page unload
    window.addEventListener('beforeunload', () => {
      this.sendFinalReport();
    });
  }

  generatePerformanceReport() {
    const report = {
      timestamp: Date.now(),
      market: this.currentMarket,
      metrics: Object.fromEntries(this.metrics),
      resourceUsage: this.getCurrentResourceUsage(),
      alerts: this.alerts.slice(-10), // Last 10 alerts
      optimizations: Object.fromEntries(this.optimizations),
      budget: PERFORMANCE_CONFIG.budgets[this.currentMarket]
    };

    this.metrics.set('latest_report', report);
    return report;
  }

  sendFinalReport() {
    const finalReport = this.generatePerformanceReport();
    
    // Send via beacon API for reliability
    if ('sendBeacon' in navigator) {
      const data = JSON.stringify(finalReport);
      navigator.sendBeacon('/api/performance', data);
    }
  }

  // API PÚBLICA
  getPerformanceScore() {
    const usage = this.getCurrentResourceUsage();
    const budget = PERFORMANCE_CONFIG.budgets[this.currentMarket];
    
    const scores = {
      bundle: Math.max(0, 100 - (usage.scripts / (budget.maxBundleSize * 1024)) * 100),
      images: Math.max(0, 100 - (usage.images / (budget.maxImageSize * 1024)) * 100),
      total: Math.max(0, 100 - (usage.total / (budget.maxTotalSize * 1024)) * 100),
      requests: Math.max(0, 100 - (usage.requests / budget.maxRequests) * 100)
    };

    const overall = (scores.bundle + scores.images + scores.total + scores.requests) / 4;
    
    return {
      overall: Math.round(overall),
      breakdown: scores,
      grade: this.getPerformanceGrade(overall)
    };
  }

  getPerformanceGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  getAlerts() {
    return this.alerts.slice(-20); // Last 20 alerts
  }

  getOptimizations() {
    return Object.fromEntries(this.optimizations);
  }

  forceOptimization() {
    // Force all available optimizations
    this.enableCodeSplitting();
    this.enableImageOptimization();
    this.optimizeLongTasks();
    
    return this.getOptimizations();
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const initializePerformanceMonitor = async () => {
  const monitor = new PerformanceMonitor();
  await monitor.init();
  
  window.performanceMonitor = monitor;
  return monitor;
};

export default PerformanceMonitor;
