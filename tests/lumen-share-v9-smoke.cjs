const {webkit,devices}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await webkit.launch({headless:true});
 const page=await browser.newPage({...devices['iPhone 13']});
 page.on('pageerror',e=>console.log('SITE_WARNING',e.message.slice(0,170)));
 await page.addInitScript(()=>{
  window.__shareCalls=[];
  Object.defineProperty(navigator,'share',{configurable:true,value:async arg=>{
   window.__shareCalls.push({files:(arg?.files||[]).map(f=>({name:f.name,size:f.size,type:f.type})),
    title:arg?.title||null,text:arg?.text||null});
  }});
  Object.defineProperty(navigator,'canShare',{configurable:true,value:arg=>
   Array.isArray(arg.files)&&arg.files.length>0&&arg.files.every(f=>f.type.startsWith('image/'))});
 });
 try{
  const res=await page.goto('https://www.lumenluxos.com/',{waitUntil:'domcontentloaded',timeout:60000});
  assert.ok(res.status()<400,'Site HTTP error');
  await page.waitForFunction(()=>window.__lumenShareV9?.ready,{timeout:60000});
  await page.waitForTimeout(5000);
  const card=await page.evaluate(()=>{
   for(const badge of document.querySelectorAll('[data-lumen-sku]')){
    const item=badge.closest('[class*="wixui-repeater__item"]')||badge.parentElement;
    const img=item.querySelector('img');
    const widget=item.querySelector('compartilhar-produto');
    if(img&&widget&&img.getBoundingClientRect().width>70){
     return {sku:badge.dataset.lumenSku,widget:widget.getAttribute('nome'),
      source:widget.getAttribute('imagem')};
    }
   }
   return null;
  });
  assert.ok(card,'No product photo with share button');
  console.log('LUMEN_TEST_PRODUCT',JSON.stringify(card));
  // Long-press: must generate formatted REF + numeracoes 9:16 file.
  for(let attempt=0;attempt<7;attempt++){
   await page.evaluate(sku=>{
    const badge=document.querySelector('[data-lumen-sku="'+sku+'"]');
    const img=(badge.closest('[class*="wixui-repeater__item"]')||badge.parentElement).querySelector('img');
    const e=new Event('touchstart',{bubbles:true,cancelable:true});
    Object.defineProperty(e,'touches',{value:[{clientX:80,clientY:410}]});
    img.dispatchEvent(e);
   },card.sku);
   await page.waitForTimeout(740);
   await page.evaluate(sku=>{
    const badge=document.querySelector('[data-lumen-sku="'+sku+'"]');
    const img=(badge.closest('[class*="wixui-repeater__item"]')||badge.parentElement).querySelector('img');
    const e=new Event('touchend',{bubbles:true,cancelable:true});
    Object.defineProperty(e,'touches',{value:[]});img.dispatchEvent(e);
   },card.sku);
   await page.waitForTimeout(950);
   if((await page.evaluate(()=>window.__shareCalls.length))>0)break;
  }
  const withReference=await page.evaluate(()=>window.__shareCalls.at(-1));
  console.log('LONG_PRESS',JSON.stringify(withReference));
  assert.ok(withReference?.files?.[0]?.name.startsWith('REF-'+card.sku+'-9x16'),'Longpress lacks REF 9x16');
  assert.ok(withReference.files[0].size>8000,'Longpress image empty');
  // Button: image must be raw/clean without text, REF, sizes or caption.
  const prior=await page.evaluate(()=>window.__shareCalls.length);
  for(let attempt=0;attempt<6;attempt++){
   await page.evaluate(sku=>{
    const badge=document.querySelector('[data-lumen-sku="'+sku+'"]');
    const item=badge.closest('[class*="wixui-repeater__item"]')||badge.parentElement;
    item.querySelector('compartilhar-produto')?.shadowRoot?.querySelector('button')?.click();
   },card.sku);
   await page.waitForTimeout(1400);
   if((await page.evaluate(()=>window.__shareCalls.length))>prior)break;
  }
  const clean=await page.evaluate(()=>window.__shareCalls.at(-1));
  console.log('CLEAN_BUTTON',JSON.stringify(clean));
  const after=await page.evaluate(()=>window.__shareCalls.length);
  assert.ok(after>prior,'Share button did not open clean file share');
  assert.equal(clean.files.length,1);
  assert.ok(clean.files[0].name.includes('-original.'),'Share did not use original photo');
  assert.ok(clean.files[0].size>4000,'Original image empty');
  assert.equal(clean.text,null,'Share must not include text');
  assert.equal(clean.title,null,'Share must not include a title');
  console.log('LUMEN_V9_TWO_MODES_PASS');
 }finally{await browser.close()}
})().catch(e=>{console.error('LUMEN_V9_SMOKE_FAILED',e.stack||e);process.exit(1)});
