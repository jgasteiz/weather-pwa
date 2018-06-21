(function () {
    // TODO: take the cache name from a version.
    const ASSETS_CACHE = 'my-site-cache-v2';
    const DATA_CACHE = 'data-cache';
    const cacheWhiteList = [ASSETS_CACHE, DATA_CACHE];
    const urlsToCache = [
        '/',
        'http://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
        'static/css/weather-icons.min.css',
        'static/css/weather-icons-wind.min.css',
        'static/css/weather.css',
        'static/lazylibs/react.development.js',
        'static/dist/app.bundle.js',
        'static/font/weathericons-regular-webfont.woff2'
    ];
    const dataUrlsToCache = [
        'api/forecast/'
    ];

    self.addEventListener('install', function(event) {
        console.log('WORKER: install event in progress.');
        event.waitUntil(
            caches
                .open(ASSETS_CACHE)
                .then(function(cache) {
                    return cache.addAll(urlsToCache);
                })
                .then(function() {
                    console.log('WORKER: static assets added to cache');
                })
        );
        event.waitUntil(
            caches
                .open(DATA_CACHE)
                .then(function(cache) {
                    return cache.addAll(dataUrlsToCache);
                })
                .then(function() {
                    console.log('WORKER: data added to cache');
                })
        )
    });

    // Strategy Stale-while-revalidate: return cached if available, but fetch
    // resources and update cache in the background.
    // Mixed strategy. Network first with cache fallback for API requests,
    // cache first with network fallback for static assets.
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
    self.addEventListener('fetch', function(event) {
        console.log('Fetch event for ', event.request.url);

        // Network first for API data requests + cache response for the next offline moment.
        // Cache first for static assets + fallback to network.
        event.respondWith(
            caches
                .open(DATA_CACHE)
                .then(function(cache) {
                    return caches
                        .match(event.request)
                        .then(function(response) {
                            // If this url is a "data url", go network first + cache the response.
                            if (event.request.url.match(dataUrlsToCache) != null) {
                                return fetch(event.request)
                                    .then(function (networkResponse) {
                                        console.log("Updating cache with weather data response.");
                                        cache.put(event.request, networkResponse.clone());
                                        return networkResponse;
                                    })
                                    .catch(function () {
                                        console.log("We're offline, return the cached weather data.");
                                        return caches.match(event.request);
                                    })
                            }

                            // Otherwise try to return the cached asset and fall to network.
                            if (response) {
                                console.log("Returning cached static asset");
                                return response;
                            }
                            console.log("Cached asset not found, fetching it");
                            return fetch(event.request);
                        })
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
