// Optimizador de embudos de conversión

export const FUNNEL_CONFIG = {
  // Embudos por herramienta
  funnels: {
    'image-converter': {
      steps: [
        { name: 'landing', weight: 1.0, target: 100 },
        { name: 'engagement', weight: 0.6, target: 60 },
        { name: 'file_upload', weight: 0.4, target: 40 },
        { name: 'conversion_start', weight: 0.3, target: 30 },
        { name: 'download', weight: 0.25, target: 25 },
        { name: 'lead_capture', weight: 0.15, target: 15 }
      ],
      optimizations: {
        'low_engagement': 'Improve headline and value proposition',
        'low_upload': 'Simplify file upload process',
        'low_conversion': 'Add more format options',
        'low_download': 'Improve download UX',
        'low_leads': 'Better lead magnets'
      }
    },
    'pdf-viewer': {
      steps: [
        { name: 'landing', weight: 1.0, target: 100 },
        { name: 'engagement', weight: 0.7, target: 70 },
        { name: 'file_upload', weight: 0.5, target: 50 },
        { name: 'viewing', weight: 0.4, target: 40 },
        { name: 'feature_usage', weight: 0.3, target: 30 },
        { name: 'lead_capture', weight: 0.12, target: 12 }
      ]
    }
  },

  // Triggers de optimización
  triggers: {
    'exit_intent': { delay: 0, priority: 'high' },
    'scroll_75': { delay: 2000, priority: 'medium' },
    'time_60s': { delay: 60000, priority: 'medium' },
    'file_processed': { delay: 1000, priority: 'high' },
    'multiple_conversions': { delay: 0, priority: 'low' }
  },

  // A/B tests activos
  experiments: {
    'headline_urgency': {
      variants: ['A', 'B'],
      traffic_split: 0.5,
      metric: 'engagement_rate'
    },
    'cta_color': {
      variants: ['blue', 'green', 'orange'],
      traffic_split: 0.33,
      metric: 'click_rate'
    },
    'lead_magnet_timing': {
      variants: ['immediate', 'delayed', 'exit_intent'],
      traffic_split: 0.33,
      metric: 'lead_capture_rate'
    }
  }
};

export class ConversionFunnelOptimizer {
  constructor() {
    this.currentTool = null;
    this.sessionData = {};
    this.experiments = new Map();
    this.funnelData = new Map();
    this.optimizations = new Map();
    this.init();
  }

  async init() {
    this.detectTool();
    this.initializeSession();
    this.setupExperiments();
    this.startFunnelTracking();
    this.setupOptimizationTriggers();
  }

  detectTool() {
    const path = window.location.pathname;
    if (path.includes('/converter')) this.currentTool = 'image-converter';
    else if (path.includes('/viewer')) this.currentTool = 'pdf-viewer';
    else this.currentTool = 'image-converter'; // default
  }

  initializeSession() {
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      tool: this.currentTool,
      currentStep: 'landing',
      events: [],
      experiments: {},
      conversions: 0
    };

    // Asignar experimentos
    Object.entries(FUNNEL_CONFIG.experiments).forEach(([name, config]) => {
      this.sessionData.experiments[name] = this.assignExperimentVariant(config);
    });
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  assignExperimentVariant(config) {
    const random = Math.random();
    const variants = config.variants;
    const splitSize = 1 / variants.length;
    
    for (let i = 0; i < variants.length; i++) {
      if (random < (i + 1) * splitSize) {
        return variants[i];
      }
    }
    
    return variants[0]; // fallback
  }

  setupExperiments() {
    // Aplicar variantes de experimentos
    Object.entries(this.sessionData.experiments).forEach(([experiment, variant]) => {
      this.applyExperimentVariant(experiment, variant);
    });
  }

  applyExperimentVariant(experiment, variant) {
    switch (experiment) {
      case 'headline_urgency':
        if (variant === 'B') {
          this.applyUrgentHeadlines();
        }
        break;
      
      case 'cta_color':
        this.applyCTAColor(variant);
        break;
      
      case 'lead_magnet_timing':
        this.setLeadMagnetTiming(variant);
        break;
    }
  }

  applyUrgentHeadlines() {
    const headlines = document.querySelectorAll('h1');
    headlines.forEach(h1 => {
      if (h1.textContent.includes('Convert Images')) {
        h1.textContent = h1.textContent.replace('Convert Images', 'Convert Images in Seconds');
      }
    });
  }

  applyCTAColor(color) {
    const colorClasses = {
      'blue': 'bg-blue-600 hover:bg-blue-700',
      'green': 'bg-green-600 hover:bg-green-700',
      'orange': 'bg-orange-600 hover:bg-orange-700'
    };

    const buttons = document.querySelectorAll('.cta-button, [class*="bg-blue-600"]');
    buttons.forEach(button => {
      // Remove existing color classes
      button.className = button.className.replace(/bg-\w+-\d+/g, '').replace(/hover:bg-\w+-\d+/g, '');
      // Add new color classes
      button.className += ' ' + colorClasses[color];
    });
  }

  setLeadMagnetTiming(timing) {
    if (window.landingPageManager) {
      const timings = {
        'immediate': 0,
        'delayed': 30000,
        'exit_intent': -1 // Special case for exit intent only
      };
      
      const delay = timings[timing];
      if (delay >= 0) {
        setTimeout(() => {
          window.landingPageManager.showLeadModal('experiment_' + timing);
        }, delay);
      }
    }
  }

  startFunnelTracking() {
    this.trackLandingStep();
    this.setupEventListeners();
    this.startEngagementTracking();
  }

  trackLandingStep() {
    this.trackFunnelStep('landing');
  }

  setupEventListeners() {
    // Track file uploads
    document.addEventListener('change', (e) => {
      if (e.target.type === 'file') {
        this.trackFunnelStep('file_upload');
      }
    });

    // Track conversion starts
    document.addEventListener('click', (e) => {
      if (e.target.matches('.convert-btn, .process-btn, [data-action="convert"]')) {
        this.trackFunnelStep('conversion_start');
      }
      
      if (e.target.matches('.download-btn, [data-action="download"]')) {
        this.trackFunnelStep('download');
        this.sessionData.conversions++;
      }

      if (e.target.matches('.cta-button')) {
        this.trackEvent('cta_clicked', { 
          experiment: this.sessionData.experiments.cta_color 
        });
      }
    });

    // Track lead captures
    document.addEventListener('submit', (e) => {
      if (e.target.matches('.lead-form')) {
        this.trackFunnelStep('lead_capture');
      }
    });
  }

  startEngagementTracking() {
    let engagementTime = 0;
    let isEngaged = false;
    
    const trackEngagement = () => {
      engagementTime += 1000;
      
      if (engagementTime >= 30000 && !isEngaged) {
        isEngaged = true;
        this.trackFunnelStep('engagement');
      }
      
      if (engagementTime >= 60000) {
        this.triggerOptimization('time_60s');
      }
    };

    setInterval(trackEngagement, 1000);

    // Track scroll engagement
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        if (scrollPercent >= 75 && !this.hasTriggered('scroll_75')) {
          this.triggerOptimization('scroll_75');
        }
      }
    });
  }

  trackFunnelStep(step) {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    if (!funnel) return;

    const stepConfig = funnel.steps.find(s => s.name === step);
    if (!stepConfig) return;

    // Update current step if it's further in the funnel
    const currentStepIndex = funnel.steps.findIndex(s => s.name === this.sessionData.currentStep);
    const newStepIndex = funnel.steps.findIndex(s => s.name === step);
    
    if (newStepIndex > currentStepIndex) {
      this.sessionData.currentStep = step;
    }

    // Track event
    this.trackEvent('funnel_step', {
      step,
      stepIndex: newStepIndex,
      timeFromStart: Date.now() - this.sessionData.startTime
    });

    // Check for optimization opportunities
    this.analyzeFunnelPerformance();
  }

  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: Date.now(),
      data: {
        ...data,
        sessionId: this.sessionData.sessionId,
        tool: this.currentTool,
        experiments: this.sessionData.experiments
      }
    };

    this.sessionData.events.push(event);

    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'Conversion Funnel',
        event_label: this.currentTool,
        custom_parameter_1: JSON.stringify(data)
      });
    }

    console.log('Funnel Event:', eventName, data);
  }

  setupOptimizationTriggers() {
    // Exit intent
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !this.hasTriggered('exit_intent')) {
        this.triggerOptimization('exit_intent');
      }
    });

    // Multiple conversions
    if (this.sessionData.conversions >= 3) {
      this.triggerOptimization('multiple_conversions');
    }
  }

  triggerOptimization(trigger) {
    const triggerConfig = FUNNEL_CONFIG.triggers[trigger];
    if (!triggerConfig || this.hasTriggered(trigger)) return;

    // Mark as triggered
    this.markTriggered(trigger);

    // Apply optimization based on trigger
    setTimeout(() => {
      this.applyOptimization(trigger, triggerConfig);
    }, triggerConfig.delay);
  }

  hasTriggered(trigger) {
    return this.sessionData.events.some(event => 
      event.name === 'optimization_triggered' && event.data.trigger === trigger
    );
  }

  markTriggered(trigger) {
    this.trackEvent('optimization_triggered', { trigger });
  }

  applyOptimization(trigger, config) {
    switch (trigger) {
      case 'exit_intent':
        if (window.landingPageManager) {
          window.landingPageManager.showLeadModal('exit_intent_optimization');
        }
        break;
      
      case 'scroll_75':
        this.showScrollOptimization();
        break;
      
      case 'time_60s':
        this.showTimeBasedOptimization();
        break;
      
      case 'file_processed':
        this.showPostConversionOptimization();
        break;
    }

    this.trackEvent('optimization_applied', { trigger, priority: config.priority });
  }

  showScrollOptimization() {
    // Show sticky CTA or notification
    const stickyBar = document.createElement('div');
    stickyBar.className = 'fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 text-center z-50';
    stickyBar.innerHTML = `
      <div class="container mx-auto">
        <span class="mr-4">Ready to convert your images?</span>
        <button class="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100" 
                onclick="this.parentElement.parentElement.remove(); document.getElementById('tool-section')?.scrollIntoView({behavior: 'smooth'})">
          Start Now
        </button>
      </div>
    `;
    
    document.body.appendChild(stickyBar);
    
    // Auto-remove after 10 seconds
    setTimeout(() => stickyBar.remove(), 10000);
  }

  showTimeBasedOptimization() {
    // Show help or guidance
    if (this.sessionData.currentStep === 'landing') {
      this.showGuidanceTooltip();
    }
  }

  showGuidanceTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed top-20 right-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-lg z-50 max-w-sm';
    tooltip.innerHTML = `
      <div class="flex">
        <div class="flex-shrink-0">
          <span class="text-yellow-500 text-xl">💡</span>
        </div>
        <div class="ml-3">
          <p class="text-sm text-yellow-700">
            <strong>Need help?</strong> Simply drag and drop your image file or click the upload button to get started!
          </p>
          <button class="text-xs text-yellow-600 underline mt-2" onclick="this.parentElement.parentElement.parentElement.remove()">
            Got it, thanks!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 8000);
  }

  showPostConversionOptimization() {
    // Show related tools or lead magnet after successful conversion
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 p-4 rounded shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-start">
        <span class="text-green-500 text-xl mr-3">✅</span>
        <div>
          <h4 class="font-semibold text-green-800">Conversion Complete!</h4>
          <p class="text-sm text-green-700 mt-1">
            Want to learn more optimization tips? Download our free guide!
          </p>
          <button class="bg-green-600 text-white px-3 py-1 rounded text-sm mt-2 hover:bg-green-700"
                  onclick="window.landingPageManager?.showLeadModal('post_conversion'); this.parentElement.parentElement.parentElement.remove()">
            Get Free Guide
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 12000);
  }

  analyzeFunnelPerformance() {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    if (!funnel) return;

    const currentStepIndex = funnel.steps.findIndex(s => s.name === this.sessionData.currentStep);
    const timeInFunnel = Date.now() - this.sessionData.startTime;
    
    // Analyze performance vs targets
    const performance = {
      currentStep: this.sessionData.currentStep,
      stepIndex: currentStepIndex,
      timeInFunnel,
      conversionRate: this.calculateConversionRate(),
      bottleneck: this.identifyBottleneck()
    };

    // Store performance data
    this.funnelData.set(this.sessionData.sessionId, performance);

    // Suggest optimizations if performance is low
    if (performance.conversionRate < 50 && timeInFunnel > 60000) {
      this.suggestOptimizations(performance);
    }
  }

  calculateConversionRate() {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    const currentStepIndex = funnel.steps.findIndex(s => s.name === this.sessionData.currentStep);
    
    if (currentStepIndex >= 0) {
      return funnel.steps[currentStepIndex].weight * 100;
    }
    
    return 0;
  }

  identifyBottleneck() {
    // Simple bottleneck identification based on time spent
    const timeInFunnel = Date.now() - this.sessionData.startTime;
    
    if (this.sessionData.currentStep === 'landing' && timeInFunnel > 30000) {
      return 'landing_page';
    } else if (this.sessionData.currentStep === 'engagement' && timeInFunnel > 60000) {
      return 'value_proposition';
    } else if (this.sessionData.currentStep === 'file_upload' && timeInFunnel > 120000) {
      return 'upload_process';
    }
    
    return null;
  }

  suggestOptimizations(performance) {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    const optimizations = funnel.optimizations;
    
    switch (performance.bottleneck) {
      case 'landing_page':
        console.log('Optimization suggestion:', optimizations.low_engagement);
        break;
      case 'upload_process':
        console.log('Optimization suggestion:', optimizations.low_upload);
        break;
    }
  }

  // Métodos públicos para componentes React
  getCurrentFunnelStep() {
    return this.sessionData.currentStep;
  }

  getFunnelProgress() {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    const currentStepIndex = funnel.steps.findIndex(s => s.name === this.sessionData.currentStep);
    return (currentStepIndex + 1) / funnel.steps.length * 100;
  }

  getExperimentVariant(experiment) {
    return this.sessionData.experiments[experiment];
  }

  getSessionStats() {
    return {
      sessionId: this.sessionData.sessionId,
      tool: this.currentTool,
      currentStep: this.sessionData.currentStep,
      timeInFunnel: Date.now() - this.sessionData.startTime,
      conversions: this.sessionData.conversions,
      events: this.sessionData.events.length,
      experiments: this.sessionData.experiments
    };
  }

  // Optimización continua
  optimizeFunnel() {
    const allSessions = Array.from(this.funnelData.values());
    
    if (allSessions.length >= 10) {
      this.analyzeExperimentResults();
      this.identifyOptimizationOpportunities();
    }
  }

  analyzeExperimentResults() {
    // Analyze A/B test results
    Object.keys(FUNNEL_CONFIG.experiments).forEach(experiment => {
      const results = this.getExperimentResults(experiment);
      console.log(`Experiment ${experiment} results:`, results);
    });
  }

  getExperimentResults(experiment) {
    const sessions = Array.from(this.funnelData.values());
    const variants = {};
    
    sessions.forEach(session => {
      const variant = session.experiments?.[experiment];
      if (variant) {
        if (!variants[variant]) {
          variants[variant] = { sessions: 0, conversions: 0 };
        }
        variants[variant].sessions++;
        if (session.conversions > 0) {
          variants[variant].conversions++;
        }
      }
    });
    
    // Calculate conversion rates
    Object.keys(variants).forEach(variant => {
      variants[variant].conversionRate = 
        (variants[variant].conversions / variants[variant].sessions) * 100;
    });
    
    return variants;
  }

  identifyOptimizationOpportunities() {
    const commonBottlenecks = this.getCommonBottlenecks();
    const lowPerformingSteps = this.getLowPerformingSteps();
    
    console.log('Optimization opportunities:', {
      commonBottlenecks,
      lowPerformingSteps
    });
  }

  getCommonBottlenecks() {
    const sessions = Array.from(this.funnelData.values());
    const bottlenecks = {};
    
    sessions.forEach(session => {
      if (session.bottleneck) {
        bottlenecks[session.bottleneck] = (bottlenecks[session.bottleneck] || 0) + 1;
      }
    });
    
    return Object.entries(bottlenecks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  }

  getLowPerformingSteps() {
    const funnel = FUNNEL_CONFIG.funnels[this.currentTool];
    return funnel.steps.filter(step => {
      const avgPerformance = this.getStepPerformance(step.name);
      return avgPerformance < step.target;
    });
  }

  getStepPerformance(stepName) {
    const sessions = Array.from(this.funnelData.values());
    const stepSessions = sessions.filter(session => {
      const stepIndex = FUNNEL_CONFIG.funnels[this.currentTool].steps.findIndex(s => s.name === stepName);
      const currentStepIndex = FUNNEL_CONFIG.funnels[this.currentTool].steps.findIndex(s => s.name === session.currentStep);
      return currentStepIndex >= stepIndex;
    });
    
    return sessions.length > 0 ? (stepSessions.length / sessions.length) * 100 : 0;
  }
}

export const initializeConversionFunnelOptimizer = async () => {
  const optimizer = new ConversionFunnelOptimizer();
  await optimizer.init();
  
  window.conversionFunnelOptimizer = optimizer;
  return optimizer;
};

export default ConversionFunnelOptimizer;
