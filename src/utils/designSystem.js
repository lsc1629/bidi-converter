// Sistema de Design Tokens y Tema Premium

export const DESIGN_TOKENS = {
  // Colores principales
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    }
  },

  // Tipografía
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }]
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },

  // Espaciado
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  // Bordes y radios
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Sombras
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },

  // Animaciones
  animation: {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideIn: 'slideIn 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    slideUp: 'slideUp 0.4s ease-out'
  },

  // Transiciones
  transitionDuration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },

  transitionTimingFunction: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Temas
export const THEMES = {
  light: {
    name: 'light',
    colors: {
      background: DESIGN_TOKENS.colors.secondary[50],
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      border: DESIGN_TOKENS.colors.secondary[200],
      borderLight: DESIGN_TOKENS.colors.secondary[100],
      text: {
        primary: DESIGN_TOKENS.colors.secondary[900],
        secondary: DESIGN_TOKENS.colors.secondary[700],
        tertiary: DESIGN_TOKENS.colors.secondary[500],
        inverse: '#ffffff'
      },
      primary: DESIGN_TOKENS.colors.primary[600],
      primaryHover: DESIGN_TOKENS.colors.primary[700],
      primaryLight: DESIGN_TOKENS.colors.primary[50],
      success: DESIGN_TOKENS.colors.success[600],
      warning: DESIGN_TOKENS.colors.warning[600],
      error: DESIGN_TOKENS.colors.error[600]
    }
  },

  dark: {
    name: 'dark',
    colors: {
      background: DESIGN_TOKENS.colors.secondary[900],
      surface: DESIGN_TOKENS.colors.secondary[800],
      surfaceElevated: DESIGN_TOKENS.colors.secondary[700],
      border: DESIGN_TOKENS.colors.secondary[700],
      borderLight: DESIGN_TOKENS.colors.secondary[600],
      text: {
        primary: DESIGN_TOKENS.colors.secondary[100],
        secondary: DESIGN_TOKENS.colors.secondary[300],
        tertiary: DESIGN_TOKENS.colors.secondary[400],
        inverse: DESIGN_TOKENS.colors.secondary[900]
      },
      primary: DESIGN_TOKENS.colors.primary[500],
      primaryHover: DESIGN_TOKENS.colors.primary[400],
      primaryLight: DESIGN_TOKENS.colors.primary[900],
      success: DESIGN_TOKENS.colors.success[500],
      warning: DESIGN_TOKENS.colors.warning[500],
      error: DESIGN_TOKENS.colors.error[500]
    }
  },

  // Tema por mercado
  india: {
    name: 'india',
    colors: {
      background: '#fef7ed',
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      border: '#fed7aa',
      borderLight: '#fef3e2',
      text: {
        primary: '#9a3412',
        secondary: '#c2410c',
        tertiary: '#ea580c',
        inverse: '#ffffff'
      },
      primary: '#ea580c',
      primaryHover: '#c2410c',
      primaryLight: '#fef7ed',
      success: '#16a34a',
      warning: '#d97706',
      error: '#dc2626'
    }
  },

  korea: {
    name: 'korea',
    colors: {
      background: '#faf5ff',
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      border: '#d8b4fe',
      borderLight: '#f3e8ff',
      text: {
        primary: '#581c87',
        secondary: '#7c3aed',
        tertiary: '#8b5cf6',
        inverse: '#ffffff'
      },
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      primaryLight: '#faf5ff',
      success: '#16a34a',
      warning: '#d97706',
      error: '#dc2626'
    }
  }
};

export class DesignSystem {
  constructor() {
    this.currentTheme = 'light';
    this.marketThemes = new Map();
    this.customProperties = new Map();
    this.init();
  }

  init() {
    this.detectMarketTheme();
    this.setupCSSCustomProperties();
    this.setupThemeToggle();
    this.setupResponsiveBreakpoints();
  }

  detectMarketTheme() {
    if (window.internationalMarketManager) {
      const market = window.internationalMarketManager.getCurrentMarket();
      
      switch (market?.code) {
        case 'IN':
          this.setTheme('india');
          break;
        case 'KR':
          this.setTheme('korea');
          break;
        default:
          this.setTheme('light');
      }
    }
  }

  setTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    this.currentTheme = themeName;
    
    // Update CSS custom properties
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // Update theme class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${themeName}`);

    // Store preference
    localStorage.setItem('preferred-theme', themeName);
    
    // Emit theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: themeName } 
    }));
  }

  setupCSSCustomProperties() {
    const root = document.documentElement;
    
    // Setup design tokens as CSS variables
    Object.entries(DESIGN_TOKENS.colors).forEach(([colorName, colorValues]) => {
      Object.entries(colorValues).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorName}-${shade}`, value);
      });
    });

    // Setup spacing
    Object.entries(DESIGN_TOKENS.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Setup typography
    Object.entries(DESIGN_TOKENS.typography.fontSize).forEach(([key, value]) => {
      const [fontSize, config] = Array.isArray(value) ? value : [value, {}];
      root.style.setProperty(`--font-size-${key}`, fontSize);
      if (config.lineHeight) {
        root.style.setProperty(`--line-height-${key}`, config.lineHeight);
      }
    });

    // Setup border radius
    Object.entries(DESIGN_TOKENS.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    // Setup shadows
    Object.entries(DESIGN_TOKENS.boxShadow).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }

  setupThemeToggle() {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('preferred-theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Set initial theme based on preference or system
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme && THEMES[savedTheme]) {
      this.setTheme(savedTheme);
    } else if (mediaQuery.matches) {
      this.setTheme('dark');
    }
  }

  setupResponsiveBreakpoints() {
    const breakpoints = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    };

    const root = document.documentElement;
    Object.entries(breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });
  }

  // Utilidades de tema
  getCurrentTheme() {
    return this.currentTheme;
  }

  getThemeColor(colorPath) {
    const theme = THEMES[this.currentTheme];
    const keys = colorPath.split('.');
    
    let value = theme.colors;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) return null;
    }
    
    return value;
  }

  // Animaciones dinámicas
  createAnimation(name, keyframes, options = {}) {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${name} {
        ${Object.entries(keyframes).map(([key, value]) => 
          `${key} { ${Object.entries(value).map(([prop, val]) => 
            `${prop}: ${val}`).join('; ')} }`
        ).join('\n')}
      }
    `;
    document.head.appendChild(style);
    
    return {
      name,
      duration: options.duration || '300ms',
      timingFunction: options.timingFunction || 'ease-out',
      fillMode: options.fillMode || 'forwards'
    };
  }

  // Responsive utilities
  getBreakpoint() {
    const width = window.innerWidth;
    
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
  }

  isMobile() {
    return this.getBreakpoint() === 'xs' || this.getBreakpoint() === 'sm';
  }

  isTablet() {
    return this.getBreakpoint() === 'md';
  }

  isDesktop() {
    return ['lg', 'xl', '2xl'].includes(this.getBreakpoint());
  }

  // Color utilities
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  // Accessibility utilities
  getContrastRatio(color1, color2) {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 1;
    
    const luminance1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const luminance2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  }

  getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Performance utilities
  optimizeAnimations() {
    // Reduce animations on low-end devices
    const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                     navigator.deviceMemory <= 2;
    
    if (isLowEnd) {
      document.documentElement.style.setProperty('--animation-duration', '0ms');
      document.documentElement.classList.add('reduce-motion');
    }
  }

  // Market-specific customizations
  applyMarketCustomizations(marketCode) {
    const customizations = {
      'IN': {
        primaryFont: 'Noto Sans Devanagari',
        accentColor: '#ff6b35',
        culturalElements: true
      },
      'RU': {
        primaryFont: 'Roboto',
        accentColor: '#0066cc',
        formalTone: true
      },
      'KR': {
        primaryFont: 'Noto Sans KR',
        accentColor: '#7c3aed',
        minimalist: true
      }
    };

    const config = customizations[marketCode];
    if (config) {
      this.customProperties.set(marketCode, config);
      this.applyCustomizations(config);
    }
  }

  applyCustomizations(config) {
    const root = document.documentElement;
    
    if (config.primaryFont) {
      root.style.setProperty('--font-family-primary', config.primaryFont);
    }
    
    if (config.accentColor) {
      root.style.setProperty('--color-accent', config.accentColor);
    }
    
    if (config.culturalElements) {
      document.body.classList.add('cultural-elements');
    }
    
    if (config.formalTone) {
      document.body.classList.add('formal-tone');
    }
    
    if (config.minimalist) {
      document.body.classList.add('minimalist');
    }
  }
}

export const initializeDesignSystem = () => {
  const designSystem = new DesignSystem();
  window.designSystem = designSystem;
  return designSystem;
};

export default DesignSystem;
