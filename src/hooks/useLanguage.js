import { useState, useEffect } from 'react';

// Language detection based on geolocation and browser preferences
const detectLanguage = () => {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && ['es', 'en'].includes(urlLang)) {
    return urlLang;
  }

  // Check localStorage
  const savedLang = localStorage.getItem('bidi-converter-lang');
  if (savedLang && ['es', 'en'].includes(savedLang)) {
    return savedLang;
  }

  // Detect from browser language
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0];
  
  // Default to English for international users, Spanish for Spanish speakers
  if (langCode === 'es') {
    return 'es';
  }
  
  return 'en'; // Default to English for better international reach
};

export const useLanguage = () => {
  const [language, setLanguage] = useState(() => detectLanguage());

  useEffect(() => {
    // Save language preference
    localStorage.setItem('bidi-converter-lang', language);
    
    // Update document lang attribute for SEO
    document.documentElement.lang = language;
    
    // Update URL without reload for better UX
    const url = new URL(window.location);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url);
  }, [language]);

  const changeLanguage = (newLang) => {
    if (['es', 'en'].includes(newLang)) {
      setLanguage(newLang);
    }
  };

  return { language, changeLanguage };
};