// LE POINTAGE — service worker : network-first, repli cache (100 % hors-ligne)
const CACHE = "pointage-v76-lectures-42";
const ASSETS = ["./", "./index.html", "./coffre.html", "./lectures.js", "./lectures-closing.js", "./lectures-ielts.js", "./biblio.js", "./biblio-informatique.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./mandarin/", "./atelier/bibliotheque/commun.js", "./atelier/bibliotheque/monter.js", "./atelier/pieces/t2-06-cretes-couleur.js", "./atelier/pieces/t2-08-enluminure.js", "./atelier/bibliotheque/emaki.js", "./atelier/pieces/t4-18-rouleau.js", "./atelier/pieces/t4-16-rosace.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    // « no-cache » : le navigateur redemande toujours au serveur si la page a changé (sinon il resservait
    // une version vieille de 10 minutes après chaque mise en ligne). Hors-ligne, on retombe sur le cache.
    fetch(e.request.url, { cache: "no-cache", credentials: "same-origin" }).then(res => {
      // On ne garde QUE les bonnes réponses. Pendant une mise en ligne, GitHub Pages
      // répond 404 une poignée de secondes : sans ce test, cette page « File not found »
      // s'installait dans le cache à la place de l'app, et l'app ne s'ouvrait plus.
      if (!res.ok) return caches.match(e.request, { ignoreSearch: true }).then(h => h || res);
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(h => h || caches.match("./index.html")))
  );
});
