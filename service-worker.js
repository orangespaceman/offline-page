/* Service worker - basic offline page */

"use strict";

var cacheName = "offline";
var cacheVersion = "v1.0.0::";
var cacheFiles = {
  optional: [],
  // change this path to wherever the offline page is located, e.g.
  // required: ["/offline/"]
  required: ["/offline-page/offline/"]
};

function updateCache() {
  return caches.open(cacheVersion + cacheName).then(function(cache) {
    cache.addAll(cacheFiles.optional);
    return cache.addAll(cacheFiles.required);
  });
}

function clearCache() {
  return caches.keys().then(function(keys) {
    return Promise.all(
      keys
        .filter(function(key) {
          return key.indexOf(cacheVersion) !== 0;
        })
        .map(function(key) {
          caches.delete(key);
        })
    );
  });
}

self.addEventListener("install", function(event) {
  event.waitUntil(
    updateCache().then(function() {
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    clearCache().then(function() {
      self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event) {
  var request = event.request;
  if (request.method !== "GET") {
    return;
  }
  event.respondWith(
    fetch(request)
      .then(function(response) {
        return response;
      })
      .catch(function() {
        if (request.headers.get("Accept").indexOf("text/html") !== -1) {
          // change this path to wherever the offline page is located, e.g.
          // return caches.match("/offline/");
          return caches.match("/offline-page/offline/");
        }
        return caches.match(request).then(function(response) {
          return response;
        });
      })
  );
});
