// Sistema avanzado de gestión de mercados internacionales

/**
 * Configuración de mercados internacionales con datos específicos
 */
export const INTERNATIONAL_MARKETS = {
  // Tier 1 - Mercados Principales (Ya implementados)
  US: {
    code: 'US',
    name: 'United States',
    language: 'en',
    currency: 'USD',
    population: 331000000,
    internetPenetration: 0.92,
    adRevenueCPM: 6.5,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['free image converter', 'PNG to JPG converter', 'online image converter'],
      volume: 49500,
      competition: 'high'
    }
  },
  
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    language: 'en',
    currency: 'GBP',
    population: 67000000,
    internetPenetration: 0.95,
    adRevenueCPM: 4.5,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['image converter UK', 'photo converter Britain', 'free converter England'],
      volume: 12100,
      competition: 'medium'
    }
  },

  BR: {
    code: 'BR',
    name: 'Brazil',
    language: 'pt',
    currency: 'BRL',
    population: 215000000,
    internetPenetration: 0.81,
    adRevenueCPM: 1.5,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['conversor de imagem', 'converter PNG para JPG', 'conversor de foto'],
      volume: 27100,
      competition: 'medium'
    }
  },

  MX: {
    code: 'MX',
    name: 'Mexico',
    language: 'es',
    currency: 'MXN',
    population: 128000000,
    internetPenetration: 0.72,
    adRevenueCPM: 1.2,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['convertidor de imágenes México', 'convertir fotos gratis', 'visor de documentos online'],
      volume: 18100,
      competition: 'low'
    }
  },

  // CHILE - Mercado LATAM Importante
  CL: {
    code: 'CL',
    name: 'Chile',
    language: 'es',
    currency: 'CLP',
    population: 19000000,
    internetPenetration: 0.87,
    adRevenueCPM: 1.8,
    priority: 1,
    implemented: true,
    marketPotential: 'high',
    keywords: {
      primary: ['convertidor de imágenes Chile', 'convertir fotos online', 'herramientas gratuitas'],
      volume: 8900,
      competition: 'low',
      opportunity: 'high'
    },
    culturalNotes: {
      preferredFormats: ['JPG', 'PNG', 'PDF'],
      mobileFirst: true,
      qualityFocus: 'high',
      localizedFeatures: ['Interfaz en español chileno', 'Soporte técnico local']
    }
  },

  // ARGENTINA - Mercado LATAM
  AR: {
    code: 'AR',
    name: 'Argentina',
    language: 'es',
    currency: 'ARS',
    population: 45000000,
    internetPenetration: 0.84,
    adRevenueCPM: 1.1,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['convertidor de imágenes Argentina', 'convertir fotos gratis', 'herramientas online'],
      volume: 12400,
      competition: 'medium'
    }
  },

  // COLOMBIA - Mercado LATAM
  CO: {
    code: 'CO',
    name: 'Colombia',
    language: 'es',
    currency: 'COP',
    population: 51000000,
    internetPenetration: 0.69,
    adRevenueCPM: 0.9,
    priority: 1,
    implemented: true,
    keywords: {
      primary: ['convertidor de imágenes Colombia', 'convertir fotos online', 'herramientas gratuitas'],
      volume: 9800,
      competition: 'low'
    }
  },

  // Tier 2 - Mercados Emergentes (NUEVOS - Alta Prioridad)
  IN: {
    code: 'IN',
    name: 'India',
    language: 'hi',
    fallbackLanguage: 'en',
    currency: 'INR',
    population: 1400000000,
    internetPenetration: 0.45,
    adRevenueCPM: 0.8,
    priority: 2,
    implemented: false,
    marketPotential: 'massive',
    keywords: {
      primary: ['image converter India', 'free photo converter', 'ऑनलाइन इमेज कन्वर्टर'],
      volume: 85000,
      competition: 'low',
      opportunity: 'very-high'
    },
    culturalNotes: {
      preferredFormats: ['JPG', 'PNG'],
      mobileFirst: true,
      dataConsciousness: 'high',
      localizedFeatures: ['Hindi interface', 'low-bandwidth mode']
    }
  },

  ID: {
    code: 'ID',
    name: 'Indonesia',
    language: 'id',
    currency: 'IDR',
    population: 273000000,
    internetPenetration: 0.64,
    adRevenueCPM: 0.6,
    priority: 2,
    implemented: false,
    marketPotential: 'massive',
    keywords: {
      primary: ['konverter gambar', 'pengubah foto gratis', 'konversi gambar online'],
      volume: 45000,
      competition: 'very-low',
      opportunity: 'very-high'
    },
    culturalNotes: {
      preferredFormats: ['JPG', 'WebP'],
      mobileFirst: true,
      dataConsciousness: 'very-high',
      localizedFeatures: ['Bahasa Indonesia interface', 'compressed images']
    }
  },

  RU: {
    code: 'RU',
    name: 'Russia',
    language: 'ru',
    currency: 'RUB',
    population: 146000000,
    internetPenetration: 0.85,
    adRevenueCPM: 2.1,
    priority: 2,
    implemented: false,
    marketPotential: 'high',
    keywords: {
      primary: ['конвертер изображений', 'бесплатный конвертер фото', 'онлайн конвертер'],
      volume: 32000,
      competition: 'medium',
      opportunity: 'high'
    },
    culturalNotes: {
      preferredFormats: ['JPG', 'PNG', 'BMP'],
      desktopFirst: true,
      qualityFocus: 'high',
      localizedFeatures: ['Cyrillic support', 'high-quality options']
    }
  },

  KR: {
    code: 'KR',
    name: 'South Korea',
    language: 'ko',
    currency: 'KRW',
    population: 52000000,
    internetPenetration: 0.96,
    adRevenueCPM: 3.2,
    priority: 2,
    implemented: false,
    marketPotential: 'premium',
    keywords: {
      primary: ['이미지 변환기', '무료 사진 변환', '온라인 이미지 컨버터'],
      volume: 28000,
      competition: 'medium',
      opportunity: 'high'
    },
    culturalNotes: {
      preferredFormats: ['JPG', 'PNG', 'WebP'],
      mobileFirst: true,
      speedFocus: 'very-high',
      localizedFeatures: ['Korean interface', 'fast processing', 'mobile optimization']
    }
  },

  // Tier 3 - Mercados Futuros
  JP: {
    code: 'JP',
    name: 'Japan',
    language: 'ja',
    currency: 'JPY',
    population: 125000000,
    internetPenetration: 0.93,
    adRevenueCPM: 4.8,
    priority: 3,
    implemented: false,
    marketPotential: 'premium',
    keywords: {
      primary: ['画像変換', 'PNG JPG 変換', '無料 画像 コンバーター'],
      volume: 22000,
      competition: 'high'
    }
  },

  DE: {
    code: 'DE',
    name: 'Germany',
    language: 'de',
    currency: 'EUR',
    population: 83000000,
    internetPenetration: 0.89,
    adRevenueCPM: 3.8,
    priority: 3,
    implemented: false,
    keywords: {
      primary: ['Bildkonverter online', 'PNG zu JPG', 'kostenloser Fotokonverter'],
      volume: 12100,
      competition: 'high'
    }
  },

  FR: {
    code: 'FR',
    name: 'France',
    language: 'fr',
    currency: 'EUR',
    population: 68000000,
    internetPenetration: 0.85,
    adRevenueCPM: 3.2,
    priority: 3,
    implemented: false,
    keywords: {
      primary: ['convertisseur d\'images', 'convertir PNG en JPG', 'éditeur d\'image en ligne'],
      volume: 14800,
      competition: 'medium'
    }
  }
};

/**
 * Clase para gestión de mercados internacionales
 */
export class InternationalMarketManager {
  constructor() {
    this.currentMarket = null;
    this.detectedCountry = null;
    this.fallbackMarket = 'US';
    this.init();
  }

  async init() {
    await this.detectUserLocation();
    this.setCurrentMarket();
    this.setupMarketSpecificOptimizations();
  }

  /**
   * Detectar ubicación del usuario
   */
  async detectUserLocation() {
    try {
      // Método 1: Geolocation API (más preciso pero requiere permiso)
      if ('geolocation' in navigator) {
        const position = await this.getCurrentPosition();
        this.detectedCountry = await this.getCountryFromCoordinates(
          position.coords.latitude, 
          position.coords.longitude
        );
      }
    } catch (error) {
      console.log('Geolocation not available, using fallback methods');
    }

    // Método 2: Timezone detection
    if (!this.detectedCountry) {
      this.detectedCountry = this.getCountryFromTimezone();
    }

    // Método 3: Language detection
    if (!this.detectedCountry) {
      this.detectedCountry = this.getCountryFromLanguage();
    }

    // Método 4: IP-based detection (usando servicio externo)
    if (!this.detectedCountry) {
      this.detectedCountry = await this.getCountryFromIP();
    }

    console.log('Detected country:', this.detectedCountry);
  }

  /**
   * Obtener posición actual del usuario
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 5000,
        maximumAge: 300000 // 5 minutos
      });
    });
  }

  /**
   * Obtener país desde coordenadas (usando servicio de geocoding)
   */
  async getCountryFromCoordinates(lat, lon) {
    try {
      // Usar servicio gratuito de geocoding
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      return data.countryCode;
    } catch (error) {
      console.warn('Geocoding failed:', error);
      return null;
    }
  }

  /**
   * Detectar país desde timezone
   */
  getCountryFromTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const timezoneToCountry = {
      // Estados Unidos
      'America/New_York': 'US',
      'America/Los_Angeles': 'US',
      'America/Chicago': 'US',
      'America/Denver': 'US',
      
      // Reino Unido
      'Europe/London': 'GB',
      
      // Brasil
      'America/Sao_Paulo': 'BR',
      'America/Recife': 'BR',
      'America/Manaus': 'BR',
      
      // México
      'America/Mexico_City': 'MX',
      'America/Tijuana': 'MX',
      'America/Cancun': 'MX',
      
      // CHILE - AGREGADO
      'America/Santiago': 'CL',
      'Pacific/Easter': 'CL',
      
      // Argentina
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Argentina/Cordoba': 'AR',
      'America/Argentina/Mendoza': 'AR',
      
      // Colombia
      'America/Bogota': 'CO',
      
      // Otros países LATAM
      'America/Lima': 'PE',
      'America/Caracas': 'VE',
      'America/Quito': 'EC',
      'America/La_Paz': 'BO',
      'America/Asuncion': 'PY',
      'America/Montevideo': 'UY',
      
      // Mercados emergentes
      'Asia/Kolkata': 'IN',
      'Asia/Jakarta': 'ID',
      'Europe/Moscow': 'RU',
      'Asia/Seoul': 'KR',
      'Asia/Tokyo': 'JP',
      'Europe/Berlin': 'DE',
      'Europe/Paris': 'FR'
    };

    return timezoneToCountry[timezone] || null;
  }

  /**
   * Detectar país desde idioma del navegador
   */
  getCountryFromLanguage() {
    const language = navigator.language || navigator.languages[0];
    const languageCode = language.split('-')[0];
    const countryCode = language.split('-')[1];
    
    const languageToCountry = {
      // Inglés
      'en-US': 'US',
      'en-GB': 'GB',
      
      // Portugués
      'pt-BR': 'BR',
      'pt-PT': 'PT',
      
      // Español - EXPANDIDO PARA LATAM
      'es-MX': 'MX',
      'es-CL': 'CL',  // CHILE AGREGADO
      'es-AR': 'AR',  // Argentina
      'es-CO': 'CO',  // Colombia
      'es-PE': 'PE',  // Perú
      'es-VE': 'VE',  // Venezuela
      'es-EC': 'EC',  // Ecuador
      'es-UY': 'UY',  // Uruguay
      'es-PY': 'PY',  // Paraguay
      'es-BO': 'BO',  // Bolivia
      'es-ES': 'ES',  // España
      
      // Mercados emergentes
      'hi-IN': 'IN',
      'en-IN': 'IN',
      'id-ID': 'ID',
      'ru-RU': 'RU',
      'ko-KR': 'KR',
      'ja-JP': 'JP',
      'de-DE': 'DE',
      'fr-FR': 'FR'
    };

    // Primero intentar con el código completo
    if (languageToCountry[language]) {
      return languageToCountry[language];
    }

    // Si es español sin código de país específico, usar detección adicional
    if (languageCode === 'es') {
      // Intentar detectar por timezone si es español genérico
      const timezoneCountry = this.getCountryFromTimezone();
      if (timezoneCountry && ['CL', 'AR', 'CO', 'MX', 'PE', 'VE', 'EC', 'UY', 'PY', 'BO'].includes(timezoneCountry)) {
        return timezoneCountry;
      }
      // Por defecto, usar España para español genérico
      return 'ES';
    }

    return null;
  }

  /**
   * Detectar país desde IP (usando servicio gratuito)
   */
  async getCountryFromIP() {
    try {
      const response = await fetch('https://ipapi.co/country_code/');
      const countryCode = await response.text();
      return countryCode.trim().toUpperCase();
    } catch (error) {
      console.warn('IP detection failed:', error);
      return null;
    }
  }

  /**
   * Establecer mercado actual
   */
  setCurrentMarket() {
    const country = this.detectedCountry || this.fallbackMarket;
    this.currentMarket = INTERNATIONAL_MARKETS[country] || INTERNATIONAL_MARKETS[this.fallbackMarket];
    
    console.log('Current market set to:', this.currentMarket.name);
    
    // Guardar en localStorage para futuras visitas
    localStorage.setItem('detectedCountry', country);
    localStorage.setItem('currentMarket', JSON.stringify(this.currentMarket));
  }

  /**
   * Configurar optimizaciones específicas del mercado
   */
  setupMarketSpecificOptimizations() {
    if (!this.currentMarket) return;

    // Configurar idioma
    this.setupLanguage();
    
    // Configurar moneda
    this.setupCurrency();
    
    // Configurar optimizaciones culturales
    this.setupCulturalOptimizations();
    
    // Configurar analytics
    this.setupMarketAnalytics();
  }

  /**
   * Configurar idioma del mercado
   */
  setupLanguage() {
    const language = this.currentMarket.language;
    const fallbackLanguage = this.currentMarket.fallbackLanguage;
    
    // Establecer idioma en el documento
    document.documentElement.lang = language;
    
    // Disparar evento para actualizar la interfaz
    window.dispatchEvent(new CustomEvent('market-language-change', {
      detail: { language, fallbackLanguage, market: this.currentMarket }
    }));
  }

  /**
   * Configurar moneda del mercado
   */
  setupCurrency() {
    const currency = this.currentMarket.currency;
    
    window.dispatchEvent(new CustomEvent('market-currency-change', {
      detail: { currency, market: this.currentMarket }
    }));
  }

  /**
   * Configurar optimizaciones culturales
   */
  setupCulturalOptimizations() {
    const cultural = this.currentMarket.culturalNotes;
    if (!cultural) return;

    // Mobile-first vs Desktop-first
    if (cultural.mobileFirst) {
      document.body.classList.add('mobile-first-market');
    }

    // Data consciousness (para mercados con datos limitados)
    if (cultural.dataConsciousness === 'high' || cultural.dataConsciousness === 'very-high') {
      document.body.classList.add('data-conscious-market');
      
      // Configurar optimizaciones de datos
      this.setupDataOptimizations();
    }

    // Speed focus
    if (cultural.speedFocus === 'very-high') {
      document.body.classList.add('speed-focused-market');
    }
  }

  /**
   * Configurar optimizaciones de datos para mercados conscientes de datos
   */
  setupDataOptimizations() {
    // Reducir calidad de imágenes por defecto
    window.dispatchEvent(new CustomEvent('enable-data-saver', {
      detail: { 
        imageQuality: 75,
        enableWebP: true,
        lazyLoadingAggressive: true
      }
    }));
  }

  /**
   * Configurar analytics específicos del mercado
   */
  setupMarketAnalytics() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: {
          'market_code': this.currentMarket.code,
          'market_name': this.currentMarket.name,
          'market_language': this.currentMarket.language,
          'market_priority': this.currentMarket.priority
        }
      });

      // Evento de detección de mercado
      gtag('event', 'market_detected', {
        event_category: 'International',
        event_label: this.currentMarket.name,
        market_code: this.currentMarket.code,
        market_potential: this.currentMarket.marketPotential || 'standard'
      });
    }
  }

  /**
   * Obtener mercado actual
   */
  getCurrentMarket() {
    return this.currentMarket;
  }

  /**
   * Obtener mercados por prioridad
   */
  getMarketsByPriority(priority) {
    return Object.values(INTERNATIONAL_MARKETS)
      .filter(market => market.priority === priority)
      .sort((a, b) => b.population * b.internetPenetration - a.population * a.internetPenetration);
  }

  /**
   * Obtener mercados no implementados con mayor potencial
   */
  getUnimplementedHighPotentialMarkets() {
    return Object.values(INTERNATIONAL_MARKETS)
      .filter(market => !market.implemented && market.marketPotential)
      .sort((a, b) => {
        const potentialScore = (market) => {
          const base = market.population * market.internetPenetration;
          const multiplier = market.marketPotential === 'massive' ? 3 : 
                           market.marketPotential === 'premium' ? 2 : 1;
          return base * multiplier;
        };
        return potentialScore(b) - potentialScore(a);
      });
  }

  /**
   * Calcular ROI potencial de un mercado
   */
  calculateMarketROI(marketCode) {
    const market = INTERNATIONAL_MARKETS[marketCode];
    if (!market) return null;

    const potentialUsers = market.population * market.internetPenetration * 0.001; // 0.1% penetración
    const monthlyRevenue = potentialUsers * market.adRevenueCPM * 0.02; // 2% CTR estimado
    const implementationCost = market.priority === 2 ? 3000 : 5000; // Costo estimado

    return {
      potentialUsers: Math.round(potentialUsers),
      monthlyRevenue: Math.round(monthlyRevenue),
      annualRevenue: Math.round(monthlyRevenue * 12),
      implementationCost,
      roi: Math.round((monthlyRevenue * 12 / implementationCost) * 100),
      paybackMonths: Math.round(implementationCost / monthlyRevenue)
    };
  }
}

/**
 * Hook de React para usar el gestor de mercados
 */
export const useInternationalMarket = () => {
  const [currentMarket, setCurrentMarket] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeMarket = async () => {
      const manager = new InternationalMarketManager();
      await manager.init();
      setCurrentMarket(manager.getCurrentMarket());
      setIsLoading(false);
    };

    initializeMarket();

    // Listeners para cambios de mercado
    const handleLanguageChange = (event) => {
      setCurrentMarket(event.detail.market);
    };

    window.addEventListener('market-language-change', handleLanguageChange);

    return () => {
      window.removeEventListener('market-language-change', handleLanguageChange);
    };
  }, []);

  return { currentMarket, isLoading };
};

/**
 * Inicializar gestor global de mercados
 */
export const initializeInternationalMarkets = async () => {
  const manager = new InternationalMarketManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.internationalMarketManager = manager;
  
  return manager;
};

export default InternationalMarketManager;
