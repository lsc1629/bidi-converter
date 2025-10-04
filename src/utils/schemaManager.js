// Sistema de Schema Markup avanzado para rich snippets

/**
 * Configuración de Schema Markup por tipo de página
 */
export const SCHEMA_CONFIG = {
  // Schemas para herramientas
  tools: {
    'image-converter': {
      type: 'WebApplication',
      category: 'UtilityApplication',
      operatingSystem: 'Any',
      applicationCategory: 'MultimediaApplication',
      offers: {
        price: '0',
        priceCurrency: 'USD'
      }
    },
    'pdf-viewer': {
      type: 'WebApplication',
      category: 'UtilityApplication',
      operatingSystem: 'Any',
      applicationCategory: 'ProductivityApplication'
    },
    'qr-generator': {
      type: 'WebApplication',
      category: 'UtilityApplication',
      operatingSystem: 'Any',
      applicationCategory: 'UtilityApplication'
    }
  },

  // Schemas para artículos de blog
  articles: {
    'how-to': {
      type: 'HowTo',
      estimatedCost: '0',
      totalTime: 'PT5M'
    },
    'tutorial': {
      type: 'HowTo',
      estimatedCost: '0',
      totalTime: 'PT10M'
    },
    'comparison': {
      type: 'Article',
      articleSection: 'Technology'
    }
  },

  // FAQs por mercado
  faqs: {
    'US': [
      {
        question: 'How do I convert images online for free?',
        answer: 'Upload your image to our free converter, select your desired format (PNG, JPG, WebP), and download the converted file instantly.'
      },
      {
        question: 'Is it safe to convert images online?',
        answer: 'Yes, our converter processes files locally in your browser and automatically deletes them after conversion for maximum security.'
      },
      {
        question: 'What image formats are supported?',
        answer: 'We support all major formats including PNG, JPG, JPEG, WebP, AVIF, GIF, BMP, TIFF, and SVG.'
      }
    ],
    'ES': [
      {
        question: '¿Cómo convertir imágenes online gratis?',
        answer: 'Sube tu imagen a nuestro convertidor gratuito, selecciona el formato deseado (PNG, JPG, WebP) y descarga el archivo convertido al instante.'
      },
      {
        question: '¿Es seguro convertir imágenes online?',
        answer: 'Sí, nuestro convertidor procesa archivos localmente en tu navegador y los elimina automáticamente después de la conversión para máxima seguridad.'
      },
      {
        question: '¿Qué formatos de imagen son compatibles?',
        answer: 'Soportamos todos los formatos principales incluyendo PNG, JPG, JPEG, WebP, AVIF, GIF, BMP, TIFF y SVG.'
      }
    ]
  },

  // Organización
  organization: {
    name: 'Bidi Converter',
    url: 'https://bidiconverter.com',
    logo: 'https://bidiconverter.com/logo.png',
    description: 'Free online file conversion tools for images, PDFs, and documents',
    foundingDate: '2023',
    contactPoint: {
      contactType: 'customer service',
      email: 'support@bidiconverter.com'
    },
    sameAs: [
      'https://twitter.com/bidiconverter',
      'https://github.com/bidiconverter'
    ]
  }
};

/**
 * Clase principal para gestión de Schema Markup
 */
export class SchemaManager {
  constructor() {
    this.schemas = new Map();
    this.currentPage = null;
    this.language = 'en';
    this.init();
  }

  async init() {
    this.detectCurrentPage();
    this.detectLanguage();
    this.generateBaseSchemas();
    this.injectSchemas();
    this.setupDynamicSchemas();
  }

  /**
   * Detectar página actual
   */
  detectCurrentPage() {
    const path = window.location.pathname;
    
    if (path.includes('/converter')) {
      this.currentPage = 'image-converter';
    } else if (path.includes('/viewer')) {
      this.currentPage = 'pdf-viewer';
    } else if (path.includes('/qr-generator')) {
      this.currentPage = 'qr-generator';
    } else if (path.includes('/blog/')) {
      this.currentPage = 'blog-article';
    } else if (path === '/' || path === '') {
      this.currentPage = 'homepage';
    } else {
      this.currentPage = 'generic';
    }

    console.log('Schema Manager: Detected page type', this.currentPage);
  }

  /**
   * Detectar idioma actual
   */
  detectLanguage() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.language = market?.language || 'en';
    } else {
      this.language = document.documentElement.lang || 'en';
    }
  }

  /**
   * Generar schemas base
   */
  generateBaseSchemas() {
    // Schema de organización (siempre presente)
    this.schemas.set('organization', this.generateOrganizationSchema());

    // Schema de breadcrumbs
    this.schemas.set('breadcrumbs', this.generateBreadcrumbSchema());

    // Schema específico de página
    switch (this.currentPage) {
      case 'image-converter':
        this.schemas.set('webApplication', this.generateWebApplicationSchema('image-converter'));
        this.schemas.set('faq', this.generateFAQSchema());
        break;
      case 'pdf-viewer':
        this.schemas.set('webApplication', this.generateWebApplicationSchema('pdf-viewer'));
        break;
      case 'qr-generator':
        this.schemas.set('webApplication', this.generateWebApplicationSchema('qr-generator'));
        break;
      case 'blog-article':
        this.schemas.set('article', this.generateArticleSchema());
        break;
      case 'homepage':
        this.schemas.set('website', this.generateWebsiteSchema());
        this.schemas.set('faq', this.generateFAQSchema());
        break;
    }
  }

  /**
   * Generar schema de organización
   */
  generateOrganizationSchema() {
    const orgConfig = SCHEMA_CONFIG.organization;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: orgConfig.name,
      url: orgConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: orgConfig.logo
      },
      description: orgConfig.description,
      foundingDate: orgConfig.foundingDate,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: orgConfig.contactPoint.contactType,
        email: orgConfig.contactPoint.email
      },
      sameAs: orgConfig.sameAs
    };
  }

  /**
   * Generar schema de aplicación web
   */
  generateWebApplicationSchema(toolType) {
    const toolConfig = SCHEMA_CONFIG.tools[toolType];
    if (!toolConfig) return null;

    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': toolConfig.type,
      name: this.getToolName(toolType),
      description: this.getToolDescription(toolType),
      url: window.location.href,
      applicationCategory: toolConfig.applicationCategory,
      operatingSystem: toolConfig.operatingSystem,
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      softwareVersion: '2.0',
      datePublished: '2023-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      author: {
        '@type': 'Organization',
        name: 'Bidi Converter'
      },
      provider: {
        '@type': 'Organization',
        name: 'Bidi Converter',
        url: 'https://bidiconverter.com'
      }
    };

    // Agregar offers si es gratuito
    if (toolConfig.offers) {
      baseSchema.offers = {
        '@type': 'Offer',
        price: toolConfig.offers.price,
        priceCurrency: toolConfig.offers.priceCurrency,
        availability: 'https://schema.org/InStock'
      };
    }

    return baseSchema;
  }

  /**
   * Generar schema de FAQ
   */
  generateFAQSchema() {
    const langCode = this.language === 'es' ? 'ES' : 'US';
    const faqs = SCHEMA_CONFIG.faqs[langCode] || SCHEMA_CONFIG.faqs['US'];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  /**
   * Generar schema de breadcrumbs
   */
  generateBreadcrumbSchema() {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part);
    
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bidiconverter.com'
      }
    ];

    pathParts.forEach((part, index) => {
      const position = index + 2;
      const url = 'https://bidiconverter.com/' + pathParts.slice(0, index + 1).join('/');
      
      breadcrumbs.push({
        '@type': 'ListItem',
        position,
        name: this.formatBreadcrumbName(part),
        item: url
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    };
  }

  /**
   * Generar schema de artículo
   */
  generateArticleSchema() {
    const title = document.querySelector('h1')?.textContent || 'Article';
    const description = document.querySelector('meta[name="description"]')?.content || '';
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      author: {
        '@type': 'Organization',
        name: 'Bidi Converter Team'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bidi Converter',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bidiconverter.com/logo.png'
        }
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href
      }
    };
  }

  /**
   * Generar schema de website
   */
  generateWebsiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Bidi Converter',
      url: 'https://bidiconverter.com',
      description: 'Free online file conversion tools for images, PDFs, and documents',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://bidiconverter.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  /**
   * Generar schema HowTo para tutoriales
   */
  generateHowToSchema(steps, title, description) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: title,
      description: description,
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0'
      },
      totalTime: 'PT5M',
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image || undefined
      }))
    };
  }

  /**
   * Inyectar schemas en el DOM
   */
  injectSchemas() {
    // Remover schemas existentes
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      if (script.dataset.schemaManager) {
        script.remove();
      }
    });

    // Inyectar nuevos schemas
    this.schemas.forEach((schema, key) => {
      if (schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.schemaManager = 'true';
        script.dataset.schemaType = key;
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
      }
    });

    console.log('Schema Manager: Injected schemas', Array.from(this.schemas.keys()));
  }

  /**
   * Configurar schemas dinámicos
   */
  setupDynamicSchemas() {
    // Observar cambios en el DOM para actualizar schemas
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Verificar si se agregó contenido que requiere nuevos schemas
          this.updateDynamicSchemas();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Actualizar schemas dinámicos
   */
  updateDynamicSchemas() {
    // Buscar elementos que requieren schemas específicos
    const howToElements = document.querySelectorAll('[data-schema="howto"]');
    const faqElements = document.querySelectorAll('[data-schema="faq"]');

    howToElements.forEach((element, index) => {
      const steps = this.extractHowToSteps(element);
      if (steps.length > 0) {
        const title = element.querySelector('h1, h2, h3')?.textContent || 'How To Guide';
        const description = element.querySelector('p')?.textContent || '';
        
        const howToSchema = this.generateHowToSchema(steps, title, description);
        this.schemas.set(`howto-${index}`, howToSchema);
      }
    });

    // Re-inyectar schemas actualizados
    this.injectSchemas();
  }

  /**
   * Extraer pasos de HowTo del DOM
   */
  extractHowToSteps(element) {
    const steps = [];
    const stepElements = element.querySelectorAll('[data-step], .step, .instruction');

    stepElements.forEach((stepEl, index) => {
      const name = stepEl.querySelector('h3, h4, .step-title')?.textContent || `Step ${index + 1}`;
      const text = stepEl.querySelector('p, .step-content')?.textContent || stepEl.textContent;
      const image = stepEl.querySelector('img')?.src;

      steps.push({
        name: name.trim(),
        text: text.trim(),
        image
      });
    });

    return steps;
  }

  /**
   * Obtener nombre de herramienta
   */
  getToolName(toolType) {
    const names = {
      'image-converter': {
        en: 'Free Image Converter',
        es: 'Convertidor de Imágenes Gratis',
        hi: 'मुफ्त इमेज कन्वर्टर',
        ru: 'Бесплатный Конвертер Изображений',
        ko: '무료 이미지 변환기'
      },
      'pdf-viewer': {
        en: 'PDF Viewer Online',
        es: 'Visor de PDF Online',
        hi: 'ऑनलाइन PDF व्यूअर',
        ru: 'Онлайн Просмотрщик PDF',
        ko: '온라인 PDF 뷰어'
      },
      'qr-generator': {
        en: 'QR Code Generator',
        es: 'Generador de Códigos QR',
        hi: 'QR कोड जेनरेटर',
        ru: 'Генератор QR Кодов',
        ko: 'QR 코드 생성기'
      }
    };

    return names[toolType]?.[this.language] || names[toolType]?.en || toolType;
  }

  /**
   * Obtener descripción de herramienta
   */
  getToolDescription(toolType) {
    const descriptions = {
      'image-converter': {
        en: 'Convert images between formats like PNG, JPG, WebP, AVIF online for free',
        es: 'Convierte imágenes entre formatos como PNG, JPG, WebP, AVIF online gratis',
        hi: 'PNG, JPG, WebP, AVIF जैसे फॉर्मेट के बीच इमेज को मुफ्त में ऑनलाइन कन्वर्ट करें',
        ru: 'Конвертируйте изображения между форматами PNG, JPG, WebP, AVIF онлайн бесплатно',
        ko: 'PNG, JPG, WebP, AVIF와 같은 형식 간에 이미지를 온라인에서 무료로 변환'
      }
    };

    return descriptions[toolType]?.[this.language] || descriptions[toolType]?.en || '';
  }

  /**
   * Formatear nombre de breadcrumb
   */
  formatBreadcrumbName(part) {
    const names = {
      'converter': 'Image Converter',
      'viewer': 'PDF Viewer',
      'qr-generator': 'QR Generator',
      'blog': 'Blog',
      'about': 'About',
      'contact': 'Contact'
    };

    return names[part] || part.charAt(0).toUpperCase() + part.slice(1);
  }

  /**
   * Agregar schema personalizado
   */
  addCustomSchema(key, schema) {
    this.schemas.set(key, schema);
    this.injectSchemas();
  }

  /**
   * Remover schema
   */
  removeSchema(key) {
    this.schemas.delete(key);
    this.injectSchemas();
  }

  /**
   * Obtener estadísticas de schemas
   */
  getSchemaStats() {
    return {
      totalSchemas: this.schemas.size,
      currentPage: this.currentPage,
      language: this.language,
      schemaTypes: Array.from(this.schemas.keys()),
      injectedAt: Date.now()
    };
  }

  /**
   * Validar schemas
   */
  async validateSchemas() {
    const results = [];
    
    for (const [key, schema] of this.schemas) {
      try {
        // Validación básica de estructura
        const isValid = schema['@context'] && schema['@type'];
        results.push({
          key,
          type: schema['@type'],
          valid: isValid,
          errors: isValid ? [] : ['Missing @context or @type']
        });
      } catch (error) {
        results.push({
          key,
          valid: false,
          errors: [error.message]
        });
      }
    }

    return results;
  }
}

/**
 * Inicializar Schema Manager
 */
export const initializeSchemaManager = async () => {
  const manager = new SchemaManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.schemaManager = manager;
  
  return manager;
};

export default SchemaManager;
