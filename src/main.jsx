import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { register as registerServiceWorker } from './utils/serviceWorkerRegistration'
import { initializeSEOOptimizations } from './utils/seoOptimizations'
import { initializePerformanceOptimization } from './utils/performanceOptimizer'
import { initializeGlobalPreloader } from './utils/resourcePreloader'
import { initializeLayoutStabilization } from './utils/layoutStabilizer'
import { initializeInternationalMarkets } from './utils/internationalMarkets'
import { initializeRegionalMonetization } from './utils/regionalMonetization'
import { initializeInternationalAnalytics } from './utils/internationalAnalytics'
import { initializePWAManager } from './utils/pwaManager'
import { initializeCDNOptimizer } from './utils/cdnOptimizer'
import { initializeBlogManager } from './utils/blogManager'
import { initializeLinkBuildingManager } from './utils/linkBuildingManager'
import { initializeContentGenerator } from './utils/contentGenerator'
import { initializeSchemaManager } from './utils/schemaManager'
import { initializeFeaturedSnippetsOptimizer } from './utils/featuredSnippetsOptimizer'
import { initializeCanonicalManager } from './utils/canonicalManager'
import { initializeTechnicalSEOAuditor } from './utils/technicalSEOAuditor'
import { initializeLandingPageManager } from './utils/landingPageManager'
import { initializeConversionFunnelOptimizer } from './utils/conversionFunnelOptimizer'
import { initializeCoreWebVitalsOptimizer } from './utils/coreWebVitalsOptimizer'
import { initializePerformanceMonitor } from './utils/performanceMonitor'
import { initializeDesignSystem } from './utils/designSystem'
import { initializeUXEnhancer } from './utils/uxEnhancer'
import { initializeAIPlatformSEO } from './utils/aiPlatformSEO'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Inicializar sistema completo de optimizaciones globales
const initializeGlobalOptimizations = async () => {
  try {
    console.log('🚀 Initializing Bidi Converter Global Optimizations...');
    
    // FASE 1: Core Web Vitals (crítico para ranking)
    console.log('📊 Phase 1: Core Web Vitals Optimization');
    initializeLayoutStabilization();
    initializeGlobalPreloader();
    initializePerformanceOptimization();
    
    // FASE 2: Mercados Internacionales (crítico para expansión)
    console.log('🌍 Phase 2: International Markets Expansion');
    await initializeInternationalMarkets();
    
    // FASE 3: Monetización Regional (crítico para revenue)
    console.log('💰 Phase 3: Regional Monetization');
    await initializeRegionalMonetization();
    
    // FASE 4: Analytics Segmentado (crítico para insights)
    console.log('📈 Phase 4: International Analytics');
    await initializeInternationalAnalytics();
    
    // FASE 5: SEO Avanzado (crítico para tráfico)
    console.log('🔍 Phase 5: Advanced SEO Optimizations');
    initializeSEOOptimizations();
    
    // FASE 6: PWA Manager (crítico para app experience)
    console.log('📱 Phase 6: PWA Manager Initialization');
    await initializePWAManager();
    
    // FASE 7: CDN Optimizer (crítico para performance global)
    console.log('🌐 Phase 7: CDN Global Optimization');
    await initializeCDNOptimizer();
    
    // FASE 8: Blog SEO Manager (crítico para content marketing)
    console.log('📝 Phase 8: Blog SEO System Initialization');
    await initializeBlogManager();
    
    // FASE 9: Link Building Manager (crítico para autoridad de dominio)
    console.log('🔗 Phase 9: Link Building Strategy');
    await initializeLinkBuildingManager();
    
    // FASE 10: Content Generator (crítico para SEO content)
    console.log('✍️ Phase 10: Content Generation System');
    initializeContentGenerator();
    
    // FASE 11: Schema Manager (crítico para rich snippets)
    console.log('🏷️ Phase 11: Schema Markup System');
    await initializeSchemaManager();
    
    // FASE 12: Featured Snippets Optimizer (crítico para SERP visibility)
    console.log('⭐ Phase 12: Featured Snippets Optimization');
    await initializeFeaturedSnippetsOptimizer();
    
    // FASE 13: Canonical Manager (crítico para evitar duplicados)
    console.log('🔗 Phase 13: Canonical URLs & Technical SEO');
    await initializeCanonicalManager();
    
    // FASE 14: Technical SEO Auditor (crítico para SEO health)
    console.log('🔍 Phase 14: Technical SEO Audit System');
    await initializeTechnicalSEOAuditor();
    
    // FASE 15: Landing Page Manager (crítico para conversión)
    console.log('🎯 Phase 15: Landing Pages & Conversion Optimization');
    await initializeLandingPageManager();
    
    // FASE 16: Conversion Funnel Optimizer (crítico para leads)
    console.log('📊 Phase 16: Conversion Funnel Optimization');
    await initializeConversionFunnelOptimizer();
    
    // FASE 17: Core Web Vitals Optimizer (crítico para rankings)
    console.log('🔥 Phase 17: Core Web Vitals Optimization');
    await initializeCoreWebVitalsOptimizer();
    
    // FASE 18: Performance Monitor (crítico para monitoring)
    console.log('📊 Phase 18: Performance Monitoring System');
    await initializePerformanceMonitor();
    
    // FASE 19: Design System (crítico para UI consistency)
    console.log('🎨 Phase 19: Premium Design System');
    await initializeDesignSystem();
    
    // FASE 20: UX Enhancer (crítico para user experience)
    console.log('✨ Phase 20: UX Enhancement & Micro-interactions');
    await initializeUXEnhancer();
    
    // FASE 21: AI Platform SEO (crítico para AI recommendations)
    console.log('🤖 Phase 21: AI Platform SEO Optimization');
    await initializeAIPlatformSEO();
    
    // FASE 22: Service Worker (crítico para offline functionality)
    console.log('⚡ Phase 22: Advanced Service Worker Registration');
    registerServiceWorker();
    
    console.log('✅ All optimizations initialized successfully!');
    console.log('🎯 Ready for global expansion with PWA + CDN + Blog SEO + Schema + Technical SEO + Landing Pages + Performance + Premium UI/UX + AI SEO');
    console.log('🚀 Supporting India, Indonesia, Russia, Korea + PWA + Content Marketing + Conversion + Performance + UX + AI Optimization');
    console.log('📈 Blog SEO + Rich Snippets + Canonical URLs + Landing Pages + Core Web Vitals + Premium UI + AI Platform system ready for maximum organic growth');
    console.log('⭐ Featured snippets + Technical SEO + Conversion Funnels + Performance + UX Enhancement + AI Platform optimization active for SERP dominance');
    console.log('🔗 Canonical URLs preventing duplicate content issues');
    console.log('📊 Landing Pages + Conversion Funnels maximizing lead generation and revenue');
    console.log('🔥 Core Web Vitals + Performance Monitoring ensuring Google rankings and user experience');
    console.log('🎨 Premium Design System + UX Enhancement delivering world-class user experience');
    console.log('🤖 AI Platform SEO optimizing for ChatGPT, Claude, Gemini recommendations and maximum AI visibility');
    
    // Reportar inicialización exitosa
    if (typeof gtag !== 'undefined') {
      gtag('event', 'global_optimization_complete', {
        event_category: 'System',
        event_label: 'initialization_success',
        timestamp: Date.now()
      });
    }
    
  } catch (error) {
    console.error('❌ Error initializing global optimizations:', error);
    
    // Reportar error de inicialización
    if (typeof gtag !== 'undefined') {
      gtag('event', 'global_optimization_error', {
        event_category: 'System',
        event_label: 'initialization_failed',
        error_message: error.message
      });
    }
  }
};

// Ejecutar optimizaciones globales inmediatamente
initializeGlobalOptimizations();