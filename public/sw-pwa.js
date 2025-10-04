// Service Worker PWA optimizado para mercados internacionales

const CACHE_NAME = 'bidi-converter-pwa-v2.1.0';
const STATIC_CACHE = 'static-pwa-v2.1.0';
const DYNAMIC_CACHE = 'dynamic-pwa-v2.1.0';
const IMAGE_CACHE = 'images-pwa-v2.1.0';
const OFFLINE_CACHE = 'offline-pwa-v2.1.0';

// Recursos críticos para funcionamiento offline
const CRITICAL_RESOURCES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/static/js/main.js',
  '/static/css/main.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Recursos estáticos para caché agresivo
const STATIC_RESOURCES = [
  '/converter',
  '/editor',
  '/viewer',
  '/dev-tools',
  '/qr-generator',
  '/password-generator',
  '/bmi-calculator'
];

// Recursos específicos por mercado para preload
const MARKET_RESOURCES = {
  'IN': ['/hi/converter', '/hi/editor'],
  'ID': ['/id/konverter', '/id/editor'],
  'RU': ['/ru/konverter', '/ru/redaktor'],
  'KR': ['/ko/byeonhwangi', '/ko/pyeonjipgi'],
  'CL': ['/es/conversor', '/es/editor'],
  'AR': ['/es/conversor', '/es/editor'],
  'CO': ['/es/conversor', '/es/editor']
};

/**
 * Instalación del Service Worker PWA
 */
self.addEventListener('install', (event) => {
  console.log('PWA SW: Installing Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Caché de recursos críticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('PWA SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      
      // Caché de recursos estáticos
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('PWA SW: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      
      // Crear página offline
      createOfflinePage()
    ]).then(() => {
      console.log('PWA SW: Installation complete');
      return self.skipWaiting();
    })
  );
});

/**
 * Activación del Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('PWA SW: Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Limpiar cachés antiguos
      cleanupOldCaches(),
      
      // Tomar control inmediato
      self.clients.claim(),
      
      // Configurar sincronización en background
      setupBackgroundSync()
    ]).then(() => {
      console.log('PWA SW: Activation complete');
    })
  );
});

/**
 * Interceptar requests con estrategias PWA
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  // Estrategia específica según el tipo de recurso
  if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleStaticRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

/**
 * Manejar requests de documentos HTML
 */
async function handleDocumentRequest(request) {
  try {
    // Intentar red primero para contenido fresco
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cachear respuesta exitosa
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // Fallback a caché
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback a página offline
    return caches.match('/offline.html');
  }
}

/**
 * Manejar requests de imágenes
 */
async function handleImageRequest(request) {
  // Cache first para imágenes
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
      
      // Limpiar caché de imágenes si es muy grande
      cleanupImageCache();
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback a imagen placeholder
    return caches.match('/icons/placeholder-image.png') ||
           new Response('', { status: 404 });
  }
}

/**
 * Manejar requests de recursos estáticos
 */
async function handleStaticRequest(request) {
  // Cache first para recursos estáticos
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Resource not available offline', { status: 503 });
  }
}

/**
 * Manejar requests genéricos
 */
async function handleGenericRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Not available offline', { status: 503 });
  }
}

/**
 * Crear página offline
 */
async function createOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Bidi Converter</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 20px;
        }
        .offline-container {
          max-width: 400px;
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        h1 {
          margin: 0 0 20px 0;
          font-size: 2rem;
        }
        p {
          margin: 0 0 30px 0;
          opacity: 0.9;
          line-height: 1.6;
        }
        .retry-btn {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .retry-btn:hover {
          background: #45a049;
        }
        .features {
          margin-top: 30px;
          text-align: left;
        }
        .feature {
          margin: 10px 0;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📱</div>
        <h1>You're Offline</h1>
        <p>Don't worry! Bidi Converter works offline too. Some features are still available:</p>
        
        <div class="features">
          <div class="feature">✓ Basic image conversion</div>
          <div class="feature">✓ Image editing tools</div>
          <div class="feature">✓ Password generator</div>
          <div class="feature">✓ Unit converter</div>
        </div>
        
        <button class="retry-btn" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
      
      <script>
        // Auto-retry when online
        window.addEventListener('online', () => {
          window.location.reload();
        });
      </script>
    </body>
    </html>
  `;
  
  const cache = await caches.open(OFFLINE_CACHE);
  await cache.put('/offline.html', new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  }));
}

/**
 * Limpiar cachés antiguos
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, OFFLINE_CACHE];
  
  const deletePromises = cacheNames
    .filter(cacheName => !validCaches.includes(cacheName))
    .map(cacheName => {
      console.log('PWA SW: Deleting old cache:', cacheName);
      return caches.delete(cacheName);
    });
  
  return Promise.all(deletePromises);
}

/**
 * Limpiar caché de imágenes si es muy grande
 */
async function cleanupImageCache() {
  const cache = await caches.open(IMAGE_CACHE);
  const requests = await cache.keys();
  
  // Si hay más de 100 imágenes, eliminar las más antiguas
  if (requests.length > 100) {
    const toDelete = requests.slice(0, 20); // Eliminar las primeras 20
    await Promise.all(toDelete.map(request => cache.delete(request)));
    console.log('PWA SW: Cleaned up image cache');
  }
}

/**
 * Configurar sincronización en background
 */
function setupBackgroundSync() {
  // Registrar para sincronización cuando vuelva la conexión
  self.registration.sync.register('background-sync').catch(err => {
    console.log('PWA SW: Background sync not supported');
  });
}

/**
 * Manejar sincronización en background
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

/**
 * Procesar sincronización en background
 */
async function handleBackgroundSync() {
  console.log('PWA SW: Background sync triggered');
  
  // Sincronizar datos pendientes
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'BACKGROUND_SYNC',
      payload: { status: 'syncing' }
    });
  });
}

/**
 * Manejar mensajes del cliente
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'PRELOAD_MARKET_RESOURCES':
      event.waitUntil(preloadMarketResources(payload.market));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearAllCaches());
      break;
      
    case 'GET_CACHE_SIZE':
      event.waitUntil(getCacheSize().then(size => {
        event.ports[0].postMessage({ cacheSize: size });
      }));
      break;
  }
});

/**
 * Precargar recursos específicos del mercado
 */
async function preloadMarketResources(market) {
  const resources = MARKET_RESOURCES[market] || [];
  const cache = await caches.open(DYNAMIC_CACHE);
  
  const preloadPromises = resources.map(async (resource) => {
    try {
      const response = await fetch(resource);
      if (response.ok) {
        await cache.put(resource, response);
        console.log('PWA SW: Preloaded market resource:', resource);
      }
    } catch (error) {
      console.warn('PWA SW: Failed to preload:', resource);
    }
  });
  
  return Promise.allSettled(preloadPromises);
}

/**
 * Limpiar todos los cachés
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  const deletePromises = cacheNames.map(name => caches.delete(name));
  return Promise.all(deletePromises);
}

/**
 * Obtener tamaño total del caché
 */
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response && response.headers.get('content-length')) {
        totalSize += parseInt(response.headers.get('content-length'));
      }
    }
  }
  
  return totalSize;
}

/**
 * Manejar notificaciones push
 */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'bidi-converter-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icons/action-open.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/**
 * Manejar clicks en notificaciones
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('PWA SW: Service Worker loaded successfully');
