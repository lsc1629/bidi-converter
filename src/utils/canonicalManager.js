// Sistema de Canonical URLs y Technical SEO

/**
 * Configuración de URLs canónicas y SEO técnico
 */
export const CANONICAL_CONFIG = {
  // Dominio principal
  primaryDomain: 'https://bidiconverter.com',
  
  // Configuración por mercado
  marketDomains: {
    'US': 'https://bidiconverter.com',
    'ES': 'https://bidiconverter.com/es',
    'IN': 'https://bidiconverter.com/hi',
    'RU': 'https://bidiconverter.com/ru',
    'KR': 'https://bidiconverter.com/ko',
    'ID': 'https://bidiconverter.com/id'
  },

  // Rutas canónicas por herramienta
  canonicalRoutes: {
    '/': '/',
    '/converter': '/converter',
    '/image-converter': '/converter',
    '/pdf-viewer': '/viewer',
    '/qr-generator': '/qr-generator',
    '/password-generator': '/password-generator',
    '/unit-converter': '/unit-converter',
    '/blog': '/blog',
    '/about': '/about',
    '/contact': '/contact',
    '/privacy': '/privacy',
    '/terms': '/terms'
  },

  // Parámetros a ignorar en canonical
  ignoredParams: [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'fbclid', 'gclid', 'ref', 'source', 'campaign',
    '_ga', '_gid', 'sessionid', 'timestamp'
  ],

  // Parámetros importantes para canonical
  importantParams: [
    'lang', 'format', 'quality', 'size', 'type'
  ],

  // Redirects automáticos
  redirectRules: {
    '/image-converter.html': '/converter',
    '/pdf-viewer.html': '/viewer',
    '/convert': '/converter',
    '/view': '/viewer',
    '/generate': '/qr-generator',
    '/tools': '/',
    '/home': '/'
  },

  // Meta tags por tipo de página
  metaTemplates: {
    'homepage': {
      titleTemplate: 'Free Online File Converter - Images, PDFs & More | {siteName}',
      descriptionTemplate: 'Convert images, view PDFs, generate QR codes and more with our free online tools. Fast, secure, and works in your browser.',
      keywordsTemplate: 'file converter, image converter, pdf viewer, qr generator, online tools, free converter'
    },
    'tool': {
      titleTemplate: '{toolName} - Free Online {toolType} | {siteName}',
      descriptionTemplate: 'Free online {toolName} - {toolDescription}. Fast, secure, and no registration required.',
      keywordsTemplate: '{toolKeywords}, online {toolType}, free {toolName}'
    },
    'blog': {
      titleTemplate: '{articleTitle} | {siteName} Blog',
      descriptionTemplate: '{articleDescription}',
      keywordsTemplate: '{articleKeywords}'
    }
  }
};

/**
 * Clase principal para gestión de URLs canónicas y SEO técnico
 */
export class CanonicalManager {
  constructor() {
    this.currentUrl = null;
    this.canonicalUrl = null;
    this.currentMarket = null;
    this.duplicateIssues = new Map();
    this.redirects = new Map();
    this.metaTags = new Map();
    this.init();
  }

  async init() {
    this.detectCurrentUrl();
    this.detectMarket();
    this.generateCanonicalUrl();
    this.setupMetaTags();
    this.handleRedirects();
    this.detectDuplicateContent();
    this.setupUrlMonitoring();
    this.injectCanonicalTags();
  }

  /**
   * Detectar URL actual
   */
  detectCurrentUrl() {
    this.currentUrl = new URL(window.location.href);
    console.log('Canonical Manager: Current URL detected', this.currentUrl.href);
  }

  /**
   * Detectar mercado actual
   */
  detectMarket() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentMarket = market?.code || 'US';
    } else {
      // Detectar por path
      const path = this.currentUrl.pathname;
      if (path.startsWith('/es')) this.currentMarket = 'ES';
      else if (path.startsWith('/hi')) this.currentMarket = 'IN';
      else if (path.startsWith('/ru')) this.currentMarket = 'RU';
      else if (path.startsWith('/ko')) this.currentMarket = 'KR';
      else if (path.startsWith('/id')) this.currentMarket = 'ID';
      else this.currentMarket = 'US';
    }
  }

  /**
   * Generar URL canónica
   */
  generateCanonicalUrl() {
    const baseDomain = CANONICAL_CONFIG.marketDomains[this.currentMarket] || CANONICAL_CONFIG.primaryDomain;
    let canonicalPath = this.currentUrl.pathname;

    // Normalizar path usando rutas canónicas
    for (const [pattern, canonical] of Object.entries(CANONICAL_CONFIG.canonicalRoutes)) {
      if (canonicalPath === pattern || canonicalPath.startsWith(pattern + '/')) {
        canonicalPath = canonical + canonicalPath.substring(pattern.length);
        break;
      }
    }

    // Limpiar parámetros no importantes
    const cleanParams = new URLSearchParams();
    const currentParams = this.currentUrl.searchParams;

    // Mantener solo parámetros importantes
    CANONICAL_CONFIG.importantParams.forEach(param => {
      if (currentParams.has(param)) {
        cleanParams.set(param, currentParams.get(param));
      }
    });

    // Construir URL canónica
    this.canonicalUrl = baseDomain + canonicalPath;
    if (cleanParams.toString()) {
      this.canonicalUrl += '?' + cleanParams.toString();
    }

    console.log('Canonical Manager: Generated canonical URL', this.canonicalUrl);
  }

  /**
   * Configurar meta tags
   */
  setupMetaTags() {
    const pageType = this.detectPageType();
    const template = CANONICAL_CONFIG.metaTemplates[pageType] || CANONICAL_CONFIG.metaTemplates['homepage'];
    
    const metaData = this.generateMetaData(template, pageType);
    this.metaTags.set('title', metaData.title);
    this.metaTags.set('description', metaData.description);
    this.metaTags.set('keywords', metaData.keywords);
    
    // Meta tags adicionales
    this.metaTags.set('og:title', metaData.title);
    this.metaTags.set('og:description', metaData.description);
    this.metaTags.set('og:url', this.canonicalUrl);
    this.metaTags.set('og:type', pageType === 'blog' ? 'article' : 'website');
    this.metaTags.set('og:image', this.generateOGImage(pageType));
    
    // Twitter Cards
    this.metaTags.set('twitter:card', 'summary_large_image');
    this.metaTags.set('twitter:title', metaData.title);
    this.metaTags.set('twitter:description', metaData.description);
    this.metaTags.set('twitter:image', this.generateOGImage(pageType));
    
    // Hreflang tags
    this.generateHreflangTags();
  }

  /**
   * Detectar tipo de página
   */
  detectPageType() {
    const path = this.currentUrl.pathname;
    
    if (path === '/' || path.match(/^\/(es|hi|ru|ko|id)\/?$/)) {
      return 'homepage';
    } else if (path.includes('/blog/')) {
      return 'blog';
    } else if (path.match(/\/(converter|viewer|qr-generator|password-generator|unit-converter)/)) {
      return 'tool';
    }
    
    return 'homepage';
  }

  /**
   * Generar meta data
   */
  generateMetaData(template, pageType) {
    const siteName = 'Bidi Converter';
    let data = {
      title: template.titleTemplate,
      description: template.descriptionTemplate,
      keywords: template.keywordsTemplate
    };

    // Reemplazos específicos por tipo
    if (pageType === 'tool') {
      const toolInfo = this.getToolInfo();
      data.title = data.title
        .replace('{toolName}', toolInfo.name)
        .replace('{toolType}', toolInfo.type)
        .replace('{siteName}', siteName);
      
      data.description = data.description
        .replace('{toolName}', toolInfo.name)
        .replace('{toolDescription}', toolInfo.description);
      
      data.keywords = data.keywords
        .replace('{toolKeywords}', toolInfo.keywords)
        .replace('{toolType}', toolInfo.type)
        .replace('{toolName}', toolInfo.name.toLowerCase());
    } else if (pageType === 'blog') {
      const articleInfo = this.getArticleInfo();
      data.title = data.title
        .replace('{articleTitle}', articleInfo.title)
        .replace('{siteName}', siteName);
      
      data.description = articleInfo.description;
      data.keywords = articleInfo.keywords;
    } else {
      data.title = data.title.replace('{siteName}', siteName);
    }

    return data;
  }

  /**
   * Obtener información de herramienta
   */
  getToolInfo() {
    const path = this.currentUrl.pathname;
    
    const tools = {
      'converter': {
        name: 'Image Converter',
        type: 'Image Tool',
        description: 'Convert images between formats like PNG, JPG, WebP, AVIF online for free',
        keywords: 'image converter, png to jpg, webp converter, avif converter'
      },
      'viewer': {
        name: 'PDF Viewer',
        type: 'Document Tool',
        description: 'View PDF files online in your browser without downloading',
        keywords: 'pdf viewer, online pdf reader, view pdf browser'
      },
      'qr-generator': {
        name: 'QR Code Generator',
        type: 'QR Tool',
        description: 'Generate QR codes for text, URLs, and more online for free',
        keywords: 'qr generator, qr code maker, create qr code'
      },
      'password-generator': {
        name: 'Password Generator',
        type: 'Security Tool',
        description: 'Generate secure passwords online with customizable options',
        keywords: 'password generator, secure password, random password'
      },
      'unit-converter': {
        name: 'Unit Converter',
        type: 'Conversion Tool',
        description: 'Convert between different units of measurement online',
        keywords: 'unit converter, measurement converter, length converter'
      }
    };

    for (const [key, info] of Object.entries(tools)) {
      if (path.includes(key)) {
        return info;
      }
    }

    return tools['converter']; // default
  }

  /**
   * Obtener información de artículo
   */
  getArticleInfo() {
    // En una implementación real, esto vendría del CMS o metadata
    const title = document.querySelector('h1')?.textContent || 'Blog Article';
    const description = document.querySelector('meta[name="description"]')?.content || 
                      document.querySelector('p')?.textContent?.substring(0, 160) || 
                      'Read our latest blog post about online tools and file conversion.';
    
    return {
      title,
      description,
      keywords: 'blog, tutorial, guide, online tools, file conversion'
    };
  }

  /**
   * Generar imagen OG
   */
  generateOGImage(pageType) {
    const baseUrl = CANONICAL_CONFIG.primaryDomain;
    
    if (pageType === 'tool') {
      const toolInfo = this.getToolInfo();
      return `${baseUrl}/og-images/${toolInfo.name.toLowerCase().replace(' ', '-')}.png`;
    } else if (pageType === 'blog') {
      return `${baseUrl}/og-images/blog-default.png`;
    }
    
    return `${baseUrl}/og-images/homepage.png`;
  }

  /**
   * Generar tags hreflang
   */
  generateHreflangTags() {
    const basePath = this.getBasePath();
    
    // Hreflang para cada mercado
    Object.entries(CANONICAL_CONFIG.marketDomains).forEach(([market, domain]) => {
      const hreflangUrl = domain + basePath;
      const langCode = this.getLanguageCode(market);
      
      this.metaTags.set(`hreflang-${langCode}`, hreflangUrl);
    });

    // Default hreflang
    this.metaTags.set('hreflang-x-default', CANONICAL_CONFIG.primaryDomain + basePath);
  }

  /**
   * Obtener path base sin idioma
   */
  getBasePath() {
    let path = this.currentUrl.pathname;
    
    // Remover prefijos de idioma
    const langPrefixes = ['/es', '/hi', '/ru', '/ko', '/id'];
    for (const prefix of langPrefixes) {
      if (path.startsWith(prefix)) {
        path = path.substring(prefix.length) || '/';
        break;
      }
    }
    
    return path;
  }

  /**
   * Obtener código de idioma
   */
  getLanguageCode(market) {
    const codes = {
      'US': 'en',
      'ES': 'es',
      'IN': 'hi',
      'RU': 'ru',
      'KR': 'ko',
      'ID': 'id'
    };
    
    return codes[market] || 'en';
  }

  /**
   * Manejar redirects
   */
  handleRedirects() {
    const currentPath = this.currentUrl.pathname;
    
    // Verificar redirects configurados
    for (const [oldPath, newPath] of Object.entries(CANONICAL_CONFIG.redirectRules)) {
      if (currentPath === oldPath) {
        const redirectUrl = CANONICAL_CONFIG.primaryDomain + newPath;
        console.log('Canonical Manager: Redirect needed', oldPath, '->', redirectUrl);
        
        // En una implementación real, esto sería un redirect 301
        // window.location.replace(redirectUrl);
        return;
      }
    }

    // Verificar redirects por parámetros innecesarios
    if (this.hasUnnecessaryParams()) {
      const cleanUrl = this.canonicalUrl;
      console.log('Canonical Manager: Clean URL redirect', cleanUrl);
      
      // history.replaceState(null, '', cleanUrl);
    }
  }

  /**
   * Verificar parámetros innecesarios
   */
  hasUnnecessaryParams() {
    const params = this.currentUrl.searchParams;
    
    for (const param of CANONICAL_CONFIG.ignoredParams) {
      if (params.has(param)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Detectar contenido duplicado
   */
  detectDuplicateContent() {
    const issues = [];
    
    // Verificar múltiples URLs para el mismo contenido
    const currentContent = this.getPageContentHash();
    const storedHashes = this.getStoredContentHashes();
    
    if (storedHashes.has(currentContent) && storedHashes.get(currentContent) !== this.canonicalUrl) {
      issues.push({
        type: 'duplicate_content',
        current: this.currentUrl.href,
        canonical: this.canonicalUrl,
        duplicate: storedHashes.get(currentContent)
      });
    }
    
    // Verificar parámetros que causan duplicación
    if (this.currentUrl.href !== this.canonicalUrl) {
      issues.push({
        type: 'parameter_duplication',
        current: this.currentUrl.href,
        canonical: this.canonicalUrl
      });
    }
    
    this.duplicateIssues.set(this.currentUrl.href, issues);
    
    if (issues.length > 0) {
      console.warn('Canonical Manager: Duplicate content issues detected', issues);
    }
  }

  /**
   * Obtener hash del contenido de la página
   */
  getPageContentHash() {
    const content = document.querySelector('main')?.textContent || document.body.textContent;
    return this.simpleHash(content.replace(/\s+/g, ' ').trim());
  }

  /**
   * Hash simple para contenido
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  /**
   * Obtener hashes almacenados
   */
  getStoredContentHashes() {
    // En una implementación real, esto vendría de localStorage o API
    return new Map();
  }

  /**
   * Configurar monitoreo de URLs
   */
  setupUrlMonitoring() {
    // Monitorear cambios en la URL
    window.addEventListener('popstate', () => {
      this.handleUrlChange();
    });

    // Interceptar navegación programática
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => this.handleUrlChange(), 0);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => this.handleUrlChange(), 0);
    };
  }

  /**
   * Manejar cambio de URL
   */
  handleUrlChange() {
    this.detectCurrentUrl();
    this.detectMarket();
    this.generateCanonicalUrl();
    this.setupMetaTags();
    this.updateCanonicalTags();
    this.detectDuplicateContent();
  }

  /**
   * Inyectar tags canónicos
   */
  injectCanonicalTags() {
    // Remover tags existentes
    this.removeExistingTags();

    // Inyectar canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = this.canonicalUrl;
    canonicalLink.dataset.canonicalManager = 'true';
    document.head.appendChild(canonicalLink);

    // Inyectar meta tags
    this.metaTags.forEach((content, name) => {
      if (name.startsWith('hreflang-')) {
        const lang = name.replace('hreflang-', '');
        const hreflangLink = document.createElement('link');
        hreflangLink.rel = 'alternate';
        hreflangLink.hreflang = lang;
        hreflangLink.href = content;
        hreflangLink.dataset.canonicalManager = 'true';
        document.head.appendChild(hreflangLink);
      } else {
        this.updateMetaTag(name, content);
      }
    });

    console.log('Canonical Manager: Tags injected', this.canonicalUrl);
  }

  /**
   * Remover tags existentes
   */
  removeExistingTags() {
    document.querySelectorAll('[data-canonical-manager="true"]').forEach(tag => {
      tag.remove();
    });
  }

  /**
   * Actualizar meta tag
   */
  updateMetaTag(name, content) {
    let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        tag.setAttribute('property', name);
      } else {
        tag.setAttribute('name', name);
      }
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
    tag.dataset.canonicalManager = 'true';

    // Actualizar title si es necesario
    if (name === 'title') {
      document.title = content;
    }
  }

  /**
   * Actualizar tags canónicos
   */
  updateCanonicalTags() {
    this.injectCanonicalTags();
  }

  /**
   * Obtener estadísticas de SEO técnico
   */
  getTechnicalSEOStats() {
    return {
      canonicalUrl: this.canonicalUrl,
      currentUrl: this.currentUrl.href,
      market: this.currentMarket,
      duplicateIssues: this.duplicateIssues.size,
      metaTagsCount: this.metaTags.size,
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasHreflang: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
      redirectsNeeded: this.getRedirectsNeeded(),
      lastUpdate: Date.now()
    };
  }

  /**
   * Obtener redirects necesarios
   */
  getRedirectsNeeded() {
    const issues = [];
    
    // Verificar si la URL actual necesita redirect
    if (this.currentUrl.href !== this.canonicalUrl) {
      issues.push({
        from: this.currentUrl.href,
        to: this.canonicalUrl,
        type: 'canonical_redirect'
      });
    }
    
    return issues;
  }

  /**
   * Generar sitemap dinámico
   */
  generateSitemap() {
    const urls = [];
    const baseUrl = CANONICAL_CONFIG.primaryDomain;
    
    // URLs principales
    Object.values(CANONICAL_CONFIG.canonicalRoutes).forEach(route => {
      // Para cada mercado
      Object.entries(CANONICAL_CONFIG.marketDomains).forEach(([market, domain]) => {
        const url = {
          loc: domain + route,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: route === '/' ? 'daily' : 'weekly',
          priority: route === '/' ? '1.0' : '0.8',
          alternates: {}
        };
        
        // Agregar alternates para hreflang
        Object.entries(CANONICAL_CONFIG.marketDomains).forEach(([altMarket, altDomain]) => {
          const langCode = this.getLanguageCode(altMarket);
          url.alternates[langCode] = altDomain + route;
        });
        
        urls.push(url);
      });
    });
    
    return urls;
  }

  /**
   * Validar SEO técnico
   */
  validateTechnicalSEO() {
    const issues = [];
    
    // Verificar canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push({ type: 'missing_canonical', severity: 'high' });
    } else if (canonical.href !== this.canonicalUrl) {
      issues.push({ type: 'incorrect_canonical', severity: 'high', expected: this.canonicalUrl, found: canonical.href });
    }
    
    // Verificar meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || !metaDesc.content) {
      issues.push({ type: 'missing_meta_description', severity: 'high' });
    } else if (metaDesc.content.length < 120 || metaDesc.content.length > 160) {
      issues.push({ type: 'meta_description_length', severity: 'medium', length: metaDesc.content.length });
    }
    
    // Verificar title
    if (!document.title || document.title.length < 30 || document.title.length > 60) {
      issues.push({ type: 'title_length', severity: 'high', length: document.title.length });
    }
    
    // Verificar hreflang
    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    if (hreflangs.length === 0) {
      issues.push({ type: 'missing_hreflang', severity: 'medium' });
    }
    
    return issues;
  }
}

/**
 * Inicializar Canonical Manager
 */
export const initializeCanonicalManager = async () => {
  const manager = new CanonicalManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.canonicalManager = manager;
  
  return manager;
};

export default CanonicalManager;
