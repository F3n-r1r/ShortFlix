var cacheName = 'app-shell-cache-v1';
var staticAssets = [
    "/"
    ];

self.addEventListener("install", event => {
    console.log("The SW is now installed");
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(staticAssets);
        })
    );
});

// Cache first
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                // If the response has been cached
                return response;
            } else {
                // Else go to network
                return fetch(event.request);
            }
        })
    );
});