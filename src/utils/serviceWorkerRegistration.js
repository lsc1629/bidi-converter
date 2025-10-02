// Registro y gestión del Service Worker
// Se encarga de limpiar caché automáticamente

const APP_VERSION = '1.0.0';
const VERSION_KEY = 'bidi-converter-version';

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `/sw.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('✅ Service Worker registrado:', registration.scope);
          
          // Verificar actualizaciones cada 5 minutos
          setInterval(() => {
            registration.update();
          }, 5 * 60 * 1000);

          // Escuchar cambios en el service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nueva versión disponible
                console.log('🔄 Nueva versión disponible, limpiando caché...');
                clearCacheAndReload();
              }
            });
          });

          // Verificar versión de la app
          checkAppVersion();
        })
        .catch((error) => {
          console.log('Service Worker registro falló:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Limpiar caché y recargar
export function clearCacheAndReload() {
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
  
  // Enviar mensaje al service worker para limpiar
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CLEAR_CACHE'
    });
  }
  
  // Esperar un momento y recargar
  setTimeout(() => {
    window.location.reload(true);
  }, 500);
}

// Verificar versión de la app
function checkAppVersion() {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  
  if (storedVersion !== APP_VERSION) {
    console.log(`🔄 Versión actualizada de ${storedVersion || 'ninguna'} a ${APP_VERSION}`);
    
    // Limpiar caché al detectar nueva versión
    clearCacheAndReload();
    
    // Guardar nueva versión
    localStorage.setItem(VERSION_KEY, APP_VERSION);
  }
}

// Forzar actualización inmediata
export function forceUpdate() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.update();
      });
    });
    
    clearCacheAndReload();
  } else {
    window.location.reload(true);
  }
}

// Limpiar solo el caché del navegador (sin recargar)
export function clearBrowserCache() {
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
        console.log('🗑️ Caché eliminado:', name);
      });
    });
  }
  
  // Limpiar localStorage relacionado con caché
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('cache') || key.includes('temp'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  console.log('✅ Caché del navegador limpiado');
}
