// Sistema de monetización regional optimizado por mercado

/**
 * Configuración de monetización por región
 */
export const REGIONAL_MONETIZATION_CONFIG = {
  // Tier 1 - Mercados Premium (CPM Alto)
  US: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/1234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/1234567891',
        footer: 'ca-pub-XXXXXXXXXX/1234567892'
      },
      cpm: 6.5,
      currency: 'USD'
    },
    affiliatePrograms: [
      {
        name: 'Adobe Creative Cloud',
        commission: 0.15,
        targetTools: ['editor', 'converter']
      },
      {
        name: 'Canva Pro',
        commission: 0.20,
        targetTools: ['editor', 'dev-tools']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 9.99,
        yearly: 99.99
      }
    }
  },

  GB: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/2234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/2234567891',
        footer: 'ca-pub-XXXXXXXXXX/2234567892'
      },
      cpm: 4.5,
      currency: 'GBP'
    },
    affiliatePrograms: [
      {
        name: 'Adobe Creative Cloud UK',
        commission: 0.15,
        targetTools: ['editor', 'converter']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 7.99,
        yearly: 79.99
      }
    }
  },

  // Tier 2 - Mercados Emergentes (CPM Medio-Bajo, Alto Volumen)
  IN: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/3234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/3234567891',
        footer: 'ca-pub-XXXXXXXXXX/3234567892'
      },
      cpm: 0.8,
      currency: 'INR'
    },
    affiliatePrograms: [
      {
        name: 'Flipkart Affiliate',
        commission: 0.05,
        targetTools: ['all']
      },
      {
        name: 'Amazon India',
        commission: 0.08,
        targetTools: ['converter', 'editor']
      }
    ],
    premiumFeatures: {
      enabled: false, // Mercado sensible al precio
      freemiumModel: true
    },
    localizedOffers: {
      dataPackages: true,
      mobileFirst: true,
      lowBandwidthMode: true
    }
  },

  ID: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/4234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/4234567891',
        footer: 'ca-pub-XXXXXXXXXX/4234567892'
      },
      cpm: 0.6,
      currency: 'IDR'
    },
    affiliatePrograms: [
      {
        name: 'Tokopedia Affiliate',
        commission: 0.04,
        targetTools: ['all']
      },
      {
        name: 'Shopee Indonesia',
        commission: 0.06,
        targetTools: ['converter', 'editor']
      }
    ],
    premiumFeatures: {
      enabled: false,
      freemiumModel: true
    },
    localizedOffers: {
      dataPackages: true,
      mobileFirst: true,
      compressionFocus: true
    }
  },

  RU: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/5234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/5234567891',
        footer: 'ca-pub-XXXXXXXXXX/5234567892'
      },
      cpm: 2.1,
      currency: 'RUB'
    },
    affiliatePrograms: [
      {
        name: 'Yandex Market',
        commission: 0.07,
        targetTools: ['all']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 299, // RUB
        yearly: 2999
      }
    },
    localizedOffers: {
      qualityFocus: true,
      desktopOptimized: true
    }
  },

  KR: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/6234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/6234567891',
        footer: 'ca-pub-XXXXXXXXXX/6234567892'
      },
      cpm: 3.2,
      currency: 'KRW'
    },
    affiliatePrograms: [
      {
        name: 'Coupang Partners',
        commission: 0.10,
        targetTools: ['all']
      },
      {
        name: 'Naver Shopping',
        commission: 0.08,
        targetTools: ['converter', 'editor']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 9900, // KRW
        yearly: 99000
      }
    },
    localizedOffers: {
      speedFocus: true,
      mobileFirst: true,
      premiumQuality: true
    }
  },

  // Mercados LATAM
  BR: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/7234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/7234567891',
        footer: 'ca-pub-XXXXXXXXXX/7234567892'
      },
      cpm: 1.5,
      currency: 'BRL'
    },
    affiliatePrograms: [
      {
        name: 'Amazon Brasil',
        commission: 0.08,
        targetTools: ['all']
      },
      {
        name: 'Mercado Livre',
        commission: 0.06,
        targetTools: ['converter', 'editor']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 19.90, // BRL
        yearly: 199.90
      }
    }
  },

  MX: {
    adSenseConfig: {
      publisherId: 'ca-pub-XXXXXXXXXX',
      adUnits: {
        banner: 'ca-pub-XXXXXXXXXX/8234567890',
        sidebar: 'ca-pub-XXXXXXXXXX/8234567891',
        footer: 'ca-pub-XXXXXXXXXX/8234567892'
      },
      cpm: 1.2,
      currency: 'MXN'
    },
    affiliatePrograms: [
      {
        name: 'Amazon México',
        commission: 0.08,
        targetTools: ['all']
      }
    ],
    premiumFeatures: {
      enabled: true,
      pricing: {
        monthly: 199, // MXN
        yearly: 1999
      }
    }
  }
};

/**
 * Clase para gestión de monetización regional
 */
export class RegionalMonetizationManager {
  constructor() {
    this.currentRegion = null;
    this.monetizationConfig = null;
    this.adBlockDetected = false;
    this.init();
  }

  async init() {
    await this.detectRegion();
    this.setupMonetization();
    this.detectAdBlock();
    this.setupAnalytics();
  }

  /**
   * Detectar región del usuario
   */
  async detectRegion() {
    try {
      // Usar el sistema de mercados internacionales
      const marketManager = window.internationalMarketManager;
      if (marketManager) {
        const currentMarket = marketManager.getCurrentMarket();
        this.currentRegion = currentMarket?.code || 'US';
      } else {
        // Fallback básico
        this.currentRegion = this.detectRegionFromLanguage();
      }

      this.monetizationConfig = REGIONAL_MONETIZATION_CONFIG[this.currentRegion] || 
                               REGIONAL_MONETIZATION_CONFIG.US;

      console.log('Regional Monetization initialized for:', this.currentRegion);
    } catch (error) {
      console.warn('Error detecting region for monetization:', error);
      this.currentRegion = 'US';
      this.monetizationConfig = REGIONAL_MONETIZATION_CONFIG.US;
    }
  }

  /**
   * Detectar región desde idioma del navegador
   */
  detectRegionFromLanguage() {
    const language = navigator.language || navigator.languages[0];
    const languageMap = {
      'hi-IN': 'IN',
      'en-IN': 'IN',
      'id-ID': 'ID',
      'ru-RU': 'RU',
      'ko-KR': 'KR',
      'pt-BR': 'BR',
      'es-MX': 'MX',
      'en-US': 'US',
      'en-GB': 'GB'
    };

    return languageMap[language] || 'US';
  }

  /**
   * Configurar monetización según la región
   */
  setupMonetization() {
    if (!this.monetizationConfig) return;

    // Configurar AdSense
    this.setupAdSense();
    
    // Configurar programas de afiliados
    this.setupAffiliatePrograms();
    
    // Configurar características premium
    this.setupPremiumFeatures();
    
    // Configurar ofertas localizadas
    this.setupLocalizedOffers();
  }

  /**
   * Configurar AdSense regional
   */
  setupAdSense() {
    const adConfig = this.monetizationConfig.adSenseConfig;
    if (!adConfig) return;

    // Crear script de AdSense si no existe
    if (!document.querySelector('script[src*="googlesyndication.com"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adConfig.publisherId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Configurar unidades de anuncios específicas por región
    window.adsbygoogle = window.adsbygoogle || [];
    
    // Disparar evento para que los componentes configuren anuncios
    window.dispatchEvent(new CustomEvent('adsense-config-ready', {
      detail: { 
        config: adConfig,
        region: this.currentRegion
      }
    }));
  }

  /**
   * Configurar programas de afiliados
   */
  setupAffiliatePrograms() {
    const affiliatePrograms = this.monetizationConfig.affiliatePrograms || [];
    
    affiliatePrograms.forEach(program => {
      // Registrar programa de afiliados
      this.registerAffiliateProgram(program);
    });
  }

  /**
   * Registrar programa de afiliados específico
   */
  registerAffiliateProgram(program) {
    // Crear enlaces de afiliados dinámicamente
    const affiliateLinks = document.querySelectorAll(`[data-affiliate="${program.name}"]`);
    
    affiliateLinks.forEach(link => {
      // Agregar tracking de conversión
      link.addEventListener('click', () => {
        this.trackAffiliateClick(program.name, program.commission);
      });
    });
  }

  /**
   * Configurar características premium
   */
  setupPremiumFeatures() {
    const premiumConfig = this.monetizationConfig.premiumFeatures;
    if (!premiumConfig) return;

    // Disparar evento para configurar UI premium
    window.dispatchEvent(new CustomEvent('premium-config-ready', {
      detail: {
        enabled: premiumConfig.enabled,
        pricing: premiumConfig.pricing,
        freemiumModel: premiumConfig.freemiumModel,
        region: this.currentRegion
      }
    }));
  }

  /**
   * Configurar ofertas localizadas
   */
  setupLocalizedOffers() {
    const localizedOffers = this.monetizationConfig.localizedOffers;
    if (!localizedOffers) return;

    // Configurar modo de ahorro de datos
    if (localizedOffers.dataPackages) {
      this.enableDataSaverMode();
    }

    // Configurar optimización móvil
    if (localizedOffers.mobileFirst) {
      this.enableMobileOptimizations();
    }

    // Configurar enfoque en calidad
    if (localizedOffers.qualityFocus) {
      this.enableQualityMode();
    }
  }

  /**
   * Habilitar modo de ahorro de datos
   */
  enableDataSaverMode() {
    document.body.classList.add('data-saver-enabled');
    
    // Disparar evento para optimizaciones de datos
    window.dispatchEvent(new CustomEvent('enable-data-saver', {
      detail: {
        imageQuality: 70,
        enableWebP: true,
        lazyLoadingAggressive: true,
        compressionLevel: 'high'
      }
    }));
  }

  /**
   * Habilitar optimizaciones móviles
   */
  enableMobileOptimizations() {
    document.body.classList.add('mobile-optimized');
    
    // Configurar viewport para móviles
    let viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    }
  }

  /**
   * Habilitar modo de calidad
   */
  enableQualityMode() {
    document.body.classList.add('quality-mode-enabled');
    
    window.dispatchEvent(new CustomEvent('enable-quality-mode', {
      detail: {
        imageQuality: 95,
        losslessCompression: true,
        highResolutionSupport: true
      }
    }));
  }

  /**
   * Detectar bloqueadores de anuncios
   */
  detectAdBlock() {
    // Crear elemento de prueba
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-10000px';
    document.body.appendChild(testAd);

    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        this.adBlockDetected = true;
        this.handleAdBlockDetected();
      }
      document.body.removeChild(testAd);
    }, 100);
  }

  /**
   * Manejar detección de bloqueador de anuncios
   */
  handleAdBlockDetected() {
    // Mostrar mensaje amigable sobre AdBlock
    const adBlockMessage = this.createAdBlockMessage();
    document.body.appendChild(adBlockMessage);

    // Activar monetización alternativa
    this.activateAlternativeMonetization();
  }

  /**
   * Crear mensaje sobre AdBlock
   */
  createAdBlockMessage() {
    const message = document.createElement('div');
    message.className = 'adblock-message';
    message.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 m-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">
              ${this.getAdBlockMessage()}
            </h3>
            <div class="mt-2 text-sm text-blue-700">
              <p>${this.getAdBlockDescription()}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    return message;
  }

  /**
   * Obtener mensaje de AdBlock según región
   */
  getAdBlockMessage() {
    const messages = {
      IN: 'हमारी मुफ्त सेवा का समर्थन करें',
      ID: 'Dukung layanan gratis kami',
      RU: 'Поддержите наш бесплатный сервис',
      KR: '무료 서비스를 지원해주세요',
      default: 'Support our free service'
    };

    return messages[this.currentRegion] || messages.default;
  }

  /**
   * Obtener descripción de AdBlock según región
   */
  getAdBlockDescription() {
    const descriptions = {
      IN: 'विज्ञापन हमें यह सेवा मुफ्त में प्रदान करने में मदद करते हैं। कृपया अपने एडब्लॉकर को बंद करने पर विचार करें।',
      ID: 'Iklan membantu kami menyediakan layanan ini secara gratis. Mohon pertimbangkan untuk menonaktifkan adblocker Anda.',
      RU: 'Реклама помогает нам предоставлять этот сервис бесплатно. Пожалуйста, рассмотрите возможность отключения блокировщика рекламы.',
      KR: '광고는 저희가 이 서비스를 무료로 제공하는 데 도움이 됩니다. 광고 차단기를 비활성화하는 것을 고려해 주세요.',
      default: 'Ads help us provide this service for free. Please consider disabling your adblocker.'
    };

    return descriptions[this.currentRegion] || descriptions.default;
  }

  /**
   * Activar monetización alternativa
   */
  activateAlternativeMonetization() {
    // Mostrar más prominentemente los programas de afiliados
    this.enhanceAffiliateVisibility();
    
    // Ofrecer características premium
    this.promoteUpgrade();
    
    // Solicitar donaciones si es apropiado para la región
    if (['IN', 'ID'].includes(this.currentRegion)) {
      this.showDonationOption();
    }
  }

  /**
   * Mejorar visibilidad de afiliados
   */
  enhanceAffiliateVisibility() {
    const affiliateContainers = document.querySelectorAll('.affiliate-container');
    affiliateContainers.forEach(container => {
      container.classList.add('enhanced-visibility');
    });
  }

  /**
   * Promover actualización premium
   */
  promoteUpgrade() {
    if (this.monetizationConfig.premiumFeatures?.enabled) {
      window.dispatchEvent(new CustomEvent('promote-premium-upgrade', {
        detail: { reason: 'adblock-detected' }
      }));
    }
  }

  /**
   * Mostrar opción de donación
   */
  showDonationOption() {
    window.dispatchEvent(new CustomEvent('show-donation-option', {
      detail: { 
        region: this.currentRegion,
        currency: this.monetizationConfig.adSenseConfig.currency
      }
    }));
  }

  /**
   * Rastrear clic de afiliado
   */
  trackAffiliateClick(programName, commission) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'affiliate_click', {
        event_category: 'Monetization',
        event_label: programName,
        value: commission,
        custom_parameter_1: this.currentRegion
      });
    }

    console.log(`Affiliate click tracked: ${programName} (${commission}% commission)`);
  }

  /**
   * Obtener configuración actual
   */
  getCurrentConfig() {
    return {
      region: this.currentRegion,
      config: this.monetizationConfig,
      adBlockDetected: this.adBlockDetected
    };
  }
}

/**
 * Inicializar gestor de monetización regional
 */
export const initializeRegionalMonetization = async () => {
  const manager = new RegionalMonetizationManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.regionalMonetizationManager = manager;
  
  return manager;
};

export default RegionalMonetizationManager;
