import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../hooks/useTranslation';

const SEO = ({ page = 'home' }) => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Update document title based on page
    const titles = {
      home: t('seo.home.title'),
      converter: t('seo.converter.title'),
      viewer: t('seo.viewer.title')
    };
    
    document.title = titles[page] || titles.home;
    
    // Update meta description
    const descriptions = {
      home: t('seo.home.description'),
      converter: t('seo.converter.description'),
      viewer: t('seo.viewer.description')
    };
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[page] || descriptions.home);
    }
    
    // Update document lang
    document.documentElement.lang = language;
  }, [page, language, t]);

  return null;
};

export default SEO;