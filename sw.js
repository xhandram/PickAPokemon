const CACHE_DATA = "offline-data";
const STATIC_RESOURCES = ["logo.png", "main.css", "scripts.js", "index.html"];

//Install the service worker
self.addEventListener("install", async (e) => {
  console.log("SW install");
  e.waitUntil(
    (async (e) => {
      const cache = await caches.open(CACHE_DATA);
      console.log("In cache");
      return await cache.addAll(STATIC_RESOURCES);
    })()
  );

  self.skipWaiting();
});

//Listen for fetching request
self.addEventListener("fetch", async (e) => {
  console.log(`SW fetch: ${e.request.url}`);

  e.respondWith(
    (async (e) => {
      const cache = await open.caches(CACHE_DATA);

      try {
        const networkResponse = await fetch(e.request);
        console.log(e.request);
        await cache.put(e.request, networkResponse.clone());
        console.log("clone done");
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
