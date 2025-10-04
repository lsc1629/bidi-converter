// Sistema de Landing Pages y Conversion Funnels

export const LANDING_PAGE_CONFIG = {
  // Landing pages por herramienta
  tools: {
    'image-converter': {
      headline: 'Convert Images Online - Free & Fast',
      subheadline: 'Transform your images between formats instantly. No downloads, no registration.',
      benefits: [
        'Convert PNG, JPG, WebP, AVIF formats',
        'Maintain original quality',
        'Process files securely in browser',
        'Unlimited conversions - completely free'
      ],
      cta: 'Start Converting Now',
      leadMagnet: 'Free Image Optimization Guide'
    },
    'pdf-viewer': {
      headline: 'View PDFs Online - No Downloads Required',
      subheadline: 'Open and read PDF files instantly in your browser. Fast, secure, private.',
      benefits: [
        'View PDFs without downloading',
        'Works on any device',
        'Zoom, search, and navigate easily',
        'Your files stay private'
      ],
      cta: 'Open PDF Now',
      leadMagnet: 'PDF Productivity Tips'
    },
    'qr-generator': {
      headline: 'Generate QR Codes Instantly',
      subheadline: 'Create custom QR codes for URLs, text, and more. High quality, instant download.',
      benefits: [
        'Generate QR codes instantly',
        'Customize size and quality',
        'Support for URLs, text, WiFi',
        'Download in multiple formats'
      ],
      cta: 'Create QR Code',
      leadMagnet: 'QR Code Marketing Guide'
    }
  },

  // CTAs por mercado
  ctas: {
    'US': {
      primary: 'Get Started Free',
      secondary: 'Try It Now',
      leadCapture: 'Download Free Guide'
    },
    'ES': {
      primary: 'Comenzar Gratis',
      secondary: 'Probar Ahora',
      leadCapture: 'Descargar Guía Gratis'
    },
    'IN': {
      primary: 'Start Free',
      secondary: 'Try Now',
      leadCapture: 'Get Free Guide'
    },
    'RU': {
      primary: 'Начать Бесплатно',
      secondary: 'Попробовать',
      leadCapture: 'Скачать Руководство'
    }
  },

  // Lead magnets por herramienta
  leadMagnets: {
    'image-converter': {
      title: 'Ultimate Image Optimization Guide',
      description: 'Learn professional techniques to optimize images for web, reduce file sizes, and improve loading speed.',
      benefits: ['Reduce image sizes by 80%', 'Improve website speed', 'SEO optimization tips'],
      downloadUrl: '/downloads/image-optimization-guide.pdf'
    },
    'pdf-viewer': {
      title: 'PDF Productivity Masterclass',
      description: 'Discover advanced PDF techniques, shortcuts, and tools to boost your productivity.',
      benefits: ['Advanced PDF tricks', 'Productivity shortcuts', 'Professional workflows'],
      downloadUrl: '/downloads/pdf-productivity-guide.pdf'
    }
  }
};

export class LandingPageManager {
  constructor() {
    this.currentTool = null;
    this.currentMarket = null;
    this.conversionFunnels = new Map();
    this.leadCaptures = new Map();
    this.abTests = new Map();
    this.init();
  }

  async init() {
    this.detectCurrentTool();
    this.detectMarket();
    this.setupConversionFunnels();
    this.initializeLeadCapture();
    this.setupABTesting();
    this.trackConversions();
  }

  detectCurrentTool() {
    const path = window.location.pathname;
    
    if (path.includes('/converter')) this.currentTool = 'image-converter';
    else if (path.includes('/viewer')) this.currentTool = 'pdf-viewer';
    else if (path.includes('/qr-generator')) this.currentTool = 'qr-generator';
    else this.currentTool = 'general';
  }

  detectMarket() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentMarket = market?.code || 'US';
    } else {
      this.currentMarket = 'US';
    }
  }

  setupConversionFunnels() {
    const toolConfig = LANDING_PAGE_CONFIG.tools[this.currentTool];
    if (!toolConfig) return;

    const funnel = {
      steps: [
        { name: 'landing', conversion: 1.0 },
        { name: 'engagement', conversion: 0.6 },
        { name: 'tool_usage', conversion: 0.4 },
        { name: 'lead_capture', conversion: 0.15 },
        { name: 'conversion', conversion: 0.08 }
      ],
      currentStep: 'landing',
      startTime: Date.now()
    };

    this.conversionFunnels.set(this.currentTool, funnel);
  }

  initializeLeadCapture() {
    this.createLeadCaptureModal();
    this.setupExitIntent();
    this.setupScrollTrigger();
  }

  createLeadCaptureModal() {
    const leadMagnet = LANDING_PAGE_CONFIG.leadMagnets[this.currentTool];
    if (!leadMagnet) return;

    const modal = document.createElement('div');
    modal.id = 'lead-capture-modal';
    modal.className = 'lead-modal hidden';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <h3>${leadMagnet.title}</h3>
          <p>${leadMagnet.description}</p>
          <ul>
            ${leadMagnet.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('')}
          </ul>
          <form class="lead-form">
            <input type="email" placeholder="Enter your email" required>
            <button type="submit">${LANDING_PAGE_CONFIG.ctas[this.currentMarket]?.leadCapture || 'Download Free'}</button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.setupModalEvents(modal);
  }

  setupModalEvents(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('.lead-form');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.addEventListener('click', () => this.hideLeadModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.hideLeadModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLeadCapture(form);
    });
  }

  setupExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        setTimeout(() => this.showLeadModal('exit_intent'), 500);
      }
    });
  }

  setupScrollTrigger() {
    let scrollTriggered = false;
    
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 70 && !scrollTriggered) {
        scrollTriggered = true;
        setTimeout(() => this.showLeadModal('scroll_trigger'), 2000);
      }
    });
  }

  showLeadModal(trigger = 'manual') {
    const modal = document.getElementById('lead-capture-modal');
    if (modal && !modal.classList.contains('shown')) {
      modal.classList.remove('hidden');
      modal.classList.add('shown');
      
      this.trackEvent('lead_modal_shown', { trigger, tool: this.currentTool });
    }
  }

  hideLeadModal() {
    const modal = document.getElementById('lead-capture-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('shown');
    }
  }

  handleLeadCapture(form) {
    const email = form.querySelector('input[type="email"]').value;
    const leadMagnet = LANDING_PAGE_CONFIG.leadMagnets[this.currentTool];
    
    // Simular captura de lead
    this.captureEmail(email, leadMagnet);
    this.showThankYou();
    this.hideLeadModal();
    
    this.trackEvent('lead_captured', { 
      email: email.substring(0, 3) + '***', 
      tool: this.currentTool,
      market: this.currentMarket 
    });
  }

  captureEmail(email, leadMagnet) {
    // En implementación real, esto enviaría a un servicio de email marketing
    const leadData = {
      email,
      tool: this.currentTool,
      market: this.currentMarket,
      leadMagnet: leadMagnet?.title,
      timestamp: Date.now(),
      source: window.location.href
    };

    // Guardar en localStorage para demo
    const leads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
    leads.push(leadData);
    localStorage.setItem('captured_leads', JSON.stringify(leads));

    // Trigger download
    if (leadMagnet?.downloadUrl) {
      this.triggerDownload(leadMagnet.downloadUrl);
    }
  }

  triggerDownload(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  }

  showThankYou() {
    const thankYou = document.createElement('div');
    thankYou.className = 'thank-you-message';
    thankYou.innerHTML = `
      <div class="thank-you-content">
        <h3>Thank You!</h3>
        <p>Your download will start automatically. Check your email for more resources!</p>
      </div>
    `;
    
    document.body.appendChild(thankYou);
    
    setTimeout(() => {
      thankYou.remove();
    }, 5000);
  }

  setupABTesting() {
    // Simple A/B testing for headlines and CTAs
    const variant = Math.random() > 0.5 ? 'A' : 'B';
    
    this.abTests.set('headline_test', {
      variant,
      startTime: Date.now(),
      conversions: 0,
      views: 1
    });

    if (variant === 'B') {
      this.applyVariantB();
    }
  }

  applyVariantB() {
    // Variant B: More urgent headlines
    const headlines = document.querySelectorAll('h1');
    headlines.forEach(h1 => {
      if (h1.textContent.includes('Convert Images')) {
        h1.textContent = 'Convert Images in Seconds - 100% Free';
      }
    });
  }

  trackConversions() {
    // Track tool usage as conversion
    this.trackToolUsage();
    this.trackEngagement();
    this.trackConversionFunnel();
  }

  trackToolUsage() {
    // Monitor file uploads, button clicks, etc.
    document.addEventListener('change', (e) => {
      if (e.target.type === 'file') {
        this.trackEvent('file_uploaded', { tool: this.currentTool });
        this.updateFunnelStep('tool_usage');
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.convert-btn, .process-btn')) {
        this.trackEvent('conversion_started', { tool: this.currentTool });
        this.updateFunnelStep('conversion');
      }
    });
  }

  trackEngagement() {
    let engagementTime = 0;
    const startTime = Date.now();
    
    setInterval(() => {
      engagementTime = Date.now() - startTime;
      if (engagementTime > 30000) { // 30 seconds
        this.updateFunnelStep('engagement');
      }
    }, 5000);
  }

  updateFunnelStep(step) {
    const funnel = this.conversionFunnels.get(this.currentTool);
    if (!funnel) return;

    const stepIndex = funnel.steps.findIndex(s => s.name === step);
    if (stepIndex > -1) {
      const currentIndex = funnel.steps.findIndex(s => s.name === funnel.currentStep);
      if (stepIndex > currentIndex) {
        funnel.currentStep = step;
        this.trackEvent('funnel_step', { step, tool: this.currentTool });
      }
    }
  }

  trackConversionFunnel() {
    // Track funnel performance
    setInterval(() => {
      this.analyzeFunnelPerformance();
    }, 60000); // Every minute
  }

  analyzeFunnelPerformance() {
    const funnel = this.conversionFunnels.get(this.currentTool);
    if (!funnel) return;

    const performance = {
      tool: this.currentTool,
      currentStep: funnel.currentStep,
      timeOnPage: Date.now() - funnel.startTime,
      market: this.currentMarket
    };

    this.trackEvent('funnel_analysis', performance);
  }

  trackEvent(eventName, data = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'Landing Page',
        event_label: this.currentTool,
        ...data
      });
    }

    // Console log for development
    console.log('Landing Page Event:', eventName, data);
  }

  // Métodos públicos para componentes React
  getLandingPageConfig(tool = null) {
    const targetTool = tool || this.currentTool;
    return LANDING_PAGE_CONFIG.tools[targetTool];
  }

  getCTAConfig() {
    return LANDING_PAGE_CONFIG.ctas[this.currentMarket] || LANDING_PAGE_CONFIG.ctas['US'];
  }

  getConversionStats() {
    const leads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
    const toolLeads = leads.filter(lead => lead.tool === this.currentTool);
    
    return {
      totalLeads: leads.length,
      toolLeads: toolLeads.length,
      conversionRate: this.calculateConversionRate(),
      topPerformingTool: this.getTopPerformingTool(leads),
      recentLeads: leads.slice(-5)
    };
  }

  calculateConversionRate() {
    const funnel = this.conversionFunnels.get(this.currentTool);
    if (!funnel) return 0;

    const currentStepIndex = funnel.steps.findIndex(s => s.name === funnel.currentStep);
    return currentStepIndex >= 0 ? funnel.steps[currentStepIndex].conversion * 100 : 0;
  }

  getTopPerformingTool(leads) {
    const toolCounts = leads.reduce((acc, lead) => {
      acc[lead.tool] = (acc[lead.tool] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(toolCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'image-converter';
  }

  // Optimización continua
  optimizeLandingPage() {
    this.optimizeHeadlines();
    this.optimizeCTAs();
    this.optimizeLeadMagnets();
  }

  optimizeHeadlines() {
    const performance = this.getABTestResults();
    if (performance.headline_test?.variant === 'B' && performance.headline_test.conversions > 5) {
      // Variant B is performing better, make it default
      console.log('Optimizing headlines based on A/B test results');
    }
  }

  optimizeCTAs() {
    // Dynamic CTA optimization based on market performance
    const stats = this.getConversionStats();
    if (stats.conversionRate < 5) {
      this.suggestCTAImprovements();
    }
  }

  suggestCTAImprovements() {
    console.log('Suggesting CTA improvements for low conversion rate');
    // En implementación real, esto activaría optimizaciones automáticas
  }

  getABTestResults() {
    return Object.fromEntries(this.abTests);
  }
}

export const initializeLandingPageManager = async () => {
  const manager = new LandingPageManager();
  await manager.init();
  
  window.landingPageManager = manager;
  return manager;
};

export default LandingPageManager;
