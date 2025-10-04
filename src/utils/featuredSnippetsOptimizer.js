// Optimizador para Featured Snippets y Rich Results

/**
 * Configuración para optimización de featured snippets
 */
export const SNIPPET_CONFIG = {
  // Tipos de snippets por mercado
  snippetTypes: {
    'US': {
      'paragraph': ['how to convert', 'what is', 'best way to'],
      'list': ['steps to', 'ways to', 'methods for'],
      'table': ['comparison', 'vs', 'differences between'],
      'video': ['tutorial', 'guide', 'how-to video']
    },
    'ES': {
      'paragraph': ['cómo convertir', 'qué es', 'mejor manera de'],
      'list': ['pasos para', 'formas de', 'métodos para'],
      'table': ['comparación', 'vs', 'diferencias entre'],
      'video': ['tutorial', 'guía', 'video tutorial']
    },
    'IN': {
      'paragraph': ['कैसे कन्वर्ट करें', 'क्या है', 'बेस्ट तरीका'],
      'list': ['स्टेप्स', 'तरीके', 'मेथड्स'],
      'table': ['तुलना', 'vs', 'अंतर'],
      'video': ['ट्यूटोरियल', 'गाइड', 'वीडियो गाइड']
    },
    'RU': {
      'paragraph': ['как конвертировать', 'что такое', 'лучший способ'],
      'list': ['шаги для', 'способы', 'методы'],
      'table': ['сравнение', 'vs', 'различия между'],
      'video': ['учебник', 'руководство', 'видео урок']
    }
  },

  // Templates para diferentes tipos de snippets
  templates: {
    'paragraph': {
      structure: 'question + direct_answer + elaboration',
      maxLength: 160,
      format: 'p'
    },
    'list': {
      structure: 'intro + numbered_steps + conclusion',
      maxItems: 8,
      format: 'ol'
    },
    'table': {
      structure: 'headers + rows + summary',
      maxRows: 10,
      format: 'table'
    }
  },

  // Keywords objetivo para snippets
  targetKeywords: {
    'image-converter': [
      'how to convert images online',
      'best image converter',
      'convert png to jpg',
      'image format converter',
      'free image conversion'
    ],
    'pdf-viewer': [
      'how to view pdf online',
      'best pdf viewer',
      'open pdf in browser',
      'pdf reader online'
    ],
    'qr-generator': [
      'how to generate qr code',
      'best qr generator',
      'create qr code online',
      'qr code maker'
    ]
  }
};

/**
 * Clase principal para optimización de featured snippets
 */
export class FeaturedSnippetsOptimizer {
  constructor() {
    this.currentLanguage = 'en';
    this.optimizedContent = new Map();
    this.snippetTargets = new Map();
    this.performanceMetrics = {};
    this.init();
  }

  async init() {
    this.detectLanguage();
    this.identifySnippetOpportunities();
    this.setupContentOptimization();
    this.initializeTracking();
  }

  /**
   * Detectar idioma actual
   */
  detectLanguage() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentLanguage = market?.language || 'en';
    }
  }

  /**
   * Identificar oportunidades de snippets
   */
  identifySnippetOpportunities() {
    const currentTool = this.detectCurrentTool();
    const keywords = SNIPPET_CONFIG.targetKeywords[currentTool] || [];
    
    keywords.forEach(keyword => {
      const snippetType = this.determineSnippetType(keyword);
      this.snippetTargets.set(keyword, {
        type: snippetType,
        tool: currentTool,
        priority: this.calculatePriority(keyword),
        optimized: false
      });
    });

    console.log('Featured Snippets: Identified opportunities', this.snippetTargets.size);
  }

  /**
   * Detectar herramienta actual
   */
  detectCurrentTool() {
    const path = window.location.pathname;
    
    if (path.includes('/converter')) return 'image-converter';
    if (path.includes('/viewer')) return 'pdf-viewer';
    if (path.includes('/qr-generator')) return 'qr-generator';
    
    return 'general';
  }

  /**
   * Determinar tipo de snippet por keyword
   */
  determineSnippetType(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    if (lowerKeyword.includes('how to') || lowerKeyword.includes('steps')) {
      return 'list';
    } else if (lowerKeyword.includes('vs') || lowerKeyword.includes('comparison')) {
      return 'table';
    } else if (lowerKeyword.includes('what is') || lowerKeyword.includes('best')) {
      return 'paragraph';
    }
    
    return 'paragraph'; // default
  }

  /**
   * Calcular prioridad de keyword
   */
  calculatePriority(keyword) {
    // Factores: volumen de búsqueda estimado, competencia, relevancia
    const highPriorityTerms = ['how to', 'best', 'free', 'online'];
    const score = highPriorityTerms.reduce((acc, term) => {
      return acc + (keyword.toLowerCase().includes(term) ? 1 : 0);
    }, 0);
    
    return score >= 2 ? 'high' : score >= 1 ? 'medium' : 'low';
  }

  /**
   * Configurar optimización de contenido
   */
  setupContentOptimization() {
    this.observeContentChanges();
    this.optimizeExistingContent();
  }

  /**
   * Observar cambios en el contenido
   */
  observeContentChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.optimizeNewContent(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Optimizar contenido existente
   */
  optimizeExistingContent() {
    // Optimizar elementos existentes
    this.optimizeHeadings();
    this.optimizeParagraphs();
    this.optimizeLists();
    this.optimizeTables();
  }

  /**
   * Optimizar headings para snippets
   */
  optimizeHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach(heading => {
      const text = heading.textContent.toLowerCase();
      
      // Buscar oportunidades de snippet en headings
      for (const [keyword, target] of this.snippetTargets) {
        if (text.includes(keyword.toLowerCase()) && !target.optimized) {
          this.optimizeHeadingForSnippet(heading, keyword, target);
          target.optimized = true;
        }
      }
    });
  }

  /**
   * Optimizar heading específico para snippet
   */
  optimizeHeadingForSnippet(heading, keyword, target) {
    // Agregar estructura de datos para snippet
    const nextElement = heading.nextElementSibling;
    
    if (target.type === 'paragraph' && nextElement?.tagName === 'P') {
      this.optimizeParagraphSnippet(nextElement, keyword);
    } else if (target.type === 'list' && (nextElement?.tagName === 'OL' || nextElement?.tagName === 'UL')) {
      this.optimizeListSnippet(nextElement, keyword);
    }
    
    // Marcar como optimizado
    heading.dataset.snippetOptimized = 'true';
    heading.dataset.targetKeyword = keyword;
  }

  /**
   * Optimizar párrafos para snippets
   */
  optimizeParagraphs() {
    const paragraphs = document.querySelectorAll('p');
    
    paragraphs.forEach(paragraph => {
      const text = paragraph.textContent;
      
      if (text.length > 50 && text.length < 300) {
        this.optimizeParagraphSnippet(paragraph);
      }
    });
  }

  /**
   * Optimizar párrafo específico para snippet
   */
  optimizeParagraphSnippet(paragraph, keyword = null) {
    const text = paragraph.textContent;
    
    // Verificar si ya está optimizado
    if (paragraph.dataset.snippetOptimized) return;
    
    // Optimizar longitud (idealmente 40-60 palabras)
    if (text.split(' ').length > 60) {
      const optimizedText = this.truncateForSnippet(text, 60);
      paragraph.textContent = optimizedText;
    }
    
    // Agregar estructura semántica
    paragraph.dataset.snippetOptimized = 'true';
    paragraph.dataset.snippetType = 'paragraph';
    
    if (keyword) {
      paragraph.dataset.targetKeyword = keyword;
    }
  }

  /**
   * Optimizar listas para snippets
   */
  optimizeLists() {
    const lists = document.querySelectorAll('ol, ul');
    
    lists.forEach(list => {
      this.optimizeListSnippet(list);
    });
  }

  /**
   * Optimizar lista específica para snippet
   */
  optimizeListSnippet(list, keyword = null) {
    if (list.dataset.snippetOptimized) return;
    
    const items = list.querySelectorAll('li');
    
    // Limitar a máximo 8 items para snippets
    if (items.length > 8) {
      for (let i = 8; i < items.length; i++) {
        items[i].style.display = 'none';
      }
    }
    
    // Optimizar texto de cada item
    items.forEach((item, index) => {
      if (index < 8) {
        const text = item.textContent;
        if (text.split(' ').length > 20) {
          item.textContent = this.truncateForSnippet(text, 20);
        }
      }
    });
    
    // Marcar como optimizado
    list.dataset.snippetOptimized = 'true';
    list.dataset.snippetType = 'list';
    
    if (keyword) {
      list.dataset.targetKeyword = keyword;
    }
  }

  /**
   * Optimizar tablas para snippets
   */
  optimizeTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
      this.optimizeTableSnippet(table);
    });
  }

  /**
   * Optimizar tabla específica para snippet
   */
  optimizeTableSnippet(table, keyword = null) {
    if (table.dataset.snippetOptimized) return;
    
    const rows = table.querySelectorAll('tr');
    
    // Limitar a máximo 10 filas
    if (rows.length > 10) {
      for (let i = 10; i < rows.length; i++) {
        rows[i].style.display = 'none';
      }
    }
    
    // Asegurar headers claros
    const headerRow = table.querySelector('thead tr, tr:first-child');
    if (headerRow) {
      const headers = headerRow.querySelectorAll('th, td');
      headers.forEach(header => {
        if (!header.textContent.trim()) {
          header.textContent = 'Item';
        }
      });
    }
    
    // Marcar como optimizado
    table.dataset.snippetOptimized = 'true';
    table.dataset.snippetType = 'table';
    
    if (keyword) {
      table.dataset.targetKeyword = keyword;
    }
  }

  /**
   * Truncar texto para snippet
   */
  truncateForSnippet(text, maxWords) {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    
    return words.slice(0, maxWords).join(' ') + '...';
  }

  /**
   * Optimizar nuevo contenido
   */
  optimizeNewContent(nodes) {
    nodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Optimizar headings
        const headings = node.querySelectorAll?.('h1, h2, h3') || [];
        headings.forEach(heading => this.optimizeHeadingForSnippet(heading));
        
        // Optimizar párrafos
        const paragraphs = node.querySelectorAll?.('p') || [];
        paragraphs.forEach(paragraph => this.optimizeParagraphSnippet(paragraph));
        
        // Optimizar listas
        const lists = node.querySelectorAll?.('ol, ul') || [];
        lists.forEach(list => this.optimizeListSnippet(list));
      }
    });
  }

  /**
   * Generar contenido optimizado para snippet específico
   */
  generateSnippetContent(keyword, type = 'paragraph') {
    const generators = {
      'paragraph': (kw) => this.generateParagraphSnippet(kw),
      'list': (kw) => this.generateListSnippet(kw),
      'table': (kw) => this.generateTableSnippet(kw)
    };
    
    const generator = generators[type];
    return generator ? generator(keyword) : null;
  }

  /**
   * Generar snippet de párrafo
   */
  generateParagraphSnippet(keyword) {
    const templates = {
      'how to convert images online': 'To convert images online, upload your file to a free converter, select your desired output format (PNG, JPG, WebP), and download the converted image instantly.',
      'best image converter': 'The best image converter offers multiple format support, maintains quality, processes files securely, and provides fast conversion without registration requirements.',
      'convert png to jpg': 'Converting PNG to JPG reduces file size while maintaining good quality. Upload your PNG file, select JPG format, adjust quality settings if needed, and download the converted file.'
    };
    
    return templates[keyword] || `${keyword} can be accomplished using our free online tools with professional results.`;
  }

  /**
   * Generar snippet de lista
   */
  generateListSnippet(keyword) {
    const steps = {
      'how to convert images online': [
        'Upload your image file to the converter',
        'Select your desired output format',
        'Choose quality settings if needed',
        'Click convert to process the file',
        'Download your converted image'
      ],
      'steps to optimize images': [
        'Choose the right file format',
        'Compress without quality loss',
        'Resize to appropriate dimensions',
        'Remove unnecessary metadata',
        'Test loading performance'
      ]
    };
    
    return steps[keyword] || [
      'Step 1: Access the online tool',
      'Step 2: Upload your file',
      'Step 3: Configure settings',
      'Step 4: Process the conversion',
      'Step 5: Download results'
    ];
  }

  /**
   * Generar snippet de tabla
   */
  generateTableSnippet(keyword) {
    const tables = {
      'image formats comparison': {
        headers: ['Format', 'Quality', 'File Size', 'Use Case'],
        rows: [
          ['PNG', 'Lossless', 'Large', 'Graphics with transparency'],
          ['JPG', 'Lossy', 'Small', 'Photos and complex images'],
          ['WebP', 'Both', 'Smaller', 'Modern web images'],
          ['AVIF', 'Advanced', 'Smallest', 'Next-gen web format']
        ]
      }
    };
    
    return tables[keyword] || {
      headers: ['Feature', 'Value', 'Benefit'],
      rows: [
        ['Speed', 'Fast', 'Quick processing'],
        ['Quality', 'High', 'Professional results'],
        ['Cost', 'Free', 'No subscription needed']
      ]
    };
  }

  /**
   * Inicializar tracking de performance
   */
  initializeTracking() {
    // Trackear métricas de snippets
    setInterval(() => {
      this.trackSnippetPerformance();
    }, 3600000); // Cada hora
  }

  /**
   * Trackear performance de snippets
   */
  trackSnippetPerformance() {
    const optimizedElements = document.querySelectorAll('[data-snippet-optimized="true"]');
    
    const metrics = {
      totalOptimized: optimizedElements.length,
      byType: {},
      byKeyword: {},
      timestamp: Date.now()
    };
    
    optimizedElements.forEach(element => {
      const type = element.dataset.snippetType;
      const keyword = element.dataset.targetKeyword;
      
      metrics.byType[type] = (metrics.byType[type] || 0) + 1;
      
      if (keyword) {
        metrics.byKeyword[keyword] = (metrics.byKeyword[keyword] || 0) + 1;
      }
    });
    
    this.performanceMetrics[Date.now()] = metrics;
    
    // Reportar a analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'snippet_optimization', {
        event_category: 'SEO',
        total_optimized: metrics.totalOptimized,
        paragraph_snippets: metrics.byType.paragraph || 0,
        list_snippets: metrics.byType.list || 0,
        table_snippets: metrics.byType.table || 0
      });
    }
  }

  /**
   * Obtener estadísticas de optimización
   */
  getOptimizationStats() {
    const optimizedElements = document.querySelectorAll('[data-snippet-optimized="true"]');
    
    return {
      totalTargets: this.snippetTargets.size,
      totalOptimized: optimizedElements.length,
      optimizationRate: optimizedElements.length / this.snippetTargets.size,
      byType: this.getStatsByType(optimizedElements),
      topKeywords: this.getTopKeywords(),
      lastUpdate: Date.now()
    };
  }

  /**
   * Obtener estadísticas por tipo
   */
  getStatsByType(elements) {
    const stats = {};
    
    elements.forEach(element => {
      const type = element.dataset.snippetType;
      stats[type] = (stats[type] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Obtener top keywords
   */
  getTopKeywords() {
    return Array.from(this.snippetTargets.entries())
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b[1].priority] - priorityOrder[a[1].priority];
      })
      .slice(0, 10)
      .map(([keyword, data]) => ({ keyword, ...data }));
  }

  /**
   * Forzar optimización de elemento específico
   */
  forceOptimizeElement(element, keyword, type) {
    const optimizers = {
      'paragraph': (el, kw) => this.optimizeParagraphSnippet(el, kw),
      'list': (el, kw) => this.optimizeListSnippet(el, kw),
      'table': (el, kw) => this.optimizeTableSnippet(el, kw)
    };
    
    const optimizer = optimizers[type];
    if (optimizer) {
      optimizer(element, keyword);
      return true;
    }
    
    return false;
  }
}

/**
 * Inicializar optimizador de featured snippets
 */
export const initializeFeaturedSnippetsOptimizer = async () => {
  const optimizer = new FeaturedSnippetsOptimizer();
  await optimizer.init();
  
  // Hacer disponible globalmente
  window.featuredSnippetsOptimizer = optimizer;
  
  return optimizer;
};

export default FeaturedSnippetsOptimizer;
