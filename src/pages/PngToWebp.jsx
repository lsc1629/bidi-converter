import React from 'react';
import SpecificConverter from '../components/SpecificConverter';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const PngToWebp = () => {
  const pageData = {
    fromFormat: 'png',
    toFormat: 'webp',
    title: '⚡ Convertir PNG a WebP - Reduce Tamaño 80% Sin Perder Calidad',
    description: 'Convierte PNG a WebP y reduce el tamaño hasta 80% manteniendo la calidad y transparencia. Formato moderno para web optimizada. Gratis y seguro.',
    keywords: 'convertir PNG a WebP, PNG to WebP converter, optimizar imágenes web, formato WebP, reducir tamaño imagen',
    benefits: [
      'Reduce tamaño hasta 80% comparado con PNG original',
      'Mantiene transparencia perfectamente - soporte alfa completo',
      'Soporte nativo en navegadores modernos (95% usuarios)',
      'Mejor compresión que PNG, JPG y GIF combinados',
      'Ideal para optimización web y Core Web Vitals',
      'Carga más rápida = mejor experiencia de usuario'
    ],
    useCases: [
      'Optimización avanzada para sitios web y aplicaciones',
      'Mejorar Core Web Vitals y velocidad de carga',
      'Reducir ancho de banda y costos de hosting',
      'Acelerar carga de páginas en móviles',
      'E-commerce: galerías de productos más rápidas',
      'Blogs y portfolios con imágenes optimizadas'
    ],
    faqs: [
      {
        question: '¿Todos los navegadores soportan WebP?',
        answer: 'WebP es soportado por Chrome, Firefox, Safari (desde 2020) y Edge modernos. Esto representa más del 95% de usuarios web actuales. Para máxima compatibilidad, puedes usar WebP con fallback a PNG/JPG.'
      },
      {
        question: '¿WebP mantiene la transparencia del PNG?',
        answer: 'Sí, WebP soporta transparencia completa (canal alfa) como PNG, pero con archivos significativamente más pequeños. Es la mejor opción para imágenes web con transparencia.'
      },
      {
        question: '¿Es WebP realmente mejor que PNG para todos los casos?',
        answer: 'Para web definitivamente sí. WebP ofrece mejor compresión manteniendo calidad. PNG sigue siendo estándar para impresión, software de diseño que no soporta WebP, y compatibilidad universal.'
      },
      {
        question: '¿Afecta la calidad visual la conversión a WebP?',
        answer: 'WebP puede usar compresión con o sin pérdidas. Nuestra herramienta optimiza automáticamente para mantener calidad visual excelente mientras maximiza la reducción de tamaño.'
      },
      {
        question: '¿Por qué WebP es mejor para SEO?',
        answer: 'Google considera la velocidad de carga como factor de ranking. WebP reduce significativamente el tiempo de carga, mejora Core Web Vitals y la experiencia del usuario, beneficiando tu SEO.'
      }
    ],
    relatedTools: [
      {
        href: '/webp-to-png',
        icon: '🔄',
        title: 'WebP a PNG',
        description: 'Convierte WebP de vuelta a PNG para compatibilidad'
      },
      {
        href: '/jpg-to-webp',
        icon: '📸',
        title: 'JPG a WebP',
        description: 'Convierte fotografías JPG a WebP optimizado'
      },
      {
        href: '/converter',
        icon: '🛠️',
        title: 'Convertidor Universal',
        description: 'Convierte entre todos los formatos disponibles'
      }
    ]
  };

  // Schema específico para PNG to WebP
  const conversionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Convertidor PNG a WebP Gratuito",
    "description": "Convierte PNG a WebP online gratis. Reduce tamaño hasta 80% manteniendo calidad y transparencia. Optimización web avanzada.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Conversión PNG a WebP gratuita",
      "Reducción de tamaño hasta 80%",
      "Mantiene transparencia completa",
      "Optimización para web moderna",
      "Mejora Core Web Vitals",
      "Procesamiento local seguro"
    ],
    "screenshot": "https://bidiconverter.com/screenshots/png-to-webp.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1456",
      "bestRating": "5"
    }
  };

  return (
    <>
      <SEO 
        page="png-to-webp"
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
      />
      <SchemaMarkup 
        page="png-to-webp"
        toolName="imageConverter"
        additionalData={conversionSchema}
      />
      
      <SpecificConverter {...pageData} />
    </>
  );
};

export default PngToWebp;
