(function() {
  var manifest = {
    "short_name": "Freising UA",
    "name": "Freising UA",
    "icons": [
      {
        // Указываем точную абсолютную ссылку на иконку с www.
        "src": "https://www.freisingua.com",
        "type": "image/png",
        "sizes": "192x192",
        "purpose": "any"
      }
    ],
    // Указываем точную абсолютную ссылку на главную страницу с www.
    "start_url": "https://www.freisingua.com",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "display": "standalone",
    "orientation": "portrait"
  };

  var stringManifest = JSON.stringify(manifest);
  var blob = new Blob([stringManifest], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  
  var link = document.createElement('link');
  link.setAttribute('rel', 'manifest');
  link.setAttribute('href', url);
  document.head.appendChild(link);
})();

