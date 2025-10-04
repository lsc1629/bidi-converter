// Sistema de UX Enhancement y Micro-interacciones

export const UX_CONFIG = {
  // Configuración de animaciones
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easing: {
      easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },

  // Patrones UX por mercado
  marketPatterns: {
    'US': {
      onboarding: 'progressive',
      feedback: 'immediate',
      navigation: 'breadcrumb',
      tooltips: 'contextual'
    },
    'IN': {
      onboarding: 'guided',
      feedback: 'visual',
      navigation: 'simple',
      tooltips: 'persistent'
    },
    'RU': {
      onboarding: 'detailed',
      feedback: 'comprehensive',
      navigation: 'hierarchical',
      tooltips: 'informative'
    },
    'KR': {
      onboarding: 'minimal',
      feedback: 'subtle',
      navigation: 'gesture',
      tooltips: 'minimal'
    }
  },

  // Estados de interacción
  interactionStates: {
    idle: 'idle',
    hover: 'hover',
    active: 'active',
    focus: 'focus',
    disabled: 'disabled',
    loading: 'loading',
    success: 'success',
    error: 'error'
  }
};

export class UXEnhancer {
  constructor() {
    this.currentMarket = 'US';
    this.interactions = new Map();
    this.onboardingSteps = [];
    this.feedbackQueue = [];
    this.gestureHandlers = new Map();
    this.init();
  }

  async init() {
    this.detectMarket();
    this.setupMicroInteractions();
    this.setupOnboarding();
    this.setupFeedbackSystem();
    this.setupGestureSupport();
    this.setupAccessibility();
    this.setupProgressiveEnhancement();
  }

  detectMarket() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      this.currentMarket = market?.code || 'US';
    }
  }

  setupMicroInteractions() {
    // Button hover effects
    this.addInteraction('button-hover', {
      selector: 'button, .btn',
      events: {
        mouseenter: this.buttonHoverIn.bind(this),
        mouseleave: this.buttonHoverOut.bind(this),
        mousedown: this.buttonPress.bind(this),
        mouseup: this.buttonRelease.bind(this)
      }
    });

    // Card interactions
    this.addInteraction('card-hover', {
      selector: '.card, .tool-card',
      events: {
        mouseenter: this.cardHoverIn.bind(this),
        mouseleave: this.cardHoverOut.bind(this)
      }
    });

    // Input focus effects
    this.addInteraction('input-focus', {
      selector: 'input, textarea, select',
      events: {
        focus: this.inputFocus.bind(this),
        blur: this.inputBlur.bind(this),
        input: this.inputChange.bind(this)
      }
    });

    // File upload interactions
    this.addInteraction('file-upload', {
      selector: '.file-upload, input[type="file"]',
      events: {
        dragenter: this.fileDragEnter.bind(this),
        dragleave: this.fileDragLeave.bind(this),
        dragover: this.fileDragOver.bind(this),
        drop: this.fileDrop.bind(this)
      }
    });
  }

  addInteraction(name, config) {
    this.interactions.set(name, config);
    
    const elements = document.querySelectorAll(config.selector);
    elements.forEach(element => {
      Object.entries(config.events).forEach(([event, handler]) => {
        element.addEventListener(event, handler);
      });
    });
  }

  // Micro-interacciones específicas
  buttonHoverIn(event) {
    const button = event.target;
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    button.style.transition = 'all 150ms ease-out';
  }

  buttonHoverOut(event) {
    const button = event.target;
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  }

  buttonPress(event) {
    const button = event.target;
    button.style.transform = 'translateY(0) scale(0.98)';
    this.createRippleEffect(button, event);
  }

  buttonRelease(event) {
    const button = event.target;
    setTimeout(() => {
      button.style.transform = 'translateY(-2px) scale(1)';
    }, 100);
  }

  createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      transform: scale(0);
      animation: ripple 600ms linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  cardHoverIn(event) {
    const card = event.target;
    card.style.transform = 'translateY(-4px)';
    card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    card.style.transition = 'all 300ms ease-out';
  }

  cardHoverOut(event) {
    const card = event.target;
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }

  inputFocus(event) {
    const input = event.target;
    const container = input.closest('.input-container') || input.parentElement;
    
    container.classList.add('focused');
    input.style.borderColor = 'var(--color-primary)';
    input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
  }

  inputBlur(event) {
    const input = event.target;
    const container = input.closest('.input-container') || input.parentElement;
    
    container.classList.remove('focused');
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }

  inputChange(event) {
    const input = event.target;
    const container = input.closest('.input-container') || input.parentElement;
    
    if (input.value) {
      container.classList.add('has-value');
    } else {
      container.classList.remove('has-value');
    }
  }

  fileDragEnter(event) {
    event.preventDefault();
    const element = event.target;
    element.classList.add('drag-over');
    element.style.borderColor = 'var(--color-primary)';
    element.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
  }

  fileDragLeave(event) {
    event.preventDefault();
    const element = event.target;
    element.classList.remove('drag-over');
    element.style.borderColor = '';
    element.style.backgroundColor = '';
  }

  fileDragOver(event) {
    event.preventDefault();
  }

  fileDrop(event) {
    event.preventDefault();
    const element = event.target;
    element.classList.remove('drag-over');
    element.style.borderColor = '';
    element.style.backgroundColor = '';
    
    this.showFeedback('success', 'File uploaded successfully!');
  }

  // Sistema de Onboarding
  setupOnboarding() {
    const patterns = UX_CONFIG.marketPatterns[this.currentMarket];
    
    switch (patterns.onboarding) {
      case 'progressive':
        this.setupProgressiveOnboarding();
        break;
      case 'guided':
        this.setupGuidedOnboarding();
        break;
      case 'detailed':
        this.setupDetailedOnboarding();
        break;
      case 'minimal':
        this.setupMinimalOnboarding();
        break;
    }
  }

  setupProgressiveOnboarding() {
    this.onboardingSteps = [
      {
        target: '.file-upload',
        title: 'Upload Your File',
        description: 'Drag and drop or click to select your image file',
        position: 'bottom'
      },
      {
        target: '.format-selector',
        title: 'Choose Format',
        description: 'Select your desired output format',
        position: 'right'
      },
      {
        target: '.convert-button',
        title: 'Convert',
        description: 'Click to start the conversion process',
        position: 'top'
      }
    ];
  }

  startOnboarding() {
    if (localStorage.getItem('onboarding-completed')) return;
    
    this.currentOnboardingStep = 0;
    this.showOnboardingStep();
  }

  showOnboardingStep() {
    const step = this.onboardingSteps[this.currentOnboardingStep];
    if (!step) return;
    
    const target = document.querySelector(step.target);
    if (!target) return;
    
    this.createOnboardingTooltip(target, step);
  }

  createOnboardingTooltip(target, step) {
    const tooltip = document.createElement('div');
    tooltip.className = 'onboarding-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <h3>${step.title}</h3>
        <p>${step.description}</p>
        <div class="tooltip-actions">
          <button class="btn-skip">Skip</button>
          <button class="btn-next">Next</button>
        </div>
      </div>
      <div class="tooltip-arrow"></div>
    `;
    
    document.body.appendChild(tooltip);
    this.positionTooltip(tooltip, target, step.position);
    
    // Event listeners
    tooltip.querySelector('.btn-skip').onclick = () => this.skipOnboarding();
    tooltip.querySelector('.btn-next').onclick = () => this.nextOnboardingStep();
    
    // Highlight target
    target.classList.add('onboarding-highlight');
  }

  nextOnboardingStep() {
    this.removeCurrentTooltip();
    this.currentOnboardingStep++;
    
    if (this.currentOnboardingStep < this.onboardingSteps.length) {
      setTimeout(() => this.showOnboardingStep(), 300);
    } else {
      this.completeOnboarding();
    }
  }

  skipOnboarding() {
    this.removeCurrentTooltip();
    this.completeOnboarding();
  }

  completeOnboarding() {
    localStorage.setItem('onboarding-completed', 'true');
    document.querySelectorAll('.onboarding-highlight').forEach(el => {
      el.classList.remove('onboarding-highlight');
    });
  }

  removeCurrentTooltip() {
    const tooltip = document.querySelector('.onboarding-tooltip');
    if (tooltip) tooltip.remove();
    
    document.querySelectorAll('.onboarding-highlight').forEach(el => {
      el.classList.remove('onboarding-highlight');
    });
  }

  // Sistema de Feedback
  setupFeedbackSystem() {
    this.createFeedbackContainer();
  }

  createFeedbackContainer() {
    const container = document.createElement('div');
    container.id = 'feedback-container';
    container.className = 'feedback-container';
    document.body.appendChild(container);
  }

  showFeedback(type, message, duration = 4000) {
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback-${type}`;
    feedback.innerHTML = `
      <div class="feedback-icon">${this.getFeedbackIcon(type)}</div>
      <div class="feedback-message">${message}</div>
      <button class="feedback-close">&times;</button>
    `;
    
    const container = document.getElementById('feedback-container');
    container.appendChild(feedback);
    
    // Animate in
    setTimeout(() => feedback.classList.add('show'), 10);
    
    // Auto remove
    setTimeout(() => this.removeFeedback(feedback), duration);
    
    // Manual close
    feedback.querySelector('.feedback-close').onclick = () => {
      this.removeFeedback(feedback);
    };
  }

  getFeedbackIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || 'ℹ';
  }

  removeFeedback(feedback) {
    feedback.classList.add('removing');
    setTimeout(() => feedback.remove(), 300);
  }

  // Soporte de gestos
  setupGestureSupport() {
    if ('ontouchstart' in window) {
      this.setupTouchGestures();
    }
  }

  setupTouchGestures() {
    let startX, startY, startTime;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    });
    
    document.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      
      // Swipe detection
      if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
          this.handleSwipeRight();
        } else {
          this.handleSwipeLeft();
        }
      }
    });
  }

  handleSwipeRight() {
    // Navigate back or show previous item
    console.log('Swipe right detected');
  }

  handleSwipeLeft() {
    // Navigate forward or show next item
    console.log('Swipe left detected');
  }

  // Accessibility enhancements
  setupAccessibility() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupFocusManagement();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Tab navigation enhancement
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // Escape key handling
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // Enter key on buttons
      if (e.key === 'Enter' && e.target.matches('button, .btn')) {
        e.target.click();
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupScreenReaderSupport() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });
    
    // Add live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  setupFocusManagement() {
    // Focus trap for modals
    this.setupModalFocusTrap();
    
    // Skip links
    this.createSkipLinks();
  }

  createSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Progressive Enhancement
  setupProgressiveEnhancement() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    });
  }

  // Utility methods
  positionTooltip(tooltip, target, position) {
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - 10;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + 10;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + 10;
        break;
    }
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  handleEscapeKey() {
    // Close modals, tooltips, etc.
    const modal = document.querySelector('.modal.show');
    if (modal) {
      modal.classList.remove('show');
    }
    
    const tooltip = document.querySelector('.onboarding-tooltip');
    if (tooltip) {
      this.skipOnboarding();
    }
  }

  setupModalFocusTrap() {
    document.addEventListener('keydown', (e) => {
      const modal = document.querySelector('.modal.show');
      if (!modal || e.key !== 'Tab') return;
      
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}

export const initializeUXEnhancer = () => {
  const uxEnhancer = new UXEnhancer();
  window.uxEnhancer = uxEnhancer;
  return uxEnhancer;
};

export default UXEnhancer;
