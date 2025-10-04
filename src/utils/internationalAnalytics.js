// Sistema de analytics segmentado por país para mercados internacionales

/**
 * Configuración de analytics por región
 */
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 - Configuración por región
  GA4_CONFIG: {
    US: {
      measurementId: 'G-XXXXXXXXXX',
      currency: 'USD',
      country: 'US',
      language: 'en',
      customDimensions: {
        market_tier: 'premium',
        user_segment: 'high_value',
        monetization_focus: 'premium_features'
      }
    },
    
    IN: {
      measurementId: 'G-YYYYYYYYYY',
      currency: 'INR',
      country: 'IN',
      language: 'hi',
      customDimensions: {
        market_tier: 'emerging',
        user_segment: 'volume',
        monetization_focus: 'ads_affiliates',
        data_consciousness: 'high',
        mobile_first: 'true'
      }
    },
    
    ID: {
      measurementId: 'G-ZZZZZZZZZZ',
      currency: 'IDR',
      country: 'ID',
      language: 'id',
      customDimensions: {
        market_tier: 'emerging',
        user_segment: 'volume',
        monetization_focus: 'ads_affiliates',
        data_consciousness: 'very_high',
        mobile_first: 'true'
      }
    },
    
    RU: {
      measurementId: 'G-AAAAAAAAAA',
      currency: 'RUB',
      country: 'RU',
      language: 'ru',
      customDimensions: {
        market_tier: 'mid_tier',
        user_segment: 'quality_focused',
        monetization_focus: 'premium_ads',
        desktop_preference: 'high'
      }
    },
    
    KR: {
      measurementId: 'G-BBBBBBBBBB',
      currency: 'KRW',
      country: 'KR',
      language: 'ko',
      customDimensions: {
        market_tier: 'premium',
        user_segment: 'tech_savvy',
        monetization_focus: 'premium_features',
        speed_focus: 'very_high',
        mobile_first: 'true'
      }
    }
  },

  // Eventos específicos por mercado
  MARKET_SPECIFIC_EVENTS: {
    IN: [
      'data_saver_enabled',
      'hindi_interface_used',
      'mobile_conversion',
      'low_bandwidth_mode',
      'affiliate_click_flipkart',
      'affiliate_click_amazon_in'
    ],
    
    ID: [
      'bahasa_interface_used',
      'mobile_conversion',
      'compression_mode_enabled',
      'affiliate_click_tokopedia',
      'affiliate_click_shopee'
    ],
    
    RU: [
      'russian_interface_used',
      'desktop_conversion',
      'quality_mode_enabled',
      'affiliate_click_yandex'
    ],
    
    KR: [
      'korean_interface_used',
      'speed_optimization_used',
      'mobile_conversion',
      'affiliate_click_coupang',
      'premium_feature_interest'
    ]
  },

  // KPIs específicos por región
  REGIONAL_KPIS: {
    IN: {
      primary: ['user_engagement', 'mobile_usage', 'data_efficiency'],
      secondary: ['affiliate_conversion', 'ad_viewability', 'retention_rate'],
      targets: {
        monthly_users: 500000,
        conversion_rate: 0.15,
        revenue_per_user: 0.05 // USD
      }
    },
    
    ID: {
      primary: ['user_growth', 'mobile_optimization', 'compression_usage'],
      secondary: ['affiliate_revenue', 'ad_engagement', 'feature_adoption'],
      targets: {
        monthly_users: 300000,
        conversion_rate: 0.12,
        revenue_per_user: 0.03 // USD
      }
    },
    
    RU: {
      primary: ['user_quality', 'desktop_engagement', 'premium_interest'],
      secondary: ['ad_revenue', 'feature_usage', 'user_satisfaction'],
      targets: {
        monthly_users: 150000,
        conversion_rate: 0.25,
        revenue_per_user: 0.15 // USD
      }
    },
    
    KR: {
      primary: ['speed_metrics', 'mobile_engagement', 'premium_conversion'],
      secondary: ['user_retention', 'feature_adoption', 'revenue_growth'],
      targets: {
        monthly_users: 100000,
        conversion_rate: 0.30,
        revenue_per_user: 0.25 // USD
      }
    }
  }
};

/**
 * Clase para gestión de analytics internacionales
 */
export class InternationalAnalyticsManager {
  constructor() {
    this.currentRegion = null;
    this.analyticsConfig = null;
    this.sessionData = {};
    this.conversionFunnel = {};
    this.init();
  }

  async init() {
    await this.detectRegion();
    this.setupGoogleAnalytics();
    this.setupCustomEvents();
    this.initializeSessionTracking();
    this.setupConversionFunnel();
    this.startPerformanceMonitoring();
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
        this.currentRegion = this.detectRegionFromBrowser();
      }

      this.analyticsConfig = ANALYTICS_CONFIG.GA4_CONFIG[this.currentRegion] || 
                            ANALYTICS_CONFIG.GA4_CONFIG.US;

      console.log('International Analytics initialized for:', this.currentRegion);
    } catch (error) {
      console.warn('Error detecting region for analytics:', error);
      this.currentRegion = 'US';
      this.analyticsConfig = ANALYTICS_CONFIG.GA4_CONFIG.US;
    }
  }

  /**
   * Detectar región desde navegador
   */
  detectRegionFromBrowser() {
    const language = navigator.language || navigator.languages[0];
    const regionMap = {
      'hi-IN': 'IN',
      'en-IN': 'IN',
      'id-ID': 'ID',
      'ru-RU': 'RU',
      'ko-KR': 'KR'
    };
    return regionMap[language] || 'US';
  }

  /**
   * Configurar Google Analytics 4
   */
  setupGoogleAnalytics() {
    if (!this.analyticsConfig) return;

    // Cargar gtag si no existe
    if (!window.gtag) {
      this.loadGoogleAnalytics();
    }

    // Configurar GA4 con parámetros específicos de la región
    window.gtag('config', this.analyticsConfig.measurementId, {
      currency: this.analyticsConfig.currency,
      country: this.analyticsConfig.country,
      language: this.analyticsConfig.language,
      custom_map: this.analyticsConfig.customDimensions,
      // Configuraciones específicas por región
      anonymize_ip: this.shouldAnonymizeIP(),
      allow_google_signals: this.allowGoogleSignals(),
      send_page_view: true
    });

    // Establecer propiedades de usuario
    this.setUserProperties();
  }

  /**
   * Cargar Google Analytics
   */
  loadGoogleAnalytics() {
    // Crear script de gtag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsConfig.measurementId}`;
    document.head.appendChild(gtagScript);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  /**
   * Determinar si se debe anonimizar IP
   */
  shouldAnonymizeIP() {
    // Regiones con regulaciones estrictas de privacidad
    const strictPrivacyRegions = ['RU', 'KR'];
    return strictPrivacyRegions.includes(this.currentRegion);
  }

  /**
   * Determinar si permitir Google Signals
   */
  allowGoogleSignals() {
    // Permitir en mercados premium, restringir en emergentes
    const premiumMarkets = ['US', 'KR'];
    return premiumMarkets.includes(this.currentRegion);
  }

  /**
   * Establecer propiedades de usuario
   */
  setUserProperties() {
    if (typeof gtag === 'undefined') return;

    gtag('set', 'user_properties', {
      market_region: this.currentRegion,
      market_tier: this.analyticsConfig.customDimensions.market_tier,
      user_segment: this.analyticsConfig.customDimensions.user_segment,
      preferred_language: this.analyticsConfig.language,
      device_type: this.getDeviceType(),
      connection_speed: this.getConnectionSpeed()
    });
  }

  /**
   * Obtener tipo de dispositivo
   */
  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  /**
   * Obtener velocidad de conexión
   */
  getConnectionSpeed() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  /**
   * Configurar eventos personalizados
   */
  setupCustomEvents() {
    const marketEvents = ANALYTICS_CONFIG.MARKET_SPECIFIC_EVENTS[this.currentRegion] || [];
    
    // Configurar listeners para eventos específicos del mercado
    marketEvents.forEach(eventName => {
      window.addEventListener(eventName, (event) => {
        this.trackMarketSpecificEvent(eventName, event.detail);
      });
    });

    // Eventos universales con contexto regional
    this.setupUniversalEvents();
  }

  /**
   * Configurar eventos universales
   */
  setupUniversalEvents() {
    // Conversión de herramientas
    window.addEventListener('tool-conversion', (event) => {
      this.trackToolConversion(event.detail);
    });

    // Engagement de usuario
    window.addEventListener('user-engagement', (event) => {
      this.trackUserEngagement(event.detail);
    });

    // Errores de aplicación
    window.addEventListener('app-error', (event) => {
      this.trackError(event.detail);
    });

    // Cambios de idioma
    window.addEventListener('language-changed', (event) => {
      this.trackLanguageChange(event.detail);
    });
  }

  /**
   * Rastrear evento específico del mercado
   */
  trackMarketSpecificEvent(eventName, eventData = {}) {
    if (typeof gtag === 'undefined') return;

    gtag('event', eventName, {
      event_category: 'Market_Specific',
      event_label: this.currentRegion,
      market_region: this.currentRegion,
      ...eventData,
      timestamp: Date.now()
    });

    console.log(`Market-specific event tracked: ${eventName}`, eventData);
  }

  /**
   * Rastrear conversión de herramienta
   */
  trackToolConversion(data) {
    if (typeof gtag === 'undefined') return;

    const { tool, fromFormat, toFormat, fileSize, processingTime } = data;

    gtag('event', 'tool_conversion', {
      event_category: 'Conversion',
      event_label: `${tool}_${fromFormat}_to_${toFormat}`,
      tool_name: tool,
      input_format: fromFormat,
      output_format: toFormat,
      file_size_kb: Math.round(fileSize / 1024),
      processing_time_ms: processingTime,
      market_region: this.currentRegion,
      device_type: this.getDeviceType(),
      value: this.calculateConversionValue(tool, fileSize)
    });

    // Actualizar funnel de conversión
    this.updateConversionFunnel('conversion_completed', { tool, fromFormat, toFormat });
  }

  /**
   * Calcular valor de conversión
   */
  calculateConversionValue(tool, fileSize) {
    // Valor base por herramienta
    const toolValues = {
      'image-converter': 1.0,
      'pdf-viewer': 0.8,
      'password-generator': 0.5,
      'qr-generator': 0.6
    };

    const baseValue = toolValues[tool] || 0.5;
    
    // Ajustar por tamaño de archivo (archivos más grandes = más valor)
    const sizeMultiplier = Math.min(fileSize / (1024 * 1024), 3); // Max 3x para archivos de 1MB+
    
    // Ajustar por región
    const regionMultipliers = {
      'US': 1.0,
      'KR': 0.8,
      'RU': 0.6,
      'IN': 0.3,
      'ID': 0.2
    };

    const regionMultiplier = regionMultipliers[this.currentRegion] || 0.5;

    return Math.round((baseValue * (1 + sizeMultiplier) * regionMultiplier) * 100) / 100;
  }

  /**
   * Rastrear engagement de usuario
   */
  trackUserEngagement(data) {
    if (typeof gtag === 'undefined') return;

    const { action, duration, element, page } = data;

    gtag('event', 'user_engagement', {
      event_category: 'Engagement',
      event_label: action,
      engagement_time_msec: duration,
      page_location: page,
      element_clicked: element,
      market_region: this.currentRegion
    });
  }

  /**
   * Rastrear errores
   */
  trackError(data) {
    if (typeof gtag === 'undefined') return;

    const { error, context, severity } = data;

    gtag('event', 'exception', {
      description: error.message || 'Unknown error',
      fatal: severity === 'fatal',
      error_context: context,
      market_region: this.currentRegion,
      user_agent: navigator.userAgent
    });
  }

  /**
   * Rastrear cambio de idioma
   */
  trackLanguageChange(data) {
    if (typeof gtag === 'undefined') return;

    const { language, previousLanguage } = data;

    gtag('event', 'language_change', {
      event_category: 'Localization',
      event_label: `${previousLanguage}_to_${language}`,
      new_language: language,
      previous_language: previousLanguage,
      market_region: this.currentRegion
    });
  }

  /**
   * Inicializar seguimiento de sesión
   */
  initializeSessionTracking() {
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      toolsUsed: new Set(),
      conversions: 0,
      errors: 0,
      region: this.currentRegion
    };

    // Rastrear vista de página inicial
    this.trackPageView(window.location.pathname);

    // Configurar seguimiento de navegación
    this.setupNavigationTracking();
  }

  /**
   * Rastrear vista de página
   */
  trackPageView(path) {
    if (typeof gtag === 'undefined') return;

    this.sessionData.pageViews++;

    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: path,
      market_region: this.currentRegion,
      session_page_count: this.sessionData.pageViews
    });
  }

  /**
   * Configurar seguimiento de navegación
   */
  setupNavigationTracking() {
    // Rastrear cambios de ruta (para SPAs)
    let currentPath = window.location.pathname;
    
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        this.trackPageView(currentPath);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Configurar funnel de conversión
   */
  setupConversionFunnel() {
    this.conversionFunnel = {
      page_view: 0,
      tool_interaction: 0,
      file_upload: 0,
      conversion_started: 0,
      conversion_completed: 0,
      download_initiated: 0
    };
  }

  /**
   * Actualizar funnel de conversión
   */
  updateConversionFunnel(step, data = {}) {
    if (this.conversionFunnel.hasOwnProperty(step)) {
      this.conversionFunnel[step]++;
      
      // Reportar progreso del funnel
      gtag('event', 'funnel_step', {
        event_category: 'Conversion_Funnel',
        event_label: step,
        funnel_step: step,
        market_region: this.currentRegion,
        ...data
      });
    }
  }

  /**
   * Iniciar monitoreo de rendimiento
   */
  startPerformanceMonitoring() {
    // Monitorear Core Web Vitals específicos por región
    this.monitorCoreWebVitals();
    
    // Monitorear errores de JavaScript
    this.monitorJavaScriptErrors();
    
    // Monitorear rendimiento de red
    this.monitorNetworkPerformance();
  }

  /**
   * Monitorear Core Web Vitals
   */
  monitorCoreWebVitals() {
    // Integrar con el sistema de Core Web Vitals existente
    window.addEventListener('cwv-poor-metric', (event) => {
      const { name, value, rating } = event.detail;
      
      gtag('event', 'core_web_vital', {
        event_category: 'Performance',
        event_label: `${name}_${rating}`,
        metric_name: name,
        metric_value: value,
        metric_rating: rating,
        market_region: this.currentRegion
      });
    });
  }

  /**
   * Monitorear errores de JavaScript
   */
  monitorJavaScriptErrors() {
    window.addEventListener('error', (event) => {
      this.trackError({
        error: event.error,
        context: 'javascript_error',
        severity: 'error'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        error: { message: event.reason },
        context: 'unhandled_promise_rejection',
        severity: 'warning'
      });
    });
  }

  /**
   * Monitorear rendimiento de red
   */
  monitorNetworkPerformance() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      gtag('event', 'network_info', {
        event_category: 'Performance',
        connection_type: connection.effectiveType,
        downlink_speed: connection.downlink,
        rtt: connection.rtt,
        save_data: connection.saveData,
        market_region: this.currentRegion
      });
    }
  }

  /**
   * Generar reporte de sesión
   */
  generateSessionReport() {
    const sessionDuration = Date.now() - this.sessionData.startTime;
    
    return {
      region: this.currentRegion,
      duration: sessionDuration,
      pageViews: this.sessionData.pageViews,
      toolsUsed: Array.from(this.sessionData.toolsUsed),
      conversions: this.sessionData.conversions,
      errors: this.sessionData.errors,
      conversionFunnel: { ...this.conversionFunnel },
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Enviar reporte final de sesión
   */
  sendSessionReport() {
    const report = this.generateSessionReport();
    
    gtag('event', 'session_end', {
      event_category: 'Session',
      session_duration: report.duration,
      page_views: report.pageViews,
      tools_used_count: report.toolsUsed.length,
      conversions_count: report.conversions,
      market_region: this.currentRegion
    });

    console.log('Session report:', report);
  }

  /**
   * Obtener configuración actual
   */
  getCurrentConfig() {
    return {
      region: this.currentRegion,
      config: this.analyticsConfig,
      sessionData: this.sessionData,
      conversionFunnel: this.conversionFunnel
    };
  }
}

/**
 * Inicializar gestor de analytics internacionales
 */
export const initializeInternationalAnalytics = async () => {
  const manager = new InternationalAnalyticsManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.internationalAnalyticsManager = manager;
  
  // Configurar envío de reporte al cerrar la página
  window.addEventListener('beforeunload', () => {
    manager.sendSessionReport();
  });
  
  return manager;
};

export default InternationalAnalyticsManager;
