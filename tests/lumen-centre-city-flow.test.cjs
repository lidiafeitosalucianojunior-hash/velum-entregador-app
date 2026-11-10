'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.resolve(__dirname,'../embeds/lumen-admin-panel/index.html'),'utf8');
const extract=(from,to)=>source.slice(source.indexOf(from),source.indexOf(to,source.indexOf(from)));
assert(source.includes('function renderRideSheet(list){'));
assert(source.includes('function detailProgress(x){'));
let output='';
const fields={rideSheetBody:{set innerHTML(v){output=v},get innerHTML(){return output}}};
const ctx={String,Array,Number,Math,JSON,selectedLabels:new Set(),
 $:id=>fields[id],ridePhoneWhatsApp:()=>'',rideToolButtons:()=>'',nextRideActionButton:()=>'',statusLabel:s=>s,
 esc:v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
};
vm.createContext(ctx);
vm.runInContext(extract('function renderRideSheet(list){','function rideMatchesTerm(x,term){')+
 '\nthis.show=renderRideSheet;',ctx);
vm.runInContext(extract('function detailProgress(x){','function detailPrimaryAction(x){')+
 '\nthis.progress=detailProgress;',ctx);
const base={deliveryId:'test-delivery',customerName:'Cliente teste',pickupCity:'Cajazeiras',deliveryCity:'',
 deliveryType:'Retirada no centro logístico',customerPickupAtCenter:true,finalLogisticsCenterCity:'Brejo Santo',
 logisticsStages:[{name:'CASA DE XIMBA',city:'Brejo Santo',status:'IN_TRANSIT'}],status:'LOGISTICS_IN_TRANSIT'};
ctx.show([base]);
assert.match(output,/Brejo Santo/);
assert.match(output,/Retirada no centro logístico/);
assert.doesNotMatch(output,/Cajazeiras/);
ctx.show([{...base,customerPickupAtCenter:false,finalLogisticsCenterCity:'',status:'AVAILABLE_FOR_CUSTOMER_PICKUP'}]);
assert.match(output,/Brejo Santo/,'legacy pickup still resolves final stop');
ctx.show([{...base,customerPickupAtCenter:false,finalLogisticsCenterCity:'',status:'STORE_PICKUP_READY',
 deliveryType:'Retirada em loja',storePickup:true}]);
assert.match(output,/Cajazeiras/,'store pickup uses store origin');
ctx.show([{...base,customerPickupAtCenter:false,deliveryType:'Entrega',status:'OUT_FOR_DELIVERY',
 logisticsStages:[],finalLogisticsCenterCity:'',deliveryCity:'Juazeiro do Norte'}]);
assert.match(output,/Juazeiro do Norte/,'normal delivery uses destination city');
const progress=ctx.progress({status:'DRIVER_ACCEPTED',internalLogistics:true,
 logisticsStages:[{name:'CASA DE XIMBA',status:'ARRIVED'}]});
assert.match(progress,/Pedido conferido e embalado/);
assert.match(progress,/Chamando entregador/);
assert.match(progress,/Corrida aceita/);
assert.match(progress,/Pedido em rota de entrega/);
assert.doesNotMatch(progress,/Pedido coletado/);
assert(progress.indexOf('CASA DE XIMBA')<progress.indexOf('Chamando entregador'));
const centerProgress=ctx.progress(base);
assert.doesNotMatch(centerProgress,/Chamando entregador|Corrida aceita/);
console.log('OK: active centre pickup Brejo Santo, legacy centre, store Cajazeiras, delivery destination, dynamic steps, no collection');
