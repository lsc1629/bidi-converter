import { useLanguage } from './useLanguage';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

const translations = {
  es: esTranslations,
  en: enTranslations
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
};