const CACHE_NAME = 'ps-lounge-v1';

// الملفات اللي عايزينها تتسيف أول ما الموقع يفتح
const PRE_CACHE = [
  '/',
  '/index.html',
  // ضيف هنا أسماء ملفات الـ CSS لو ثابتة
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRE_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // لو موجود في الكاش، هاته فوراً وحدث الكاش في الخلفية
        fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        });
        return cachedResponse;
      }

      // لو مش موجود، روحه هاته من النت وسيفه للمرات الجاية
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});