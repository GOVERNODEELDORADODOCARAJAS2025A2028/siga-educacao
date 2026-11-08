// Service worker do SIGA Educação: guarda a interface para abrir sem internet.
// Não guarda respostas do Supabase (dados sempre vêm do banco quando houver conexão).
const ARQUIVOS = ["./","./apple-touch-icon.png","./browser-BQfDp7ZU.js","./dist-DUv6x2D9.js","./favicon.svg","./gerador-CjYuDu-r.js","./html2canvas-ZNOUu6fe.js","./icon-192.png","./icon-512.png","./index-CS8u1B1N.css","./index-cJQ8_ZMV.js","./index.es-CEri-ZzK.js","./index.html","./jspdf.es.min-CMK0Ycs4.js","./jspdf.plugin.autotable-2eOJeXl-.js","./manifest.webmanifest","./maskable-512.png","./municipios-C28hIk9_.js","./purify.es-BZxk_wWO.js"]
const CACHE = 'siga-educacao-' + ARQUIVOS.length + '-' + 'mw8a6n5u'
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS))); self.skipWaiting() })
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim() })
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url)
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match('./index.html', { ignoreVary: true }))); return }
  e.respondWith(caches.match(e.request, { ignoreVary: true }).then((r) => r || fetch(e.request).then((resp) => { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); return resp })))
})
