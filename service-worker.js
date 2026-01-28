const CACHE = "ordo-vtt-v1";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/ui.js",
  "./js/audio.js",
  "./js/dice.js",
  "./js/map.js",
  "./js/character.js",
  "./js/combat.js",
  "./js/pwa.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
