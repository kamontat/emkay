// Minimal Service Worker for eMKay PWA
// This service worker does provide cache or offline functionality

importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

workbox.setConfig({ debug: true });

const {
    routing: { registerRoute, setCatchHandler },
    strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
    cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
    expiration: { ExpirationPlugin, CacheExpiration },
    precaching: { matchPrecache, precacheAndRoute },
} = workbox;

precacheAndRoute([{ url: "/index.html", revision: null }]);

// Cache page navigations (html) with a Network First strategy
registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
        cacheName: "pages",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    })
);

// Cache Images
registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
        cacheName: "pwa-images",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

// Cache Fonts
registerRoute(
    ({ request }) => request.destination === "font",
    new CacheFirst({
        cacheName: "pwa-fonts",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

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

  console.log("Service Worker activated")
})
