(function(){
"use strict";
if(!/^\/tenis\/?$/i.test(location.pathname)||window.__lumenTenisPageV1)return;
const state=window.__lumenTenisPageV1={loaded:true,size:(new URLSearchParams(location.search).get("tamanho")||sessionStorage.getItem("lumen_tenis_size")||""),items:-1};
const sizes=["34","35","36","37","38","39"];
const gallerySelector='[data-hook="gallery-app-root"]';
const itemSelector='[data-hook="product-list-grid-item"]';
const wai="5588996067657";
const photoPromises=new WeakMap();
function photoFile(li){
if(photoPromises.has(li))return photoPromises.get(li);
const img=li.querySelector('[data-hook="ProductMediaDataHook.Images"] img')||li.querySelector("img");
const url='https://static.wixstatic.com/media/'+JSON.parse(li.querySelector('wow-image').getAttribute('data-image-info')).imageData.uri;
if(!url)return Promise.reject(new Error("SEM_FOTO"));
const request=fetch(url,{mode:"cors"}).then(r=>{if(!r.ok)throw Error("FOTO_NAO_ENCONTRADA");return r.blob()}).then(blob=>{
const ref=(li.innerText.match(/REF\s*(\d+)/i)||[])[1]||"produto";
const ext=blob.type.includes("png")?"png":"jpg";
return new File([blob],"Lumen-"+ref+"."+ext,{type:blob.type||"image/jpeg"});
});
photoPromises.set(li,request);return request;
}
const nearby=typeof IntersectionObserver==="function"?new IntersectionObserver(records=>{for(const r of records){if(r.isIntersecting){photoFile(r.target).catch(()=>{});nearby.unobserve(r.target)}}},{rootMargin:"900px"}):null;
const sty=document.createElement("style");sty.id="lumen-tenis-v1-style";
sty.textContent=[
'#lumen-tenis-filter{font:normal 12px Arial,sans-serif;background:#fffdfb;border-bottom:1px solid #eadfd3;text-align:center;padding:14px 8px 13px;margin-bottom:12px;color:#5e4935;box-sizing:border-box}',
'#lumen-tenis-filter *{box-sizing:border-box}',
'#lumen-tenis-filter .ll-top{font-size:9px;letter-spacing:2px;color:#a2835b;font-weight:600}',
'#lumen-tenis-filter h1{font:normal 28px Georgia,serif;color:#614229;margin:7px 0}',
'#lumen-tenis-filter .ll-intro{font-size:11px;color:#9c826b;margin:0 0 14px}',
'#lumen-tenis-filter .ll-label{font-weight:600;font-size:11px;letter-spacing:.2px;margin:0 0 8px}',
'#lumen-tenis-filter .ll-btns{display:flex;gap:4px;flex-wrap:nowrap;justify-content:center;max-width:100%;margin:0 auto}',
'#lumen-tenis-filter .ll-btns button{flex:0 0 32px;font:500 11px Arial,sans-serif;background:#fff;border:1px solid #a78969;color:#725136;border-radius:5px;min-width:0;min-height:30px;padding:5px 3px;cursor:pointer}',,
'#lumen-tenis-filter .ll-btns button:first-child{flex-basis:48px}',
'#lumen-tenis-filter .ll-btns button[aria-pressed="true"]{background:#66482d;color:white;border-color:#66482d}',
'#lumen-tenis-filter .ll-count{margin:9px 0 0;font-size:10px;color:#957962}',,
'#lumen-tenis-filter .ll-share-all{margin:11px auto 0;display:inline-flex;align-items:center;justify-content:center;min-height:35px;border-radius:99px;border:1px solid #9b795b;background:#62452f;color:#fff;padding:7px 15px;font:600 11px/1.2 Arial,sans-serif;cursor:pointer;max-width:100%}',,
'#lumen-tenis-filter .ll-share-all[disabled]{background:#eee7df;color:#8e8174;border-color:#e3d6c9;cursor:wait}',,
'#lumen-tenis-filter .ll-share-hint{font:400 9px/1.35 Arial,sans-serif;color:#9a8572;margin:7px 0 0}',
'[data-hook="product-list-wrapper"]{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-flow:row dense!important;align-items:start!important;column-gap:9px!important;row-gap:19px!important;padding:0 8px 18px!important;list-style:none!important;max-width:100%!important}',,
'[data-hook="product-list-grid-item"]{display:block!important;min-width:0!important;max-width:100%!important;width:100%!important;margin:0!important;box-sizing:border-box!important}',,
'[data-hook="product-list-grid-item"]>div{min-width:0!important;max-width:100%!important;width:100%!important}',
'[data-hook="product-list-grid-item"].ll-hide{display:none!important}',
'[data-hook="product-item-root"]{background:#fff!important;border:0!important;border-radius:0!important;height:auto!important}',
'[data-hook="not-image-container"]{justify-content:flex-start!important;height:auto!important;min-height:0!important}',
'[data-hook="not-image-container"]>div:first-child{flex:0 0 auto!important;min-height:0!important;height:auto!important}',
'[data-hook="product-item-product-details-link"]{flex:0 0 auto!important;height:auto!important}',
'[data-hook="product-item-container"]{border-radius:7px;overflow:hidden}',
'[data-hook="product-item-name"]{font:600 12px/1.3 Arial,sans-serif!important;text-align:center!important;color:#4c3424!important;min-height:32px}',
'[data-hook="product-item-name-and-price-layout"]{text-align:center}',
'[data-hook="product-item-price-before-discount"]{color:#81796e!important;text-decoration:line-through!important;font:500 11px Arial,sans-serif!important}',
'[data-hook="product-item-price-to-pay"]{color:#563b26!important;font:700 17px Arial,sans-serif!important}',
'[data-hook="product-discount-rule-name"]{font:700 9px Arial,sans-serif!important;color:#bb621f!important;text-align:center!important;min-height:0!important;padding:3px 0!important}',
'[data-hook="product-item-options"]{height:auto!important;display:block!important;padding:3px 0 6px!important}',
'.ll-has-chips [data-hook="product-options-dropdown"]{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;pointer-events:none!important;overflow:hidden!important}',
'.ll-variant{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;min-height:25px}',
'.ll-variant button{background:white;color:#765439;font:500 10px Arial,sans-serif;min-width:26px;height:24px;border:1px solid #806041;border-radius:2px;padding:1px 4px;cursor:pointer}',
'.ll-variant button[aria-pressed="true"]{background:#765439;color:#fff}',
'[data-hook="product-item-add-to-cart-button"]{background:#4b351c!important;border:1px solid #9b795b!important;border-radius:99px!important;color:#fff!important;min-height:36px!important;font:500 10px Arial,sans-serif!important}',
'.ll-extra{display:flex;flex-direction:column;gap:5px;margin:7px 0 0}',
'.ll-extra a{border-radius:99px;display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;min-height:32px;padding:4px;font:600 10px Arial,sans-serif}',
'.ll-whatsapp{border:1.5px solid #95735a;color:#76513c;background:white}',
'.ll-details{border:1px solid #e1d1c1;background:#f6f0e9;color:#70513d}',
'.ll-foot{display:flex;align-items:center;justify-content:center;gap:10px;font:500 10px Arial,sans-serif;color:#88705a;margin:6px 0}',
'.ll-foot button{background:none;border:0;color:#88705a;text-decoration:underline;padding:4px;cursor:pointer;font:500 10px Arial,sans-serif}',
'#lumen-tenis-pager{display:flex;justify-content:center;margin:16px auto 25px;text-align:center}',
'#lumen-tenis-pager a{display:inline-flex;justify-content:center;align-items:center;padding:11px 25px;border-radius:99px;background:#f7f0e8;border:1px solid #b69878;color:#5e402a;text-decoration:none;font:600 12px Arial,sans-serif}',
'@media(min-width:650px){#lumen-tenis-filter{padding:24px 14px 19px}#lumen-tenis-filter h1{font-size:38px}#lumen-tenis-filter .ll-btns{gap:7px}#lumen-tenis-filter .ll-btns button{flex-basis:45px;min-height:38px;font-size:13px}#lumen-tenis-filter .ll-btns button:first-child{flex-basis:64px}[data-hook="product-list-wrapper"]{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:20px!important;padding:0 18px 24px!important}[data-hook="product-item-name"]{font-size:14px!important}.ll-extra a{font-size:12px;min-height:38px}}',
'@media(min-width:1100px){[data-hook="product-list-wrapper"]{grid-template-columns:repeat(4,minmax(0,1fr))!important}}'
].join("\n");document.head.appendChild(sty);
function trim(x){return String(x||"").trim()}
function name(li){return trim(li.querySelector('[data-hook="product-item-name"]')?.textContent)}
function realShoe(li){return !!name(li)&&!/(sapatilha|rasteira|tamanco|sand[aá]lia|papete|chinelo|bota|bolsa|salto|crocs)/i.test(name(li))}
function variants(li){const select=li.querySelector('select[data-hook="native-select"]');if(select)return [...select.options].filter(o=>!o.disabled&&trim(o.textContent)&&trim(o.textContent)!=="Tamanho");return (li.dataset.llInventory||"").split("|").filter(Boolean).map(size=>({textContent:size,value:size,disabled:false}));}
function header(){
const root=document.querySelector(gallerySelector);if(!root)return false;
if(document.getElementById("lumen-tenis-filter"))return true;
const el=document.createElement("div");el.id="lumen-tenis-filter";
el.innerHTML='<div class="ll-top">LÚMEN LUXOS · CURADORIA PREMIUM</div><h1>Tênis femininos</h1><p class="ll-intro">Seus modelos favoritos, na sua numeração.</p><p class="ll-label">SELECIONE O TAMANHO</p><div class="ll-btns" role="group" aria-label="Filtrar por numeração"></div><p class="ll-count" aria-live="polite"></p><button type="button" class="ll-share-all" disabled>Preparando lista de produtos…</button><p class="ll-share-hint">Compartilhe os modelos do tamanho escolhido em uma única mensagem.</p>';
for(const n of ["Todos",...sizes]){const b=document.createElement("button");b.type="button";b.textContent=n;b.dataset.size=n==="Todos"?"":n;b.onclick=()=>{state.size=b.dataset.size;sessionStorage.setItem("lumen_tenis_size",state.size);const url=new URL(location.href);if(state.size)url.searchParams.set("tamanho",state.size);else url.searchParams.delete("tamanho");history.replaceState(history.state,"",url.pathname+url.search);apply();pagination();};el.querySelector(".ll-btns").appendChild(b)}
el.querySelector('.ll-share-all').addEventListener('click',shareFilteredList);root.parentElement?.insertBefore(el,root);if(!new URLSearchParams(location.search).has('lumen_export'))setTimeout(preparePages,900);return true;
}
function decorate(li){
if(li.dataset.llDone==="yes")return;
const select=li.querySelector('select[data-hook="native-select"]'),options=li.querySelector('[data-hook="product-item-options"]'),opts=variants(li);
if(select&&options){
const row=document.createElement("div");row.className="ll-variant";
for(const opt of opts){const b=document.createElement("button");b.type="button";b.textContent=trim(opt.textContent);b.dataset.size=b.textContent;b.setAttribute("aria-pressed","false");b.onclick=()=>{
const live=li.querySelector('select[data-hook="native-select"]');const o=[...live.options].find(x=>trim(x.textContent)===b.dataset.size&&!x.disabled);if(!o)return;
Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value").set.call(live,o.value);
live.dispatchEvent(new Event("input",{bubbles:true}));live.dispatchEvent(new Event("change",{bubbles:true}));
li.querySelectorAll(".ll-variant button").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.size===b.dataset.size)));
};row.appendChild(b)}
if(row.children.length){options.appendChild(row);li.classList.add("ll-has-chips");}
}
const root=li.querySelector('[data-hook="product-item-root"]');
const link=root?.querySelector('[data-hook="product-item-container"]')?.href;
const add=root?.querySelector('[data-hook="product-item-add-to-cart-button"]');
if(link&&add){
const extra=document.createElement("div");extra.className="ll-extra";
const wa=document.createElement("a");wa.className="ll-whatsapp";wa.textContent="◉ Comprar no WhatsApp";wa.target="_blank";wa.rel="noopener noreferrer";
const det=document.createElement("a");det.className="ll-details";det.textContent="Ver detalhes e comprar";det.href=link;
extra.append(wa,det);
root.appendChild(extra);
const foot=document.createElement("div");foot.className="ll-foot";
const ref=document.createElement("span");ref.textContent=(li.innerText.match(/REF\s*\d+/i)||[])[0]||"Lúmen Luxos";
const share=document.createElement("button");share.type="button";share.textContent="Compartilhar";
share.onclick=async()=>{
const retail=trim(li.querySelector('[data-hook="product-item-price-before-discount"]')?.textContent);
const wholesale=trim(li.querySelector('[data-hook="product-item-price-to-pay"]')?.textContent);
const sizes=variants(li).map(x=>trim(x.textContent)).join(", ");
const txt=["✨ *"+name(li)+"*",[retail?"🛍️ *Valor de varejo:* "+retail:"",wholesale?"📦 *Valor de atacado:* "+wholesale:""].filter(Boolean).join("\n"),sizes?"👡 *Tamanhos disponíveis:* "+sizes:"","🔗 *Link de compra:*\n"+link].filter(Boolean).join("\n\n");
if(navigator.share){
try{
const file=await photoFile(li);
const data={title:name(li),text:txt,files:[file]};
if(typeof navigator.canShare==="function"&&!navigator.canShare({files:[file]}))delete data.files;
await navigator.share(data);return;
}catch(e){
if(e?.name==="AbortError")return;
try{await navigator.share({title:name(li),text:txt});return}catch(err){if(err?.name==="AbortError")return}
}
}
try{await navigator.clipboard.writeText(txt);share.textContent="Copiado";setTimeout(()=>share.textContent="Compartilhar",1400)}catch(e){location.href="https://api.whatsapp.com/send?text="+encodeURIComponent(txt)}
};
foot.append(ref,share);extra.insertAdjacentElement("afterend",foot);
}
li.dataset.llDone="yes";if(nearby)nearby.observe(li);
}
function apply(){
const items=[...document.querySelectorAll(gallerySelector+" "+itemSelector)];
if(!items.length)return;
let n=0;
for(const li of items){
const real=realShoe(li);const pending=!li.querySelector('select[data-hook="native-select"]')&&li.dataset.llInventory===undefined;const pass=real&&(pending||!state.size||variants(li).some(o=>trim(o.textContent)===state.size));
li.classList.toggle("ll-hide",!pass);if(pass)n++;
if(real)decorate(li);
const wa=li.querySelector(".ll-whatsapp");
if(wa){
const link=li.querySelector('[data-hook="product-item-container"]')?.href||"";
wa.href="https://wa.me/"+wai+"?text="+encodeURIComponent("Olá! Tenho interesse no "+name(li)+(state.size?", tamanho "+state.size:"")+". Link: "+link);
}
}
const head=document.getElementById("lumen-tenis-filter");
if(head){
head.querySelectorAll("button[data-size]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.size===state.size)));
const cnt=state.scanning&&state.size?"Verificando tamanhos disponíveis…":n+" modelo"+(n===1?"":"s")+(state.size?" no tamanho "+state.size:" disponíveis")+" nesta página";if(head.querySelector('.ll-count').textContent!==cnt)head.querySelector('.ll-count').textContent=cnt;updateShareControl();
}
}

const batchCache=new Map();
let batchTask=null,batchError='',batchLoading=false,batchDone=false;
function productInfo(li){
 const title=name(li);if(!title||!realShoe(li))return null;
 const link=li.querySelector('[data-hook="product-item-container"]')?.href||li.querySelector('[data-hook="product-item-product-details-link"]')?.href||'';
 if(!link)return null;
 const available=variants(li).map(o=>trim(o.textContent));
 return {title,link,price:trim(li.querySelector('[data-hook="product-item-price-to-pay"]')?.textContent)||trim(li.querySelector('[data-hook="product-item-price-before-discount"]')?.textContent),sizes:available};
}
function buildBatchProducts(){
 const all=[...[...document.querySelectorAll(gallerySelector+' '+itemSelector)].map(productInfo).filter(Boolean)];
 for(const pages of batchCache.values())all.push(...pages.items);
 const unique=new Map();
 for(const p of all)if(!unique.has(p.link)&&(!state.size||p.sizes.includes(state.size)))unique.set(p.link,p);
 return [...unique.values()];
}
function updateShareControl(){
 const btn=document.querySelector('#lumen-tenis-filter .ll-share-all');if(!btn)return;
 const busy=batchLoading||state.scanning;
 const count=batchDone?buildBatchProducts().length:0;
 const label=busy?'Preparando lista de produtos…':batchError?'Tentar reunir resultados':batchDone?'↗ Compartilhar '+count+' resultado'+(count===1?'':'s'):'↗ Compartilhar resultados';
 if(btn.textContent!==label)btn.textContent=label;
 btn.disabled=busy||(!batchDone&&!batchError);
}
function pageNumbers(doc,current){
 const result=[];
 for(const a of doc.querySelectorAll('[data-hook="product-list-pagination-link-seo-link"]')){
  try{
   const url=new URL(a.href,location.href);
   if(url.pathname!=='/tenis')continue;
   const n=Number(url.searchParams.get('page')||1);
   if(Number.isSafeInteger(n)&&n>=1&&n<=10&&n!==current)result.push(n);
  }catch(e){}
 }
 return [...new Set(result)];
}
async function loadOtherPage(pageNo){
 const frame=document.createElement('iframe');
 frame.setAttribute('aria-hidden','true');frame.tabIndex=-1;
 frame.style.cssText='position:fixed;left:-9999px;top:0;width:390px;height:800px;opacity:0;pointer-events:none;border:0;';
 const url=new URL('/tenis',location.origin);
 url.searchParams.set('page',String(pageNo));url.searchParams.set('lumen_export','1');
 frame.src=url.href;
 let timer=null,poll=null;
 try{
  const data=await new Promise((resolve,reject)=>{
   let loaded=false,readyCount=0;
   const fail=e=>{clearInterval(poll);clearTimeout(timer);reject(e)};
   timer=setTimeout(()=>fail(new Error('Não foi possível consultar página '+pageNo)),29000);
   frame.onload=()=>{loaded=true};
   frame.onerror=()=>fail(new Error('Erro na página '+pageNo));
   poll=setInterval(()=>{
    if(!loaded)return;
    try{
     const doc=frame.contentDocument,s=frame.contentWindow?.__lumenTenisPageV1;
     const cards=doc?[...doc.querySelectorAll(itemSelector)]:[];
     if(!doc||!s||!cards.length||s.scanning)return;
     const confirmed=cards.filter(realShoe);
     if(!confirmed.every(li=>li.querySelector('select[data-hook="native-select"]')||li.dataset.llInventory!==undefined))return;
     if(++readyCount<2)return;
     clearInterval(poll);clearTimeout(timer);
     resolve({items:confirmed.map(productInfo).filter(Boolean),links:pageNumbers(doc,pageNo)});
    }catch(e){if(e?.name==='SecurityError')fail(e)}
   },350);
   document.body.appendChild(frame);
  });
  return data;
 }finally{clearInterval(poll);clearTimeout(timer);frame.remove()}
}
async function preparePages(){
 if(new URLSearchParams(location.search).has('lumen_export'))return;
 if(batchTask)return batchTask;
 batchLoading=true;batchError='';updateShareControl();
 const current=Number(new URLSearchParams(location.search).get('page')||1);
 batchTask=(async()=>{
  const queue=pageNumbers(document,current),seen=new Set([current]);
  while(queue.length&&seen.size<10){
   const n=queue.shift();if(seen.has(n))continue;seen.add(n);
   const result=await loadOtherPage(n);
   batchCache.set(n,result);
   for(const next of result.links)if(!seen.has(next)&&!queue.includes(next))queue.push(next);
  }
  batchDone=true;
 })().catch(error=>{batchError=String(error.message||error);console.warn('Lúmen: compartilhar lista',error);}).finally(()=>{batchLoading=false;updateShareControl()});
 return batchTask;
}
async function shareFilteredList(){
 const btn=document.querySelector('#lumen-tenis-filter .ll-share-all');if(!btn||batchLoading)return;
 if(!batchDone||batchError){
  batchTask=null;batchCache.clear();batchDone=false;
  await preparePages();return;
 }
 const products=buildBatchProducts();
 if(!products.length){btn.textContent='Nenhum modelo encontrado';return}
 const title='*LÚMEN LUXOS | TÊNIS FEMININOS*';
 const intro='👟 *Numeração:* '+(state.size||'Todos os tamanhos')+'\n📦 *'+products.length+' modelos disponíveis*';
 const entries=products.map((p,i)=>'*'+(i+1)+'. '+p.title+'*'+(p.price?'\n💰 '+p.price:'')+'\n🔗 '+p.link);
 const message=[title,intro,...entries,'Confira os detalhes e finalize a compra pelos links.'].join('\n\n');
 if(typeof navigator.share==='function'){
  try{await navigator.share({title:'Lúmen Luxos — Tênis '+(state.size||''),text:message});return}
  catch(e){if(e?.name==='AbortError')return}
 }
 try{
  await navigator.clipboard.writeText(message);
  btn.textContent='Lista copiada!';setTimeout(updateShareControl,1800);
 }catch(e){window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')}
}

function pagination(){
const section=document.querySelector(gallerySelector+' [data-hook="product-list"]');
if(!section)return;
let box=document.getElementById("lumen-tenis-pager");
if(!box){box=document.createElement("nav");box.id="lumen-tenis-pager";box.setAttribute("aria-label","Páginas de tênis");section.insertAdjacentElement("afterend",box);}
const page=Number(new URLSearchParams(location.search).get("page")||1);
const native=[...document.querySelectorAll('[data-hook="product-list-pagination-link-seo-link"]')];
const next=native.map(a=>a.href).find(url=>{try{return Number(new URL(url).searchParams.get("page"))>page}catch{return false}});
let url=next?new URL(next):page>1?new URL("/tenis",location.origin):null;
if(!url){box.style.display="none";return;}
if(state.size)url.searchParams.set("tamanho",state.size);
box.style.display="flex";
if(!box.querySelector("a"))box.appendChild(document.createElement("a"));
const a=box.querySelector("a");a.href=url.href;a.textContent=next?"VER MAIS TÊNIS":"VOLTAR À PRIMEIRA PÁGINA";
}
let scanning=false;
async function scanDesktop(){
if(scanning||document.querySelector(gallerySelector+" select[data-hook=native-select]"))return;
scanning=true;state.scanning=true;
const items=[...document.querySelectorAll(gallerySelector+" "+itemSelector)];
for(const li of items){
if(!realShoe(li)||li.dataset.llInventory!==undefined)continue;
const btn=li.querySelector('button[data-hook="dropdown-base"]');
if(!btn){li.dataset.llInventory="";continue}
btn.click();
await new Promise(done=>setTimeout(done,135));
const labels=[...li.querySelectorAll('[data-hook="dropdown-content-option"]')].filter(o=>o.getAttribute("aria-disabled")!=="true").map(o=>trim(o.getAttribute("title"))).filter(Boolean);
li.dataset.llInventory=labels.join("|");
if(btn.isConnected)btn.click();
await new Promise(done=>setTimeout(done,20));
}
state.scanning=false;scanning=false;apply();
}
let busy=false;function run(){if(busy)return;busy=true;setTimeout(()=>{busy=false;if(header()){apply();pagination();scanDesktop().catch(console.warn)}},120)}
run();const mo=new MutationObserver(()=>run());mo.observe(document.body,{childList:true,subtree:true});setInterval(()=>{const count=document.querySelectorAll(gallerySelector+" "+itemSelector).length;if(count!==state.items||!document.getElementById("lumen-tenis-filter")){state.items=count;run()}},2000);
})();
