import { useState, useEffect } from 'react';
import { initializeInternationalMarkets } from '../utils/internationalMarkets';

// Función para detectar idioma inicial inmediatamente
const getInitialLanguage = () => {
  const browserLanguage = navigator.language || navigator.languages[0];
  const languageCode = browserLanguage.split('-')[0];
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  console.log('🚀 Initial language detection:', { browserLanguage, languageCode, timezone });
  
  // Si es español, usar español inmediatamente
  if (languageCode === 'es') {
    console.log('✅ Spanish detected immediately');
    return 'es';
  }
  
  // Si el timezone indica un país hispanohablante, usar español
  const spanishTimezones = [
    'America/Santiago', 'Pacific/Easter', // Chile
    'America/Argentina/Buenos_Aires', 'America/Argentina/Cordoba', // Argentina
    'America/Bogota', // Colombia
    'America/Mexico_City', 'America/Tijuana', // México
    'America/Lima', // Perú
    'America/Caracas', // Venezuela
    'Europe/Madrid' // España
  ];
  
  if (spanishTimezones.some(tz => timezone.includes(tz.split('/')[1]))) {
    console.log('✅ Spanish timezone detected, using Spanish');
    return 'es';
  }
  
  // Verificar idioma guardado
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    console.log('💾 Using saved language:', savedLanguage);
    return savedLanguage;
  }
  
  // Mapeo de otros idiomas
  const languageMapping = {
    'hi': 'hi',
    'id': 'id', 
    'ru': 'ru',
    'ko': 'ko',
    'en': 'en',
    'pt': 'pt'
  };
  
  return languageMapping[languageCode] || 'es'; // Default a español
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(getInitialLanguage()); // Detección inmediata
  const [detectedMarket, setDetectedMarket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguageDetection = async () => {
      try {
        // Inicializar detección de mercados internacionales
        const marketManager = await initializeInternationalMarkets();
        const currentMarket = marketManager.getCurrentMarket();
        
        if (currentMarket) {
          setDetectedMarket(currentMarket);
          setLanguage(currentMarket.language);
        } else {
          // Fallback a detección básica
          detectBasicLanguage();
        }
      } catch (error) {
        console.warn('Error initializing international markets:', error);
        detectBasicLanguage();
      } finally {
        setIsLoading(false);
      }
    };

    const detectBasicLanguage = () => {
      // Detectar idioma del navegador
      const browserLanguage = navigator.language || navigator.languages[0];
      const languageCode = browserLanguage.split('-')[0];
      const countryCode = browserLanguage.split('-')[1];
      
      console.log('🌍 Detecting language:', { browserLanguage, languageCode, countryCode });
      
      // Idiomas soportados expandidos
      const supportedLanguages = ['es', 'en', 'pt', 'hi', 'id', 'ru', 'ko'];
      
      // Mapeo específico de códigos de idioma con detección mejorada para español
      let detectedLanguage = 'en'; // fallback
      
      if (languageCode === 'es') {
        // Para español, siempre usar 'es' independientemente del país
        detectedLanguage = 'es';
        console.log('🇨🇱 Spanish detected, setting to ES');
      } else if (languageCode === 'hi') {
        detectedLanguage = 'hi';
      } else if (languageCode === 'id') {
        detectedLanguage = 'id';
      } else if (languageCode === 'ru') {
        detectedLanguage = 'ru';
      } else if (languageCode === 'ko') {
        detectedLanguage = 'ko';
      } else if (languageCode === 'en') {
        detectedLanguage = 'en';
      } else if (languageCode === 'pt') {
        detectedLanguage = 'pt';
      }

      // Detección adicional por timezone para países hispanohablantes
      if (languageCode === 'es' || detectedLanguage === 'es') {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('🕐 Timezone detected:', timezone);
        
        // Si el timezone indica un país hispanohablante, usar español
        const spanishTimezones = [
          'America/Santiago', 'Pacific/Easter', // Chile
          'America/Argentina/Buenos_Aires', 'America/Argentina/Cordoba', // Argentina
          'America/Bogota', // Colombia
          'America/Mexico_City', 'America/Tijuana', // México
          'America/Lima', // Perú
          'America/Caracas', // Venezuela
          'Europe/Madrid' // España
        ];
        
        if (spanishTimezones.some(tz => timezone.includes(tz.split('/')[1]))) {
          detectedLanguage = 'es';
          console.log('✅ Spanish confirmed by timezone');
        }
      }
      
      if (supportedLanguages.includes(detectedLanguage)) {
        setLanguage(detectedLanguage);
        console.log('🎯 Language set to:', detectedLanguage);
      }
      
      // Verificar idioma guardado (tiene prioridad)
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        setLanguage(savedLanguage);
        console.log('💾 Using saved language:', savedLanguage);
      }
    };

    initializeLanguageDetection();

    // Listener para cambios de mercado
    const handleMarketChange = (event) => {
      const { language: newLanguage, market } = event.detail;
      setLanguage(newLanguage);
      setDetectedMarket(market);
      localStorage.setItem('language', newLanguage);
      localStorage.setItem('detectedMarket', JSON.stringify(market));
    };

    window.addEventListener('market-language-change', handleMarketChange);

    return () => {
      window.removeEventListener('market-language-change', handleMarketChange);
    };
  }, []);

  const changeLanguage = (newLanguage) => {
    const supportedLanguages = ['es', 'en', 'pt', 'hi', 'id', 'ru', 'ko'];
    
    if (supportedLanguages.includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      
      // Disparar evento de cambio de idioma
      window.dispatchEvent(new CustomEvent('language-changed', {
        detail: { language: newLanguage, market: detectedMarket }
      }));
    }
  };

  const getSupportedLanguages = () => {
    return [
      { code: 'en', name: 'English', flag: '🇺🇸', market: 'US' },
      { code: 'es', name: 'Español', flag: '🇪🇸', market: 'ES' },
      { code: 'pt', name: 'Português', flag: '🇧🇷', market: 'BR' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳', market: 'IN' },
      { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', market: 'ID' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', market: 'RU' },
      { code: 'ko', name: '한국어', flag: '🇰🇷', market: 'KR' }
    ];
  };

  const getCurrentMarketInfo = () => {
    const languages = getSupportedLanguages();
    return languages.find(lang => lang.code === language) || languages[0];
  };

  return { 
    language, 
    changeLanguage, 
    detectedMarket, 
    isLoading,
    getSupportedLanguages,
    getCurrentMarketInfo
  };
};
