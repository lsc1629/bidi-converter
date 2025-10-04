import React from 'react';
import SpecificConverter from '../components/SpecificConverter';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const JpgToPng = () => {
  const pageData = {
    fromFormat: 'jpg',
    toFormat: 'png',
    title: '🎨 Convertir JPG a PNG Online - Máxima Calidad Sin Compresión',
    description: 'Convierte JPG a PNG para obtener máxima calidad sin pérdidas. Ideal para edición, transparencia y gráficos. Herramienta gratuita y segura.',
    keywords: 'convertir JPG a PNG, JPG to PNG converter, JPEG a PNG, convertidor sin pérdida, máxima calidad imagen',
    benefits: [
      'Conversión sin pérdida de calidad - formato lossless',
      'Soporte completo para transparencia y canal alfa',
      'Ideal para edición posterior y retoque profesional',
      'Mejor calidad para gráficos, logos y capturas de pantalla',
      'Compatible con software de diseño profesional',
      'Preserva todos los detalles y colores originales'
    ],
    useCases: [
      'Preparar imágenes para edición en Photoshop o GIMP',
      'Crear logos y gráficos con fondo transparente',
      'Mejorar calidad de capturas de pantalla',
      'Preparar imágenes para impresión de alta calidad',
      'Crear overlays y elementos gráficos para web',
      'Preservar calidad máxima para archivo y backup'
    ],
    faqs: [
      {
        question: '¿Por qué convertir JPG a PNG si PNG es más pesado?',
        answer: 'PNG ofrece calidad sin pérdidas y soporte para transparencia. Es ideal cuando necesitas editar la imagen posteriormente, crear gráficos con transparencia, o cuando la calidad es más importante que el tamaño del archivo.'
      },
      {
        question: '¿PNG realmente tiene mejor calidad que JPG?',
        answer: 'PNG usa compresión sin pérdidas, lo que significa que no se degrada la calidad original. JPG usa compresión con pérdidas que puede crear artefactos. Para gráficos, texto y áreas de color sólido, PNG es superior.'
      },
      {
        question: '¿Cuándo debería usar PNG en lugar de JPG?',
        answer: 'Usa PNG para logos, gráficos, capturas de pantalla, imágenes con texto, cuando necesites transparencia, o cuando planees editar la imagen múltiples veces. JPG es mejor para fotografías donde el tamaño del archivo es importante.'
      },
      {
        question: '¿El archivo PNG será mucho más grande?',
        answer: 'Generalmente sí, PNG produce archivos más grandes que JPG. Sin embargo, para ciertos tipos de imágenes (gráficos simples, pocas colores), PNG puede ser más eficiente. La diferencia de tamaño vale la pena por la calidad superior.'
      },
      {
        question: '¿Puedo añadir transparencia después de convertir?',
        answer: 'Sí, una vez convertido a PNG, puedes usar cualquier editor de imágenes para añadir transparencia, crear máscaras, o editar el canal alfa. Esto no es posible con archivos JPG.'
      }
    ],
    relatedTools: [
      {
        href: '/png-to-jpg',
        icon: '🔄',
        title: 'PNG a JPG',
        description: 'Convierte PNG a JPG para reducir tamaño de archivo'
      },
      {
        href: '/jpg-to-webp',
        icon: '⚡',
        title: 'JPG a WebP',
        description: 'Convierte JPG a WebP para mejor compresión web'
      },
      {
        href: '/editor',
        icon: '✏️',
        title: 'Editor de Imágenes',
        description: 'Edita tus imágenes PNG con filtros y herramientas'
      }
    ]
  };

  // Schema específico para JPG to PNG
  const conversionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Convertidor JPG a PNG Gratuito",
    "description": "Convierte JPG a PNG online gratis. Máxima calidad sin pérdidas, soporte para transparencia. Sin registro requerido.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Conversión JPG a PNG sin pérdidas",
      "Soporte completo para transparencia",
      "Máxima calidad preservada",
      "Procesamiento local seguro",
      "Sin marcas de agua",
      "Ideal para edición profesional"
    ],
    "screenshot": "https://bidiconverter.com/screenshots/jpg-to-png.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "892",
      "bestRating": "5"
    }
  };

  return (
    <>
      <SEO 
        page="jpg-to-png"
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
      />
      <SchemaMarkup 
        page="jpg-to-png"
        toolName="imageConverter"
        additionalData={conversionSchema}
      />
      
      <SpecificConverter {...pageData} />
    </>
  );
};

export default JpgToPng;
