self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
 let d={}; try{d=e.data?e.data.json():{}}catch(_){}
 const title=d.title||'VELUM';
 const options={body:d.body||'Nova atualização na sua revenda.',icon:'./velum-icon-192-v4.png',badge:'./velum-icon-192-v4.png',tag:d.tag||'velum-reseller',renotify:true,data:{url:d.url||'https://www.vaidevelum.com/painel-revendedora?frompush=1'},silent:false};
 e.waitUntil(self.registration.showNotification(title,options).then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true})).then(cs=>Promise.all(cs.map(c=>c.postMessage({type:'VELUM_PUSH_FOREGROUND'})))));
});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=e.notification.data?.url||'https://www.vaidevelum.com/painel-revendedora?frompush=1';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus'in c){c.navigate(u);return c.focus()}}return clients.openWindow(u)}))});
