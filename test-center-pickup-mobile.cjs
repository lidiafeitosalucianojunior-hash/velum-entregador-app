'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const html=fs.readFileSync(path.join(__dirname,'embeds/lumen-admin-panel/index.html'),'utf8');
const url='https://app.vaidevelum.com/embeds/lumen-admin-panel/?test=center-pickup';
const stage={name:'CASA DE XIMBA',address:'Rua Pedro Pereira de Lucena, 515, Centro',city:'Brejo Santo',state:'CE',zipCode:'63260-000',hasFee:false,fee:0,status:'PENDING'};
const loja={pickupAddress:'Rua Pedro Américo',pickupNumber:'92',pickupNeighborhood:'Centro',pickupCity:'Cajazeiras',pickupState:'PB',pickupZipCode:'58900-000'};
async function seed(page,rides=[]){
 await page.evaluate(({rides,loja})=>{
   window.calls=[];
   window.addEventListener('message',e=>{if(e.data?.source==='LUMEN_ADMIN_PANEL')window.calls.push(e.data)});
   window.postMessage({source:'LUMEN_ADMIN_PANEL_PAGE',type:'DATA',payload:{ok:true,loja,emCurso:rides,concluidas:[],drivers:[]}},'*');
 },{rides,loja});
 await page.waitForTimeout(200);
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route('https://app.vaidevelum.com/embeds/lumen-admin-panel/**',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  const page=await context.newPage();
  await page.goto(url,{waitUntil:'load'});
  const ride={deliveryId:'VEL-TEST-EDIT',status:'PREPARING',internalLogistics:true,driverId:'',customerPickupAtCenter:false,
    ...loja,customerName:'Cliente Teste',customerPhone:'83999990000',deliveryAddress:'Rua Destino',deliveryCity:'Cajazeiras',deliveryState:'PB',
    deliveryFee:18,deliveryPaymentMode:'PAY_AT_PICKUP',logisticsStages:[stage],logisticsStageIndex:0};
  await seed(page,[ride]);
  const edit=page.locator('.ride-edit').first();
  await edit.waitFor({state:'attached'});
  await edit.evaluate(el=>el.click());
  assert.equal(await page.locator('#centerPickupMode').isDisabled(),false);
  assert.equal(await page.locator('#addStop').isDisabled(),false);
  await page.locator('#addStop').click();
  assert.equal(await page.locator('#stopList .stop').count(),2);
  await page.locator('#stopList input[data-stop="1"][data-key="name"]').fill('Centro complementar');
  await page.locator('#stopList input[data-stop="1"][data-key="address"]').fill('Rua Nova, 10');
  await page.locator('#stopList input[data-stop="1"][data-key="city"]').fill('Brejo Santo');
  await page.locator('#stopList input[data-stop="1"][data-key="state"]').fill('CE');
  await page.locator('#centerPickupMode').check();
  assert.equal(await page.locator('#review').evaluate(el=>el.classList.contains('on')),true);
  assert.equal(await page.locator('#create').isEnabled(),true);
  await page.locator('#create').click();
  await page.waitForTimeout(80);
  let result=await page.evaluate(()=>window.calls.filter(x=>x.type==='UPDATE_DELIVERY').at(-1));
  assert.ok(result,'must dispatch UPDATE_DELIVERY');
  assert.equal(result.payload.deliveryId,ride.deliveryId);
  assert.equal(result.payload.data.customerPickupAtCenter,true);
  assert.equal(result.payload.data.deliveryFee,0);
  assert.equal(result.payload.data.deliveryAddress,'');
  assert.equal(result.payload.data.logisticsStages.length,2);
  assert.equal(await page.evaluate(()=>window.calls.filter(x=>x.type==='CALCULATE').length),0);
  await page.close();
  const p=await context.newPage();
  await p.goto(url,{waitUntil:'load'});await seed(p);
  await p.locator('#call').click();
  await p.locator('#customerName').fill('Cliente teste');
  await p.locator('#customerPhone').fill('83999990000');
  await p.locator('#addStop').click();
  await p.locator('#centerPickupMode').check();
  await p.locator('#calc').click();
  assert.equal(await p.locator('#quoteValue').innerText(),'Sem frete');
  await p.locator('#readyConfirm').check();
  assert.equal(await p.locator('#create').isEnabled(),true);
  await p.locator('#create').click();
  await p.waitForTimeout(80);
  result=await p.evaluate(()=>window.calls.filter(x=>x.type==='CREATE_DELIVERY').at(-1));
  assert.ok(result,'must create zero-freight center pickup');
  assert.equal(result.payload.customerPickupAtCenter,true);
  assert.equal(result.payload.deliveryFee,0);
  assert.equal(result.payload.deliveryAddress,'');
  assert.equal(result.payload.logisticsStages.length,1);
  assert.equal(await p.evaluate(()=>window.calls.filter(x=>x.type==='CALCULATE').length),0);
  console.log('CENTER_PICKUP_MOBILE_UI_OK: edit switch mode, add stop, save, create label without quote or address');
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
