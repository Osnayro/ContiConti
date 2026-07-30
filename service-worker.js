
/**
 * ============================================================
 * PAES Challenge — Service Worker v2.2.0
 * Cache y funcionalidad offline para PWA
 * ============================================================
 */

const CACHE_NAME = 'paes-challenge-v2.2.0';

// Archivos a cachear para funcionamiento offline
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './effects.js',
    './banco-preguntas.js',
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
    './sounds/next.mp3',
    './sounds/pluma.mp3'
];

// ================================================================
// EVENTO: INSTALACIÓN
// Precarga todos los archivos esenciales en caché
// ================================================================
self.addEventListener('install', (event) => {
    console.log('🦉 PAES Challenge - Instalando Service Worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cacheando archivos esenciales...');
                return cache.addAll(ASSETS).catch((error) => {
                    console.warn('⚠️ Algunos archivos no se pudieron cachear:', error);
                    // Continuar aunque algunos archivos fallen
                    return Promise.resolve();
                });
            })
            .then(() => {
                console.log('✅ Instalación completada');
                // Forzar activación inmediata
                return self.skipWaiting();
            })
    );
});

// ================================================================
// EVENTO: ACTIVACIÓN
// Limpia versiones antiguas de caché
// ================================================================
self.addEventListener('activate', (event) => {
    console.log('🦉 PAES Challenge - Activando Service Worker...');
    
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
                // Tomar control de todas las páginas inmediatamente
                return self.clients.claim();
            })
    );
});

// ================================================================
// EVENTO: FETCH
// Estrategia: Cache First, luego Network
// ================================================================
self.addEventListener('fetch', (event) => {
    // Solo manejar peticiones GET
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si está en caché, devolverlo
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Si no está en caché, ir a la red
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Verificar respuesta válida
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        // Guardar en caché para futuro uso offline
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseClone);
                            })
                            .catch(() => {
                                // Error silencioso si no se puede cachear
                            });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Si falla la red y no está en caché
                        console.warn('⚠️ Sin conexión - Recurso no disponible:', event.request.url);
                        
                        // Para navegaciones, devolver index.html (SPA)
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        
                        // Para otros recursos, simplemente fallar
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
// Comunicación con la aplicación principal
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

console.log('🦉 PAES Challenge Service Worker v1.0.0 registrado');
```

---

📋 Características del Service Worker

Característica Descripción
Estrategia Cache First (caché primero, red después)
Instalación Precarga todos los archivos esenciales
Activación Limpia versiones antiguas de caché
Offline La app funciona sin conexión
SPA Si no hay red, sirve index.html para navegaciones
Mensajes Soporta skipWaiting y clearCache
Resiliencia Si un archivo falla al cachear, continúa con los demás

---

📱 Cómo instalar la PWA

1. Abre la app en Chrome/Edge/Safari en tu celular
2. Chrome/Edge: Toca el menú (⋮) → "Instalar aplicación" o "Agregar a pantalla de inicio"
3. Safari (iOS): Toca el botón Compartir → "Agregar a la pantalla de inicio"
4. La app aparecerá con el icono icono-app.PNG y nombre "PAES Challenge"

---

🔄 Cómo actualizar la caché

Cuando hagas cambios en los archivos:

1. Cambia la versión en CACHE_NAME:
   ```javascript
   const CACHE_NAME = 'paes-challenge-v1.0.1'; // Incrementar versión
