console.log('serviceWorker: registered');

const cacheFiles = [
'',
'/', 
'/index.html',
'/restaurant.html',
'/css/styles.css',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg'
]

// Listening and waiting for the install event's completion
self.addEventListener('install', function(evt){
	evt.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
});


// Listening for fetch event and providing response

self.addEventListener('fetch', function (evt) {
  evt.respondWith(
      caches.match(evt.request).then(function (response) {
        if (response) {
          console.log('Found', evt.request, 'in cache');
          return response;
        }
        else {
          console.log('Could not find', evt.request, 'in cache, FETCHING');
          return fetch(evt.request)
              .then(function (response) {
                const cloneResponse = response.clone()
                caches.open('v1').then(function (cache) {
                  cache.put(evt.request, cloneResponse);
                })
                return response;
              })
              .catch(function (err) {
                console.error(err)
              })
        }
      })
  );
});

