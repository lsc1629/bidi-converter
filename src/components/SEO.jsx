import { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../hooks/useLanguage';

const SEO = ({ page = 'home' }) => {
  const { t, language } = useTranslation();
  const { changeLanguage } = useLanguage();

  const seoData = {
    title: t(`seo.${page}.title`),
    description: t(`seo.${page}.description`),
    keywords: t(`seo.${page}.keywords`)
  };

  const baseUrl = 'https://bidiconverter.com';
  const currentUrl = `${baseUrl}${page === 'home' ? '' : `/${page === 'converter' ? 'image-converter' : 'document-viewer'}`}`;
  
  // Generate alternate URLs for hreflang
  const alternateUrls = {
    es: `${currentUrl}?lang=es`,
    en: `${currentUrl}?lang=en`
  };

  useEffect(() => {
    // Update document title
    document.title = seoData.title;
    
    // Update meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Bidi Converter');
    updateMetaTag('language', language);
    
    // Open Graph meta tags
    updateMetaTag('og:title', seoData.title, 'property');
    updateMetaTag('og:description', seoData.description, 'property');
    updateMetaTag('og:url', alternateUrls[language], 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:locale', language === 'es' ? 'es_ES' : 'en_US', 'property');
    updateMetaTag('og:site_name', 'Bidi Converter', 'property');
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoData.title);
    updateMetaTag('twitter:description', seoData.description);
    
    // Remove existing hreflang and canonical links
    document.querySelectorAll('link[rel="alternate"], link[rel="canonical"]').forEach(link => {
      link.remove();
    });
    
    // Add canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = alternateUrls[language];
    document.head.appendChild(canonical);
    
    // Add hreflang links
    Object.entries(alternateUrls).forEach(([lang, url]) => {
      const hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = lang;
      hreflang.href = url;
      document.head.appendChild(hreflang);
    });
    
    // Add x-default hreflang (English as default)
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = alternateUrls.en;
    document.head.appendChild(xDefault);
    
    // Update document language
    document.documentElement.lang = language;
    
  }, [seoData, language, alternateUrls]);

  return null;
};

export default SEO;