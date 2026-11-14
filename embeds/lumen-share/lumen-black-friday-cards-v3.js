/* LUMEN BLACK FRIDAY • 13–15 Nov 2026 • immediate activation • reversible */
(function(){
 'use strict';
 if(window.__lumenBF14)return;
 const api={installed:true};window.__lumenBF14=api;
 const START=Date.parse('2026-11-14T02:10:07.863Z');
 const END=Date.parse('2026-11-16T03:00:00Z');
 const KEY='lumenBfBuyNow14',CSS='lumen-bf-css-14';
 const original=new Map(),BRL=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
 let working=false,toastEl=null,buying=false;
 const active=()=>Date.now()>=START&&Date.now()<END;
 const find=(root,selector)=>root?.querySelector(selector)||null;
 const css=[
 '.wixui-repeater__item.lumen-bf-card [id^="comp-mtkp3pt6"]{opacity:.58!important}',
 '.wixui-repeater__item.lumen-bf-card [id^="comp-mtkp3pt6"] h2{text-decoration:line-through!important;text-decoration-thickness:1px!important}',
 '.wixui-repeater__item.lumen-bf-card [id^="comp-mtkp7cth"]{height:31px!important;max-height:none!important;overflow:visible!important;display:flex!important;align-items:center!important;justify-content:center!important}',
 '.wixui-repeater__item.lumen-bf-card .lumen-bf-pricebox{width:100%;height:31px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.12}',
 '.wixui-repeater__item.lumen-bf-card .lumen-bf-pricebox small{display:block!important;color:#c65705!important;font:bold 9px/1.15 Arial,sans-serif!important;letter-spacing:.4px!important;white-space:nowrap!important}',
 '.wixui-repeater__item.lumen-bf-card .lumen-bf-pricebox strong{display:block!important;color:#16100a!important;font:800 15px/1.15 Arial,sans-serif!important;white-space:nowrap!important}',
 '.wixui-repeater__item.lumen-bf-card [id^="comp-mtkpkifd"]{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:stretch!important;gap:6px!important;height:58px!important;min-height:58px!important;max-height:none!important;box-sizing:border-box!important;overflow:visible!important}',
 '.wixui-repeater__item.lumen-bf-card [id^="comp-mtkpkifd"] button[aria-label="Adicionar ao carrinho"]{height:24px!important;min-height:24px!important;max-height:24px!important;flex:0 0 24px!important;align-self:stretch!important}',
 '.wixui-repeater__item.lumen-bf-card button.lumen-bf-buy{display:flex!important;flex:0 0 28px!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;cursor:pointer!important;min-height:28px!important;height:28px!important;max-height:28px!important;width:100%!important;border:2px solid #f47c20!important;border-radius:100px!important;background:#090909!important;color:#ffd245!important;font:bold 10.5px/1 Arial,sans-serif!important;letter-spacing:.18px!important;padding:0 5px!important;white-space:nowrap!important;box-shadow:0 1px 2px #0002!important;-webkit-appearance:none!important;appearance:none!important}',
 '.wixui-repeater__item.lumen-bf-card button.lumen-bf-buy:focus-visible{outline:2px solid #f47c20!important;outline-offset:2px!important}',
 '.wixui-repeater__item.lumen-bf-card button.lumen-bf-buy:active{transform:scale(.985)}',
 '.lumen-bf-toast{position:fixed;bottom:92px;left:50%;transform:translateX(-50%);z-index:2147483600;color:#ffe09b;background:#100e0d;border:1px solid #f47c20;border-radius:10px;padding:10px 14px;box-sizing:border-box;min-width:210px;max-width:90vw;text-align:center;font:600 12px/1.3 Arial,sans-serif;box-shadow:0 4px 18px #0006}'
 ].join('');
 function ensureCss(){
  if(document.getElementById(CSS))return;
  const s=document.createElement('style');s.id=CSS;s.textContent=css;document.head.appendChild(s);
 }
 function toast(text){
  toastEl?.remove();
  const n=document.createElement('div');n.className='lumen-bf-toast';n.setAttribute('role','status');n.textContent=text;
  document.body.appendChild(n);toastEl=n;
  setTimeout(()=>{if(toastEl===n){toastEl=null;n.remove()}},4200);
 }
 function parsePrice(value){
  const m=String(value||'').replace(/\u00a0/g,' ').match(/R\$\s*([\d.\s]+,\d{2})/);
  return m?Number(m[1].replace(/[^\d]/g,''))/100:NaN;
 }
 function productLink(card){
  const link=find(card,'compartilhar-produto')?.getAttribute('link');
  if(!link)return '';
  try{const u=new URL(link,location.origin);
   return u.origin===location.origin&&u.pathname.startsWith('/product-page/')?u.href:'';
  }catch(_){return ''}
 }
 function chosen(card){
  const chips=find(card,'[id^="comp-mtkpap59"]');
  const inputs=[...(chips?.querySelectorAll('input[type="checkbox"]')||[])];
  return {sizes:inputs.map(x=>x.value.trim()).filter(Boolean),picked:inputs.filter(x=>x.checked).map(x=>x.value.trim())};
 }
 function beginBuy(card){
  const link=productLink(card);
  if(!link){toast('Produto indisponível para checkout rápido.');return}
  const n=chosen(card);
  if(n.sizes.length&&n.picked.length!==1){
   toast(n.picked.length?'Escolha apenas uma numeração.':'Selecione sua numeração para comprar.');return;
  }
  const pending={path:new URL(link).pathname,size:n.picked[0]||'',until:Date.now()+120000,clicked:false};
  try{sessionStorage.setItem(KEY,JSON.stringify(pending))}
  catch(_){toast('Abra o produto para concluir a compra.');return}
  location.assign(link);
 }
 function decorate(card){
  if(!card.isConnected)return;
  const retail=find(card,'[id^="comp-mtkp3pt6"]');
  const wholesale=find(card,'[id^="comp-mtkp7cth"]');
  const cart=find(card,'[id^="comp-mtkpkifd"]');
  const native=find(cart,'button[aria-label="Adicionar ao carrinho"]') || [...(cart?.querySelectorAll('button')||[])].find(b=>/adicionar ao carrinho/i.test(b.textContent||''));
  const grid=find(card,'[data-testid="mesh-container-content"]');
  if(!retail||!wholesale||!cart||!native||!grid||!productLink(card))return;
  const price=parsePrice(retail.textContent);
  if(!Number.isFinite(price)||price<=0)return;
  let saved=original.get(card);
  if(!saved){
   const rows=getComputedStyle(grid).gridTemplateRows.split(/\s+/).map(parseFloat);
   if(rows.length<9||rows.some(n=>!Number.isFinite(n)))return;
   saved={retail,wholesale,cart,grid,wholesaleHtml:wholesale.innerHTML,price:NaN,
     cardH:[card.style.getPropertyValue('height'),card.style.getPropertyPriority('height')],
     gridH:[grid.style.getPropertyValue('height'),grid.style.getPropertyPriority('height')],
     gridRows:[grid.style.getPropertyValue('grid-template-rows'),grid.style.getPropertyPriority('grid-template-rows')],
     cartH:[cart.style.getPropertyValue('height'),cart.style.getPropertyPriority('height')]
   };
   original.set(card,saved);
   const delta=53;rows[3]+=20;rows[6]+=33;
   card.style.setProperty('height',(card.getBoundingClientRect().height+delta)+'px','important');
   grid.style.setProperty('height',(grid.getBoundingClientRect().height+delta)+'px','important');
   grid.style.setProperty('grid-template-rows',rows.map(n=>n+'px').join(' '),'important');
   cart.style.setProperty('height','58px','important');card.classList.add('lumen-bf-card');
   const button=document.createElement('button');
   button.type='button';button.className='lumen-bf-buy';
   button.setAttribute('aria-label','Comprar agora Black Friday');
   button.textContent='🔥 COMPRAR AGORA';
   button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();beginBuy(card)});
   cart.insertBefore(button,native);saved.button=button;
  }
  // O Wix pode reconstruir os botões de produtos recém-criados depois
  // de montar o repetidor. Restaura o CTA sempre que ele for removido.
  if(saved.grid!==grid){
   saved.grid=grid;
   saved.gridH=[grid.style.getPropertyValue('height'),grid.style.getPropertyPriority('height')];
   saved.gridRows=[grid.style.getPropertyValue('grid-template-rows'),grid.style.getPropertyPriority('grid-template-rows')];
   const rows=getComputedStyle(grid).gridTemplateRows.split(/\s+/).map(parseFloat);
   if(rows.length>=9&&rows.every(Number.isFinite)){
    rows[3]+=20;rows[6]+=33;
    grid.style.setProperty('height',(grid.getBoundingClientRect().height+53)+'px','important');
    grid.style.setProperty('grid-template-rows',rows.map(n=>n+'px').join(' '),'important');
   }
  }
  if(saved.cart!==cart){
   saved.cart=cart;
   saved.cartH=[cart.style.getPropertyValue('height'),cart.style.getPropertyPriority('height')];
   saved.button=null;
  }
  if(!cart.querySelector('.lumen-bf-buy')){
   const button=document.createElement('button');
   button.type='button';button.className='lumen-bf-buy';
   button.setAttribute('aria-label','Comprar agora Black Friday');
   button.textContent='🔥 COMPRAR AGORA';
   button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();beginBuy(card)});
   cart.insertBefore(button,native);
   saved.button=button;
  }else{
   saved.button=cart.querySelector('.lumen-bf-buy');
   if(saved.button.nextElementSibling!==native)cart.insertBefore(saved.button,native);
  }
  if(card.classList.contains('lumen-bf-card')===false)card.classList.add('lumen-bf-card');
  if(cart.getBoundingClientRect().height<55)cart.style.setProperty('height','58px','important');
  if(saved.wholesale!==wholesale){
   saved.wholesale=wholesale;saved.wholesaleHtml=wholesale.innerHTML;saved.price=NaN;
  }
  if(!wholesale.querySelector('.lumen-bf-pricebox')){
   saved.wholesaleHtml=wholesale.innerHTML;
  }
  if(saved.price!==price||!wholesale.querySelector('.lumen-bf-pricebox')){
   const discounted=Math.round(price*75)/100;
   wholesale.innerHTML='<div class="lumen-bf-pricebox"><small>🔥 BLACK FRIDAY</small><strong>'+BRL.format(discounted)+'</strong></div>';
   saved.price=price;
  }
 }
 function setBack(el,prop,orig){
  if(!el)return;
  if(orig[0])el.style.setProperty(prop,orig[0],orig[1]||'');
  else el.style.removeProperty(prop);
 }
 function revert(){
  for(const [card,s] of original){
   try{
    s.button?.remove();
    if(s.wholesale?.querySelector('.lumen-bf-pricebox'))s.wholesale.innerHTML=s.wholesaleHtml;
    setBack(card,'height',s.cardH);setBack(s.grid,'height',s.gridH);
    setBack(s.grid,'grid-template-rows',s.gridRows);setBack(s.cart,'height',s.cartH);
    card.classList.remove('lumen-bf-card');
   }catch(_){}
  }
  original.clear();document.getElementById(CSS)?.remove();toastEl?.remove();toastEl=null;
 }
 function onProduct(){
  if(!active()||buying)return;
  let p;
  try{p=JSON.parse(sessionStorage.getItem(KEY)||'null')}catch(_){return}
  if(!p)return;
  if(Date.now()>p.until||location.pathname.startsWith('/checkout')){sessionStorage.removeItem(KEY);return}
  if(location.pathname!==p.path||p.clicked)return;
  const buy=document.querySelector('button[data-hook="buy-now-button"]');
  if(!buy||buy.getAttribute('aria-disabled')==='true')return;
  const selector=document.querySelector('select[data-hook="native-select"][aria-label="Tamanho"]')||document.querySelector('select[data-hook="native-select"]');
  if(p.size){
   if(!selector)return;
   const option=[...selector.options].find(x=>x.textContent.trim()===p.size&&!x.disabled);
   if(!option){sessionStorage.removeItem(KEY);toast('Selecione a numeração na página do produto.');return}
   if(selector.value!==option.value){
    const setter=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set;
    if(setter)setter.call(selector,option.value);else selector.value=option.value;
    selector.dispatchEvent(new Event('input',{bubbles:true}));
    selector.dispatchEvent(new Event('change',{bubbles:true}));
    return;
   }
   if(!p.sizeAt){p.sizeAt=Date.now();sessionStorage.setItem(KEY,JSON.stringify(p));return}
   if(Date.now()-p.sizeAt<1100)return;
  }
  buying=true;p.clicked=true;sessionStorage.setItem(KEY,JSON.stringify(p));
  buy.click();
  setTimeout(()=>{buying=false;try{const z=JSON.parse(sessionStorage.getItem(KEY)||'null');if(z?.clicked&&location.pathname===z.path){sessionStorage.removeItem(KEY);toast('Se necessário, toque em COMPRAR para continuar.')}}catch(_){}},9000);
 }
 function tick(){
  if(!document.head||!document.body)return;
  if(working)return;working=true;
  try{
   if(active()){
    ensureCss();
    for(const card of document.querySelectorAll('.wixui-repeater__item')){
     if(find(card,'compartilhar-produto'))decorate(card);
    }
    onProduct();
   }else if(original.size){revert()}
  }finally{working=false}
 }
 document.addEventListener('DOMContentLoaded',tick,{once:true});
 tick();setInterval(tick,1300);
 api.status=()=>({active:active(),count:original.size,start:new Date(START).toISOString(),end:new Date(END).toISOString()});
})();