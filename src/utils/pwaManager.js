// Sistema de gestión PWA con soporte internacional

/**
 * Clase principal para gestión de PWA
 */
export class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isStandalone = false;
    this.installPromptShown = false;
    this.currentMarket = null;
    this.init();
  }

  async init() {
    this.detectInstallationState();
    this.setupEventListeners();
    this.registerServiceWorker();
    await this.detectMarket();
    this.setupInstallPrompt();
    this.setupPushNotifications();
  }

  /**
   * Detectar estado de instalación
   */
  detectInstallationState() {
    // Detectar si está ejecutándose como PWA
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone ||
                       document.referrer.includes('android-app://');

    // Detectar si ya está instalado
    this.isInstalled = this.isStandalone || 
                       localStorage.getItem('pwa-installed') === 'true';

    console.log('PWA Manager: Installation state', {
      isStandalone: this.isStandalone,
      isInstalled: this.isInstalled
    });
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Listener para el prompt de instalación
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA Manager: Install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallBanner();
    });

    // Listener para cuando se instala la app
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA Manager: App installed');
      this.isInstalled = true;
      localStorage.setItem('pwa-installed', 'true');
      this.hideInstallBanner();
      this.trackInstallation();
    });

    // Listener para cambios en el estado de conexión
    window.addEventListener('online', () => {
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      this.handleOffline();
    });

    // Listener para cambios en display mode
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
      this.isStandalone = e.matches;
      this.updateUIForStandalone();
    });
  }

  /**
   * Registrar Service Worker
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw-pwa.js', {
          scope: '/'
        });

        console.log('PWA Manager: Service Worker registered', registration);

        // Configurar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateAvailable();
            }
          });
        });

        // Precargar recursos del mercado actual
        if (this.currentMarket) {
          this.preloadMarketResources();
        }

        return registration;
      } catch (error) {
        console.error('PWA Manager: Service Worker registration failed', error);
      }
    }
  }

  /**
   * Detectar mercado actual
   */
  async detectMarket() {
    try {
      const marketManager = window.internationalMarketManager;
      if (marketManager) {
        this.currentMarket = marketManager.getCurrentMarket();
        console.log('PWA Manager: Current market detected', this.currentMarket?.code);
      }
    } catch (error) {
      console.warn('PWA Manager: Market detection failed', error);
    }
  }

  /**
   * Configurar prompt de instalación
   */
  setupInstallPrompt() {
    // No mostrar si ya está instalado
    if (this.isInstalled) return;

    // Mostrar después de cierto tiempo de uso
    setTimeout(() => {
      if (!this.installPromptShown && this.deferredPrompt) {
        this.showInstallPrompt();
      }
    }, 30000); // 30 segundos

    // Mostrar después de cierta interacción
    this.setupInteractionBasedPrompt();
  }

  /**
   * Configurar prompt basado en interacción
   */
  setupInteractionBasedPrompt() {
    let interactionCount = 0;
    const targetInteractions = 3;

    const trackInteraction = () => {
      interactionCount++;
      if (interactionCount >= targetInteractions && !this.installPromptShown && this.deferredPrompt) {
        setTimeout(() => this.showInstallPrompt(), 2000);
      }
    };

    // Rastrear interacciones significativas
    document.addEventListener('click', (e) => {
      if (e.target.closest('.tool-card, .converter-button, .editor-tool')) {
        trackInteraction();
      }
    });
  }

  /**
   * Mostrar banner de instalación
   */
  showInstallBanner() {
    if (this.isInstalled || document.querySelector('.pwa-install-banner')) return;

    const banner = this.createInstallBanner();
    document.body.appendChild(banner);

    // Auto-hide después de 10 segundos
    setTimeout(() => {
      if (banner.parentNode) {
        banner.remove();
      }
    }, 10000);
  }

  /**
   * Crear banner de instalación
   */
  createInstallBanner() {
    const banner = document.createElement('div');
    banner.className = 'pwa-install-banner';
    
    const messages = this.getInstallMessages();
    
    banner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">📱</div>
        <div class="pwa-banner-text">
          <div class="pwa-banner-title">${messages.title}</div>
          <div class="pwa-banner-subtitle">${messages.subtitle}</div>
        </div>
        <div class="pwa-banner-actions">
          <button class="pwa-install-btn">${messages.install}</button>
          <button class="pwa-dismiss-btn">✕</button>
        </div>
      </div>
    `;

    // Estilos
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideUp 0.3s ease-out;
      max-width: 400px;
      margin: 0 auto;
    `;

    // Event listeners
    banner.querySelector('.pwa-install-btn').addEventListener('click', () => {
      this.promptInstall();
      banner.remove();
    });

    banner.querySelector('.pwa-dismiss-btn').addEventListener('click', () => {
      banner.remove();
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    });

    // Agregar animación CSS
    if (!document.querySelector('#pwa-animations')) {
      const style = document.createElement('style');
      style.id = 'pwa-animations';
      style.textContent = `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .pwa-banner-content {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }
        .pwa-banner-icon {
          font-size: 2rem;
        }
        .pwa-banner-text {
          flex: 1;
        }
        .pwa-banner-title {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .pwa-banner-subtitle {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        .pwa-banner-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .pwa-install-btn {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .pwa-install-btn:hover {
          background: rgba(255,255,255,0.3);
        }
        .pwa-dismiss-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 4px;
          opacity: 0.7;
        }
        .pwa-dismiss-btn:hover {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }

    return banner;
  }

  /**
   * Obtener mensajes de instalación por mercado
   */
  getInstallMessages() {
    const marketMessages = {
      'IN': {
        title: 'ऐप इंस्टॉल करें',
        subtitle: 'तेज़ एक्सेस और ऑफलाइन उपयोग के लिए',
        install: 'इंस्टॉल करें'
      },
      'ID': {
        title: 'Install App',
        subtitle: 'Akses cepat dan penggunaan offline',
        install: 'Install'
      },
      'RU': {
        title: 'Установить приложение',
        subtitle: 'Быстрый доступ и работа офлайн',
        install: 'Установить'
      },
      'KR': {
        title: '앱 설치',
        subtitle: '빠른 접근과 오프라인 사용',
        install: '설치'
      },
      'CL': {
        title: 'Instalar App',
        subtitle: 'Acceso rápido y uso sin conexión',
        install: 'Instalar'
      }
    };

    const market = this.currentMarket?.code || 'US';
    return marketMessages[market] || {
      title: 'Install App',
      subtitle: 'Fast access and offline use',
      install: 'Install'
    };
  }

  /**
   * Mostrar prompt de instalación
   */
  async showInstallPrompt() {
    if (!this.deferredPrompt || this.installPromptShown) return;

    // Verificar si no fue rechazado recientemente
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
      return; // No mostrar si fue rechazado en los últimos 7 días
    }

    this.installPromptShown = true;
    
    try {
      const result = await this.deferredPrompt.prompt();
      console.log('PWA Manager: Install prompt result', result);
      
      if (result.outcome === 'accepted') {
        this.trackInstallation('prompt_accepted');
      } else {
        this.trackInstallation('prompt_dismissed');
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
      }
      
      this.deferredPrompt = null;
    } catch (error) {
      console.error('PWA Manager: Install prompt error', error);
    }
  }

  /**
   * Forzar instalación
   */
  async promptInstall() {
    if (this.deferredPrompt) {
      return this.showInstallPrompt();
    }
    
    // Fallback para navegadores que no soportan el prompt
    this.showManualInstallInstructions();
  }

  /**
   * Mostrar instrucciones de instalación manual
   */
  showManualInstallInstructions() {
    const instructions = this.getManualInstallInstructions();
    
    const modal = document.createElement('div');
    modal.className = 'pwa-install-modal';
    modal.innerHTML = `
      <div class="pwa-modal-overlay">
        <div class="pwa-modal-content">
          <h3>${instructions.title}</h3>
          <div class="pwa-instructions">
            ${instructions.steps.map(step => `<div class="pwa-step">${step}</div>`).join('')}
          </div>
          <button class="pwa-modal-close">Cerrar</button>
        </div>
      </div>
    `;

    // Estilos del modal
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10001;
    `;

    const style = document.createElement('style');
    style.textContent = `
      .pwa-modal-overlay {
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 20px;
      }
      .pwa-modal-content {
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 100%;
      }
      .pwa-instructions {
        margin: 16px 0;
      }
      .pwa-step {
        margin: 8px 0;
        padding: 8px;
        background: #f5f5f5;
        border-radius: 6px;
        font-size: 0.9rem;
      }
      .pwa-modal-close {
        background: #2563eb;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    modal.querySelector('.pwa-modal-close').addEventListener('click', () => {
      modal.remove();
      style.remove();
    });

    document.body.appendChild(modal);
  }

  /**
   * Obtener instrucciones de instalación manual
   */
  getManualInstallInstructions() {
    const userAgent = navigator.userAgent;
    
    if (/iPhone|iPad/.test(userAgent)) {
      return {
        title: 'Instalar en iOS',
        steps: [
          '1. Toca el botón de compartir (📤)',
          '2. Selecciona "Agregar a pantalla de inicio"',
          '3. Toca "Agregar" para confirmar'
        ]
      };
    } else if (/Android/.test(userAgent)) {
      return {
        title: 'Instalar en Android',
        steps: [
          '1. Toca el menú del navegador (⋮)',
          '2. Selecciona "Agregar a pantalla de inicio"',
          '3. Toca "Agregar" para confirmar'
        ]
      };
    } else {
      return {
        title: 'Instalar en Escritorio',
        steps: [
          '1. Busca el ícono de instalación en la barra de direcciones',
          '2. Haz clic en "Instalar"',
          '3. Confirma la instalación'
        ]
      };
    }
  }

  /**
   * Ocultar banner de instalación
   */
  hideInstallBanner() {
    const banner = document.querySelector('.pwa-install-banner');
    if (banner) {
      banner.remove();
    }
  }

  /**
   * Configurar push notifications
   */
  async setupPushNotifications() {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      return;
    }

    // Solo configurar si el usuario ya interactuó con la app
    setTimeout(() => {
      this.requestNotificationPermission();
    }, 60000); // Después de 1 minuto
  }

  /**
   * Solicitar permiso para notificaciones
   */
  async requestNotificationPermission() {
    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  /**
   * Precargar recursos del mercado
   */
  async preloadMarketResources() {
    if (!this.currentMarket || !navigator.serviceWorker.controller) return;

    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_MARKET_RESOURCES',
      payload: { market: this.currentMarket.code }
    });
  }

  /**
   * Manejar estado online
   */
  handleOnline() {
    console.log('PWA Manager: Back online');
    
    // Ocultar indicador offline
    this.hideOfflineIndicator();
    
    // Sincronizar datos pendientes
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SYNC_PENDING_DATA'
      });
    }
    
    // Mostrar notificación
    this.showConnectionStatus('online');
  }

  /**
   * Manejar estado offline
   */
  handleOffline() {
    console.log('PWA Manager: Gone offline');
    
    // Mostrar indicador offline
    this.showOfflineIndicator();
    
    // Mostrar notificación
    this.showConnectionStatus('offline');
  }

  /**
   * Mostrar indicador offline
   */
  showOfflineIndicator() {
    if (document.querySelector('.pwa-offline-indicator')) return;

    const indicator = document.createElement('div');
    indicator.className = 'pwa-offline-indicator';
    indicator.innerHTML = `
      <div class="pwa-offline-content">
        <span class="pwa-offline-icon">📡</span>
        <span class="pwa-offline-text">Sin conexión - Modo offline activo</span>
      </div>
    `;

    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f59e0b;
      color: white;
      padding: 8px;
      text-align: center;
      font-size: 0.9rem;
      z-index: 10000;
      animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(indicator);
  }

  /**
   * Ocultar indicador offline
   */
  hideOfflineIndicator() {
    const indicator = document.querySelector('.pwa-offline-indicator');
    if (indicator) {
      indicator.style.animation = 'slideUp 0.3s ease-out';
      setTimeout(() => indicator.remove(), 300);
    }
  }

  /**
   * Mostrar estado de conexión
   */
  showConnectionStatus(status) {
    const messages = {
      online: {
        text: 'Conexión restaurada',
        color: '#10b981',
        icon: '✅'
      },
      offline: {
        text: 'Sin conexión - Trabajando offline',
        color: '#f59e0b',
        icon: '📡'
      }
    };

    const message = messages[status];
    if (!message) return;

    const toast = document.createElement('div');
    toast.innerHTML = `
      <div style="
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${message.color};
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 10000;
        animation: fadeInOut 3s ease-in-out;
      ">
        ${message.icon} ${message.text}
      </div>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /**
   * Mostrar actualización disponible
   */
  showUpdateAvailable() {
    const updateBanner = document.createElement('div');
    updateBanner.className = 'pwa-update-banner';
    updateBanner.innerHTML = `
      <div class="pwa-update-content">
        <span class="pwa-update-icon">🔄</span>
        <span class="pwa-update-text">Nueva versión disponible</span>
        <button class="pwa-update-btn">Actualizar</button>
        <button class="pwa-update-dismiss">✕</button>
      </div>
    `;

    updateBanner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      border-radius: 8px;
      padding: 12px;
      z-index: 10000;
      max-width: 400px;
      margin: 0 auto;
    `;

    updateBanner.querySelector('.pwa-update-btn').addEventListener('click', () => {
      window.location.reload();
    });

    updateBanner.querySelector('.pwa-update-dismiss').addEventListener('click', () => {
      updateBanner.remove();
    });

    document.body.appendChild(updateBanner);
  }

  /**
   * Actualizar UI para modo standalone
   */
  updateUIForStandalone() {
    if (this.isStandalone) {
      document.body.classList.add('pwa-standalone');
      
      // Ocultar elementos específicos del navegador
      const browserElements = document.querySelectorAll('.browser-only');
      browserElements.forEach(el => el.style.display = 'none');
    } else {
      document.body.classList.remove('pwa-standalone');
    }
  }

  /**
   * Rastrear instalación
   */
  trackInstallation(source = 'unknown') {
    console.log('PWA Manager: App installation tracked', source);
    
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'PWA',
        event_label: source,
        market_region: this.currentMarket?.code || 'unknown'
      });
    }

    // Analytics internacionales
    if (window.internationalAnalyticsManager) {
      window.internationalAnalyticsManager.trackMarketSpecificEvent('pwa_installed', {
        source,
        market: this.currentMarket?.code,
        timestamp: Date.now()
      });
    }
  }

  /**
   * Obtener información de la PWA
   */
  getPWAInfo() {
    return {
      isInstalled: this.isInstalled,
      isStandalone: this.isStandalone,
      canInstall: !!this.deferredPrompt,
      currentMarket: this.currentMarket?.code,
      notificationPermission: Notification?.permission || 'not-supported'
    };
  }
}

/**
 * Inicializar PWA Manager
 */
export const initializePWAManager = async () => {
  const manager = new PWAManager();
  await manager.init();
  
  // Hacer disponible globalmente
  window.pwaManager = manager;
  
  return manager;
};

export default PWAManager;
