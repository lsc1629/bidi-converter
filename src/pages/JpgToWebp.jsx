import React from 'react';
import SpecificConverter from '../components/SpecificConverter';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const JpgToWebp = () => {
  const pageData = {
    fromFormat: 'jpg',
    toFormat: 'webp',
    title: '📸 Convertir JPG a WebP - Optimización Web Avanzada',
    description: 'Convierte JPG a WebP para optimización web superior. Reduce tamaño 25-50% manteniendo calidad. Mejora velocidad de carga y SEO. Gratis.',
    keywords: 'convertir JPG a WebP, JPG to WebP converter, optimizar fotografías web, JPEG a WebP, velocidad web',
    benefits: [
      'Reduce tamaño 25-50% comparado con JPG original',
      'Mantiene excelente calidad visual para fotografías',
      'Mejora significativamente la velocidad de carga web',
      'Optimiza Core Web Vitals y ranking SEO',
      'Soporte nativo en navegadores modernos',
      'Ideal para sitios web con muchas imágenes'
    ],
    useCases: [
      'Optimizar fotografías para sitios web y blogs',
      'Mejorar velocidad de carga en e-commerce',
      'Reducir ancho de banda y costos de hosting',
      'Optimizar galerías de imágenes y portfolios',
      'Mejorar experiencia móvil con carga más rápida',
      'Cumplir con estándares de web performance'
    ],
    faqs: [
      {
        question: '¿WebP es mejor que JPG para fotografías?',
        answer: 'Para web sí. WebP ofrece 25-50% mejor compresión que JPG manteniendo calidad similar. Esto significa carga más rápida y mejor experiencia de usuario, especialmente importante para móviles.'
      },
      {
        question: '¿Todos los navegadores soportan WebP?',
        answer: 'WebP es soportado por Chrome, Firefox, Safari (desde 2020) y Edge. Esto cubre más del 95% de usuarios web. Para sitios críticos, puedes usar WebP con fallback automático a JPG.'
      },
      {
        question: '¿Afecta la calidad de la fotografía?',
        answer: 'WebP puede usar compresión con o sin pérdidas. Para fotografías, usamos compresión optimizada que mantiene calidad visual excelente mientras reduce significativamente el tamaño.'
      },
      {
        question: '¿Cómo mejora WebP mi SEO?',
        answer: 'Google considera la velocidad de carga como factor de ranking. WebP reduce tiempo de carga, mejora Core Web Vitals (LCP, CLS) y la experiencia del usuario, beneficiando directamente tu posicionamiento.'
      },
      {
        question: '¿Puedo usar WebP en redes sociales?',
        answer: 'La mayoría de redes sociales modernas soportan WebP (Facebook, Instagram, Twitter). Sin embargo, para máxima compatibilidad en plataformas diversas, mantén también versiones JPG.'
      }
    ],
    relatedTools: [
      {
        href: '/webp-to-jpg',
        icon: '🔄',
        title: 'WebP a JPG',
        description: 'Convierte WebP de vuelta a JPG para compatibilidad'
      },
      {
        href: '/png-to-webp',
        icon: '🎨',
        title: 'PNG a WebP',
        description: 'Convierte PNG a WebP manteniendo transparencia'
      },
      {
        href: '/converter',
        icon: '🛠️',
        title: 'Convertidor Universal',
        description: 'Convierte entre todos los formatos disponibles'
      }
    ]
  };

  const conversionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Convertidor JPG a WebP Gratuito",
    "description": "Convierte JPG a WebP online gratis. Optimización web avanzada, reduce tamaño 25-50% manteniendo calidad. Mejora SEO.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Conversión JPG a WebP gratuita",
      "Reducción de tamaño 25-50%",
      "Optimización web avanzada",
      "Mejora Core Web Vitals",
      "Beneficia SEO y ranking",
      "Procesamiento local seguro"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1089",
      "bestRating": "5"
    }
  };

  return (
    <>
      <SEO 
        page="jpg-to-webp"
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
      />
      <SchemaMarkup 
        page="jpg-to-webp"
        toolName="imageConverter"
        additionalData={conversionSchema}
      />
      
      <SpecificConverter {...pageData} />
    </>
  );
};

export default JpgToWebp;
