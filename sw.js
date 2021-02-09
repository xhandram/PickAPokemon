const CACHE_DATA = "offline-data";
const STATIC_RESOURCES = ["logo.png", "main.css", "scripts.js", "index.html"];

//Install the service worker
self.addEventListener("install", async (e) => {
  console.log("SW install");

  e.waitUntil(
    (async (e) => {
      const cache = await caches.open(CACHE_DATA);
      return await cache.addAll(STATIC_RESOURCES);
    })()
  );

  self.skipWaiting();
});

//Listen for fetching request
self.addEventListener("fetch", async (e) => {
  console.log("Fetching...");
  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_DATA);

      try {
        const networkResponse = await fetch(e.request);
        await cache.put(e.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        const cachedResponse = await cache.match(e.request);
        return cachedResponse;
      }
    })()
  );
});

//Activate the SW
self.addEventListener("activate", async (e) => {
  console.log("SW activate");
});
