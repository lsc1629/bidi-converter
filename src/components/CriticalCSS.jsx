import React, { useEffect } from 'react';

/**
 * Componente para inyectar CSS crítico inline y optimizar render blocking
 */
const CriticalCSS = () => {
  useEffect(() => {
    // CSS crítico inline para above-the-fold
    const criticalCSS = `
      /* Reset y base crítico */
      *,*::before,*::after{box-sizing:border-box}
      body,html{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
      
      /* Layout crítico */
      .min-h-screen{min-height:100vh}
      .bg-gray-50{background-color:#f9fafb}
      .bg-white{background-color:#fff}
      .max-w-7xl{max-width:80rem}
      .mx-auto{margin-left:auto;margin-right:auto}
      .px-4{padding-left:1rem;padding-right:1rem}
      .py-8{padding-top:2rem;padding-bottom:2rem}
      
      /* Header crítico */
      header{background-color:#fff;border-bottom:1px solid #e5e7eb;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1)}
      .h-16{height:4rem}
      .flex{display:flex}
      .items-center{align-items:center}
      .justify-between{justify-content:space-between}
      .space-x-4>:not([hidden])~:not([hidden]){margin-left:1rem}
      
      /* Navegación crítica */
      .text-2xl{font-size:1.5rem;line-height:2rem}
      .font-bold{font-weight:700}
      .text-blue-600{color:#2563eb}
      .hover\\:text-blue-700:hover{color:#1d4ed8}
      .transition-colors{transition-property:color;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
      
      /* Hero section crítico */
      .text-center{text-align:center}
      .mb-12{margin-bottom:3rem}
      .text-4xl{font-size:2.25rem;line-height:2.5rem}
      .text-gray-900{color:#111827}
      .mb-6{margin-bottom:1.5rem}
      .text-xl{font-size:1.25rem;line-height:1.75rem}
      .text-gray-600{color:#4b5563}
      .mb-8{margin-bottom:2rem}
      
      /* Botones críticos */
      .bg-blue-600{background-color:#2563eb}
      .text-white{color:#fff}
      .px-8{padding-left:2rem;padding-right:2rem}
      .py-3{padding-top:0.75rem;padding-bottom:0.75rem}
      .rounded-lg{border-radius:0.5rem}
      .hover\\:bg-blue-700:hover{background-color:#1d4ed8}
      .font-medium{font-weight:500}
      
      /* Loading states críticos */
      .animate-spin{animation:spin 1s linear infinite}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      .rounded-full{border-radius:9999px}
      .border-b-2{border-bottom-width:2px}
      .border-blue-600{border-color:#2563eb}
      
      /* Grid crítico */
      .grid{display:grid}
      .gap-8{gap:2rem}
      .md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
      @media (min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
      
      /* Shadows críticos */
      .shadow-xl{box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}
      .shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}
      
      /* Borders críticos */
      .border{border-width:1px}
      .border-gray-200{border-color:#e5e7eb}
      .border-2{border-width:2px}
      .border-dashed{border-style:dashed}
      .border-gray-300{border-color:#d1d5db}
      
      /* Spacing crítico */
      .p-8{padding:2rem}
      .p-6{padding:1.5rem}
      .mb-4{margin-bottom:1rem}
      .mt-8{margin-top:2rem}
      
      /* Typography crítico */
      .text-lg{font-size:1.125rem;line-height:1.75rem}
      .text-base{font-size:1rem;line-height:1.5rem}
      .text-sm{font-size:0.875rem;line-height:1.25rem}
      .leading-relaxed{line-height:1.625}
      
      /* Colors críticos */
      .text-gray-700{color:#374151}
      .text-gray-500{color:#6b7280}
      .bg-gray-100{background-color:#f3f4f6}
      .bg-green-100{background-color:#dcfce7}
      .text-green-600{color:#16a34a}
      
      /* Mobile responsive crítico */
      @media (max-width:767px){
        .text-4xl{font-size:1.875rem;line-height:2.25rem}
        .px-4{padding-left:1rem;padding-right:1rem}
        .py-8{padding-top:2rem;padding-bottom:2rem}
      }
      
      /* Prevent layout shifts */
      img:not([width]):not([height]){aspect-ratio:16/9;background-color:#f3f4f6}
      .hero-section{min-height:400px}
      .tool-section{min-height:300px}
      .nav-section{min-height:64px}
      
      /* Critical animations */
      .fade-in{opacity:0;animation:fadeIn 0.3s ease-in-out forwards}
      @keyframes fadeIn{to{opacity:1}}
      
      /* Focus states críticos */
      .focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}
      .focus\\:ring-2:focus{box-shadow:0 0 0 2px rgba(59,130,246,0.5)}
      
      /* Hover states críticos */
      .hover\\:shadow-md:hover{box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)}
      
      /* Utility crítico */
      .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      .relative{position:relative}
      .absolute{position:absolute}
      .inset-0{top:0;right:0;bottom:0;left:0}
      .z-10{z-index:10}
      
      /* Performance optimizations */
      *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
      img{content-visibility:auto}
      .lazy-section{content-visibility:auto;contain-intrinsic-size:200px}
    `;

    // Crear e inyectar el estilo crítico
    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-critical-css', 'true');
    styleElement.textContent = criticalCSS;
    
    // Insertar al principio del head para máxima prioridad
    document.head.insertBefore(styleElement, document.head.firstChild);

    // Preload del CSS no crítico
    const nonCriticalCSS = [
      '/css/animations.css',
      '/css/utilities.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
        this.media = 'all';
      };
      // Fallback para navegadores que no soportan preload
      link.onerror = function() {
        const fallbackLink = document.createElement('link');
        fallbackLink.rel = 'stylesheet';
        fallbackLink.href = href;
        document.head.appendChild(fallbackLink);
      };
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      const criticalStyle = document.querySelector('[data-critical-css="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null; // Este componente no renderiza nada visible
};

/**
 * Hook para aplicar CSS crítico condicionalmente
 */
export const useCriticalCSS = (condition = true) => {
  useEffect(() => {
    if (!condition) return;

    // Aplicar estilos críticos específicos
    const applyConditionalStyles = () => {
      const conditionalCSS = `
        .critical-content {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .critical-content.loading {
          opacity: 0;
          transform: translateY(10px);
        }
      `;

      const style = document.createElement('style');
      style.setAttribute('data-conditional-critical', 'true');
      style.textContent = conditionalCSS;
      document.head.appendChild(style);
    };

    applyConditionalStyles();

    return () => {
      const conditionalStyle = document.querySelector('[data-conditional-critical="true"]');
      if (conditionalStyle) {
        conditionalStyle.remove();
      }
    };
  }, [condition]);
};

/**
 * Componente para optimizar fuentes críticas
 */
export const CriticalFonts = () => {
  useEffect(() => {
    // Preload de fuentes críticas
    const criticalFonts = [
      {
        href: '/fonts/inter-var.woff2',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      }
    ];

    criticalFonts.forEach(font => {
      // Verificar si ya existe
      const existing = document.querySelector(`link[href="${font.href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.href;
      link.as = 'font';
      link.type = font.type;
      if (font.crossorigin) {
        link.crossOrigin = font.crossorigin;
      }
      
      document.head.appendChild(link);
    });

    // Aplicar font-display: swap
    const fontDisplayCSS = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `;

    const fontStyle = document.createElement('style');
    fontStyle.setAttribute('data-font-display', 'true');
    fontStyle.textContent = fontDisplayCSS;
    document.head.appendChild(fontStyle);

    return () => {
      const fontDisplayStyle = document.querySelector('[data-font-display="true"]');
      if (fontDisplayStyle) {
        fontDisplayStyle.remove();
      }
    };
  }, []);

  return null;
};

/**
 * Componente para resource hints críticos
 */
export const CriticalResourceHints = () => {
  useEffect(() => {
    const resourceHints = [
      // DNS Prefetch
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      
      // Preconnect
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      
      // Preload crítico
      { rel: 'preload', href: '/js/critical.js', as: 'script' },
      { rel: 'preload', href: '/images/hero-bg.webp', as: 'image', type: 'image/webp' }
    ];

    resourceHints.forEach(hint => {
      // Verificar si ya existe
      const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
      if (existing) return;

      const link = document.createElement('link');
      Object.keys(hint).forEach(key => {
        if (key === 'crossorigin') {
          link.crossOrigin = hint[key];
        } else {
          link.setAttribute(key, hint[key]);
        }
      });
      
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

export default CriticalCSS;
