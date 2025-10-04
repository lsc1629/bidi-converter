// Generador automático de iconos PWA para todos los tamaños

/**
 * Configuración de iconos PWA
 */
export const PWA_ICON_CONFIG = {
  sizes: [
    { size: 72, name: 'icon-72x72.png', purpose: 'any' },
    { size: 96, name: 'icon-96x96.png', purpose: 'any' },
    { size: 128, name: 'icon-128x128.png', purpose: 'any' },
    { size: 144, name: 'icon-144x144.png', purpose: 'any' },
    { size: 152, name: 'icon-152x152.png', purpose: 'any' },
    { size: 192, name: 'icon-192x192.png', purpose: 'any maskable' },
    { size: 384, name: 'icon-384x384.png', purpose: 'any' },
    { size: 512, name: 'icon-512x512.png', purpose: 'any maskable' }
  ],
  
  shortcuts: [
    { size: 96, name: 'shortcut-converter.png' },
    { size: 96, name: 'shortcut-pdf.png' },
    { size: 96, name: 'shortcut-editor.png' },
    { size: 96, name: 'shortcut-qr.png' }
  ],
  
  splashScreens: [
    { width: 320, height: 568, name: 'splash-320x568.png' }, // iPhone SE
    { width: 375, height: 667, name: 'splash-375x667.png' }, // iPhone 8
    { width: 375, height: 812, name: 'splash-375x812.png' }, // iPhone X
    { width: 390, height: 844, name: 'splash-390x844.png' }, // iPhone 12
    { width: 414, height: 896, name: 'splash-414x896.png' }, // iPhone 11
    { width: 768, height: 1024, name: 'splash-768x1024.png' }, // iPad
    { width: 1024, height: 1366, name: 'splash-1024x1366.png' } // iPad Pro
  ]
};

/**
 * Clase para generar iconos PWA
 */
export class PWAIconGenerator {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.baseIcon = null;
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Generar todos los iconos PWA
   */
  async generateAllIcons() {
    try {
      // Cargar icono base
      await this.loadBaseIcon();
      
      // Generar iconos principales
      await this.generateMainIcons();
      
      // Generar iconos de shortcuts
      await this.generateShortcutIcons();
      
      // Generar splash screens
      await this.generateSplashScreens();
      
      console.log('PWA Icons: All icons generated successfully');
      return true;
    } catch (error) {
      console.error('PWA Icons: Generation failed', error);
      return false;
    }
  }

  /**
   * Cargar icono base
   */
  async loadBaseIcon() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.baseIcon = img;
        resolve();
      };
      img.onerror = reject;
      
      // SVG del icono base de Bidi Converter
      const svgIcon = this.createBaseSVGIcon();
      img.src = 'data:image/svg+xml;base64,' + btoa(svgIcon);
    });
  }

  /**
   * Crear SVG base del icono
   */
  createBaseSVGIcon() {
    return `
      <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f0f9ff;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="512" height="512" rx="80" fill="url(#bg)"/>
        
        <!-- Main Icon -->
        <g transform="translate(128, 128)">
          <!-- Conversion arrows -->
          <path d="M50 100 L150 100 L130 80 M150 100 L130 120" 
                stroke="url(#icon)" stroke-width="8" fill="none" stroke-linecap="round"/>
          <path d="M150 156 L50 156 L70 136 M50 156 L70 176" 
                stroke="url(#icon)" stroke-width="8" fill="none" stroke-linecap="round"/>
          
          <!-- Document icons -->
          <rect x="20" y="60" width="60" height="80" rx="8" fill="url(#icon)" opacity="0.9"/>
          <rect x="176" y="60" width="60" height="80" rx="8" fill="url(#icon)" opacity="0.9"/>
          
          <!-- Format labels -->
          <text x="50" y="110" text-anchor="middle" fill="#667eea" font-family="Arial" font-size="12" font-weight="bold">PNG</text>
          <text x="206" y="110" text-anchor="middle" fill="#667eea" font-family="Arial" font-size="12" font-weight="bold">JPG</text>
          
          <!-- Decorative elements -->
          <circle cx="128" cy="128" r="20" fill="url(#icon)" opacity="0.3"/>
          <circle cx="128" cy="128" r="12" fill="url(#icon)" opacity="0.6"/>
        </g>
        
        <!-- Brand text -->
        <text x="256" y="450" text-anchor="middle" fill="white" font-family="Arial" font-size="32" font-weight="bold">BIDI</text>
      </svg>
    `;
  }

  /**
   * Generar iconos principales
   */
  async generateMainIcons() {
    for (const iconConfig of PWA_ICON_CONFIG.sizes) {
      await this.generateIcon(iconConfig.size, iconConfig.name, iconConfig.purpose);
    }
  }

  /**
   * Generar un icono específico
   */
  async generateIcon(size, filename, purpose = 'any') {
    this.canvas.width = size;
    this.canvas.height = size;
    
    // Limpiar canvas
    this.ctx.clearRect(0, 0, size, size);
    
    if (purpose.includes('maskable')) {
      // Para iconos maskable, agregar padding del 20%
      const padding = size * 0.1;
      const iconSize = size - (padding * 2);
      this.ctx.drawImage(this.baseIcon, padding, padding, iconSize, iconSize);
    } else {
      // Para iconos normales, usar todo el espacio
      this.ctx.drawImage(this.baseIcon, 0, 0, size, size);
    }
    
    // Convertir a blob y descargar
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        this.downloadBlob(blob, filename);
        resolve();
      }, 'image/png');
    });
  }

  /**
   * Generar iconos de shortcuts
   */
  async generateShortcutIcons() {
    const shortcuts = [
      { name: 'shortcut-converter.png', icon: '🖼️', color: '#3b82f6' },
      { name: 'shortcut-pdf.png', icon: '📄', color: '#ef4444' },
      { name: 'shortcut-editor.png', icon: '✂️', color: '#10b981' },
      { name: 'shortcut-qr.png', icon: '📱', color: '#8b5cf6' }
    ];

    for (const shortcut of shortcuts) {
      await this.generateShortcutIcon(shortcut);
    }
  }

  /**
   * Generar icono de shortcut específico
   */
  async generateShortcutIcon(shortcut) {
    const size = 96;
    this.canvas.width = size;
    this.canvas.height = size;
    
    // Limpiar canvas
    this.ctx.clearRect(0, 0, size, size);
    
    // Fondo circular
    this.ctx.beginPath();
    this.ctx.arc(size/2, size/2, size/2 - 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = shortcut.color;
    this.ctx.fill();
    
    // Emoji/icono
    this.ctx.font = `${size * 0.5}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(shortcut.icon, size/2, size/2);
    
    // Convertir y descargar
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        this.downloadBlob(blob, shortcut.name);
        resolve();
      }, 'image/png');
    });
  }

  /**
   * Generar splash screens
   */
  async generateSplashScreens() {
    for (const screen of PWA_ICON_CONFIG.splashScreens) {
      await this.generateSplashScreen(screen);
    }
  }

  /**
   * Generar splash screen específico
   */
  async generateSplashScreen(screen) {
    this.canvas.width = screen.width;
    this.canvas.height = screen.height;
    
    // Limpiar canvas
    this.ctx.clearRect(0, 0, screen.width, screen.height);
    
    // Fondo degradado
    const gradient = this.ctx.createLinearGradient(0, 0, screen.width, screen.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, screen.width, screen.height);
    
    // Icono central
    const iconSize = Math.min(screen.width, screen.height) * 0.3;
    const iconX = (screen.width - iconSize) / 2;
    const iconY = (screen.height - iconSize) / 2 - iconSize * 0.2;
    
    this.ctx.drawImage(this.baseIcon, iconX, iconY, iconSize, iconSize);
    
    // Texto
    const fontSize = Math.min(screen.width, screen.height) * 0.08;
    this.ctx.font = `bold ${fontSize}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Bidi Converter', screen.width/2, iconY + iconSize + fontSize * 1.5);
    
    // Subtítulo
    const subtitleSize = fontSize * 0.6;
    this.ctx.font = `${subtitleSize}px Arial`;
    this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
    this.ctx.fillText('Free Image Converter', screen.width/2, iconY + iconSize + fontSize * 2.5);
    
    // Convertir y descargar
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        this.downloadBlob(blob, screen.name);
        resolve();
      }, 'image/png');
    });
  }

  /**
   * Descargar blob como archivo
   */
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Generar archivo ZIP con todos los iconos
   */
  async generateIconsZip() {
    // Esta función requeriría una librería como JSZip
    // Por ahora, generamos los iconos individualmente
    console.log('PWA Icons: Individual icon generation completed');
    console.log('PWA Icons: For production, consider using a build tool to generate icons automatically');
  }
}

/**
 * Función utilitaria para generar iconos
 */
export const generatePWAIcons = async () => {
  const generator = new PWAIconGenerator();
  return await generator.generateAllIcons();
};

/**
 * Crear meta tags para PWA
 */
export const createPWAMetaTags = () => {
  const metaTags = [
    // Básicos PWA
    { name: 'application-name', content: 'Bidi Converter' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Bidi Converter' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'msapplication-TileColor', content: '#2563eb' },
    { name: 'msapplication-tap-highlight', content: 'no' },
    { name: 'theme-color', content: '#2563eb' },
    
    // Apple Touch Icons
    { rel: 'apple-touch-icon', href: '/icons/icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/icon-192x192.png' },
    
    // Favicon
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/icon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/icon-16x16.png' },
    
    // Manifest
    { rel: 'manifest', href: '/manifest.json' },
    
    // Microsoft
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    
    // Splash screens iOS
    { rel: 'apple-touch-startup-image', href: '/icons/splash-320x568.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' },
    { rel: 'apple-touch-startup-image', href: '/icons/splash-375x667.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' },
    { rel: 'apple-touch-startup-image', href: '/icons/splash-375x812.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' }
  ];

  // Agregar meta tags al head
  metaTags.forEach(tag => {
    const element = document.createElement(tag.rel ? 'link' : 'meta');
    
    Object.keys(tag).forEach(key => {
      element.setAttribute(key, tag[key]);
    });
    
    document.head.appendChild(element);
  });

  console.log('PWA Meta Tags: Added to document head');
};

/**
 * Inicializar iconos PWA
 */
export const initializePWAIcons = () => {
  // Crear meta tags
  createPWAMetaTags();
  
  // Verificar si los iconos existen
  const checkIcon = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  // Verificar icono principal
  checkIcon('/icons/icon-192x192.png').then(exists => {
    if (!exists) {
      console.warn('PWA Icons: Main icon not found. Consider generating icons.');
    } else {
      console.log('PWA Icons: Icons verified successfully');
    }
  });
};

export default PWAIconGenerator;
