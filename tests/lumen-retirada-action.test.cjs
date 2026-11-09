const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../embeds/lumen-admin-panel/index.html'),'utf8');
const start=html.indexOf('function nextRideActionButton(x){');
const end=html.indexOf('function rideToolButtons(x,detail=false){');
assert.ok(start>=0&&end>start);
const ctx={String,Boolean,Number,Array,esc:v=>String(v??'')};
vm.runInNewContext(html.slice(start,end)+'\nthis.next=nextRideActionButton;',ctx);
test('PREPARING retirada sem hub: botao laranja MARCAR_PRONTO habilitado',()=>{
 const btn=ctx.next({deliveryId:'VEL-LUM-000001',status:'PREPARING',
  storePickup:true,internalLogistics:false});
 assert.match(btn,/ride-record-next log-act/);
 assert.match(btn,/data-action="MARK_PACKED"/);
 assert.match(btn,/Marcar pronto para retirada/);
 assert.doesNotMatch(btn,/disabled/);
});
test('entrega logistica mantem fases e corrida concluida bloqueada',()=>{
 assert.match(ctx.next({deliveryId:'VEL-LUM-000002',status:'PREPARING',internalLogistics:true}),/data-action="MARK_PACKED"/);
 assert.match(ctx.next({deliveryId:'VEL-LUM-000003',status:'DELIVERED'}),/disabled/);
});
test('card resumido sem menu Acoes, detalhes com imprimir compartilhar editar excluir',()=>{
 const record=html.split('function renderRideSheet(list)')[1].split('function rideMatchesTerm')[0];
 const drawer=html.split('function renderRideDetail()')[1].split('function openRideDetail')[0];
 assert.ok(record.includes('nextRideActionButton(x)'));
 assert.ok(!record.includes('sheetActionButtons(x)'));
 assert.ok(drawer.includes('detailQuickActions(x)'));
 assert.ok(drawer.includes('rideToolButtons(x,true)'));
 assert.ok(html.includes("buttons+=button('ride-edit'"));
 assert.ok(html.includes("buttons+=button('ride-delete'"));
});
