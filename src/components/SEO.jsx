import { useEffect } from 'react';

const SEO = ({ page = 'home' }) => {
  useEffect(() => {
    // Update document title based on page
    const titles = {
      home: 'Bidi Converter - Convertir Imágenes y Visualizar Documentos Online Gratis',
      converter: 'Convertir Imágenes Online Gratis - PNG, JPG, WebP, GIF | Bidi Converter',
      viewer: 'Visualizar Documentos Online - PDF, Word, Excel | Bidi Converter'
    };
    
    document.title = titles[page] || titles.home;
    
    // Update meta description
    const descriptions = {
      home: 'Herramienta gratuita para convertir imágenes (PNG, JPG, WebP, GIF) y visualizar documentos (PDF, Word, Excel) online. Rápido, seguro y sin registro.',
      converter: 'Convierte imágenes entre formatos PNG, JPG, WebP, GIF y BMP de forma gratuita. Procesamiento rápido y seguro en tu navegador.',
      viewer: 'Visualiza documentos PDF, Word (DOCX) y Excel (XLSX) directamente en tu navegador. Herramienta gratuita y segura.'
    };
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[page] || descriptions.home);
    }
    
    // Update document lang
    document.documentElement.lang = 'es';
  }, [page]);

  return null;
};

export default SEO;