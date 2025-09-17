import { useState, useEffect } from 'react'

// Función para detectar si el usuario está en LATAM o España
const detectRegion = () => {
  // Países de LATAM y España donde mostraremos español
  const spanishSpeakingCountries = [
    'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GT', 
    'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
  ]
  
  // Intentar obtener el país del usuario usando la API de geolocalización del navegador
  const browserLanguage = navigator.language || navigator.languages[0]
  const countryCode = browserLanguage.split('-')[1]
  
  // Si tenemos código de país y está en la lista de países hispanohablantes
  if (countryCode && spanishSpeakingCountries.includes(countryCode.toUpperCase())) {
    return 'es'
  }
  
  // Si el idioma del navegador es español (sin importar el país)
  if (browserLanguage.toLowerCase().startsWith('es')) {
    return 'es'
  }
  
  // Por defecto, inglés para el mercado internacional
  return 'en'
}

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    // Obtener idioma guardado o detectar automáticamente
    const savedLanguage = localStorage.getItem('bidi-converter-language')
    if (savedLanguage) {
      return savedLanguage
    }
    
    // Detectar región automáticamente
    return detectRegion()
  })

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('bidi-converter-language', newLanguage)
  }

  useEffect(() => {
    // Actualizar el atributo lang del documento
    document.documentElement.lang = language
  }, [language])

  return {
    language,
    changeLanguage
  }
}
