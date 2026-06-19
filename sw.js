// Notiz-Werkstatt service worker
// Strategy: cache-first for the app shell, network-first for the
// PDF.js CDN files (so updates land on next online launch).

const CACHE = "notiz-werkstatt-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-32.png",
  "./icon-96.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

// Versioned CDN URLs that the app uses — keep these in lockstep with index.html.
const PDFJS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);

  // PDF.js: try network, fall back to cache, cache fresh responses.
  if(PDFJS_URLS.some(u => req.url.startsWith(u.split("?")[0]))){
    event.respondWith((async () => {
      try{
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      }catch(e){
        const cached = await caches.match(req);
        if(cached) return cached;
        throw e;
      }
    })());
    return;
  }

  // App shell: cache first.
  if(url.origin === self.location.origin){
    event.respondWith((async () => {
      const cached = await caches.match(req);
      if(cached) return cached;
      try{
        const fresh = await fetch(req);
        if(fresh && fresh.status === 200){
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
        }
        return fresh;
      }catch(e){
        // Fallback for navigations: serve index.html
        if(req.mode === "navigate"){
          const fallback = await caches.match("./index.html");
          if(fallback) return fallback;
        }
        throw e;
      }
    })());
  }
});
