self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('push',event=>{
  let data={};try{data=event.data?event.data.json():{}}catch(_){data={body:event.data?event.data.text():''}}
  const title=data.title||'VELUM • Nova corrida disponível';
  const options={
    body:data.body||'Uma nova corrida está disponível.',
    icon:'./icon.svg',
    badge:'./icon.svg',
    tag:data.tag||'velum-new-ride',
    renotify:true,
    requireInteraction:true,
    data:{url:data.url||'./?open=available'}
  };
  event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=new URL(event.notification.data?.url||'./?open=available',self.registration.scope).href;
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if(c.url.startsWith(self.registration.scope)){c.navigate(target);return c.focus()}}
    return clients.openWindow(target);
  }));
});