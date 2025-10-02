import { useEffect } from 'react';

/**
 * Hook para detectar cuando el usuario regresa a la pestaña
 * y verificar si hay actualizaciones disponibles
 */
export function useAutoRefresh() {
  useEffect(() => {
    let lastVisit = Date.now();
    
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const now = Date.now();
        const minutesSinceLastVisit = (now - lastVisit) / 1000 / 60;
        
        // Si han pasado más de 10 minutos, verificar actualizaciones
        if (minutesSinceLastVisit > 10) {
          console.log('⏰ Han pasado', Math.round(minutesSinceLastVisit), 'minutos. Verificando actualizaciones...');
          checkForUpdates();
        }
        
        lastVisit = now;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

/**
 * Verificar si hay actualizaciones disponibles
 */
function checkForUpdates() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.update().then(() => {
          console.log('✅ Verificación de actualizaciones completada');
        });
      });
    });
  }
  
  // También verificar la versión desde un meta tag o endpoint
  checkVersionFromServer();
}

/**
 * Verificar versión desde el servidor
 */
async function checkVersionFromServer() {
  try {
    // Agregar timestamp para evitar caché
    const response = await fetch(`/version.json?t=${Date.now()}`);
    
    if (response.ok) {
      const data = await response.json();
      const currentVersion = localStorage.getItem('app-version');
      
      if (currentVersion && currentVersion !== data.version) {
        console.log('🔄 Nueva versión detectada:', data.version);
        
        // Limpiar caché y recargar
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
        }
        
        localStorage.setItem('app-version', data.version);
        
        // Recargar la página sin caché
        window.location.reload(true);
      } else if (!currentVersion) {
        localStorage.setItem('app-version', data.version);
      }
    }
  } catch (error) {
    // No hacer nada si falla, el servidor puede no tener version.json
    console.log('ℹ️ No se pudo verificar versión del servidor');
  }
}
