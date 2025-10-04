import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

/**
 * Componente principal PWA con funcionalidades offline
 */
export const PWAWrapper = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`pwa-wrapper ${!isOnline ? 'offline' : ''}`}>
      {!isOnline && <OfflineIndicator />}
      {showInstallBanner && <InstallBanner onDismiss={() => setShowInstallBanner(false)} />}
      {children}
    </div>
  );
};

/**
 * Indicador de estado offline
 */
export const OfflineIndicator = () => {
  const { language } = useLanguage();
  
  const messages = {
    es: 'Sin conexión - Trabajando offline',
    en: 'Offline - Working offline',
    pt: 'Offline - Trabalhando offline',
    hi: 'ऑफलाइन - ऑफलाइन काम कर रहा है',
    id: 'Offline - Bekerja offline',
    ru: 'Офлайн - Работает офлайн',
    ko: '오프라인 - 오프라인으로 작업 중'
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 z-50">
      <span className="text-sm font-medium">
        📡 {messages[language] || messages.en}
      </span>
    </div>
  );
};

/**
 * Banner de instalación PWA
 */
export const InstallBanner = ({ onDismiss }) => {
  const { language } = useLanguage();
  
  const messages = {
    es: {
      title: 'Instalar App',
      subtitle: 'Acceso rápido y uso sin conexión',
      install: 'Instalar',
      dismiss: 'Ahora no'
    },
    en: {
      title: 'Install App',
      subtitle: 'Fast access and offline use',
      install: 'Install',
      dismiss: 'Not now'
    },
    hi: {
      title: 'ऐप इंस्टॉल करें',
      subtitle: 'तेज़ एक्सेस और ऑफलाइन उपयोग',
      install: 'इंस्टॉल करें',
      dismiss: 'अभी नहीं'
    },
    id: {
      title: 'Install App',
      subtitle: 'Akses cepat dan penggunaan offline',
      install: 'Install',
      dismiss: 'Nanti saja'
    },
    ru: {
      title: 'Установить приложение',
      subtitle: 'Быстрый доступ и работа офлайн',
      install: 'Установить',
      dismiss: 'Не сейчас'
    },
    ko: {
      title: '앱 설치',
      subtitle: '빠른 접근과 오프라인 사용',
      install: '설치',
      dismiss: '나중에'
    }
  };

  const msg = messages[language] || messages.en;

  const handleInstall = () => {
    if (window.pwaManager) {
      window.pwaManager.promptInstall();
    }
    onDismiss();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl z-50 animate-slide-up">
      <div className="flex items-center p-4">
        <div className="text-2xl mr-3">📱</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{msg.title}</div>
          <div className="text-xs opacity-90">{msg.subtitle}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            {msg.install}
          </button>
          <button
            onClick={onDismiss}
            className="text-white/70 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente de herramientas offline
 */
export const OfflineTools = () => {
  const { language } = useLanguage();
  
  const offlineTools = [
    {
      id: 'image-converter',
      icon: '🖼️',
      name: {
        es: 'Convertir Imágenes',
        en: 'Convert Images',
        hi: 'इमेज कन्वर्ट करें',
        id: 'Konversi Gambar',
        ru: 'Конвертировать изображения',
        ko: '이미지 변환'
      }
    },
    {
      id: 'password-generator',
      icon: '🔐',
      name: {
        es: 'Generar Contraseña',
        en: 'Generate Password',
        hi: 'पासवर्ड जेनरेट करें',
        id: 'Buat Password',
        ru: 'Генератор паролей',
        ko: '비밀번호 생성'
      }
    },
    {
      id: 'unit-converter',
      icon: '📏',
      name: {
        es: 'Convertir Unidades',
        en: 'Convert Units',
        hi: 'यूनिट कन्वर्ट करें',
        id: 'Konversi Unit',
        ru: 'Конвертер единиц',
        ko: '단위 변환'
      }
    }
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        {language === 'es' && '🔧 Herramientas Offline Disponibles'}
        {language === 'en' && '🔧 Available Offline Tools'}
        {language === 'hi' && '🔧 ऑफलाइन टूल्स उपलब्ध'}
        {language === 'id' && '🔧 Tools Offline Tersedia'}
        {language === 'ru' && '🔧 Доступные офлайн инструменты'}
        {language === 'ko' && '🔧 사용 가능한 오프라인 도구'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {offlineTools.map(tool => (
          <div key={tool.id} className="bg-white rounded-lg p-3 border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">{tool.icon}</div>
            <div className="text-sm font-medium text-gray-800">
              {tool.name[language] || tool.name.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Componente de estado de sincronización
 */
export const SyncStatus = () => {
  const [syncStatus, setSyncStatus] = useState('idle');
  const { language } = useLanguage();

  useEffect(() => {
    const handleSyncMessage = (event) => {
      if (event.data.type === 'BACKGROUND_SYNC') {
        setSyncStatus(event.data.payload.status);
      }
    };

    navigator.serviceWorker?.addEventListener('message', handleSyncMessage);
    
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSyncMessage);
    };
  }, []);

  if (syncStatus === 'idle') return null;

  const messages = {
    es: 'Sincronizando datos...',
    en: 'Syncing data...',
    hi: 'डेटा सिंक हो रहा है...',
    id: 'Sinkronisasi data...',
    ru: 'Синхронизация данных...',
    ko: '데이터 동기화 중...'
  };

  return (
    <div className="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-40">
      <div className="flex items-center gap-2">
        <div className="animate-spin">🔄</div>
        <span className="text-sm">{messages[language] || messages.en}</span>
      </div>
    </div>
  );
};

/**
 * Hook para funcionalidades PWA
 */
export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Detectar si está instalado
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          window.navigator.standalone ||
                          document.referrer.includes('android-app://');
      setIsInstalled(isStandalone);
    };

    checkInstalled();

    // Listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setCanInstall(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (window.pwaManager) {
      return window.pwaManager.promptInstall();
    }
    return false;
  };

  return {
    isInstalled,
    canInstall,
    isOnline,
    install
  };
};

export default PWAWrapper;
