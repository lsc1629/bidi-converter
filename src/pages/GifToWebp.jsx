import React from 'react';
import SpecificConverter from '../components/SpecificConverter';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const GifToWebp = () => {
  const pageData = {
    fromFormat: 'gif',
    toFormat: 'webp',
    title: '🎬 Convertir GIF a WebP - Animaciones Más Ligeras y Rápidas',
    description: 'Convierte GIF a WebP animado para reducir tamaño hasta 90%. Mantiene animación con calidad superior. Ideal para web moderna. Gratis y fácil.',
    keywords: 'convertir GIF a WebP, GIF to WebP converter, animaciones WebP, optimizar GIF, reducir tamaño GIF',
    benefits: [
      'Reduce tamaño hasta 90% comparado con GIF original',
      'Mantiene animación perfectamente con mejor calidad',
      'Soporte para millones de colores vs 256 de GIF',
      'Carga más rápida en web y aplicaciones móviles',
      'Mejor compresión que GIF con calidad superior',
      'Ideal para memes, animaciones y contenido dinámico'
    ],
    useCases: [
      'Optimizar memes y GIFs para redes sociales',
      'Reducir peso de animaciones en sitios web',
      'Mejorar carga de contenido animado en móviles',
      'Crear animaciones de alta calidad para marketing',
      'Optimizar banners animados y publicidad',
      'Reducir ancho de banda en plataformas de contenido'
    ],
    faqs: [
      {
        question: '¿WebP soporta animaciones como GIF?',
        answer: 'Sí, WebP soporta animaciones con calidad muy superior a GIF. Puede mostrar millones de colores (vs 256 de GIF) y ofrece mejor compresión, resultando en archivos más pequeños con mejor calidad visual.'
      },
      {
        question: '¿Todos los navegadores reproducen WebP animado?',
        answer: 'WebP animado es soportado por Chrome, Firefox, Safari (desde 2021) y Edge. Esto cubre más del 90% de usuarios. Para máxima compatibilidad, puedes usar WebP con fallback a GIF.'
      },
      {
        question: '¿Se mantiene la velocidad de animación?',
        answer: 'Absolutamente. WebP preserva exactamente la velocidad de fotogramas (FPS) y duración de la animación original. La única diferencia es el tamaño mucho menor del archivo.'
      },
      {
        question: '¿Por qué WebP es mejor que GIF para animaciones?',
        answer: 'WebP ofrece mejor compresión (archivos 50-90% más pequeños), soporte para millones de colores, mejor calidad visual, y transparencia mejorada. Es el futuro de las animaciones web.'
      },
      {
        question: '¿Puedo convertir GIFs largos o de alta resolución?',
        answer: 'Sí, nuestra herramienta maneja GIFs de cualquier duración y resolución. Los GIFs más grandes se benefician especialmente de la conversión a WebP por la reducción dramática de tamaño.'
      }
    ],
    relatedTools: [
      {
        href: '/webp-to-gif',
        icon: '🔄',
        title: 'WebP a GIF',
        description: 'Convierte WebP animado de vuelta a GIF'
      },
      {
        href: '/gif-to-mp4',
        icon: '🎥',
        title: 'GIF a MP4',
        description: 'Convierte GIF a video MP4 para máxima compresión'
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
    "name": "Convertidor GIF a WebP Gratuito",
    "description": "Convierte GIF a WebP animado online gratis. Reduce tamaño hasta 90% manteniendo animación y calidad superior.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Conversión GIF a WebP animado",
      "Reducción de tamaño hasta 90%",
      "Mantiene animación perfecta",
      "Soporte millones de colores",
      "Calidad superior a GIF",
      "Procesamiento local seguro"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "567",
      "bestRating": "5"
    }
  };

  return (
    <>
      <SEO 
        page="gif-to-webp"
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
      />
      <SchemaMarkup 
        page="gif-to-webp"
        toolName="imageConverter"
        additionalData={conversionSchema}
      />
      
      <SpecificConverter {...pageData} />
    </>
  );
};

export default GifToWebp;
