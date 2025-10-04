// Sistema de rutas multiidioma expandido para mercados internacionales
export const routes = {
  // Inglés (Estados Unidos, Reino Unido)
  en: {
    home: '/',
    converter: '/converter',
    editor: '/editor',
    devTools: '/dev-tools',
    viewer: '/viewer',
    unitConverter: '/unit-converter',
    percentageCalculator: '/percentage-calculator',
    currencyConverter: '/currency-converter',
    passwordGenerator: '/password-generator',
    rutValidator: '/id-validator',
    bmiCalculator: '/bmi-calculator',
    textConverter: '/text-converter',
    urlShortener: '/url-shortener',
    zipCompressor: '/zip-compressor',
    qrGenerator: '/qr-generator',
    about: '/about',
    contact: '/contact',
    blog: '/blog',
    privacy: '/privacy',
    terms: '/terms'
  },

  // Español (España, México, Argentina)
  es: {
    home: '/',
    converter: '/conversor',
    editor: '/editor',
    devTools: '/herramientas-dev',
    viewer: '/visor',
    unitConverter: '/conversor-unidades',
    percentageCalculator: '/calculadora-porcentajes',
    currencyConverter: '/conversor-divisas',
    passwordGenerator: '/generador-contrasenas',
    rutValidator: '/validador-rut',
    bmiCalculator: '/calculadora-imc',
    textConverter: '/conversor-texto',
    urlShortener: '/acortador-url',
    zipCompressor: '/compresor-zip',
    qrGenerator: '/generador-qr',
    about: '/acerca',
    contact: '/contacto',
    blog: '/blog',
    privacy: '/privacidad',
    terms: '/terminos'
  },
  
  // Portugués (Brasil)
  pt: {
    home: '/',
    converter: '/conversor',
    editor: '/editor',
    devTools: '/ferramentas-dev',
    viewer: '/visualizador',
    unitConverter: '/conversor-unidades',
    percentageCalculator: '/calculadora-porcentagens',
    currencyConverter: '/conversor-moedas',
    passwordGenerator: '/gerador-senhas',
    rutValidator: '/validador-cpf',
    bmiCalculator: '/calculadora-imc',
    textConverter: '/conversor-texto',
    urlShortener: '/encurtador-url',
    zipCompressor: '/compressor-zip',
    qrGenerator: '/gerador-qr',
    about: '/sobre',
    contact: '/contato',
    blog: '/blog',
    privacy: '/privacidade',
    terms: '/termos'
  },

  // Hindi (India) - NUEVO MERCADO EMERGENTE
  hi: {
    home: '/',
    converter: '/converter',
    editor: '/editor',
    devTools: '/dev-tools',
    viewer: '/viewer',
    unitConverter: '/unit-converter',
    percentageCalculator: '/percentage-calculator',
    currencyConverter: '/currency-converter',
    passwordGenerator: '/password-generator',
    rutValidator: '/id-validator',
    bmiCalculator: '/bmi-calculator',
    textConverter: '/text-converter',
    urlShortener: '/url-shortener',
    zipCompressor: '/zip-compressor',
    qrGenerator: '/qr-generator',
    about: '/about',
    contact: '/contact',
    blog: '/blog',
    privacy: '/privacy',
    terms: '/terms'
  },

  // Bahasa Indonesia - NUEVO MERCADO EMERGENTE
  id: {
    home: '/',
    converter: '/konverter',
    editor: '/editor',
    devTools: '/dev-tools',
    viewer: '/viewer',
    unitConverter: '/konverter-unit',
    percentageCalculator: '/kalkulator-persentase',
    currencyConverter: '/konverter-mata-uang',
    passwordGenerator: '/generator-password',
    rutValidator: '/validator-id',
    bmiCalculator: '/kalkulator-bmi',
    textConverter: '/konverter-teks',
    urlShortener: '/pemendek-url',
    zipCompressor: '/kompresor-zip',
    qrGenerator: '/generator-qr',
    about: '/tentang',
    contact: '/kontak',
    blog: '/blog',
    privacy: '/privasi',
    terms: '/syarat'
  },

  // Ruso (Rusia) - NUEVO MERCADO EMERGENTE
  ru: {
    home: '/',
    converter: '/konverter',
    editor: '/redaktor',
    devTools: '/instrumenty',
    viewer: '/prosmotr',
    unitConverter: '/konverter-edinits',
    percentageCalculator: '/kalkulyator-protsentov',
    currencyConverter: '/konverter-valyut',
    passwordGenerator: '/generator-paroley',
    rutValidator: '/validator-id',
    bmiCalculator: '/kalkulyator-imt',
    textConverter: '/konverter-teksta',
    urlShortener: '/sokrashchatel-ssylok',
    zipCompressor: '/kompresor-zip',
    qrGenerator: '/generator-qr',
    about: '/o-nas',
    contact: '/kontakty',
    blog: '/blog',
    privacy: '/konfidentsialnost',
    terms: '/usloviya'
  },

  // Coreano (Corea del Sur) - NUEVO MERCADO EMERGENTE
  ko: {
    home: '/',
    converter: '/byeonhwangi',
    editor: '/pyeonjipgi',
    devTools: '/gaebal-dogu',
    viewer: '/byu-eo',
    unitConverter: '/danwi-byeonhwangi',
    percentageCalculator: '/baegsul-gyesangi',
    currencyConverter: '/hwapye-byeonhwangi',
    passwordGenerator: '/bimilbeonho-saengseonggi',
    rutValidator: '/id-geomjeunggi',
    bmiCalculator: '/bmi-gyesangi',
    textConverter: '/tekseuteu-byeonhwangi',
    urlShortener: '/url-danchugi',
    zipCompressor: '/zip-apchukgi',
    qrGenerator: '/qr-saengseonggi',
    about: '/hoesa-sogae',
    contact: '/yeonrakcheo',
    blog: '/beullogeu',
    privacy: '/gaeinjeongbo',
    terms: '/iyong-yagwan'
  }
};

// Obtener ruta según idioma
export const getRoute = (key, language = 'en') => {
  return routes[language]?.[key] || routes.en[key];
};

// Obtener todas las rutas para un componente (para hreflang) - EXPANDIDO
export const getAllRoutes = (key) => {
  return {
    en: routes.en[key],
    es: routes.es[key],
    pt: routes.pt[key],
    hi: routes.hi[key],
    id: routes.id[key],
    ru: routes.ru[key],
    ko: routes.ko[key]
  };
};

// Obtener mercados disponibles
export const getAvailableMarkets = () => {
  return Object.keys(routes);
};

// Obtener información del mercado por idioma
export const getMarketInfo = (language) => {
  const marketInfo = {
    en: { name: 'English', flag: '🇺🇸', region: 'US' },
    es: { name: 'Español', flag: '🇪🇸', region: 'ES' },
    pt: { name: 'Português', flag: '🇧🇷', region: 'BR' },
    hi: { name: 'हिंदी', flag: '🇮🇳', region: 'IN' },
    id: { name: 'Bahasa Indonesia', flag: '🇮🇩', region: 'ID' },
    ru: { name: 'Русский', flag: '🇷🇺', region: 'RU' },
    ko: { name: '한국어', flag: '🇰🇷', region: 'KR' }
  };
  
  return marketInfo[language] || marketInfo.en;
};
