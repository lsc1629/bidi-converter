// Service Worker optimizado para Core Web Vitals y performance

const CACHE_NAME = 'bidi-converter-v2.1.0';
const STATIC_CACHE = 'static-v2.1.0';
const DYNAMIC_CACHE = 'dynamic-v2.1.0';
const IMAGE_CACHE = 'images-v2.1.0';

// Recursos críticos para caché inmediato
const CRITICAL_RESOURCES = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Recursos estáticos para caché
const STATIC_RESOURCES = [
  '/converter',
  '/editor',
  '/dev-tools',
  '/viewer',
  '/about',
  '/contact'
];

// Patrones de recursos para diferentes estrategias de caché
const CACHE_STRATEGIES = {
  // Cache First - Para recursos estáticos
  CACHE_FIRST: [
    /\.(?:js|css|woff2?|ttf|eot)$/,
    /\/static\//,
    /\/assets\//
  ],
  
  // Network First - Para contenido dinámico
  NETWORK_FIRST: [
    /\/api\//,
    /\.(?:json)$/
  ],
  
  // Stale While Revalidate - Para páginas HTML
  STALE_WHILE_REVALIDATE: [
    /\.(?:html)$/,
    /\/$/
  ],
  
  // Cache Only - Para recursos offline
  CACHE_ONLY: [
    /\/offline\//
  ]
};

/**
 * Instalación del Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('SW: Installing Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Caché de recursos críticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      
      // Caché de recursos estáticos
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('SW: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
    ]).then(() => {
      console.log('SW: Installation complete');
      // Activar inmediatamente sin esperar
      return self.skipWaiting();
    })
  );
});

/**
 * Activación del Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('SW: Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Limpiar cachés antiguos
      cleanupOldCaches(),
      
      // Tomar control inmediato
      self.clients.claim()
    ]).then(() => {
      console.log('SW: Activation complete');
    })
  );
});

/**
 * Interceptar requests para aplicar estrategias de caché
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  // Determinar estrategia de caché
  const strategy = determineStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

/**
 * Determinar estrategia de caché basada en el tipo de recurso
 */
function determineStrategy(request) {
  const url = request.url;
  
  // Cache First para recursos estáticos
  if (CACHE_STRATEGIES.CACHE_FIRST.some(pattern => pattern.test(url))) {
    return 'cacheFirst';
  }
  
  // Network First para APIs
  if (CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => pattern.test(url))) {
    return 'networkFirst';
  }
  
  // Stale While Revalidate para HTML
  if (CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.some(pattern => pattern.test(url))) {
    return 'staleWhileRevalidate';
  }
  
  // Cache Only para recursos offline
  if (CACHE_STRATEGIES.CACHE_ONLY.some(pattern => pattern.test(url))) {
    return 'cacheOnly';
  }
  
  // Por defecto: Network First
  return 'networkFirst';
}

/**
 * Manejar request según la estrategia
 */
async function handleRequest(request, strategy) {
  switch (strategy) {
    case 'cacheFirst':
      return cacheFirst(request);
    
    case 'networkFirst':
      return networkFirst(request);
    
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request);
    
    case 'cacheOnly':
      return cacheOnly(request);
    
    default:
      return networkFirst(request);
  }
}

/**
 * Estrategia Cache First
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(getCacheName(request));
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, no cache available');
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Estrategia Network First
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(getCacheName(request));
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas HTML
    if (request.destination === 'document') {
      return caches.match('/offline.html') || 
             new Response('Offline', { status: 503 });
    }
    
    return new Response('Network Error', { status: 503 });
  }
}

/**
 * Estrategia Stale While Revalidate
 */
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Fetch en background para actualizar caché
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(getCacheName(request));
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Silenciar errores de red en background
  });
  
  // Devolver caché inmediatamente si existe
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Si no hay caché, esperar por la red
  return fetchPromise || new Response('Offline', { status: 503 });
}

/**
 * Estrategia Cache Only
 */
async function cacheOnly(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || new Response('Not in cache', { status: 404 });
}

/**
 * Obtener nombre de caché apropiado
 */
function getCacheName(request) {
  const url = request.url;
  
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(url)) {
    return IMAGE_CACHE;
  }
  
  if (/\.(js|css|woff2?|ttf)$/i.test(url)) {
    return STATIC_CACHE;
  }
  
  return DYNAMIC_CACHE;
}

/**
 * Limpiar cachés antiguos
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const validCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  const deletePromises = cacheNames
    .filter(cacheName => !validCaches.includes(cacheName))
    .map(cacheName => {
      console.log('SW: Deleting old cache:', cacheName);
      return caches.delete(cacheName);
    });
  
  return Promise.all(deletePromises);
}

/**
 * Preload de recursos críticos
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRELOAD_RESOURCES') {
    const resources = event.data.resources || [];
    
    event.waitUntil(
      preloadResources(resources)
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * Preload de recursos específicos
 */
async function preloadResources(resources) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  const preloadPromises = resources.map(async (resource) => {
    try {
      const response = await fetch(resource);
      if (response.ok) {
        await cache.put(resource, response);
        console.log('SW: Preloaded resource:', resource);
      }
    } catch (error) {
      console.warn('SW: Failed to preload resource:', resource, error);
    }
  });
  
  return Promise.allSettled(preloadPromises);
}

/**
 * Background Sync para requests fallidos
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      handleBackgroundSync()
    );
  }
});

/**
 * Manejar sincronización en background
 */
async function handleBackgroundSync() {
  // Implementar lógica de sincronización si es necesario
  console.log('SW: Background sync triggered');
}

/**
 * Push notifications (para futuras implementaciones)
 */
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'bidi-converter-notification'
      })
    );
  }
});

/**
 * Manejar clicks en notificaciones
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

/**
 * Optimización de caché de imágenes
 */
async function optimizeImageCache() {
  const cache = await caches.open(IMAGE_CACHE);
  const requests = await cache.keys();
  
  // Limitar caché de imágenes a 50 MB
  const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50 MB
  let totalSize = 0;
  
  const responses = await Promise.all(
    requests.map(request => cache.match(request))
  );
  
  // Calcular tamaño total
  responses.forEach(response => {
    if (response && response.headers.get('content-length')) {
      totalSize += parseInt(response.headers.get('content-length'));
    }
  });
  
  // Si excede el límite, eliminar las más antiguas
  if (totalSize > MAX_CACHE_SIZE) {
    const sortedRequests = requests.sort((a, b) => {
      // Ordenar por fecha de última modificación
      return new Date(a.headers.get('date')) - new Date(b.headers.get('date'));
    });
    
    // Eliminar el 20% más antiguo
    const toDelete = sortedRequests.slice(0, Math.floor(requests.length * 0.2));
    await Promise.all(toDelete.map(request => cache.delete(request)));
    
    console.log('SW: Cleaned up image cache, removed', toDelete.length, 'items');
  }
}

// Ejecutar optimización de caché periódicamente
setInterval(optimizeImageCache, 60 * 60 * 1000); // Cada hora
