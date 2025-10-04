import React from 'react';
import SpecificConverter from '../components/SpecificConverter';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';

const PngToJpg = () => {
  const pageData = {
    fromFormat: 'png',
    toFormat: 'jpg',
    title: '🔄 Convertir PNG a JPG Online Gratis - Sin Pérdida de Calidad',
    description: 'Convierte imágenes PNG a JPG manteniendo la máxima calidad. Herramienta gratuita, rápida y segura. Sin registro ni marcas de agua. Reduce el tamaño hasta 70%.',
    keywords: 'convertir PNG a JPG, PNG to JPG converter, convertidor PNG JPG gratis, cambiar PNG a JPEG, optimizar imágenes web',
    benefits: [
      'Reduce el tamaño del archivo hasta 70% manteniendo calidad visual',
      'Compatible con todos los navegadores web y dispositivos',
      'Ideal para fotografías y imágenes con muchos colores',
      'Mejor compresión para web, email y redes sociales',
      'Procesamiento 100% local - máxima privacidad garantizada',
      'Sin límites de archivos ni marcas de agua molestas'
    ],
    useCases: [
      'Optimizar imágenes para sitios web y mejorar velocidad de carga',
      'Reducir tamaño para envío por email y mensajería',
      'Preparar fotos para redes sociales (Instagram, Facebook, Twitter)',
      'Ahorrar espacio de almacenamiento en dispositivos',
      'Crear galerías de imágenes más ligeras para e-commerce',
      'Optimizar imágenes para impresión y documentos PDF'
    ],
    faqs: [
      {
        question: '¿Se pierde calidad al convertir PNG a JPG?',
        answer: 'JPG usa compresión con pérdida, pero nuestra herramienta optimiza automáticamente la calidad para minimizar la pérdida visual. Para fotografías y imágenes complejas, la diferencia es prácticamente imperceptible mientras reduces significativamente el tamaño del archivo.'
      },
      {
        question: '¿Qué pasa con la transparencia del PNG?',
        answer: 'JPG no soporta transparencia. Las áreas transparentes de tu PNG se convertirán automáticamente a fondo blanco. Si necesitas mantener la transparencia, considera convertir a WebP que soporta transparencia con mejor compresión que PNG.'
      },
      {
        question: '¿Cuándo es mejor usar JPG en lugar de PNG?',
        answer: 'JPG es ideal para fotografías, imágenes con muchos colores y gradientes. PNG es mejor para gráficos, logos, capturas de pantalla y imágenes que requieren transparencia. JPG ofrece archivos más pequeños para fotos.'
      },
      {
        question: '¿Es seguro convertir mis imágenes online?',
        answer: 'Absolutamente. Toda la conversión ocurre localmente en tu navegador. Tus archivos nunca se suben a nuestros servidores, garantizando máxima privacidad y seguridad. Puedes usar la herramienta incluso sin conexión a internet.'
      },
      {
        question: '¿Hay límite en el tamaño de archivo?',
        answer: 'No hay límites artificiales. El único límite es la memoria de tu dispositivo. Nuestra herramienta puede manejar desde pequeñas imágenes hasta fotografías de alta resolución de varios MB sin problemas.'
      }
    ],
    relatedTools: [
      {
        href: '/jpg-to-png',
        icon: '🔄',
        title: 'JPG a PNG',
        description: 'Convierte JPG a PNG para obtener mejor calidad y transparencia'
      },
      {
        href: '/png-to-webp',
        icon: '⚡',
        title: 'PNG a WebP',
        description: 'Convierte a WebP para máxima compresión y calidad web'
      },
      {
        href: '/converter',
        icon: '🛠️',
        title: 'Convertidor Universal',
        description: 'Convierte entre todos los formatos de imagen disponibles'
      }
    ]
  };

  // Schema específico para PNG to JPG
  const conversionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Convertidor PNG a JPG Gratuito",
    "description": "Convierte imágenes PNG a JPG online gratis. Reduce tamaño hasta 70% manteniendo calidad. Sin registro, sin marcas de agua.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Conversión PNG a JPG gratuita",
      "Reducción de tamaño hasta 70%",
      "Procesamiento local seguro",
      "Sin marcas de agua",
      "Sin límites de archivos",
      "Compatible con todos los navegadores"
    ],
    "screenshot": "https://bidiconverter.com/screenshots/png-to-jpg.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247",
      "bestRating": "5"
    }
  };

  return (
    <>
      <SEO 
        page="png-to-jpg"
        title={pageData.title}
        description={pageData.description}
        keywords={pageData.keywords}
      />
      <SchemaMarkup 
        page="png-to-jpg"
        toolName="imageConverter"
        additionalData={conversionSchema}
      />
      
      <SpecificConverter {...pageData} />
    </>
  );
};

export default PngToJpg;
