const VELUM_PAIR_CACHE='velum-driver-state-v1';
const VELUM_PAIR_KEY='./__velum_pair__';
async function savePair(pair){const c=await caches.open(VELUM_PAIR_CACHE);await c.put(VELUM_PAIR_KEY,new Response(String(pair||''),{headers:{'Content-Type':'text/plain'}}))}
async function readPair(){const c=await caches.open(VELUM_PAIR_CACHE),r=await c.match(VELUM_PAIR_KEY);return r?await r.text():''}
self.addEventListener('message',event=>{const m=event.data||{};if(m.type==='SAVE_PAIR')event.waitUntil(savePair(m.pair));if(m.type==='GET_PAIR')event.waitUntil(readPair().then(pair=>event.source?.postMessage({type:'PAIR_VALUE',pair}))) });
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
  let data={};try{data=event.data?event.data.json():{}}catch(_){data={body:event.data?event.data.text():''}}
  const title=data.title||'VELUM • Nova corrida disponível';
  const options={
    body:data.body||'Uma nova corrida está disponível.',
    icon:'./velum-icon-192-v3.png?v=20261001-1516',
    badge:'./velum-icon-192-v3.png?v=20261001-1516',
    tag:data.tag||'velum-new-ride',
    renotify:true,
    requireInteraction:true,
    silent:false,
    data:{url:data.url||'https://www.vaidevelum.com/painel-entregador?tab=available&frompush=1'}
  };
  event.waitUntil(self.registration.showNotification(title,options).then(()=>clients.matchAll({type:'window',includeUncontrolled:true})).then(list=>Promise.all(list.map(c=>c.postMessage({type:'VELUM_PUSH_FOREGROUND',data})))))
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const raw=event.notification.data?.url||'https://www.vaidevelum.com/painel-entregador?tab=available&frompush=1';
  const target=new URL(raw,self.registration.scope).href;
  event.waitUntil(clients.openWindow(target));
});