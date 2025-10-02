import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../hooks/useTranslation';

const SEO = ({ page }) => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Obtener año actual dinámicamente
    const currentYear = new Date().getFullYear();
    
    // SEO data for each page
    
    const seoData = {
      home: {
        title: `🚀 Convertidor GRATIS: Imágenes + PDF Viewer | Sin Registro ${currentYear}`,
        description: 'Convierte imágenes entre JPG, PNG, GIF, WebP y visualiza documentos Word, Excel y PDF directamente en tu navegador. Herramienta gratuita, rápida y segura sin registro.',
        keywords: 'convertidor imágenes, visor documentos, JPG a PNG, PDF viewer, Word online, Excel viewer, convertir imágenes gratis, herramientas online'
      },
      converter: {
        title: `⚡ Convertir Imágenes GRATIS: PNG→JPG en 3 Segundos | Bidi Converter ${currentYear}`,
        description: 'Convierte tus imágenes entre diferentes formatos: JPG, PNG, WebP, GIF, BMP. Procesamiento rápido y seguro en tu navegador sin subir archivos.',
        keywords: 'convertir imágenes, JPG a PNG, PNG a WebP, GIF a JPG, convertidor online, cambiar formato imagen'
      },
      viewer: {
        title: 'Visor de Documentos Online - PDF, Word, Excel Gratuito',
        description: 'Visualiza documentos PDF, Word (DOCX) y Excel (XLSX) directamente en tu navegador. Visor seguro y privado sin necesidad de software adicional.',
        keywords: 'visor PDF, abrir Word online, visualizar Excel, lector documentos, visor archivos online'
      },
      transcriber: {
        title: `🎤 Transcriptor de Audio GRATIS - Voz a Texto Online ${currentYear}`,
        description: 'Convierte audio a texto con reconocimiento de voz avanzado. Soporte múltiples idiomas, exporta en TXT, HTML, Markdown y JSON. Procesamiento local seguro.',
        keywords: 'transcriptor audio, voz a texto, speech to text, reconocimiento voz, transcribir audio gratis, audio to text español'
      },
      privacy: {
        title: 'Política de Privacidad - Bidi Converter',
        description: 'Conoce cómo protegemos tu privacidad en Bidi Converter. Procesamiento local de archivos, sin almacenamiento en servidores, máxima seguridad garantizada.',
        keywords: 'política privacidad, protección datos, seguridad archivos, procesamiento local'
      },
      terms: {
        title: 'Términos de Servicio - Bidi Converter',
        description: 'Lee los términos y condiciones de uso de Bidi Converter. Conoce tus derechos y responsabilidades al utilizar nuestro servicio gratuito.',
        keywords: 'términos servicio, condiciones uso, derechos usuario, responsabilidades'
      },
      contact: {
        title: 'Contacto - Soporte y Ayuda | Bidi Converter',
        description: 'Contáctanos para resolver dudas sobre conversión de archivos. Soporte técnico profesional, respuesta en 24 horas. Email, teléfono y formulario disponible.',
        keywords: 'contacto, soporte técnico, ayuda, servicio cliente, resolver problemas'
      },
      about: {
        title: 'Acerca de Nosotros - Historia y Misión | Bidi Converter',
        description: 'Conoce la historia de Bidi Converter, nuestro equipo y misión. Comprometidos con la privacidad, calidad y accesibilidad en herramientas de conversión.',
        keywords: 'acerca de, historia empresa, equipo, misión, valores, compromiso privacidad'
      },
      blog: {
        title: 'Blog y Guías - Consejos sobre Formatos de Archivo | Bidi Converter',
        description: 'Aprende sobre formatos de imagen, optimización de archivos y mejores prácticas. Guías completas sobre JPG, PNG, WebP, PDF y más.',
        keywords: 'blog, guías, formatos archivo, optimización imágenes, consejos técnicos, tutoriales'
      },
      editor: {
        title: 'Editor de Imágenes Online Gratuito - Filtros, Recorte, Rotación',
        description: 'Edita imágenes online con filtros profesionales, recorte, rotación y ajustes de brillo/contraste. Editor gratuito sin marcas de agua, procesamiento local.',
        keywords: 'editor imágenes online, filtros imagen, recortar imagen, rotar imagen, editor gratuito, ajustar brillo contraste'
      },
      devtools: {
        title: 'Herramientas para Desarrolladores - Base64, Favicons, CSS Sprites',
        description: 'Herramientas especializadas para desarrolladores web: convertir a Base64, generar favicons, crear CSS sprites y código responsive. Todo gratis y local.',
        keywords: 'herramientas desarrolladores, base64 encoder, favicon generator, css sprites, código responsive, dev tools'
      }
    };
    
    const currentSEO = seoData[page] || seoData.home;
    
    // Update document title
    document.title = currentSEO.title;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = currentSEO.description;
      document.head.appendChild(metaDescription);
    }
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = currentSEO.keywords;
      document.head.appendChild(metaKeywords);
    }
    
    // Update or create Open Graph tags
    const ogTags = [
      { property: 'og:title', content: currentSEO.title },
      { property: 'og:description', content: currentSEO.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Bidi Converter' },
      { property: 'og:image', content: '/og-image.jpg' }
    ];
    
    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute('property', tag.property);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      }
    });
    
    // Update or create Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: currentSEO.title },
      { name: 'twitter:description', content: currentSEO.description },
      { name: 'twitter:image', content: '/og-image.jpg' }
    ];
    
    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute('name', tag.name);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      }
    });
    
    // Update document lang
    document.documentElement.lang = language || 'es';
    
    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.href);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', window.location.href);
      document.head.appendChild(canonicalLink);
    }
    
  }, [page, language, t]);

  return null;
};

export default SEO;