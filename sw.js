// Service worker do SIGA Educação: guarda a interface para abrir sem internet.
// Não guarda respostas do Supabase (dados sempre vêm do banco quando houver conexão).
const ARQUIVOS = ["./","./assets/browser-CxQ8vifB.js","./assets/dist-DUv6x2D9.js","./assets/gerador-DXlov9dt.js","./assets/html2canvas-DFWGsSrl.js","./assets/index-CS8u1B1N.css","./assets/index-DG6xD6_O.js","./assets/index.es-D-IhN4ew.js","./assets/jspdf.es.min-MOfWeC7q.js","./assets/jspdf.plugin.autotable-2eOJeXl-.js","./assets/municipios-C28hIk9_.js","./assets/purify.es-BZxk_wWO.js","./favicon.svg","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"]
const CACHE = 'siga-educacao-' + ARQUIVOS.length + '-' + 'mw85tw7d'
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS))); self.skipWaiting() })
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim() })
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url)
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match('./index.html', { ignoreVary: true }))); return }
  e.respondWith(caches.match(e.request, { ignoreVary: true }).then((r) => r || fetch(e.request).then((resp) => { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return resp })))
})
