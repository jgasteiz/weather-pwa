(function () {
    // TODO: take the cache name from a version.
    const DEBUG = false;
    const ASSETS_CACHE = 'my-site-cache-v2';
    const DATA_CACHE = 'data-cache';
    const cacheWhiteList = [ASSETS_CACHE, DATA_CACHE];
    const urlsToCache = [
        '/',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
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

    const logger = {
        log: function(...message) {
            if (DEBUG) {
                console.log(...message);
            }
        }
    };

    self.addEventListener('install', function(event) {
        logger.log('WORKER: install event in progress.');
        event.waitUntil(
            caches
                .open(ASSETS_CACHE)
                .then(function(cache) {
                    return cache.addAll(urlsToCache);
                })
                .then(function() {
                    logger.log('WORKER: static assets added to cache');
                })
        );
        event.waitUntil(
            caches
                .open(DATA_CACHE)
                .then(function(cache) {
                    return cache.addAll(dataUrlsToCache);
                })
                .then(function() {
                    logger.log('WORKER: data added to cache');
                })
        )
    });

    // Caching strategy:
    // - API data requests: Network first + cache update + cache fallback.
    // - Static assets: Cache first + fallback to network.
    // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
    self.addEventListener('fetch', function(event) {
        logger.log('Fetch event for ', event.request.url);
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
                                        logger.log("Updating cache with weather data response.");
                                        cache.put(event.request, networkResponse.clone());
                                        return networkResponse;
                                    })
                                    .catch(function () {
                                        logger.log("We're offline, return the cached weather data.");
                                        return caches.match(event.request);
                                    })
                            }

                            // Otherwise try to return the cached asset and fall to network.
                            if (response) {
                                logger.log("Returning cached static asset");
                                return response;
                            }
                            logger.log("Cached asset not found, fetching it");
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
