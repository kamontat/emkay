// Minimal Service Worker for eMKay PWA
// This service worker does provide cache or offline functionality

importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js");

workbox.setConfig({ debug: false });

const {
  routing: { registerRoute, setCatchHandler },
  strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
  cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
  expiration: { ExpirationPlugin, CacheExpiration },
  precaching: { matchPrecache, precacheAndRoute },
} = workbox;

// Precache static assets
precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
]);

// Cache CSS, JS, Manifest, and Web Worker
registerRoute(
  ({ request }) =>
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "manifest" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "pwa-static-assets",
    plugins: [
      new CacheableResponsePlugin({
          statuses: [0, 200],
      }),
      new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
      }),
    ],
  })
);

// Cache images and font with cache-first strategy
registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'pwa-image',
    plugins: [
      new CacheableResponsePlugin({
          statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Offline fallback for navigation
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    try {
      return await NetworkFirst({
        cacheName: 'pwa-pages',
      }).handle({ event });
    } catch (error) {
      return window.caches.match('/index.html');
    }
  }
);

self.addEventListener("install", () => {
  console.log("Service Worker installed")
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("Deleting cache:", cacheName)
            return caches.delete(cacheName)
          })
        )
      })
      .then(() => {
        console.log("Service Worker activated and caches cleared")
        return self.clients.claim()
      })
  )
})
