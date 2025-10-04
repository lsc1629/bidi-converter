import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Componente de debug para mostrar información de detección de idioma
 * Solo visible en desarrollo o cuando se activa manualmente
 */
const LanguageDebugger = ({ show = false }) => {
  const { language, detectedMarket, isLoading } = useLanguage();
  const [debugInfo, setDebugInfo] = useState({});
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    // Recopilar información de debug
    const collectDebugInfo = () => {
      const browserLanguage = navigator.language || navigator.languages[0];
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const languages = navigator.languages || [];
      
      const info = {
        // Información del navegador
        browserLanguage,
        allLanguages: languages,
        languageCode: browserLanguage.split('-')[0],
        countryCode: browserLanguage.split('-')[1],
        
        // Información de timezone
        timezone,
        
        // Información detectada
        detectedLanguage: language,
        detectedMarket: detectedMarket?.code || 'none',
        marketName: detectedMarket?.name || 'none',
        
        // Información guardada
        savedLanguage: localStorage.getItem('language'),
        savedMarket: localStorage.getItem('detectedMarket'),
        
        // Información adicional
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        isLoading
      };
      
      setDebugInfo(info);
    };

    collectDebugInfo();
    
    // Actualizar cada 2 segundos
    const interval = setInterval(collectDebugInfo, 2000);
    
    return () => clearInterval(interval);
  }, [language, detectedMarket, isLoading]);

  // Función para forzar detección
  const forceDetection = async () => {
    console.log('🔄 Forcing language detection...');
    
    // Limpiar localStorage
    localStorage.removeItem('language');
    localStorage.removeItem('detectedMarket');
    
    // Recargar la página para forzar nueva detección
    window.location.reload();
  };

  // Función para establecer idioma manualmente
  const setLanguageManually = (lang) => {
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm shadow-lg hover:bg-blue-700"
          title="Mostrar debug de idioma"
        >
          🌍 Debug
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-md max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">🌍 Language Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 text-sm">
        {/* Estado actual */}
        <div className="bg-blue-50 p-3 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">Estado Actual</h4>
          <div className="space-y-1">
            <div><strong>Idioma:</strong> <span className="text-blue-600">{debugInfo.detectedLanguage}</span></div>
            <div><strong>Mercado:</strong> <span className="text-blue-600">{debugInfo.marketName} ({debugInfo.detectedMarket})</span></div>
            <div><strong>Cargando:</strong> <span className={debugInfo.isLoading ? 'text-orange-600' : 'text-green-600'}>{debugInfo.isLoading ? 'Sí' : 'No'}</span></div>
          </div>
        </div>

        {/* Información del navegador */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-semibold text-gray-800 mb-2">Navegador</h4>
          <div className="space-y-1">
            <div><strong>Idioma principal:</strong> {debugInfo.browserLanguage}</div>
            <div><strong>Código idioma:</strong> {debugInfo.languageCode}</div>
            <div><strong>Código país:</strong> {debugInfo.countryCode || 'No detectado'}</div>
            <div><strong>Todos los idiomas:</strong> {debugInfo.allLanguages?.join(', ')}</div>
          </div>
        </div>

        {/* Información de ubicación */}
        <div className="bg-green-50 p-3 rounded">
          <h4 className="font-semibold text-green-800 mb-2">Ubicación</h4>
          <div className="space-y-1">
            <div><strong>Timezone:</strong> {debugInfo.timezone}</div>
            <div><strong>Plataforma:</strong> {debugInfo.platform}</div>
          </div>
        </div>

        {/* Información guardada */}
        <div className="bg-yellow-50 p-3 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">Guardado</h4>
          <div className="space-y-1">
            <div><strong>Idioma guardado:</strong> {debugInfo.savedLanguage || 'Ninguno'}</div>
            <div><strong>Mercado guardado:</strong> {debugInfo.savedMarket ? JSON.parse(debugInfo.savedMarket).name : 'Ninguno'}</div>
          </div>
        </div>

        {/* Diagnóstico para Chile */}
        {debugInfo.timezone === 'America/Santiago' && (
          <div className="bg-red-50 p-3 rounded border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">🇨🇱 Diagnóstico Chile</h4>
            <div className="space-y-1 text-red-700">
              <div>✅ Timezone Chile detectado: {debugInfo.timezone}</div>
              <div>
                {debugInfo.languageCode === 'es' ? '✅' : '❌'} 
                Idioma español: {debugInfo.languageCode}
              </div>
              <div>
                {debugInfo.detectedLanguage === 'es' ? '✅' : '❌'} 
                Idioma final: {debugInfo.detectedLanguage}
              </div>
              {debugInfo.detectedLanguage !== 'es' && (
                <div className="mt-2 p-2 bg-red-100 rounded">
                  <strong>⚠️ Problema detectado:</strong> Debería mostrar español para Chile
                </div>
              )}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="space-y-2">
          <button
            onClick={forceDetection}
            className="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700"
          >
            🔄 Forzar Nueva Detección
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguageManually('es')}
              className="bg-green-600 text-white py-1 px-2 rounded text-xs hover:bg-green-700"
            >
              🇪🇸 Español
            </button>
            <button
              onClick={() => setLanguageManually('en')}
              className="bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700"
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* Información técnica */}
        <details className="text-xs">
          <summary className="cursor-pointer font-semibold">Información Técnica</summary>
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <div><strong>User Agent:</strong></div>
            <div className="break-all">{debugInfo.userAgent}</div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default LanguageDebugger;
