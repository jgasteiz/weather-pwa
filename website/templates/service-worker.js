(function () {
    const CACHE_NAME = 'my-site-cache-v1';
    const cacheWhiteList = [CACHE_NAME];
    const urlsToCache = [
        '/',
        'api/forecast/',
        'http://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
        'static/css/weather-icons.min.css',
        'static/css/weather-icons-wind.min.css',
        'static/css/weather.css',
        'static/lazylibs/react.development.js',
        'static/dist/app.bundle.js',
        'static/font/weathericons-regular-webfont.woff2'
    ];

    self.addEventListener('install', function(event) {
        console.log('WORKER: install event in progress.');
        event.waitUntil(
            caches
                .open(CACHE_NAME)
                .then(function(cache) {
                    console.log('Opened cache');
                    return cache.addAll(urlsToCache);
                })
                .then(function() {
                    console.log('WORKER: install completed');
                })
        );
    });

    // Strategy Stale-while-revalidate: return cached if available, but fetch
    // resources and update cache in the background.
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
    self.addEventListener('fetch', function(event) {
        console.log('Fetch event for ', event.request.url);
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    return cache
                        .match(event.request)
                        .then(function (response) {
                            const fetchPromise = fetch(event.request).then(function(networkResponse) {
                                console.log(`WORKER: Caching ${event.request.url}`);
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                            console.log(`WORKER: Returning cached or promise for ${event.request.url}`);
                            return response || fetchPromise;
                    });
            })
        );
    });

    self.addEventListener('activate', function(event) {
        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });

})();
