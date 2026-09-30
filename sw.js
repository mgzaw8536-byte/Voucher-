const CACHE="mz-voucher-ios-v1";
const ASSETS=["./","./index.html","./style.css","./script.js","./qrcode-local.js","./ios-compat.js","./manifest.webmanifest","./logo.png","./logo1.png","./logo_interface_default_white.png","./mz_splash.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
   const copy=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return resp;
 }).catch(()=>caches.match("./index.html"))));
});
