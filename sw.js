// Этот код внутри sw.js сообщает браузеру, что сайт умеет работать офлайн
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Браузер видит этот обработчик и разрешает установку на рабочий стол
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response("Вы находитесь в офлайн-режиме");
    })
  );
});
