// Service Worker para limpiar caché automáticamente
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `bidi-converter-${CACHE_VERSION}`;

// Instalar el service worker y limpiar cachés antiguos
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando nueva versión');
  self.skipWaiting(); // Activar inmediatamente
});

// Activar y limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando y limpiando cachés antiguos');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Caché limpiado, tomando control');
      return self.clients.claim();
    })
  );
});

// Interceptar peticiones y usar estrategia Network First
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;
  
  // No cachear API calls
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, cachearla
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar con caché
        return caches.match(event.request);
      })
  );
});

// Mensaje para actualizar la versión
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('✅ Todos los cachés limpiados');
      })
    );
  }
});
