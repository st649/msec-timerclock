const CACHE_NAME = 'timer-chan-v1';
const urlsToCache = [
  './',
  './index.html',
  // 必要に応じて追加（CSSやJS外部ファイルがあれば）
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあれば返す、なければネットワーク
        return response || fetch(event.request);
      })
  );
});
