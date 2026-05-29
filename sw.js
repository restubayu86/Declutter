const CACHE_NAME = 'declutter-v1.0.0';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      try {
        await cache.add('/');
        await cache.add('/index.html');
        await cache.add('/manifest.json');
      } catch(err) {}
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('script.google.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response(JSON.stringify({ ok: false, error: 'offline' }), {
      headers: { 'Content-Type': 'application/json' }
    })));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('/index.html');
      return new Response('Offline', { status: 404 });
    }))
  );
});
