// Sistema de rutas multiidioma
export const routes = {
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
  }
};

// Obtener ruta según idioma
export const getRoute = (key, language = 'en') => {
  return routes[language]?.[key] || routes.en[key];
};

// Obtener todas las rutas para un componente (para hreflang)
export const getAllRoutes = (key) => {
  return {
    en: routes.en[key],
    es: routes.es[key],
    pt: routes.pt[key]
  };
};
