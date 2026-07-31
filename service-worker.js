

/**
 * ============================================================
 * PAES Challenge — Service Worker v3.0.0
 * Cache y funcionalidad offline para PWA
 * ============================================================
 */

const CACHE_NAME = 'paes-challenge-v3.0.0';

// Archivos a cachear para funcionamiento offline
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './effects.js',
    './banco-lectora.js',
    './banco-matematica1.js',
    './banco-matematica2.js',
    './app.js',
    './buho-svg.js',
    './buho.PNG',
    './buho-uniforme.PNG',
    './icono-app.PNG',
    './manifest.json',
    // Sonidos
    './sounds/splash.mp3',
    './sounds/correct.mp3',
    './sounds/incorrect.mp3',
    './sounds/levelup.mp3',
    './sounds/levelstart.mp3',
    './sounds/achievement.mp3',
    './sounds/powerup.mp3',
    './sounds/star.mp3',
    './sounds/next.mp3'
];

// ================================================================
// EVENTO: INSTALACIÓN
// ================================================================
self.addEventListener('install', (event) => {
    console.log('🦉 PAES Challenge v3.0.0 - Instalando Service Worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cacheando archivos...');
                return cache.addAll(ASSETS).catch((error) => {
                    console.warn('⚠️ Algunos archivos no se pudieron cachear:', error);
                    return Promise.resolve();
                });
            })
            .then(() => {
                console.log('✅ Instalación completada');
                return self.skipWaiting();
            })
    );
});

// ================================================================
// EVENTO: ACTIVACIÓN
// ================================================================
self.addEventListener('activate', (event) => {
    console.log('🦉 PAES Challenge v3.0.0 - Activando Service Worker...');
    
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => {
                            console.log('🗑️ Eliminando caché antigua:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => {
                console.log('✅ Activación completada');
                return self.clients.claim();
            })
    );
});

// ================================================================
// EVENTO: FETCH
// Estrategia: Cache First, luego Network
// ================================================================
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetch(event.request)
                    .then((networkResponse) => {
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseClone);
                            })
                            .catch(() => {});
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        
                        return new Response('Recurso no disponible offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// ================================================================
// EVENTO: MENSAJE
// ================================================================
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data === 'clearCache') {
        caches.delete(CACHE_NAME)
            .then(() => {
                console.log('🗑️ Caché eliminada por solicitud del usuario');
            });
    }
});

console.log('🦉 PAES Challenge Service Worker v3.0.0 registrado');
