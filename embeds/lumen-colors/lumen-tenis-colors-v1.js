(function(){
"use strict";

if(/^\/product-page\//i.test(location.pathname)&&new URLSearchParams(location.search).get('lumen_buy')==='1'){
 const selectedSize=new URLSearchParams(location.search).get('tamanho');
 if(!selectedSize)return;
 let attempts=0,opened=false,chosen=false,clicked=false;
 const normalized=e=>String(e?.textContent||'').trim().toLowerCase();
 function tick(){
  if(opened||++attempts>45){clearInterval(timer);return}
  const options=[...document.querySelectorAll('select')];
  for(const s of options){
   const o=[...s.options].find(x=>x.textContent.trim()===selectedSize&&!x.disabled);
   if(!o)continue;
   if(s.value!==o.value){
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value')?.set?.call(s,o.value);
    s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}));
   }
   chosen=true;break;
  }
  if(!chosen){
   const visible=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
   const choice=[...document.querySelectorAll('[role=option],button,li')].find(x=>visible(x)&&normalized(x)===selectedSize&&x.getAttribute('aria-disabled')!=='true'&&!x.disabled);
   if(choice&&choice.getAttribute('role')==='option'){choice.click();chosen=true;}
   else if(!clicked){
    const select=[...document.querySelectorAll('button,[role=combobox]')].find(x=>visible(x)&&/^(selecionar|tamanho|selecionar tamanho|escolha o tamanho)$/i.test(normalized(x)));
    if(select){select.click();clicked=true;setTimeout(()=>{clicked=false},700);}
   }
  }
  if(chosen){
   const buy=[...document.querySelectorAll('button')].find(x=>/^(comprar|buy now)$/i.test(normalized(x))&&!x.disabled&&x.getAttribute('aria-disabled')!=='true'&&(x.offsetWidth||x.offsetHeight));
   if(buy){opened=true;clearInterval(timer);setTimeout(()=>buy.click(),400);}
  }
 }
 const timer=setInterval(tick,450);
 document.addEventListener('DOMContentLoaded',tick,{once:true});tick();
 return;
}

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
'#lumen-tenis-filter .ll-instagram-row{display:none!important}',
'#lumen-tenis-filter .ll-instagram-row button{border:1px solid #bea68d;border-radius:20px;background:#f8f2eb;color:#70503b;min-height:32px;padding:6px 10px;font:600 11px Arial,sans-serif;cursor:pointer}',
'#lumen-tenis-filter .ll-instagram-row button[disabled]{opacity:.5;cursor:wait}',
'#lumen-tenis-filter .ll-instagram-note{display:none}',
'#lumen-tenis-share-dialog{position:fixed;z-index:2147483600;inset:0;background:rgba(35,25,19,.6);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font:13px Arial,sans-serif}',
'#lumen-tenis-share-dialog *{box-sizing:border-box}',
'#lumen-tenis-share-dialog .ll-panel{background:#fffaf6;max-width:500px;width:100%;max-height:92vh;overflow:auto;overscroll-behavior:contain;border-radius:18px;padding:18px 15px 20px;color:#553923;box-shadow:0 14px 45px #26150655}',
'#lumen-tenis-share-dialog .ll-title{font:normal 24px Georgia,serif;margin:0 0 7px;text-align:center;color:#5a3f2b}',
'#lumen-tenis-share-dialog .ll-guide{font:12px/1.5 Arial,sans-serif;color:#8c745e;text-align:center;margin:2px 0 14px}',
'#lumen-tenis-share-dialog .ll-close{float:right;border:0;background:transparent;color:#76553f;font-size:26px;min-width:34px;min-height:32px;cursor:pointer}',
'#lumen-tenis-share-dialog .ll-modes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:5px 0 12px}',
'#lumen-tenis-share-dialog .ll-modes button{font:600 12px Arial,sans-serif;border-radius:8px;border:1px solid #b9a089;background:#fff;padding:12px 5px;color:#75563b;cursor:pointer}',
'#lumen-tenis-share-dialog .ll-modes button[aria-pressed="true"]{background:#68482e;color:#fff}',
'#lumen-tenis-share-dialog .ll-status{font:12px/1.4 Arial,sans-serif;color:#856b55;text-align:center;margin:11px auto}',
'#lumen-tenis-share-dialog .ll-actions{display:flex;flex-direction:column;gap:7px;margin:12px 0}',
'#lumen-tenis-share-dialog .ll-actions button{width:100%;border-radius:26px;background:#65472f;color:white;border:1px solid #bb9b77;min-height:43px;font:600 13px Arial,sans-serif;padding:8px 12px;cursor:pointer}',
'#lumen-tenis-share-dialog .ll-actions button[disabled]{opacity:.45;cursor:wait}',
'#lumen-tenis-share-dialog .ll-actions .ll-outline{background:#fffaf6;color:#74513a}',
'#lumen-tenis-share-dialog .ll-nav{display:flex;gap:9px;margin-top:10px}',
'#lumen-tenis-share-dialog .ll-nav button{width:50%;background:#f7ebdf;border:1px solid #c7b29b;border-radius:9px;min-height:33px;color:#694d37;font:600 11px Arial,sans-serif}',
'#lumen-tenis-share-dialog .ll-caption-box{margin:12px 0 0;font:600 12px Arial,sans-serif;color:#7e5e43}',
'#lumen-tenis-share-dialog textarea{width:100%;height:114px;resize:vertical;background:white;color:#604734;border:1px solid #d6c6b7;border-radius:8px;padding:10px;font:12px/1.4 Arial,sans-serif;margin-top:5px}',
'#lumen-tenis-share-dialog .ll-copy{border:1px solid #c9ae8b!important;background:#f0e3d5!important;color:#715139!important;min-height:33px!important;padding:6px 10px!important;font:600 11px Arial,sans-serif!important}',
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
'[data-hook="product-discount-rule-name"]{display:none!important}',
'[data-hook="product-item-price-before-discount"],[data-hook="product-item-price-to-pay"]{display:none!important}',
'.ll-price-pair{display:flex;flex-direction:column;align-items:center;gap:4px;margin:9px 1px 11px;color:#5c3d2c;font-family:Arial,Helvetica,sans-serif}',
'.ll-price-pair .ll-line{display:flex;align-items:baseline;justify-content:center;flex-wrap:wrap;column-gap:4px;row-gap:1px;text-align:center}',
'.ll-price-pair .ll-caption{font-size:10px;font-weight:500;color:#8d7760}',
'.ll-price-pair .ll-value{font-size:15px;font-weight:700;color:#573b2b;white-space:nowrap}',
'.ll-price-pair .ll-wholesale .ll-caption{color:#a27a4d;font-weight:700}',
'.ll-price-pair .ll-wholesale .ll-value{color:#754a29;font-size:13px!important}',
'.ll-price-pair .ll-minqty{font-size:9px;color:#8e7c6a;text-align:center}',
'.lumen-v6-ref{display:none!important}',
'[data-hook="product-item-options"]{height:auto!important;display:block!important;padding:3px 0 6px!important}',
'.ll-has-chips [data-hook="product-options-dropdown"]{position:absolute!important;opacity:0!important;width:1px!important;height:1px!important;pointer-events:none!important;overflow:hidden!important}',
'.ll-variant{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;gap:2px;width:100%;max-width:100%;box-sizing:border-box;padding:0 1px;min-height:23px}',
'.ll-variant button{flex:1 1 0;background:#fff;color:#765439;font:500 9px Arial,sans-serif;white-space:nowrap;min-width:0;height:22px;border:1px solid #806041;border-radius:2px;padding:0 1px;cursor:pointer;box-sizing:border-box}',
'.ll-variant button[aria-pressed="true"]{background:#765439;color:#fff}',
'[data-hook="product-item-add-to-cart-button"]{background:#4b351c!important;border:1px solid #9b795b!important;border-radius:99px!important;color:#fff!important;min-height:36px!important;font:500 10px Arial,sans-serif!important}',
'[data-hook="product-item-add-to-cart-button"]::before{content:"🛒";margin-right:4px;font-size:12px;vertical-align:middle}',
'[data-hook="product-item-add-to-cart-button"]{max-width:92%!important;width:92%!important;margin-left:auto!important;margin-right:auto!important;font-size:10px!important;padding:2px 5px!important;box-sizing:border-box!important}',
'.ll-extra{display:flex;flex-direction:column;gap:5px;margin:7px 0 0}',
'.ll-extra a{border-radius:99px;display:flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;min-height:32px;padding:4px;font:600 10px Arial,sans-serif}',
'.ll-whatsapp{border:1.5px solid #95735a;color:#76513c;background:white}',
'.ll-checkout{border:1px solid #b78f62!important;background:#f1e4d5!important;color:#68452b!important;font-weight:700!important}',
'.ll-foot{display:flex;align-items:center;justify-content:center;gap:10px;font:500 10px Arial,sans-serif;color:#88705a;margin:6px 0}',
'.ll-foot button{background:none;border:0;color:#88705a;text-decoration:underline;padding:4px;cursor:pointer;font:500 10px Arial,sans-serif}',
'#lumen-tenis-pager{display:flex;justify-content:center;margin:16px auto 25px;text-align:center}',
'#lumen-tenis-pager a{display:inline-flex;justify-content:center;align-items:center;padding:11px 25px;border-radius:99px;background:#f7f0e8;border:1px solid #b69878;color:#5e402a;text-decoration:none;font:600 12px Arial,sans-serif}',
'@media(min-width:650px){#lumen-tenis-filter{padding:24px 14px 19px}#lumen-tenis-filter h1{font-size:38px}#lumen-tenis-filter .ll-btns{gap:7px}#lumen-tenis-filter .ll-btns button{flex-basis:45px;min-height:38px;font-size:13px}#lumen-tenis-filter .ll-btns button:first-child{flex-basis:64px}[data-hook="product-list-wrapper"]{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:20px!important;padding:0 18px 24px!important}[data-hook="product-item-name"]{font-size:14px!important}.ll-extra a{font-size:12px;min-height:38px}}',
'@media(min-width:1100px){[data-hook="product-list-wrapper"]{grid-template-columns:repeat(4,minmax(0,1fr))!important}}'
].join("\n");document.head.appendChild(sty);
sty.textContent+="\n/* Tênis V6 — cards compactos e dimensões padronizadas */\n[data-hook=\"product-list-wrapper\"]{row-gap:12px!important;column-gap:8px!important;padding-bottom:12px!important}\n[data-hook=\"product-item-name\"]{min-height:26px!important;margin:2px 0!important;line-height:1.2!important}\n.ll-price-pair{gap:1px!important;margin:3px 0 4px!important}\n[data-hook=\"product-item-options\"]{padding:1px 0 3px!important}\n.ll-variant{justify-content:flex-start!important;gap:3px!important;overflow-x:auto!important;min-height:27px!important;scrollbar-width:thin}\n.ll-variant button{flex:0 0 26px!important;width:26px!important;min-width:26px!important;max-width:26px!important;height:26px!important;min-height:26px!important;border-radius:5px!important;font-size:10px!important}\n.ll-extra{gap:4px!important;margin:4px 0 0!important}\n.ll-extra a,[data-hook=\"product-item-add-to-cart-button\"]{height:36px!important;min-height:36px!important;max-height:36px!important;width:100%!important;max-width:100%!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;padding:3px 6px!important;line-height:1.1!important;box-sizing:border-box!important;white-space:nowrap!important}\n[data-hook=\"product-item-add-to-cart-button\"]::before{display:inline-block!important;margin:0 3px 0 0!important;line-height:1!important;vertical-align:middle!important}\n.ll-foot{margin:3px 0 1px!important;gap:8px!important;min-height:25px!important;flex-wrap:wrap}\n.ll-foot .ll-select-item{display:inline-flex;align-items:center;gap:3px;cursor:pointer;white-space:nowrap;font:500 10px Arial,sans-serif}\n.ll-foot .ll-select-checkbox{width:15px;height:15px;margin:0;accent-color:#62452f;cursor:pointer}\n.ll-foot button{padding:4px 1px!important;white-space:nowrap}\n#lumen-tenis-filter .ll-select-tools{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;margin:8px auto 4px}\n#lumen-tenis-filter .ll-select-tools button{border:1px solid #ae947d;border-radius:12px;padding:5px 9px;background:#fffaf6;color:#674a34;font:500 10px Arial,sans-serif;cursor:pointer}\n#lumen-tenis-filter .ll-select-tools button:disabled{opacity:.4;cursor:default}\n#lumen-tenis-filter .ll-selected-count{font:500 10px Arial,sans-serif;color:#866b55}\n#lumen-tenis-filter .ll-share-hint{margin-top:6px!important}\n";
sty.textContent+="\n/* Lúmen Tênis: seis tamanhos sempre cabem numa linha, com padrão uniforme */\nhtml body [data-hook=\"product-list-grid-item\"] .ll-variant{\n display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;\n column-gap:2px!important;width:100%!important;max-width:100%!important;\n box-sizing:border-box!important;overflow:visible!important;padding:0!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-variant button{\n display:flex!important;align-items:center!important;justify-content:center!important;\n flex:none!important;width:100%!important;min-width:0!important;max-width:none!important;\n height:23px!important;min-height:23px!important;max-height:23px!important;\n margin:0!important;padding:0!important;font:500 9px/1 Arial,sans-serif!important;\n border-radius:4px!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot{\n gap:7px!important;display:flex!important;flex-wrap:nowrap!important;\n align-items:center!important;justify-content:center!important;\n margin:3px 0!important;min-height:25px!important;\n}";
sty.textContent+="\n/* V11: three choices on the same line, mobile-friendly */\n#lumen-tenis-filter .ll-share-trio{\n display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;\n width:100%;max-width:660px;box-sizing:border-box;margin:10px auto 8px;\n padding:0 4px;\n}\n#lumen-tenis-filter .ll-share-trio button{\n min-width:0;min-height:59px;max-width:100%;height:auto;\n border:1.5px solid #9d7b5f;border-radius:15px;\n background:#60432f;color:#fff;box-sizing:border-box;\n padding:7px 3px;display:flex;align-items:center;justify-content:center;\n flex-direction:column;gap:3px;white-space:normal;cursor:pointer;\n font:600 10px/1.18 Arial,Helvetica,sans-serif;text-align:center;\n}\n#lumen-tenis-filter .ll-share-trio button span{\n font:600 10px/1.18 Arial,Helvetica,sans-serif;text-align:center;\n max-width:100%;overflow-wrap:normal;\n}\n#lumen-tenis-filter .ll-share-trio button[aria-pressed=\"true\"]{\n background:#4b321f;border-color:#c49a6b;box-shadow:inset 0 0 0 1px #d4b187;\n}\n#lumen-tenis-filter .ll-share-trio button:disabled{opacity:.62;cursor:wait}\n@media(min-width:650px){\n #lumen-tenis-filter .ll-share-trio button{min-height:57px;font-size:12px}\n #lumen-tenis-filter .ll-share-trio button span{font-size:12px}\n}\n";
sty.textContent+="\n/* Instagram accepts fewer images than the iOS file share sheet in some contexts. */\n#lumen-tenis-filter .ll-instagram-compat{\n display:flex;align-items:center;justify-content:center;flex-wrap:wrap;\n gap:5px;margin:5px auto 7px;padding:0 6px;\n max-width:660px;box-sizing:border-box;\n}\n#lumen-tenis-filter .ll-instagram-compat .ll-compat-label{\n font:600 10px/1.3 Arial,Helvetica,sans-serif;color:#72533c;white-space:nowrap;\n}\n#lumen-tenis-filter .ll-instagram-compat button{\n border:1px solid #ad917b;background:#fff;color:#73553f;\n border-radius:99px;min-height:27px;padding:4px 8px;\n font:600 10px/1.15 Arial,Helvetica,sans-serif;\n white-space:nowrap;cursor:pointer;\n}\n#lumen-tenis-filter .ll-instagram-compat button[aria-pressed=\"true\"]{\n background:#735039;color:#fff;border-color:#735039;\n}\n@media(max-width:380px){\n #lumen-tenis-filter .ll-instagram-compat{gap:3px}\n #lumen-tenis-filter .ll-instagram-compat button{padding:3px 5px;font-size:9px}\n #lumen-tenis-filter .ll-instagram-compat .ll-compat-label{font-size:9px}\n}\n";
sty.textContent+="\n#lumen-tenis-filter .ll-open-results{display:block;width:min(100%,570px);min-height:48px;margin:10px auto 5px;padding:10px 15px;border:1px solid #b49375;border-radius:99px;background:#563b28;color:white;font:700 14px Arial,sans-serif;text-align:center;cursor:pointer}\n#ll-tenis-share-modal{position:fixed;inset:0;z-index:2147483600;display:none;align-items:center;justify-content:center;padding:12px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}\n#ll-tenis-share-modal.ll-visible{display:flex}\n#ll-tenis-share-modal .ll-backdrop{position:absolute;inset:0;background:rgba(35,23,15,.65)}\n#ll-tenis-share-modal .ll-dialog{position:relative;z-index:1;width:100%;max-width:470px;max-height:calc(100dvh - 26px);overflow:auto;-webkit-overflow-scrolling:touch;border:1px solid #d1baa1;border-radius:23px;padding:17px 14px 19px;background:#fffaf6;color:#553a29;box-sizing:border-box;box-shadow:0 16px 45px rgba(30,17,9,.28)}\n#ll-tenis-share-modal .ll-heading{display:flex;align-items:center;justify-content:space-between;gap:8px}\n#ll-tenis-share-modal h2{font:700 21px Georgia,serif;margin:0}\n#ll-tenis-share-modal .ll-close{border:0;background:transparent;color:#61462f;font:700 24px Arial,sans-serif;min-height:34px;min-width:34px;cursor:pointer}\n#ll-tenis-share-modal .ll-description{font:400 12px/1.5 Arial,sans-serif;color:#826b56;margin:8px 0 13px}\n#ll-tenis-share-modal .ll-choice-label{font:700 12px Arial,sans-serif;margin:13px 0 7px}\n#ll-tenis-share-modal .ll-formats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}\n#ll-tenis-share-modal .ll-formats button{min-width:0;min-height:75px;padding:8px 4px;border:1px solid #ac8c71;border-radius:13px;background:white;color:#634631;font:600 10px/1.3 Arial,sans-serif;cursor:pointer;overflow-wrap:break-word}\n#ll-tenis-share-modal .ll-emoji{display:block;font-size:18px;margin-bottom:4px}\n#ll-tenis-share-modal .ll-quantities{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}\n#ll-tenis-share-modal .ll-quantities button{min-height:41px;padding:7px;border:1px solid #ae8e72;border-radius:15px;background:white;color:#634631;font:700 12px Arial,sans-serif;cursor:pointer}\n#ll-tenis-share-modal button[aria-pressed=\"true\"]{background:#5d412b!important;color:#fff!important;border-color:#5d412b!important}\n#ll-tenis-share-modal .ll-status{min-height:43px;margin:12px 0 10px;padding:10px;border-radius:10px;background:#f1e7dc;color:#654d38;font:500 12px/1.4 Arial,sans-serif;text-align:center}\n#ll-tenis-share-modal .ll-execute{width:100%;min-height:48px;padding:10px;border:1px solid #b18a68;border-radius:99px;background:#573b26;color:#fff;font:700 14px Arial,sans-serif;cursor:pointer}\n#ll-tenis-share-modal .ll-execute:disabled{opacity:.55;cursor:wait}\n#ll-tenis-share-modal .ll-note{font:400 10px/1.45 Arial,sans-serif;color:#876b54;text-align:center;margin:10px 0 0}\n@media(max-width:390px){#ll-tenis-share-modal .ll-dialog{padding:14px 10px}#ll-tenis-share-modal .ll-formats button{font-size:9px;padding:7px 3px}}\n";

sty.textContent+="\n/* V14 - produto: botões finos e espaçados como na página inicial */\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra{\n gap:5px!important;margin:5px 0 0!important;padding:0!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-add-to-cart-button\"],\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra a{\n position:static!important;left:auto!important;top:auto!important;\n display:flex!important;flex-direction:row!important;align-items:center!important;\n justify-content:center!important;box-sizing:border-box!important;\n width:100%!important;max-width:100%!important;min-width:0!important;\n height:31px!important;min-height:31px!important;max-height:31px!important;\n margin:0!important;padding:3px 6px!important;border-radius:99px!important;\n text-align:center!important;font-size:10.5px!important;line-height:1.08!important;\n white-space:nowrap!important;opacity:1!important;pointer-events:auto!important;\n box-shadow:0 1px 2px rgba(63,40,26,.08)!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-add-to-cart-button\"]{\n background:#503820!important;border:1.5px solid #91715b!important;\n color:#fff!important;font-weight:500!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-add-to-cart-button\"]::before{\n display:inline-block!important;content:\"\"!important;\n margin:0!important;width:0!important;height:0!important;visibility:hidden!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra .ll-checkout{\n order:1!important;background:#050505!important;color:#f5ca44!important;\n border:2px solid #ed7b2c!important;font-weight:800!important;\n box-shadow:0 1px 3px rgba(220,110,25,.16)!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra .ll-whatsapp{\n order:2!important;background:#fff!important;color:#8b6451!important;\n border:1.5px solid #9c7966!important;font-weight:500!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot{\n margin:3px 0 5px!important;min-height:20px!important;gap:7px!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair{margin:2px 0 4px!important;gap:0!important}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{margin:2px 0!important}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-options\"]{padding:2px 0 3px!important}\nhtml body [data-hook=\"product-list-wrapper\"]{row-gap:13px!important}\n@media(min-width:650px){\n html body [data-hook=\"product-list-grid-item\"] .ll-extra a,\n html body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-add-to-cart-button\"]{\n  height:35px!important;min-height:35px!important;max-height:35px!important;font-size:12px!important;\n }\n}\n";
sty.textContent+="\n/* V14 – compartilhamento mais leve, editorial e delicado */\n#ll-tenis-share-modal{padding:12px!important}\n#ll-tenis-share-modal .ll-backdrop{background:rgba(45,34,25,.48)!important}\n#ll-tenis-share-modal .ll-dialog{\n max-width:410px!important;padding:17px 17px 15px!important;\n background:#fffdfa!important;border:1px solid #e7dccf!important;\n border-radius:20px!important;box-shadow:0 14px 35px rgba(40,27,17,.20)!important;\n color:#594431!important;\n}\n#ll-tenis-share-modal h2{\n font:400 21px/1.25 Georgia,'Times New Roman',serif!important;\n color:#533923!important;letter-spacing:-.4px!important;\n margin:0!important;\n}\n#ll-tenis-share-modal .ll-close{\n font:400 22px/1 Arial,sans-serif!important;color:#866e58!important;\n min-width:30px!important;min-height:30px!important;\n}\n#ll-tenis-share-modal .ll-description{\n font:400 11px/1.35 Arial,sans-serif!important;\n color:#9a826d!important;margin:4px 0 13px!important;\n}\n#ll-tenis-share-modal .ll-choice-label{\n font:700 10px/1.2 Arial,sans-serif!important;\n letter-spacing:1.25px!important;color:#9e8168!important;\n margin:11px 0 6px!important;\n}\n#ll-tenis-share-modal .ll-formats{gap:5px!important}\n#ll-tenis-share-modal .ll-formats button{\n border-radius:11px!important;border:1px solid #dbccbd!important;\n min-height:59px!important;padding:7px 4px!important;\n background:#fff!important;color:#6a4a34!important;\n font:600 10px/1.18 Arial,sans-serif!important;\n box-shadow:none!important;transition:background .1s ease!important;\n}\n#ll-tenis-share-modal .ll-emoji{font-size:15px!important;margin-bottom:4px!important}\n#ll-tenis-share-modal .ll-quantities{gap:7px!important}\n#ll-tenis-share-modal .ll-quantities button{\n min-height:35px!important;padding:5px!important;\n border-radius:12px!important;border:1px solid #d7c5b3!important;\n font:600 11px/1.15 Arial,sans-serif!important;\n background:#fff!important;color:#6a4d36!important;\n}\n#ll-tenis-share-modal button[aria-pressed=\"true\"]{\n background:#624530!important;color:#fff!important;border-color:#624530!important;\n}\n#ll-tenis-share-modal .ll-status{\n min-height:30px!important;margin:11px 0 8px!important;padding:8px 2px 5px!important;\n border-radius:0!important;border-top:1px solid #eee2d6!important;\n background:transparent!important;color:#846f5d!important;\n font:400 11px/1.4 Arial,sans-serif!important;\n}\n#ll-tenis-share-modal .ll-execute{\n min-height:42px!important;padding:8px!important;\n border-radius:99px!important;border:1px solid #bea084!important;\n background:#60432e!important;color:#fff!important;\n font:700 12px Arial,sans-serif!important;box-shadow:none!important;\n}\n#ll-tenis-share-modal .ll-note{\n font:400 9px/1.4 Arial,sans-serif!important;\n color:#a58f7c!important;margin:7px 0 0!important;\n}\n@media(max-width:380px){\n #ll-tenis-share-modal .ll-dialog{padding:15px 11px 13px!important}\n #ll-tenis-share-modal .ll-formats button{font-size:9px!important;min-height:61px!important}\n}\n";
sty.textContent+="\n/* V15: refinamento visual dos cards, sem alterar as operações Wix */\nhtml body #lumen-tenis-filter .ll-open-results{\n width:min(88%,360px)!important;max-width:360px!important;\n min-height:34px!important;height:34px!important;\n padding:5px 12px!important;margin:8px auto 3px!important;\n font:600 11px/1.15 Arial,Helvetica,sans-serif!important;\n background:#f7f0e9!important;color:#684934!important;\n border:1px solid #bba18b!important;border-radius:99px!important;\n box-shadow:none!important;\n}\nhtml body #lumen-tenis-filter .ll-share-hint{\n font-size:9px!important;margin:4px 0 0!important;\n line-height:1.3!important;color:#aa9481!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"not-image-container\"],\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"not-image-container\"]>div{\n min-height:0!important;height:auto!important;gap:0!important;\n padding-top:0!important;padding-bottom:0!important;\n justify-content:flex-start!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name-and-price-layout\"]{\n height:auto!important;min-height:0!important;\n margin:3px 0 0!important;padding:0!important;gap:0!important;\n text-align:center!important;justify-content:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{\n height:auto!important;min-height:0!important;\n margin:1px auto 2px!important;padding:0!important;\n line-height:1.17!important;text-align:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair{\n display:flex!important;align-items:center!important;\n justify-content:center!important;gap:0!important;\n margin:2px auto 3px!important;padding:0!important;\n width:100%!important;text-align:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-line{\n justify-content:center!important;align-items:baseline!important;\n margin:0!important;padding:0!important;min-height:0!important;\n width:100%!important;text-align:center!important;gap:4px!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-options\"]{\n display:block!important;height:auto!important;min-height:0!important;\n margin:0!important;padding:1px 0 2px!important;\n}\n/* Six equally sized choices fit across; one or two are centered, not left aligned. */\nhtml body [data-hook=\"product-list-grid-item\"] .ll-variant{\n display:flex!important;flex-flow:row nowrap!important;\n align-items:center!important;justify-content:center!important;\n gap:3px!important;margin:0 auto!important;\n padding:0!important;width:100%!important;max-width:100%!important;\n min-height:23px!important;overflow-x:auto!important;\n box-sizing:border-box!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-variant button{\n display:flex!important;align-items:center!important;justify-content:center!important;\n flex:0 0 calc((100% - 15px)/6)!important;\n width:calc((100% - 15px)/6)!important;min-width:0!important;\n max-width:calc((100% - 15px)/6)!important;\n height:23px!important;min-height:23px!important;max-height:23px!important;\n margin:0!important;padding:0!important;\n font:500 9px/1 Arial,sans-serif!important;\n border-radius:3px!important;box-sizing:border-box!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra{\n gap:3px!important;margin:3px 0 0!important;\n padding:0!important;align-items:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra a,\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-add-to-cart-button\"]{\n width:100%!important;min-width:0!important;max-width:100%!important;\n height:31px!important;min-height:31px!important;max-height:31px!important;\n margin:0!important;padding:2px 5px!important;\n display:flex!important;flex-flow:row nowrap!important;\n align-items:center!important;justify-content:center!important;\n gap:4px!important;line-height:1.1!important;\n border-radius:99px!important;box-sizing:border-box!important;\n white-space:nowrap!important;text-decoration:none!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra .ll-whatsapp{\n min-height:29px!important;max-height:29px!important;height:29px!important;\n background:#fff!important;color:#7e6755!important;\n border:1px solid #aa8c78!important;box-shadow:none!important;\n font:500 10px/1.1 Arial,Helvetica,sans-serif!important;\n gap:5px!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra .ll-whatsapp svg{\n flex:0 0 13px!important;width:13px!important;height:13px!important;\n display:block!important;color:#418652!important;overflow:visible!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra .ll-whatsapp span{\n display:inline-block!important;white-space:nowrap!important;\n font:inherit!important;color:inherit!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot{\n min-height:20px!important;margin:2px 0 2px!important;\n gap:7px!important;align-items:center!important;justify-content:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot button{padding:2px 1px!important}\nhtml body [data-hook=\"product-list-wrapper\"]{\n row-gap:12px!important;\n}\n@media(min-width:650px){\n html body [data-hook=\"product-list-grid-item\"] .ll-variant button{\n  height:27px!important;min-height:27px!important;max-height:27px!important;font-size:11px!important;\n }\n}\n";
sty.textContent+="\n/* V16: tipografia e ritmo vertical discretos, mantendo todos os fluxos ativos. */\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{\n font-size:11px!important;font-weight:600!important;line-height:1.14!important;\n min-height:0!important;height:auto!important;\n margin:0 auto 1px!important;padding:0!important;text-align:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name-and-price-layout\"]{\n min-height:0!important;height:auto!important;\n margin:1px 0 0!important;padding:0!important;gap:0!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair{\n gap:0!important;margin:0 auto 2px!important;padding:0!important;\n line-height:1.12!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-line{\n min-height:0!important;margin:0!important;padding:0!important;\n line-height:1.15!important;row-gap:0!important;column-gap:3px!important;\n justify-content:center!important;align-items:baseline!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-retail .ll-value{\n color:#171717!important;font-size:14.5px!important;font-weight:700!important;\n line-height:1.15!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-wholesale .ll-value{\n color:#725139!important;font-size:11.5px!important;font-weight:700!important;\n line-height:1.15!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-retail .ll-caption{\n font-size:9.5px!important;font-weight:500!important;line-height:1.15!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-wholesale .ll-caption{\n font-size:9px!important;font-weight:600!important;line-height:1.15!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-options\"]{\n min-height:0!important;height:auto!important;\n margin:0!important;padding:0 0 1px!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-variant{\n min-height:23px!important;margin:0 auto!important;padding:0!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-extra{margin:2px 0 0!important;}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot{margin:2px 0 2px!important;}\n/* More white space BETWEEN product rows, not within each card. */\nhtml body [data-hook=\"product-list-wrapper\"]{row-gap:21px!important;}\n@media(min-width:650px){\n html body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{\n  font-size:12px!important;line-height:1.17!important;\n }\n html body [data-hook=\"product-list-wrapper\"]{row-gap:25px!important;}\n}\n";
sty.textContent+="\n/* V17: preços menores e nomes realmente centralizados nos dois cards */\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name-and-price-layout\"]{\n display:flex!important;flex-direction:column!important;\n align-items:center!important;justify-content:center!important;\n width:100%!important;max-width:100%!important;min-width:0!important;\n padding:0!important;margin:1px auto 0!important;box-sizing:border-box!important;\n text-align:center!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-product-details-link\"]{\n width:100%!important;max-width:100%!important;min-width:0!important;\n box-sizing:border-box!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{\n display:block!important;align-self:center!important;\n width:100%!important;max-width:100%!important;min-width:0!important;\n box-sizing:border-box!important;\n margin:0 auto 1px!important;padding:0 3px!important;\n text-align:center!important;text-align-last:center!important;\n font-size:11px!important;line-height:1.16!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-retail .ll-value{\n color:#171717!important;font-size:13px!important;font-weight:700!important;\n}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-wholesale .ll-value{\n color:#725139!important;font-size:10.5px!important;font-weight:700!important;\n}\n@media(min-width:650px){\n html body [data-hook=\"product-list-grid-item\"] [data-hook=\"product-item-name\"]{\n  font-size:12px!important;\n }\n html body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-retail .ll-value{\n  font-size:15px!important;\n }\n html body [data-hook=\"product-list-grid-item\"] .ll-price-pair .ll-wholesale .ll-value{\n  font-size:12px!important;\n }\n}\n";
function trim(x){return String(x||"").trim()}
function name(li){return trim(li.querySelector('[data-hook="product-item-name"]')?.textContent)}
function realShoe(li){return !!name(li)&&!/(sapatilha|rasteira|tamanco|sand[aá]lia|papete|chinelo|bota|bolsa|salto|crocs)/i.test(name(li))}
function variants(li){
 const record=catalogRecord(li);
 if(record){const select=li.querySelector('select[data-hook="native-select"]');return record.sizes.map(size=>[...(select?.options||[])].find(o=>trim(o.textContent)===size&&!o.disabled)||({textContent:size,value:size,disabled:false}));}const select=li.querySelector('select[data-hook="native-select"]');if(select)return [...select.options].filter(o=>!o.disabled&&/^\d{2}$/.test(trim(o.textContent)));return (li.dataset.llInventory||"").split("|").filter(s=>/^\d{2}$/.test(trim(s))).map(size=>({textContent:size,value:size,disabled:false}));}

// Filtro de cores Lúmen: somente coleções reais do catálogo V1.
const llColorNames=["Preto","Branco","Marrom","Nude","Dourado","Prata","Vinho"];
const llColorKeys=["preto","branco","marrom","nude","dourado","prata","vinho"];
const llColorHex=["#191919","#f2f1ed","#81502f","#d5aa80","#dcae3f","#b8bcc3","#79243e"];
const llProductColors={"tenis-adidas-samba-preto":1,"tenis-adidas-samba-branco-preto":2,"tenis-adidas-samba-caramelo":4,"schutz-x-trico-off":2,"schutz-x-trico-nude":8,"schutz-x-trico-preto":1,"tamanco-schutz-branco":2,"tamanco-schutz-preto":1,"tamanco-schutz-caramelo":4,"tamanco-laco-di-valentini-ouro":16,"tamanco-laco-di-valentini-prata":32,"tamanco-laco-di-valentini-preto":1,"tamanco-laco-di-valentini-branco":2,"sapatilha-gucci-telinha-preto":1,"sapatilha-gucci-telinha-marom":4,"tamanco-biqueira-preto":1,"tamanco-ouro":16,"saltinho-tira-preto":1,"tenis-nikev-7-cafe":4,"tenis-nikev-7-off-cafe":2,"tamanco-prata":32,"tamanco-luxo-preto":1,"tamanco-luxo-whisky":4,"tamanco-luxo-ouro":16,"tamanco-tarca-ouro":16,"saltinho-tira-ouro":16,"rasteira-rafia-preta":1,"rasteira-rafia-caramelo":4,"rasteira-esferas-prata":32,"papete-birken-schutz-preto":1,"papete-birken-schutz-off":2,"papete-birken-schutz-caramelo":4,"flat-schutz-fivela-caramelo":4,"flat-schutz-fivela-preto":1,"flat-schutz-fivela-branco":2,"rasteira-strass-ouro":16,"slingback-telinha-caramelo":4,"tamanco-lumen-caramelo":4,"tamanco-lumen-cafe":4,"tamanco-lumen-ouro":16,"tamanco-lumen-branco":2,"tamanco-lumen-preto":1,"papete-prada":4,"papete-schuts-preta":1,"schutz-preta":1,"schutz-caramelo":4,"schutz-off":2,"tenis-nb-preto":1,"tenis-nb-9060-branco-preto":3,"rasteira-arezzo-prata":32,"papete-vitoria-off":2,"papete-aurora-caramelo":4,"papete-aurora-off":2,"tamanco-schuts-off":2,"tamanco-schuts-preto":1,"tamanco-schuts-prata":32,"tamanco-schuts-caramelo":4,"papete-luxo-schuts-preto":1,"papete-luxo-schuts-caramelo":4,"rasteira-boutique-ouro":16,"rasteira-serpente-marrom":4,"tenis-nb-9060-marrom":4,"tenis-nb-9060-off-vinho":66,"rasteira-prenium-prata":16,"rasteira-prenium-prata-azu":32,"schuts-cobra-strass-prata":32,"tenis-nike-fit-off-cinza":2,"nike-fit-cafe":4,"adidas-cafe":4,"tenis-nb-9060-branco-prata":34,"tamanquinho-bloco-prata":32,"rasteira-luxo-off":2,"rasteira-luxo-preto":1,"rasteira-luxo-caramelo":4,"tamanquinho-bloco-caramelo":4,"tamanquinho-bloco-preto":1,"tamanquinho-bloco-off":2,"tamanquinho-bloco-ouro":16,"anabela-monaco-preto":1,"anabela-monaco-caramelo":4,"nike-fit-branco-rose":2,"tenis-nb-9060-off-limao":2,"adidas-boston-preto":3,"adidas-boston-lilas":2,"nuvem-brizza-arezzo-branco":2,"nuvem-brizza-arezzo-preto":1,"brizza-arezzo-off":2,"brizza-arezzo-preto":1,"brizza-arezzo-branco":2,"plataforma-gucci-off":2,"tenis-nb-9060-off-cafe":2,"tenis-nb-9060-off-azul":2,"nike-fit-off-cafe":8,"nike-fit-off-caramelo":18,"salto-fino-bebece-off":2,"salto-fino-bebece-preto":1,"flatform-brizza-square-preta":1,"flatform-brizza-square-marsala":64,"flatform-brizza-square-cafe":4,"flatform-brizza-square-off":2,"flatform-brizza-arezzo-capuchinho":4,"brizza-arezzo-square-at-off":2,"brizza-arezzo-square-at-preto":1,"new-9060-off-canela":2,"new-9060-off-rosa":2,"chinelo-arezzo-caramelo":4,"chinelo-arezzo-off-3":2,"salto-mariotta-42694-ouro":16,"salto-mariotta-elettra-ouro":16,"salto-mariotta-elettra-prata":32,"salto-mariotta-ii-preto":1,"salto-mariotta-ii-dourado":16,"scarpin-mariotta-preto":1,"scarpin-mariotta-nude":8,"ana-bela-mariotta-caramelo":4,"salto-dourado-mariotta-1":2,"salto-dourado-mariotta":16,"ana-bela-mariotta-preta":1,"salto-festa-mariotta-preta":16,"saltinho-mariotta-cafe":4,"salto-mariotta-plus-preto-1":1,"salto-mariotta-plus-off":2,"nike-zoom-x-preto":1,"chinelo-arezzo-preto":1,"chinelo-arezzo-capuchinho":4,"schutz-x-preto":1,"tamanco-tais-ameixa":64,"sandalia-gisele-ouro-2":16,"ana-bela-pitaya-vermelho":64,"ana-bela-pitaya-ouro":16,"tamanco-laco-ouro":16,"tamanco-laco-caramelo":4,"tamanco-lais-marsala":64,"tamanco-lais-ouro":16,"tamanco-tais-ouro":16,"tamanco-tais-caramelo":4,"sandalia-minimalista-ouro":16,"sandalia-minimalista-caramelo":4,"sandalia-minimalista-pretro":1,"sandalia-minimalista-marsala":64,"tenis-nike-off-1":2,"salto-cristal-preto-lumen":1,"salto-cristal-off-lumen":2,"tamanco-bico-folha-lumen-off":2,"chinelo-slide-lv-off":2,"chinelo-slide-lv-preta":1,"rasteira-logo-off":2,"rasteira-medalha":4,"rasteira-carmel":4,"rasteira-fio-prata":32,"rasteira-fio-ouro":16,"rasteira-fio-caramelo":4,"saltinho-victoria-ouro":16,"tamanco-bloco-baixo-prata":32,"tamanco-bloco-off":2,"tamanco-bloco-caramelo":4,"tamanco-bloco-preto":1,"rasteira-schutz-fio-off":2,"tenis-nike-zoom-off":2,"salto-dedinho-lumen-caramelo":4,"salto-luxo-lumen-caramelo":4,"saltinho-traca-caramelo":4,"scarpin-salto-preto":1,"scarpin-salto-caramelo":4,"scarpin-cristal-preto":1,"sandalia-gisele-caramelo-2":4,"sandalia-gisele-caramelo-1":4,"sandalia-gisele-cafe":4,"sandalia-dedinho-caramelo":4,"sandalia-di-valentini-preta":1,"sandalia-di-valentini-caramelo":4,"sandalia-di-valentini-off":2,"sandalia-gisele-caramelo":4,"tenis-nb-9060-off":2,"bota-mariotta-bege":8,"bota-mariotta-cafe":4,"bota-mariotta-preta":1,"scar-flare-preto":1,"scar-flare-prata":32,"scar-flare-ouro":16,"tenis-nb-9060-vinho":64,"arezzo-brasil-cafe":4,"arezzo-brasil-preto":1,"arezzo-brasil-off":2,"rasteira-schutz-cobra-ouro":16,"rasteira-schutz-cobra-prata":32,"tenis-schutz-ii-preto":1,"rasteira-schutz-x-preto":1,"rasteira-schutz-x-off":2,"rasteira-pena-ouro":16,"rasteira-tropical-prata":32,"rasteira-h-ouro":16,"rasteira-gold-prata":32,"chinelo-virginia-preta":1,"chinelo-virginia-off":2,"tenis-nike-off":2,"rasteira-fivela-off":2,"rasteira-fivela-caramelo":4,"rasteira-fivela-prata":32,"chinelo-schutz-logo-off":2,"chinelo-schutz-logo-preto":1,"rasteira-couro-off":2,"papete-caribe-off":2,"rasteira-schutz-classica-nude":8,"rasteira-miu-miu-ouro":16,"chinelo-schutz-off-1":2,"divalentini-5409-preto-1":1,"divalentini-5409-prata-1":32,"divalentini-5406-prata-1":32,"scarpin-preto":1,"rasteira-boutique-nude":8,"rasteira-boutique-prata":32,"rasteira-boutique-02-prata":32,"rasteira-boutique-02-nude":8,"papete-dolores-cafe":4,"papete-dolores-off":2,"sandalia-salto-thay-preto":1,"sandalia-salto-gregoria-off":2,"tamanco-salto-lores-ambar":4,"falt-bloco-preta":1,"rasteira-eloah-preta":1,"chinelo-arezzo-off-1":2,"tamanco-elani-cafe":4,"tamanco-araci-cafe":4,"tamanco-araci-off":2,"rasteira-vick-cafe":4,"rasteira-vick-off":2,"rasteira-bell-off":2,"rasteira-bell-caramelo":4,"papete-couro-caramelo":4,"salto-eudora-preto":1,"salto-eudora-cafe":4,"salto-jaspira-ouro":16,"salto-jaspira-prata":32,"salto-jaspira-off":2,"salto-midian-off":2,"salto-naia-caramelo":4,"salto-light-prata":32,"chinelo-schutz-logo-preta":1,"chinelo-schutz-logo-off-1":2,"tamanco-bico-folha-caramelo":4,"tamanco-salto-fino-caramelo":4,"salto-madri-cafe":4,"salto-v-preto":1,"salto-v-off":2,"sandalia-salto-baixo-mrtt-off":2,"sandalia-de-dedo-salto-fino-mrtt-off":2,"bolsa-balada-caramelo":4,"bolsa-balada-preta":1,"papete-couro-preta":1,"salto-fino-e-calcanhar-fechado-mrtt-preta":1,"salto-croco-off":2,"salto-allm-caramelo":4,"havaiana-boho-off":2,"sandalia-essenza-mrtt-cafe":4,"chinelo-arezzo-off":2,"colcci-pandora-preta":1,"papete-birken-gringa-ouro":16,"papete-birken-gringa-caramelo":4,"papete-flor-preta":1,"rasteira-schutz-nude":8,"papete-arezzo-pedras-2":4};
state.color=llColorKeys.includes((new URLSearchParams(location.search).get("cor")||"").toLowerCase())?(new URLSearchParams(location.search).get("cor")||"").toLowerCase():"";
if(new URLSearchParams(location.search).has("lumen_export")){state.size="";state.color="";}
function llSlugFromLink(link){
 try{
  const path=new URL(link,location.origin).pathname;
  const slug=path.split(/\/product-page\//i)[1]||"";
  return decodeURIComponent(slug).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 }catch(_){return "";}
}
function llColorAllowedLink(link){
 if(!state.color)return true;
 const index=llColorKeys.indexOf(state.color);
 if(index<0)return true;
 return !!((llProductColors[llSlugFromLink(link)]||0)&(1<<index));
}
function llColorAllowed(li){
 if(!state.color)return true;
 const link=li.querySelector('[data-hook="product-item-container"]')?.href||
  li.querySelector('[data-hook="product-item-product-details-link"]')?.href||"";
 return llColorAllowedLink(link);
}
function llColorsUI(el){
 if(el.querySelector(".ll-color-shell"))return;
 const cssId="lumen-filter-colors-v1";
 if(!document.getElementById(cssId)){
  const sty=document.createElement("style");sty.id=cssId;
  sty.textContent=[
   "#lumen-tenis-filter .ll-color-shell{margin:12px auto 10px;max-width:650px}",
   "#lumen-tenis-filter .ll-color-title{font:600 11px/1.25 Arial,sans-serif;color:#624c3d;margin:0 0 8px;letter-spacing:.15px;text-align:center}",
   "#lumen-tenis-filter .ll-color-scroll{width:100%;overflow-x:auto;scrollbar-width:thin;-webkit-overflow-scrolling:touch}",
   "#lumen-tenis-filter .ll-color-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px;min-width:315px;max-width:650px;margin:0 auto}",
   "#lumen-tenis-filter .ll-color-grid button{min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:1px solid transparent;border-radius:8px;padding:6px 1px 5px;background:transparent;color:#60432e;font:500 10px/1.15 Arial,sans-serif;cursor:pointer;min-height:54px}",
   "#lumen-tenis-filter .ll-color-grid button[aria-pressed=true]{background:#f0e8df;border-color:#b69a73}",
   "#lumen-tenis-filter .ll-color-dot{width:23px;height:23px;border-radius:50%;border:1px solid rgba(85,62,40,.28);box-shadow:inset 0 1px 2px #fff5;display:block}",
   "@media(max-width:360px){#lumen-tenis-filter .ll-color-grid button{font-size:9px}}"
  ].join("\n");
  document.head.appendChild(sty);
 }
 const shell=document.createElement("div");shell.className="ll-color-shell";
 shell.innerHTML='<div class="ll-color-title">Escolha a cor</div><div class="ll-color-scroll"><div class="ll-color-grid" role="group" aria-label="Filtrar por cor"></div></div>';
 const grid=shell.querySelector(".ll-color-grid");
 llColorNames.forEach((name,index)=>{
  const btn=document.createElement("button");btn.type="button";
  btn.setAttribute("aria-label","Cor "+name);btn.dataset.cor=llColorKeys[index];
  const dot=document.createElement("span");dot.className="ll-color-dot";dot.style.backgroundColor=llColorHex[index];
  const text=document.createElement("span");text.textContent=name;
  btn.append(dot,text);
  btn.onclick=()=>{
   state.color=state.color===llColorKeys[index]?"":llColorKeys[index];
   const url=new URL(location.href);
   if(state.color)url.searchParams.set("cor",state.color);
   else url.searchParams.delete("cor");
   history.replaceState(history.state,"",url.pathname+url.search+url.hash);
   selectedProducts.clear();manualSelection=false;shareCursors.clear();
   shareSignatures.clear();shareCaps.clear();shareNotice="";
   apply();pagination();
  };
  grid.appendChild(btn);
 });
 el.querySelector(".ll-btns")?.insertAdjacentElement("afterend",shell);
}
function llUpdateColorUI(){
 const el=document.querySelector("#lumen-tenis-filter");
 if(!el)return;
 el.querySelectorAll("button[data-cor]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cor===state.color)));
}

function header(){
const root=document.querySelector(gallerySelector);if(!root)return false;
if(document.getElementById("lumen-tenis-filter"))return true;
const el=document.createElement("div");el.id="lumen-tenis-filter";
el.innerHTML="<div class=\"ll-top\">LÚMEN LUXOS · CURADORIA PREMIUM</div><h1>Tênis femininos</h1><p class=\"ll-intro\">Seus modelos favoritos, na sua numeração.</p><p class=\"ll-label\">SELECIONE O TAMANHO</p><div class=\"ll-btns\" role=\"group\" aria-label=\"Filtrar por numeração\"></div><p class=\"ll-count\" aria-live=\"polite\"></p><button type=\"button\" class=\"ll-open-results\">↗ Compartilhar resultados</button><p class=\"ll-share-hint\" role=\"status\">Escolha o formato e o tamanho do lote na janela de compartilhamento.</p>";
for(const n of ["Todos",...sizes]){const b=document.createElement("button");b.type="button";b.textContent=n;b.dataset.size=n==="Todos"?"":n;b.onclick=()=>{state.size=b.dataset.size;selectedProducts.clear();manualSelection=false;shareCursors.clear();shareSignatures.clear();shareCaps.clear();while(photoQueue.length)photoQueued.delete(photoQueue.pop().key);activeMode=null;shareNotice="";sessionStorage.setItem("lumen_tenis_size",state.size);const url=new URL(location.href);if(state.size)url.searchParams.set("tamanho",state.size);else url.searchParams.delete("tamanho");history.replaceState(history.state,"",url.pathname+url.search);apply();pagination();};el.querySelector(".ll-btns").appendChild(b)}
llColorsUI(el);
el.querySelector('.ll-open-results').addEventListener('click',openShareModal);
root.parentElement?.insertBefore(el,root);if(!new URLSearchParams(location.search).has('lumen_export'))setTimeout(preparePages,900);return true;
}

function parseMoney(x){
 const value=trim(x).replace(/[^0-9,.]/g,'').replace(/\./g,'').replace(',','.');
 const n=Number(value);return Number.isFinite(n)&&n>0?n:0;
}
function brl(n){return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function currentPrices(li){
 const before=parseMoney(li.querySelector('[data-hook="product-item-price-before-discount"]')?.textContent);
 const now=parseMoney(li.querySelector('[data-hook="product-item-price-to-pay"]')?.textContent);
 const retail=before||now;
 return {retail,wholesale:Math.round(retail*75)/100};
}
function renderPrice(li){
 const {retail,wholesale}=currentPrices(li);if(!retail)return;
 const root=li.querySelector('[data-hook="product-item-root"]');if(!root)return;
 let block=root.querySelector('.ll-price-pair');
 if(!block){
  block=document.createElement('div');block.className='ll-price-pair';
  const anchor=root.querySelector('[data-hook="product-item-name-and-price-layout"]')||root.querySelector('[data-hook="product-item-price-to-pay"]')?.parentElement;
  if(anchor)anchor.insertAdjacentElement('afterend',block);else root.appendChild(block);
 }
 const key=retail.toFixed(2)+'|'+wholesale.toFixed(2);
 if(block.dataset.values!==key){
  const line=(cls,label,value)=>'<div class="ll-line '+cls+'"><span class="ll-caption">'+label+'</span><strong class="ll-value">'+brl(value)+'</strong></div>';
  block.innerHTML=line('ll-retail','Varejo:',retail)+line('ll-wholesale','Atacado:',wholesale);
  block.dataset.values=key;
 }
}
function checkoutUrl(li,base){
 const url=new URL(base,location.origin);
 url.searchParams.set('lumen_buy','1');
 const select=li.querySelector('select[data-hook="native-select"]');
 const selectedName=trim(select?.selectedOptions?.[0]?.textContent)||(matchMedia('(min-width:1025px)').matches?trim(li.querySelector('[data-hook="dropdown-base-text"]')?.textContent):'');
 const desired=selectedName&&selectedName!=='Tamanho'?selectedName:state.size;
 if(desired)url.searchParams.set('tamanho',desired);
 return url.href;
}


sty.textContent+= "\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;justify-content:center!important;align-items:center!important;gap:10px!important;min-height:34px!important;margin:3px auto!important;width:100%!important}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot .ll-card-icon,html body [data-hook=\"product-list-grid-item\"] .ll-foot .ll-select-item{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 34px!important;width:34px!important;height:34px!important;min-height:34px!important;box-sizing:border-box!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;color:#80654e!important;text-decoration:none!important;cursor:pointer}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot .ll-select-checkbox{appearance:auto!important;width:17px!important;height:17px!important;margin:0!important;accent-color:#725139!important;cursor:pointer}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot .ll-card-icon svg{width:20px!important;height:20px!important;display:block!important;flex:none!important}\nhtml body [data-hook=\"product-list-grid-item\"] .ll-foot .ll-card-icon:disabled{opacity:.5!important}\nhtml body [data-hook=\"product-list-grid-item\"] .lumen-v6-ref,html body .lumen-v6-ref{display:none!important;visibility:hidden!important}\n";
function cardActionIcon(kind){
 const body={share:'<path d="M12 16V3m-5 5 5-5 5 5"/><path d="M5 12H3v9h18v-9h-2"/>',copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 5V3H3v13h2"/>',done:'<path d="m5 12 4 4L19 6"/>',busy:'<path d="M12 3a9 9 0 1 1-9 9"/>'}[kind];
 return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+body+'</svg>';
}
let cardToastTimer;
function cardActionNotice(message){
 let el=document.getElementById('ll-card-action-notice');
 if(!el){el=document.createElement('div');el.id='ll-card-action-notice';el.setAttribute('role','status');el.style.cssText='position:fixed;left:50%;bottom:calc(74px + env(safe-area-inset-bottom));transform:translateX(-50%);max-width:calc(100vw - 30px);width:max-content;z-index:2147483601;background:#493626;color:#fffaf4;border-radius:14px;padding:11px 16px;font:500 12px/1.4 Arial,sans-serif;text-align:center;box-shadow:0 3px 16px #0003;pointer-events:none';document.body.appendChild(el)}
 el.textContent=message;el.hidden=false;clearTimeout(cardToastTimer);cardToastTimer=setTimeout(()=>{el.hidden=true},3500);
}
function setCardAction(button,kind,label){button.innerHTML=cardActionIcon(kind);button.title=label;button.setAttribute('aria-label',label)}
function copyCardImage(li,button){
 if(button.disabled)return;
 const p=productInfo(li);
 if(!p){cardActionNotice('Produto indisponível.');return}
 if(!inventoryReady(li)){cardActionNotice('Consultando estoque. Tente novamente em instantes.');return}
 if(typeof ClipboardItem!=='function'||!navigator.clipboard?.write){cardActionNotice('Este navegador não permite copiar imagens. Use o botão de compartilhar.');return}
 button.disabled=true;setCardAction(button,'busy','Copiando imagem');
 // Safari needs clipboard.write during the original click, not after image generation.
 // PNG is the portable image MIME type for ClipboardItem.
 let png;
 try{
  png=image916(p,'retail','image/png');
  const item=new ClipboardItem({'image/png':png});
  Promise.resolve(navigator.clipboard.write([item])).then(()=>{
   setCardAction(button,'done','Imagem copiada');cardActionNotice('Imagem copiada! Agora é só colar.');
  }).catch(e=>{
   console.warn('Lúmen copiar imagem',e);cardActionNotice('Não foi possível copiar a imagem. Verifique a permissão do navegador e tente novamente.');
  }).finally(()=>{setTimeout(()=>{button.disabled=false;setCardAction(button,'copy','Copiar foto com preço e numeração')},1200)});
 }catch(e){png?.catch(()=>{});button.disabled=false;setCardAction(button,'copy','Copiar foto com preço e numeração');cardActionNotice('Não foi possível copiar a imagem neste navegador.')}
}
function desktopSizes(li){
 if(!matchMedia('(min-width:1025px)').matches||li.dataset.llChipFallback==='yes')return;
 const opts=li.querySelector('[data-hook="product-item-options"]'),drop=opts?.querySelector('button[data-hook="dropdown-base"]');
 if(!drop||opts.querySelector('select[data-hook="native-select"]')||!/tamanho|size/i.test(drop.getAttribute('aria-label')||''))return;
 const available=[...new Set(variants(li).map(o=>trim(o.textContent)).filter(x=>/^\d{2}(?:\/\d{1,2})?$/.test(x)))];
 let row=opts.querySelector('.ll-desktop-sizes');
 if(!available.length){if(row)row.remove();li.classList.remove('ll-desktop-chips');return;}
 const selected=trim(drop.querySelector('[data-hook="dropdown-base-text"]')?.textContent);
 const sig=available.join('|');
 if(!row){row=document.createElement('div');row.className='ll-desktop-sizes';opts.appendChild(row);if(!li.dataset.llPurchaseGuard){li.dataset.llPurchaseGuard='yes';li.addEventListener('click',e=>{if(li.dataset.llChoosing&&e.target.closest('[data-hook="product-item-add-to-cart-button"],.ll-checkout,.ll-whatsapp')){e.preventDefault();e.stopImmediatePropagation();cardActionNotice('Aguarde a confirmação da numeração.');}},true);}}
 if(row.dataset.sig!==sig){row.dataset.sig=sig;row.replaceChildren();
 for(const size of available){const b=document.createElement('button');b.type='button';b.textContent=size;b.dataset.size=size;b.setAttribute('aria-label','Tamanho '+size);b.addEventListener('click',e=>{
 e.preventDefault();if(document.querySelector('[data-ll-choosing]'))return;li.dataset.llChoosing='yes';const product=li.querySelector('[data-hook="product-item-container"]')?.href;
 // Wait until the Wix outside-click handler and catalog scan have finished.
 setTimeout(async()=>{
 try{
 for(let i=0;i<100&&scanning;i++)await new Promise(r=>setTimeout(r,50));
 const live=li.querySelector('button[data-hook="dropdown-base"]');if(!live||li.querySelector('[data-hook="product-item-container"]')?.href!==product)return;
 const id=live.getAttribute('aria-controls');
 if(live.getAttribute('aria-expanded')!=='true')live.click();
 for(let i=0;i<20;i++){await new Promise(r=>setTimeout(r,60));
 const o=[...document.querySelectorAll('[data-hook="dropdown-content-option"]')].find(x=>x.id.startsWith(id+'_option-')&&trim(x.title||x.textContent)===size&&x.getAttribute('aria-disabled')!=='true'&&!x.hasAttribute('disabled'));
 if(o){o.click();await new Promise(r=>setTimeout(r,160));break;}
 }
 const actual=trim(li.querySelector('[data-hook="dropdown-base-text"]')?.textContent);
 if(actual!==size){cardActionNotice('Confirme o tamanho no seletor do produto.');li.classList.remove('ll-desktop-chips');const existing=li.querySelector('.ll-desktop-sizes');if(existing)existing.remove();li.dataset.llChipFallback='yes';return;}
 const link=li.querySelector('[data-hook="product-item-container"]')?.href,checkout=li.querySelector('.ll-checkout');if(link&&checkout)checkout.href=checkoutUrl(li,link);
 }finally{delete li.dataset.llChoosing;desktopSizes(li);}
 },0);
});row.appendChild(b);}
 }
 li.classList.add('ll-desktop-chips');
 row.querySelectorAll('button').forEach(b=>{const v=String(b.dataset.size===selected);if(b.getAttribute('aria-pressed')!==v)b.setAttribute('aria-pressed',v);});
}
sty.textContent+='\n@media(min-width:1025px){.ll-desktop-chips [data-hook="product-item-options"]{position:relative!important}.ll-desktop-chips [data-hook="product-options-dropdown"]{position:relative!important;}.ll-desktop-chips .ll-desktop-sizes{position:absolute!important;inset:0!important;z-index:2!important;background:#fff!important;align-items:center!important;margin:0!important;}.ll-desktop-sizes{display:flex!important;gap:4px;justify-content:center;flex-wrap:wrap;margin:4px 0;max-width:100%}.ll-desktop-sizes button{flex:1 1 24px;min-width:24px;max-width:54px;height:27px;border:1px solid #cbb8a5;border-radius:4px;background:#fff;color:#634835;font:600 11px Arial;cursor:pointer;padding:0 2px}.ll-desktop-sizes button[aria-pressed="true"]{background:#65452e;color:#fff;border-color:#65452e}}@media(max-width:1024px){.ll-desktop-sizes{display:none!important}}';
function decorate(li){
 desktopSizes(li);
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
const wa=document.createElement("a");wa.className="ll-whatsapp";wa.innerHTML="<svg aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"currentColor\" d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.472-.148-.67.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.1-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.053 21.855h-.004a9.9 9.9 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.438-9.885 9.891-9.885a9.82 9.82 0 0 1 6.993 2.898 9.83 9.83 0 0 1 2.895 6.993c-.002 5.45-4.438 9.886-9.895 9.886m8.414-18.3A11.87 11.87 0 0 0 12.053 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.946L.057 24l6.301-1.653a11.9 11.9 0 0 0 5.69 1.448h.005c6.557 0 11.894-5.335 11.896-11.893a11.83 11.83 0 0 0-3.484-8.418Z\"/></svg><span>Comprar no WhatsApp</span>";wa.setAttribute("aria-label","Comprar no WhatsApp");wa.target="_blank";wa.rel="noopener noreferrer";
const det=document.createElement("a");det.className="ll-checkout";det.textContent="🔥 Comprar agora";det.href=checkoutUrl(li,link);det.setAttribute('aria-label','Comprar agora '+name(li));det.addEventListener('click',()=>{det.href=checkoutUrl(li,link)});
extra.append(wa,det);
root.appendChild(extra);
const foot=document.createElement("div");foot.className="ll-foot";
const share=document.createElement("button");share.type="button";share.className="ll-card-icon ll-card-share";setCardAction(share,"share","Compartilhar produto");
share.onclick=()=>shareSingleNative(li,share);
const choose=document.createElement("label");choose.className="ll-select-item";const check=document.createElement("input");check.type="checkbox";check.className="ll-select-checkbox";check.dataset.productLink=link;check.checked=manualSelection&&selectedProducts.has(link);check.setAttribute("aria-label","Selecionar "+name(li)+" para o lote");check.onchange=()=>{const p=productInfo(li);if(check.checked&&p){manualSelection=true;selectedProducts.set(p.link,p)}else{selectedProducts.delete(link);if(!selectedProducts.size)manualSelection=false}shareCursors.clear();shareSignatures.clear();shareNotice="";updateShareControl()};choose.title="Selecionar produto";choose.append(check);const copy=document.createElement("button");copy.type="button";copy.className="ll-card-icon ll-card-copy";setCardAction(copy,"copy","Copiar foto com preço e numeração");copy.onclick=()=>copyCardImage(li,copy);foot.append(choose,share,copy);extra.insertAdjacentElement("afterend",foot);
}
li.dataset.llDone="yes";const pi=productInfo(li);if(pi){
 if(cleanObserver){if(!cleanCardsWatched.has(li)){cleanCardsWatched.add(li);cleanObserver.observe(li)}}
 else if(li.getBoundingClientRect().top<window.innerHeight+300)warmClean(pi);
}
}
const catalogStock=new Map();
let catalogRecords=null,catalogComplete=false;
function catalogRecord(li){
 const link=li.querySelector('[data-hook="product-item-container"]')?.href||li.querySelector('[data-hook="product-item-product-details-link"]')?.href||'';
 return catalogStock.get(llSlugFromLink(link));
}
function stockSoldOut(li){
 const record=catalogRecord(li);if(record)return !record.inStock;
 const button=li.querySelector('[data-hook="product-item-add-to-cart-button"]');
 const status=(button?.textContent||'')+' '+(button?.getAttribute('aria-label')||'');
 if(/esgotad[oa]|sem estoque|out of stock|sold out/i.test(status))return true;
 const select=li.querySelector('select[data-hook="native-select"]');
 if(select){
  const numeric=[...select.options].filter(o=>/^\d{2}(?:\/\d{1,2})?$/.test(trim(o.textContent)));
  if(numeric.length&&numeric.every(o=>o.disabled||o.getAttribute('aria-disabled')==='true'))return true;
 }
 return false;
}
function inventoryReady(li){
 if(catalogRecord(li))return true;
 return stockSoldOut(li)||!!li.querySelector('select[data-hook="native-select"]')||
  li.dataset.llInventory!==undefined||!li.querySelector('[data-hook="product-item-options"]');
}
function inventoryPending(li){return !inventoryReady(li)}
function catalogMatches(p){
 return llColorAllowedLink(p.link)&&(!state.size||p.sizes.includes(state.size));
}
function catalogCount(n){
 if(new URLSearchParams(location.search).has('lumen_export'))return n+' modelos nesta página';
 if(!batchDone||state.scanning)return 'Consultando disponibilidade em todo o catálogo…';
 const count=buildBatchProducts().length;
 const title=count+' modelo'+(count===1?'':'s')+(state.size?' no tamanho '+state.size:' disponíveis');
 return title+(batchError?' (consulta parcial)': ' no catálogo')+(count!==n?' · '+n+' nesta página':'');
}
function apply(){
const items=[...document.querySelectorAll(gallerySelector+" "+itemSelector)];
if(!items.length)return;
let n=0;
for(const li of items){
const real=realShoe(li);const pending=inventoryPending(li);const pass=real&&!stockSoldOut(li)&&llColorAllowed(li)&&(!state.size||(pending||variants(li).some(o=>trim(o.textContent)===state.size)));
li.classList.toggle("ll-hide",!pass);if(pass)n++;
if(real){decorate(li);renderPrice(li);}
const checkout=li.querySelector(".ll-checkout");
if(checkout){const link=li.querySelector('[data-hook="product-item-container"]')?.href;if(link)checkout.href=checkoutUrl(li,link);}
const wa=li.querySelector(".ll-whatsapp");
if(wa){
const link=li.querySelector('[data-hook="product-item-container"]')?.href||"";
wa.href="https://wa.me/"+wai+"?text="+encodeURIComponent("Olá! Tenho interesse no "+name(li)+(state.size?", tamanho "+state.size:"")+". Link: "+link);
}
}
const head=document.getElementById("lumen-tenis-filter");
if(head){
head.querySelectorAll("button[data-size]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.size===state.size)));
llUpdateColorUI();
const cnt=catalogCount(n);if(head.querySelector('.ll-count').textContent!==cnt)head.querySelector('.ll-count').textContent=cnt;
 const current=Number(new URLSearchParams(location.search).get('page')||1);
 const matching=[...batchCache.entries()].filter(([num,p])=>num!==current&&p.items.some(catalogMatches)).map(([num])=>num).sort((a,b)=>a-b);
 let jump=head.querySelector('.ll-catalog-jump');
 if(!n&&batchDone&&matching.length){
  if(!jump){jump=document.createElement('a');jump.className='ll-catalog-jump';jump.style.cssText='display:block;margin:8px auto;color:#68452b;font-weight:600;text-decoration:underline';head.querySelector('.ll-count').after(jump);}
  const url=new URL(location.href);url.searchParams.set('page',String(matching[0]));if(state.size)url.searchParams.set('tamanho',state.size);else url.searchParams.delete('tamanho');if(state.color)url.searchParams.set('cor',state.color);else url.searchParams.delete('cor');
  if(jump.href!==url.href)jump.href=url.href;
  if(jump.textContent!=='Ver modelos disponíveis em outra página')jump.textContent='Ver modelos disponíveis em outra página';
 }else if(jump)jump.remove();
 updateShareControl();
}
}

const batchCache=new Map();
let batchTask=null,batchError='',batchLoading=false,batchDone=false,lastCatalogCheck=0;
function productInfo(li){
 const title=name(li);if(!title||!realShoe(li)||stockSoldOut(li))return null;
 const record=catalogRecord(li);if(record)return record;
 const link=li.querySelector('[data-hook="product-item-container"]')?.href||li.querySelector('[data-hook="product-item-product-details-link"]')?.href||'';
 if(!link)return null;
 const rawSizes=variants(li).map(o=>trim(o.textContent));
 const chips=[];
 const available=[...new Set([...rawSizes,...chips].filter(v=>/^\d{2}$/.test(v)))].sort((a,b)=>Number(a)-Number(b));
 const prices=currentPrices(li);
 const shownRetail=li.querySelector('.ll-price-pair .ll-retail .ll-value')?.textContent||'';
 const retail=prices.retail?brl(prices.retail):shownRetail.trim();
let photo='';
try{const raw=li.querySelector('wow-image')?.getAttribute('data-image-info');const data=raw?JSON.parse(raw):null;photo=data?.imageData?.uri?'https://static.wixstatic.com/media/'+data.imageData.uri:'';}catch(e){}
if(!photo)photo=li.querySelector('img')?.currentSrc||li.querySelector('img')?.src||'';
return {title,link,price:retail,wholesale:prices.wholesale?brl(prices.wholesale):'',sizes:available,photo};
}
function buildBatchProducts(){
 if(catalogComplete&&catalogRecords)return catalogRecords.filter(p=>p.inStock&&p.eligible&&catalogMatches(p));
 const all=[...[...document.querySelectorAll(gallerySelector+' '+itemSelector)].map(productInfo).filter(Boolean),...(catalogRecords||[]).filter(p=>p.inStock&&p.eligible)];
 for(const pages of batchCache.values())all.push(...pages.items);
 const unique=new Map();
 for(const p of all)if(!unique.has(p.link)&&catalogMatches(p))unique.set(p.link,p);
 return [...unique.values()];
}


async function igPhoto(url){
if(!url)return null;
try{const r=await fetch(url,{mode:'cors'});if(!r.ok)throw Error('PHOTO');
const blob=await r.blob();if(typeof createImageBitmap==='function')return await createImageBitmap(blob);
return await new Promise((ok,no)=>{const u=URL.createObjectURL(blob),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);ok(im)};im.onerror=()=>{URL.revokeObjectURL(u);no(Error('PHOTO'))};im.src=u})}
catch(e){return null}}
function pageNumbers(doc,current){
 const result=[];
 for(const a of doc.querySelectorAll('[data-hook="product-list-pagination-link-seo-link"]')){
  try{
   const url=new URL(a.href,location.href);
   if(url.pathname!=='/tenis')continue;
   const n=Number(url.searchParams.get('page')||1);
   if(Number.isSafeInteger(n)&&n>=1&&n<=100&&n!==current)result.push(n);
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
     if(!confirmed.every(inventoryReady))return;
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
function getCatalogMeta(data){
 const app=data?.appsWarmupData?.['1380b703-ce81-ff05-f115-39571d94dfcd'];
 const matches=Object.values(app||{}).map(v=>v?.catalog?.category?.productsWithMetaData).filter(m=>Array.isArray(m?.list)&&Number.isFinite(m.totalCount));
 return matches.sort((a,b)=>b.list.length-a.list.length)[0]||null;
}
async function fetchCatalogPage(page){
 const u=new URL('/tenis',location.origin);if(page>1)u.searchParams.set('page',String(page));
 let response;
 for(let attempt=0;attempt<3;attempt++){
  response=await fetch(u.href,{cache:'no-store',credentials:'same-origin'});
  if(response.ok||response.status!==429)break;
  if(attempt<2)await new Promise(done=>setTimeout(done,1800*(attempt+1)));
 }
 if(!response.ok)throw Error('Catálogo HTTP '+response.status);
 const html=await response.text();
 const raw=html.match(/<script[^>]*id=[\x22\x27]wix-warmup-data[\x22\x27][^>]*>([\s\S]*?)<\/script>/i)?.[1];
 if(!raw)throw Error('Dados do catálogo indisponíveis');
 const meta=getCatalogMeta(JSON.parse(raw));
 if(!meta)throw Error('Coleção não encontrada');
 return meta;
}
function variantInStock(v,tracked){
 if(v.isVisible===false)return false;
 const inv=v.inventory||{};
 if(tracked&&typeof inv.quantity==='number')return inv.quantity>0;
 if(/out.of.stock|sold.out/i.test(String(inv.status||'')))return false;
 if(typeof inv.quantity==='number'&&inv.quantity>0)return true;
 return /in.stock/i.test(String(inv.status||''));
}
function fromCatalog(p){
 const title=trim(p.name),slug=trim(p.urlPart);
 if(!slug||!title)return null;
 const tracked=p.isTrackingInventory===true;
 const items=Array.isArray(p.productItems)?p.productItems:[];
 const options=Array.isArray(p.options)?p.options:[];
 const sizeIndex=options.findIndex(o=>/tamanho|numera|size/i.test(o.title||o.key||''));
 const live=items.filter(v=>variantInStock(v,tracked));
 const numeric=s=>/^\d{2}(?:\/\d{1,2})?$/.test(s);
 let available=[];
 if(sizeIndex>=0){
  const choices=options[sizeIndex].selections||[];
  available=choices.filter(c=>c.visible!==false&&numeric(trim(c.value||c.description))&&
   (p.isManageProductItems&&items.length?live.some(v=>String(v.optionsSelections?.[sizeIndex])===String(c.id)):c.inStock!==false)).map(c=>trim(c.value||c.description));
 }
 const inv=p.inventory||{};
 let inStock=p.isInStock===true;
 if(p.isManageProductItems&&items.length&&tracked)inStock=inStock&&live.length>0;
 else if(tracked&&!p.isManageProductItems&&typeof inv.quantity==='number')inStock=inStock&&inv.quantity>0;
 if(!inStock)available=[];
 const rawPrice=Number(p.comparePrice)>0?Number(p.comparePrice):Number(p.price)||0;
 const photo=p.media?.[0]?.url?'https://static.wixstatic.com/media/'+p.media[0].url:(p.media?.[0]?.fullUrl||'');
 const eligible=!/(sapatilha|rasteira|tamanco|sand[aá]lia|papete|chinelo|bota|bolsa|salto|crocs)/i.test(title);
 return {title,link:new URL('/product-page/'+encodeURIComponent(slug),location.origin).href,price:rawPrice?brl(rawPrice):'',wholesale:rawPrice?brl(Math.round(rawPrice*75)/100):'',sizes:[...new Set(available)].sort((a,b)=>parseInt(a,10)-parseInt(b,10)),photo,inStock,eligible,slug};
}
async function preparePages(){
 if(new URLSearchParams(location.search).has('lumen_export'))return;
 if(batchTask)return batchTask;
 batchLoading=true;batchError='';updateShareControl();
 batchTask=(async()=>{
  let first=null;
 if(Number(new URLSearchParams(location.search).get('page')||1)===1){
  try{first=getCatalogMeta(JSON.parse(document.getElementById('wix-warmup-data')?.textContent||'null'))}catch(e){}
 }
 if(!first)first=await fetchCatalogPage(1);
  const pageSize=first.list.length||32;
  const total=first.totalCount;
  const pages=Math.max(1,Math.ceil(total/pageSize));
  const merged=new Map();const add=meta=>{for(const p of meta.list){const r=fromCatalog(p);if(r)merged.set(r.slug,r)}};
  add(first);
  // Apply known stock immediately, even when a later request is rate-limited.
  for(const [slug,r] of merged)catalogStock.set(slug,r);
  catalogRecords=[...merged.values()];
  if(pages>1)add(await fetchCatalogPage(pages));
  if(merged.size<total&&pages>2){
   for(let i=2;i<pages;i++){add(await fetchCatalogPage(i));if(merged.size>=total)break;}
  }
  if(merged.size<total)throw Error('Catálogo incompleto: '+merged.size+'/'+total);
  catalogStock.clear();for(const [slug,r] of merged)catalogStock.set(slug,r);
  catalogRecords=[...merged.values()];catalogComplete=true;
  batchCache.clear();
  const current=Number(new URLSearchParams(location.search).get('page')||1);
  for(let i=1;i<=pages;i++)if(i!==current)batchCache.set(i,{items:catalogRecords.slice((i-1)*pageSize,i*pageSize).filter(p=>p.inStock&&p.eligible),links:[]});
  state.catalogTotal=total;state.catalogAvailable=catalogRecords.filter(p=>p.inStock&&p.eligible).length;
 })().catch(error=>{
  batchError='Não foi possível consultar todo o catálogo; os produtos desta página continuam disponíveis.';
  console.warn('Lúmen catálogo',error);
 }).finally(()=>{batchDone=true;batchLoading=false;lastCatalogCheck=Date.now();apply();pagination();updateShareControl()});
 return batchTask;
}
/* V6 - unified native mobile share. No dialog, no app-specific buttons. */
const selectedProducts=new Map();
let manualSelection=false;
function saveSelections(){}
function syncSelections(){document.querySelectorAll('.ll-select-checkbox').forEach(x=>{x.checked=manualSelection&&selectedProducts.has(x.dataset.productLink)})}
function productsForNativeShare(){
 if(!manualSelection||!selectedProducts.size)return buildBatchProducts();
 const fresh=new Map(buildBatchProducts().map(p=>[p.link,p]));
 return [...selectedProducts.values()].map(p=>fresh.get(p.link)).filter(Boolean);
}
/* Three independent photo formats, one unified native sharing flow. */
const photoByMode=new Map(),failedByMode=new Set(),photoQueued=new Set(),photoQueue=[];
const photoFailureDetails=new Map();
let photoWorkers=0,shareBusy=false,shareNotice='',activeMode=null;
const shareCursors=new Map(),shareSignatures=new Map(),shareCaps=new Map();
let shareProfile='ten'; // 'max' or 'ten'
let selectedShareMode='retail';
let shareModal=null,priorOverflow='';
function batchIdentity(mode){return mode+'|'+shareProfile}
function maxProfileFiles(){return shareProfile==='ten'?10:Infinity}
function changeShareChoice(mode,profile){
 if(shareBusy)return;
 const changed=(mode&&modes[mode]&&mode!==selectedShareMode)||
  (profile&&['max','ten'].includes(profile)&&profile!==shareProfile);
 if(mode&&modes[mode])selectedShareMode=mode;
 if(profile&&['max','ten'].includes(profile))shareProfile=profile;
 if(changed)while(photoQueue.length)photoQueued.delete(photoQueue.pop().key);
 activeMode=selectedShareMode;shareNotice='';
 updateShareControl();
}
let refreshTimer=null;
const modes={clean:'Imagem limpa',sizes:'Foto + numeração',retail:'Varejo + numeração'};
function imageKey(p,mode){return mode+'¦'+[p.link,p.photo,p.price,(p.sizes||[]).join(',')].join('¦')}
function saveCanvasImage(canvas,p,mode,mime="image/jpeg"){
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>{
  if(!blob){reject(new Error('Não foi possível gerar a foto.'));return}
  const name=String(p.title||'tenis').normalize('NFD')
   .replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').slice(0,46);
  resolve(new File([blob],'Lumen-'+name+'-'+mode+(mime==='image/png'?'.png':'.jpg'),{type:mime}));
 },mime,.96));
}
function storyText(ctx,txt,y,size,maxWidth){
 ctx.save();ctx.textAlign='left';ctx.textBaseline='middle';
 let fontSize=size;do{ctx.font='600 '+fontSize+'px Arial,Helvetica,sans-serif';if(ctx.measureText(txt).width<=maxWidth)break;fontSize-=2}while(fontSize>22);
 const width=ctx.measureText(txt).width;
 ctx.fillStyle='#fff';ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=6;ctx.shadowOffsetY=2;
 ctx.fillText(txt,72,y);ctx.restore();return width;
}
function storyTag(ctx,x,y){
 // Tag tip and hole face the upper right. Vector icon, not an emoji.
 ctx.save();ctx.translate(x,y);ctx.scale(.93,.93);
 ctx.strokeStyle='#f3d3a0';ctx.lineWidth=3.5;ctx.lineJoin='round';ctx.lineCap='round';
 ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=4;
 ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(40,18);ctx.lineTo(18,40);ctx.lineTo(0,22);ctx.lineTo(22,0);ctx.closePath();ctx.stroke();
 ctx.beginPath();ctx.arc(30,10,3,0,Math.PI*2);ctx.stroke();ctx.restore();
}
function storySizesCard(ctx,available){
 if(!available)return;
 const sizes=available.split('·').map(s=>s.trim()).filter(Boolean).join(' · ');
 const cx=540,top=268,h=182,heartY=248;
 ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';ctx.lineCap='round';
 let fontSize=40;ctx.font='400 '+fontSize+'px Georgia, "Times New Roman", serif';
 let width=Math.max(558,Math.min(850,ctx.measureText(sizes).width+100));
 while(ctx.measureText(sizes).width>width-94&&fontSize>20){fontSize-=1;ctx.font='400 '+fontSize+'px Georgia, "Times New Roman", serif';}
 const x=cx-width/2;
 storySoftShade(ctx,cx,top+h/2-12,width/2+110,175);
 function rounded(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
 // Transparent champagne glass, preserving the original photograph.
 const glass=ctx.createLinearGradient(x,top,x+width,top+h);
 glass.addColorStop(0,'rgba(255,230,201,.47)');glass.addColorStop(.55,'rgba(244,216,188,.48)');glass.addColorStop(1,'rgba(255,232,208,.38)');
 rounded(x,top,width,h,65);ctx.fillStyle=glass;ctx.fill();ctx.strokeStyle='rgba(255,236,209,.9)';ctx.lineWidth=1.8;ctx.stroke();
 // Translucent caramel capsule for the available sizes.
 const inset=28,pillY=355,pillH=67;
 const brown=ctx.createLinearGradient(x,pillY,x+width,pillY+pillH);
 brown.addColorStop(0,'rgba(139,77,39,.64)');brown.addColorStop(1,'rgba(112,55,26,.66)');
 rounded(x+inset,pillY,width-2*inset,pillH,pillH/2);ctx.fillStyle=brown;ctx.fill();ctx.strokeStyle='rgba(255,222,183,.45)';ctx.lineWidth=1.4;ctx.stroke();
 const title='Numerações disponíveis';ctx.font='italic 36px Georgia, "Times New Roman", serif';
 const tw=ctx.measureText(title).width;
 ctx.fillStyle='#482917';ctx.fillText(title,cx,320);
 ctx.strokeStyle='rgba(147,87,47,.8)';ctx.lineWidth=1.8;
 const left=cx-tw/2-20,right=cx+tw/2+20;
 ctx.beginPath();ctx.moveTo(Math.max(x+36,left-46),321);ctx.lineTo(left,321);ctx.moveTo(right,321);ctx.lineTo(Math.min(x+width-36,right+46),321);ctx.stroke();
 ctx.font='400 '+fontSize+'px Georgia, "Times New Roman", serif';ctx.fillStyle='#fff0dc';
 ctx.shadowColor='rgba(56,25,10,.25)';ctx.shadowBlur=2;ctx.fillText(sizes,cx,pillY+pillH/2+1);ctx.shadowBlur=0;
 // Small generic heart medallion, suitable for every product category.
 ctx.beginPath();ctx.arc(cx,heartY,40,0,Math.PI*2);
 const medal=ctx.createLinearGradient(cx-30,heartY-40,cx+35,heartY+40);
 medal.addColorStop(0,'rgba(179,121,74,.86)');medal.addColorStop(1,'rgba(112,61,34,.83)');
 ctx.fillStyle=medal;ctx.fill();ctx.strokeStyle='#f8dfb8';ctx.lineWidth=1.8;ctx.stroke();
 ctx.beginPath();ctx.moveTo(cx,heartY+17);
 ctx.bezierCurveTo(cx-10,heartY+7,cx-22,heartY-2,cx-19,heartY-10);
 ctx.bezierCurveTo(cx-15,heartY-24,cx-3,heartY-19,cx,heartY-10);
 ctx.bezierCurveTo(cx+3,heartY-19,cx+15,heartY-24,cx+19,heartY-10);
 ctx.bezierCurveTo(cx+22,heartY-2,cx+10,heartY+7,cx,heartY+17);
 ctx.strokeStyle='#ffebc9';ctx.lineWidth=2.1;ctx.stroke();
 function sparkle(x,y,r){ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+2,y-2,x+r,y);ctx.quadraticCurveTo(x+2,y+2,x,y+r);ctx.quadraticCurveTo(x-2,y+2,x-r,y);ctx.quadraticCurveTo(x-2,y-2,x,y-r);ctx.fillStyle='#f5ce91';ctx.fill();}
 sparkle(cx-70,heartY-13,14);sparkle(cx+70,heartY-13,11);
 ctx.restore();
}
function storySoftShade(ctx,cx,cy,rx,ry){
 ctx.save();ctx.translate(cx,cy);ctx.scale(rx,ry);
 const g=ctx.createRadialGradient(0,0,0,0,0,1);
 g.addColorStop(0,'rgba(0,0,0,.34)');g.addColorStop(.46,'rgba(0,0,0,.26)');
 g.addColorStop(.72,'rgba(0,0,0,.12)');g.addColorStop(1,'rgba(0,0,0,0)');
 ctx.fillStyle=g;ctx.fillRect(-1,-1,2,2);ctx.restore();
}
function storyRetailCard(ctx,retail,available){
 const x=64,top=210,h=82,sy=310,sh=70;
 ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';ctx.lineCap='round';
 function rounded(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
 function gold(x,y,w,h){const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'#bb9056');g.addColorStop(.4,'#f2d49c');g.addColorStop(.75,'#c59a60');g.addColorStop(1,'#ead0a0');return g;}
 function border(x,y,w,h){ctx.save();ctx.strokeStyle=gold(x,y,w,h);ctx.lineWidth=1.8;ctx.shadowColor='rgba(255,200,120,.22)';ctx.shadowBlur=4;ctx.stroke();ctx.restore();}
 function heart(cx,cy){ctx.save();ctx.translate(cx,cy);ctx.scale(.62,.62);ctx.beginPath();ctx.moveTo(0,25);ctx.bezierCurveTo(-13,12,-33,-2,-29,-15);ctx.bezierCurveTo(-23,-32,-7,-30,0,-16);ctx.bezierCurveTo(7,-30,23,-32,29,-15);ctx.bezierCurveTo(33,-2,13,12,0,25);ctx.strokeStyle='#f5d69b';ctx.lineWidth=3.8;ctx.stroke();ctx.restore();}
 let priceSize=49;ctx.font='bold '+priceSize+'px Georgia, "Times New Roman", serif';
 const w=Math.max(338,Math.min(500,ctx.measureText(retail).width+126)),creamW=w-76;
 while(ctx.measureText(retail).width>creamW-32&&priceSize>25){priceSize--;ctx.font='bold '+priceSize+'px Georgia, "Times New Roman", serif';}
 const label='Numerações: ',sizes=available?available.split('·').map(v=>v.trim()).filter(Boolean).join(' · '):'';
 let size=29;
 function measure(){ctx.font='400 '+size+'px Arial, Helvetica, sans-serif';const a=ctx.measureText(label).width;ctx.font='600 '+size+'px Arial, Helvetica, sans-serif';return [a,ctx.measureText(sizes).width];}
 let [a,b]=measure();const sw=Math.max(330,Math.min(820,a+b+108));
 while(a+b>sw-98&&size>18){size--;[a,b]=measure();}
 const maxW=sizes?Math.max(w,sw):w;
 storySoftShade(ctx,x+maxW/2,sizes?top+82:top+h/2,maxW/2+108,sizes?164:105);
 const bg=ctx.createLinearGradient(x,top,x+w,top+h);bg.addColorStop(0,'rgba(132,78,38,.48)');bg.addColorStop(1,'rgba(76,39,18,.56)');
 rounded(x,top,w,h,h/2);ctx.fillStyle=bg;ctx.fill();border(x,top,w,h);
 const cream=ctx.createLinearGradient(x,top,x+creamW,top+h);cream.addColorStop(0,'rgba(255,236,208,.82)');cream.addColorStop(1,'rgba(247,221,182,.80)');
 rounded(x+1.5,top+1.5,creamW-1.5,h-3,(h-3)/2);ctx.fillStyle=cream;ctx.fill();
 ctx.font='bold '+priceSize+'px Georgia, "Times New Roman", serif';ctx.fillStyle='#542807';ctx.fillText(retail,x+creamW/2,top+h/2+2);
 heart(x+w-38,top+h/2+1);
 if(sizes){
  const glass=ctx.createLinearGradient(x,sy,x+sw,sy+sh);glass.addColorStop(0,'rgba(110,62,30,.42)');glass.addColorStop(1,'rgba(72,38,20,.48)');
  rounded(x,sy,sw,sh,sh/2);ctx.fillStyle=glass;ctx.fill();border(x,sy,sw,sh);
  ctx.save();ctx.translate(x+23,sy+18);ctx.scale(.84,.84);ctx.strokeStyle='#f5d492';ctx.lineWidth=2.7;ctx.beginPath();ctx.moveTo(40,0);ctx.lineTo(40,18);ctx.lineTo(18,40);ctx.lineTo(0,22);ctx.lineTo(22,0);ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(30,10,3,0,Math.PI*2);ctx.stroke();ctx.restore();
  const start=x+74+(sw-94-a-b)/2;
  ctx.textAlign='left';ctx.fillStyle='#fff8ef';ctx.shadowColor='rgba(0,0,0,.38)';ctx.shadowBlur=3;
  ctx.font='400 '+size+'px Arial, Helvetica, sans-serif';ctx.fillText(label,start,sy+sh/2+1);
  ctx.font='600 '+size+'px Arial, Helvetica, sans-serif';ctx.fillText(sizes,start+a,sy+sh/2+1);
 }
 ctx.restore();
}
function storyDetails(ctx,mode,retail,available){
 if(mode==='retail'){storyRetailCard(ctx,retail,available);return;}
 if(mode==='sizes'){storySizesCard(ctx,available);return;}
 const hasPrice=mode==='retail';
 const label=available?'Numerações: '+available:'';
 // Smooth black translucent vignette behind the labels, no rectangular edge.
 ctx.save();ctx.translate(160,hasPrice?268:245);ctx.scale(1,.47);
 const shade=ctx.createRadialGradient(0,0,30,0,0,660);
 shade.addColorStop(0,'rgba(0,0,0,.62)');shade.addColorStop(.40,'rgba(0,0,0,.48)');
 shade.addColorStop(.72,'rgba(0,0,0,.20)');shade.addColorStop(1,'rgba(0,0,0,0)');
 ctx.fillStyle=shade;ctx.fillRect(-660,-660,1320,1320);ctx.restore();
 // 220px+ top safe area for the Instagram profile identification.
 if(hasPrice){
  const width=storyText(ctx,retail,250,50,875);
  storyTag(ctx,72+width+16,231);
  if(label){
   ctx.save();ctx.strokeStyle='#e9c794';ctx.lineWidth=2;
   ctx.beginPath();ctx.moveTo(72,291);ctx.lineTo(Math.min(1000,72+width+56),291);ctx.stroke();ctx.restore();
   storyText(ctx,label,326,35,936);
  }
 }else if(label){storyText(ctx,label,250,35,936)}
}
async function image916(p,mode,mime="image/jpeg"){
 if(mode==='clean')return cleanPhoto(p);
 const available=[...new Set((p.sizes||[]).map(n=>String(n).trim()).filter(n=>/^\d{2}$/.test(n)))]
  .sort((a,b)=>Number(a)-Number(b)).join(' · ');
 const retail=String(p.price||'').trim();
 // Never export a clean-looking picture from a mode that requires text:
 // missing data is a visible failure rather than silently omitting labels.
 if(!available)throw Error('Numerações disponíveis não cadastradas para '+p.title);
 if(mode==='retail'&&!/R\$\s*\d/.test(retail))throw Error('Preço de varejo indisponível para '+p.title);
 const photo=await igPhoto(p.photo);
 if(!photo?.width||!photo?.height)throw Error('Fotografia indisponível para '+p.title);
 try{
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
  const c=canvas.getContext('2d');if(!c)throw Error('Canvas indisponível');
  const cover=Math.max(1080/photo.width,1920/photo.height);
  const cropW=1080/cover,cropH=1920/cover;
  c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  c.drawImage(photo,(photo.width-cropW)/2,(photo.height-cropH)/2,cropW,cropH,0,0,1080,1920);
  // Single high-quality 9:16 photo; top-left details, bottom fully clear.
  storyDetails(c,mode,retail,available);
  return await saveCanvasImage(canvas,p,mode,mime);
 }finally{if(typeof photo.close==='function')photo.close()}
}

function refreshNativeSoon(){
 if(refreshTimer)return;
 refreshTimer=setTimeout(()=>{refreshTimer=null;updateShareControl()},170);
}
function preloadNative(products,mode){
 if(!modes[mode])return;
 for(const p of products){
  const key=imageKey(p,mode);
  if(photoByMode.has(key)||photoQueued.has(key)||failedByMode.has(key))continue;
  photoQueued.add(key);photoQueue.push({p,mode,key});
 }
 runNextPhoto();
}
function runNextPhoto(){
 while(photoWorkers<2&&photoQueue.length){
  const task=photoQueue.shift();photoWorkers++;
  image916(task.p,task.mode).then(file=>photoByMode.set(task.key,file))
   .catch(error=>{failedByMode.add(task.key);photoFailureDetails.set(task.key,String(error?.message||error));console.warn('Lúmen share',task.mode,task.p.title,error)})
   .finally(()=>{
    photoQueued.delete(task.key);photoWorkers--;
    runNextPhoto();refreshNativeSoon();
   });
 }
}

function nativeLimit(files){
 if(!files.length||typeof navigator.share!=='function')return 0;
 if(typeof navigator.canShare!=='function')return files.length;
 // O Chromium pode limitar a 10 imagens por invocação, mesmo com canShare=true.
 // Em outros navegadores, consulta-se o maior lote aceito pela API nativa.
 const ua=navigator.userAgent||'';
 const chromium=/Chrom(e|ium)|EdgA|Edg\\/|SamsungBrowser/i.test(ua)&&!/CriOS|FxiOS/i.test(ua);
 const ceiling=chromium?Math.min(files.length,10):files.length;
 let lo=0,hi=ceiling;
 while(lo<hi){
  const mid=Math.ceil((lo+hi)/2);
  try{if(navigator.canShare({files:files.slice(0,mid)}))lo=mid;else hi=mid-1}
  catch(e){hi=mid-1}
 }
 return lo;
}
function noteNative(message){shareNotice=message;updateShareControl()}
const cleanFiles=new Map(),cleanPending=new Set(),cleanJobs=[],cleanFailures=new Set();
const cleanCardsWatched=new WeakSet();
const cleanObserver=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting)continue;const li=entry.target;
 const p=productInfo(li);if(p)warmClean(p);cleanObserver.unobserve(li);}
},{rootMargin:'420px 0px 420px 0px'}):null;
let cleanActive=0;
async function cleanPhoto(p){
const photo=await igPhoto(p.photo);if(!photo?.width||!photo?.height)throw Error('Foto indisponível');
try{const canvas=document.createElement('canvas');canvas.width=1440;canvas.height=2560;
const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas indisponível');
const cover=Math.max(1440/photo.width,2560/photo.height),w=1440/cover,h=2560/cover;
ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
ctx.drawImage(photo,(photo.width-w)/2,(photo.height-h)/2,w,h,0,0,1440,2560);
const jpeg=await new Promise((resolve,reject)=>canvas.toBlob(x=>x?resolve(x):reject(Error('JPEG')),'image/jpeg',.95));
return new File([jpeg],'Lumen-'+String(p.title||'tenis').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').slice(0,50)+'.jpg',{type:'image/jpeg'});
}finally{if(typeof photo.close==='function')photo.close()}}
function warmClean(p){if(!p?.photo||cleanFiles.has(p.link)||cleanPending.has(p.link)||cleanFailures.has(p.link))return;
cleanPending.add(p.link);cleanJobs.push(p);function work(){if(cleanActive>=1||!cleanJobs.length)return;
const x=cleanJobs.shift();cleanActive++;cleanPhoto(x).then(f=>{cleanFiles.set(x.link,f);document.querySelectorAll('.ll-foot button').forEach(b=>{if(b.classList.contains('ll-card-share')&&b.dataset.preparing==='1'&&b.closest('[data-hook="product-list-grid-item"]')?.querySelector('[data-hook="product-item-container"]')?.href===x.link){delete b.dataset.preparing;setCardAction(b,'share','Compartilhar produto')}});}).catch(e=>{cleanFailures.add(x.link);console.warn('Lumen foto limpa',e)}).finally(()=>{cleanPending.delete(x.link);cleanActive--;work()})}
while(cleanActive<1&&cleanJobs.length)work()}
function shareSingleNative(li,button){
 const p=productInfo(li);if(!p)return;
 const file=cleanFiles.get(p.link);
 if(!file){
  if(cleanFailures.has(p.link)){noteNative('A foto deste modelo está indisponível.');return}
  warmClean(p);button.dataset.preparing='1';setCardAction(button,'busy','Preparando foto');
  cardActionNotice('Preparando a foto. Toque novamente no ícone de compartilhar.');return;
 }
 if(typeof navigator.share!=='function'){noteNative('Abra a página no Safari para compartilhar fotos.');return}
 const caption=['✨ *'+p.title+'*','🛍️ *Valor de varejo:* '+p.price,
 '📦 *Valor de atacado:* '+p.wholesale,
 '👟 *Numerações disponíveis:* '+(p.sizes.join(', ')||'Consultar disponibilidade'),
 '🔗 *Link de compra:* '+p.link].join('\n\n');
 let result;
 try{
  // Safari requires that share runs before clipboard or any awaited action.
  result=navigator.share({files:[file],text:caption,title:p.title});
 }catch(e){noteNative('Falha ao abrir compartilhamento: '+(e.message||'tente novamente'));return}
 Promise.resolve(result).then(()=>{
  // Clipboard fallback only AFTER the native share, never before.
  if(navigator.clipboard?.writeText)navigator.clipboard.writeText(caption).catch(()=>{});
 }).catch(e=>{if(e?.name!=='AbortError')noteNative('Erro no envio da foto: '+(e.message||'tente novamente'))});
}

/* The secondary dialog lets the customer choose image design and quantity.
   It never opens a second browser window or leaves the collection page. */
function ensureShareModal(){
 if(shareModal?.isConnected)return shareModal;
 const el=document.createElement('div');
 el.id='ll-tenis-share-modal';
 el.setAttribute('role','dialog');
 el.setAttribute('aria-modal','true');
 el.setAttribute('aria-label','Compartilhar resultados');
 el.innerHTML='<div class="ll-backdrop"></div>'+
  '<section class="ll-dialog" tabindex="-1">'+
  '<div class="ll-heading"><h2>Compartilhar fotos</h2><button type="button" class="ll-close" aria-label="Fechar">×</button></div>'+
  '<p class="ll-description">Selecione o estilo e a quantidade para enviar.</p>'+
  '<p class="ll-choice-label">FORMATO</p>'+
  '<div class="ll-formats" role="group" aria-label="Formato da foto">'+
  '<button type="button" data-share-mode="clean"><span class="ll-emoji">📷</span>Foto limpa</button>'+
  '<button type="button" data-share-mode="sizes"><span class="ll-emoji">🔢</span>Numerações</button>'+
  '<button type="button" data-share-mode="retail"><span class="ll-emoji">💰</span>Varejo + números</button></div>'+
  '<p class="ll-choice-label">QUANTIDADE POR ENVIO</p>'+
  '<div class="ll-quantities" role="group" aria-label="Quantidade por envio">'+
  '<button type="button" data-share-profile="max">Envio máximo</button>'+
  '<button type="button" data-share-profile="ten">De 10 em 10</button></div>'+
  '<p class="ll-status" role="status" aria-live="polite"></p>'+
  '<button type="button" class="ll-execute">Compartilhar fotos</button>'+
  '<p class="ll-note">As próximas 10 fotos são preparadas automaticamente.</p>'+
  '</section>';
 document.body.appendChild(el);shareModal=el;
 el.querySelector('.ll-backdrop').addEventListener('click',closeShareModal);
 el.querySelector('.ll-close').addEventListener('click',closeShareModal);
 el.querySelectorAll('[data-share-mode]').forEach(b=>b.addEventListener('click',()=>changeShareChoice(b.dataset.shareMode,null)));
 el.querySelectorAll('[data-share-profile]').forEach(b=>b.addEventListener('click',()=>changeShareChoice(null,b.dataset.shareProfile)));
 el.querySelector('.ll-execute').addEventListener('click',()=>shareFilteredList(selectedShareMode));
 return el;
}
function openShareModal(){
 ensureShareModal();
 shareModal.classList.add('ll-visible');
 priorOverflow=document.body.style.overflow;
 document.body.style.overflow='hidden';
 activeMode=selectedShareMode;shareNotice='';
 if(!batchTask&&!batchDone)preparePages();
 updateShareControl();
 shareModal.querySelector('.ll-dialog')?.focus({preventScroll:true});
}
function closeShareModal(){
 if(!shareModal)return;
 shareModal.classList.remove('ll-visible');
 document.body.style.overflow=priorOverflow;
}
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&shareModal?.classList.contains('ll-visible'))closeShareModal();
});

/* Native share must run immediately from the dialog button's click gesture.
   Quantity "max" uses the browser's supported file count; quantity "ten"
   caps each invocation at 10 and prepares the following ten before it is needed. */
function currentShareState(mode=selectedShareMode){
 const products=productsForNativeShare(),key=batchIdentity(mode);
 const signature=products.map(p=>imageKey(p,mode)).join('§');
 if(signature!==shareSignatures.get(key)){
  shareSignatures.set(key,signature);
  shareCursors.set(key,0);
 }
 const cursor=shareCursors.get(key)||0;
 const cap=shareProfile==='ten'?10:(shareCaps.get(key)||Infinity);
 const candidates=products.slice(cursor,cursor+cap);
 const next=shareProfile==='ten'?products.slice(cursor+10,cursor+20):[];
 return {products,key,cursor,candidates,next};
}
function warmShareGroups(){
 if(!shareModal?.classList.contains('ll-visible')||!batchDone)return;
 const state=currentShareState(selectedShareMode);
 if(state.cursor>=state.products.length)return;
 preloadNative([...state.candidates,...state.next],selectedShareMode);
}
function maxBrowserFiles(files,key){
 if(!files.length||typeof navigator.share!=='function')return 0;
 const cap=Math.min(files.length,shareProfile==='ten'?10:Infinity,shareCaps.get(key)||Infinity);
 if(typeof navigator.canShare!=='function')return cap;
 let low=0,high=cap;
 while(low<high){
  const n=Math.ceil((low+high)/2);
  try{
   if(navigator.canShare({files:files.slice(0,n)}))low=n;
   else high=n-1;
  }catch(error){high=n-1}
 }
 return low;
}
function shareFilteredList(mode){
 if(shareBusy||!modes[mode])return;
 if(!batchDone){
  if(!batchTask)preparePages();
  shareNotice='Carregando os modelos de todas as páginas. Confira novamente quando estiver pronto.';
  updateShareControl();return;
 }
 const state=currentShareState(mode),{products,key,cursor,candidates}=state;
 if(!products.length){shareNotice='Nenhum modelo disponível neste filtro.';updateShareControl();return}
 if(cursor>=products.length){
  shareCursors.set(key,0);shareNotice='Sequência reiniciada. Os primeiros modelos estão disponíveis.';
  warmShareGroups();updateShareControl();return;
 }
 warmShareGroups();
 const waiting=candidates.filter(p=>!photoByMode.has(imageKey(p,mode))&&!failedByMode.has(imageKey(p,mode)));
 if(waiting.length){
  shareNotice='Preparando '+waiting.length+' foto(s). O botão será liberado quando estiverem prontas.';
  updateShareControl();return;
 }
 const valid=candidates.map(p=>({p,file:photoByMode.get(imageKey(p,mode))})).filter(x=>x.file);
 if(!valid.length){
  shareNotice='As imagens deste grupo estão indisponíveis. Verifique as fotos no catálogo.';
  updateShareControl();return;
 }
 const files=valid.map(x=>x.file),count=maxBrowserFiles(files,key);
 if(!count){
  shareNotice='O navegador não aceita estas imagens. Selecione lotes de 10 ou outro formato.';
  updateShareControl();return;
 }
 let request;
 try{
  // Synchronous direct user interaction; no await, clipboard, rendering or fetch.
  request=navigator.share({files:files.slice(0,count)});
 }catch(error){
  if(count>1)shareCaps.set(key,Math.max(1,Math.floor(count/2)));
  shareNotice='O lote foi recusado. Toque novamente para tentar com menos fotos.';
  updateShareControl();return;
 }
 shareBusy=true;updateShareControl();
 Promise.resolve(request).then(()=>{
  const last=valid[count-1].p;
  const moved=candidates.findIndex(p=>p.link===last.link);
  shareCursors.set(key,cursor+Math.max(1,moved+1));
  shareNotice='';
  warmShareGroups();
 }).catch(error=>{
  if(error?.name==='AbortError')shareNotice='Compartilhamento cancelado. Toque novamente para tentar.';
  else{
   if(count>1)shareCaps.set(key,Math.max(1,Math.floor(count/2)));
   shareNotice='O aplicativo recusou o lote. Toque novamente para tentar com menos fotos.';
  }
 }).finally(()=>{shareBusy=false;updateShareControl()});
}
function updateShareControl(){
 const header=document.getElementById('lumen-tenis-filter');if(!header)return;
 syncSelections();
 const trigger=header.querySelector('.ll-open-results');
 if(trigger)trigger.disabled=batchDone&&!productsForNativeShare().length;
 if(!shareModal?.classList.contains('ll-visible'))return;
 const mode=selectedShareMode;
 const state=currentShareState(mode),{products,cursor,candidates,next}=state;
 shareModal.querySelectorAll('[data-share-mode]').forEach(button=>{
  const pressed=String(button.dataset.shareMode===mode);
  if(button.getAttribute('aria-pressed')!==pressed)button.setAttribute('aria-pressed',pressed);
  button.disabled=shareBusy;
 });
 shareModal.querySelectorAll('[data-share-profile]').forEach(button=>{
  const pressed=String(button.dataset.shareProfile===shareProfile);
  if(button.getAttribute('aria-pressed')!==pressed)button.setAttribute('aria-pressed',pressed);
  button.disabled=shareBusy;
 });
 if(batchDone&&products.length&&cursor<products.length)warmShareGroups();
 const ready=candidates.filter(p=>photoByMode.has(imageKey(p,mode))).length;
 const failed=candidates.filter(p=>failedByMode.has(imageKey(p,mode))).length;
 const pending=candidates.length-ready-failed;
 const failures=candidates.filter(p=>failedByMode.has(imageKey(p,mode)))
  .map(p=>photoFailureDetails.get(imageKey(p,mode))).filter(Boolean);

 const nextReady=next.filter(p=>photoByMode.has(imageKey(p,mode))).length;
 let status=shareNotice;
 if(!status){
  if(!batchDone)status='Reunindo os modelos do catálogo…';
  else if(!products.length)status='Nenhum produto disponível neste filtro.';
  else if(cursor>=products.length)status='Todos os '+products.length+' modelos concluídos. Você pode recomeçar.';
  else if(pending)status='Preparando fotos '+ready+'/'+candidates.length+'…';
  else if(failed&&ready)status=ready+' fotos prontas; '+failed+' sem dados completos. '+(failures[0]||'');
  else if(failed&&!ready)status='Não foi possível preparar as fotos: '+(failures[0]||'dados indisponíveis');
  else if(shareProfile==='ten'){
   const begin=cursor+1,last=Math.min(cursor+10,products.length);
   status='Fotos '+begin+'–'+last+' de '+products.length+' · '+ready+' prontas.';
   if(next.length)status+=' Próximo lote: '+nextReady+'/'+next.length+'.';
  }else status='Prontas '+ready+' fotos. Envie o máximo permitido pelo celular.';
 }
 const text=shareModal.querySelector('.ll-status');
 if(text&&text.textContent!==status)text.textContent=status;
 const button=shareModal.querySelector('.ll-execute');
 if(button){
  const total=products.length,done=total>0&&cursor>=total;
  const label=done?'Recomeçar compartilhamento':shareBusy?'Abrindo compartilhamento…':
    pending?'Preparando '+ready+'/'+candidates.length+' fotos…':
    'Compartilhar '+ready+' foto'+(ready===1?'':'s');
  if(button.textContent!==label)button.textContent=label;
  button.disabled=shareBusy||!batchDone||!total||(!done&&pending>0)||(!done&&ready===0);
 }
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
if(state.color)url.searchParams.set("cor",state.color);
box.style.display="flex";
if(!box.querySelector("a"))box.appendChild(document.createElement("a"));
const a=box.querySelector("a");a.href=url.href;a.textContent=next?"VER MAIS TÊNIS":"VOLTAR À PRIMEIRA PÁGINA";
}
let scanning=false;
async function scanDesktop(){
if(scanning||document.querySelector('[data-ll-choosing]'))return;
const items=[...document.querySelectorAll(gallerySelector+" "+itemSelector)];
if(!items.some(li=>realShoe(li)&&inventoryPending(li)&&li.querySelector('button[data-hook="dropdown-base"]')))return;
scanning=true;state.scanning=true;
for(const li of items){
if(!realShoe(li)||catalogRecord(li)||stockSoldOut(li)||li.querySelector('select[data-hook="native-select"]')||li.dataset.llInventory!==undefined)continue;
const btn=li.querySelector('button[data-hook="dropdown-base"]');
if(!btn){if(!li.querySelector('[data-hook="product-item-options"]'))li.dataset.llInventory="";continue}
btn.click();
await new Promise(done=>setTimeout(done,135));
const choices=[...li.querySelectorAll('[data-hook="dropdown-content-option"]')];
const labels=choices.filter(o=>o.getAttribute("aria-disabled")!=="true"&&!o.disabled).map(o=>trim(o.getAttribute("title")||o.textContent)).filter(Boolean);
if(choices.length)li.dataset.llInventory=labels.join("|");
if(btn.isConnected)btn.click();
await new Promise(done=>setTimeout(done,20));
}
state.scanning=false;scanning=false;apply();
}
let busy=false;function run(){if(busy)return;busy=true;setTimeout(()=>{busy=false;if(header()){apply();pagination();scanDesktop().catch(console.warn)}},120)}
function refreshCatalogOnReturn(){
 if(document.visibilityState!=='visible'||batchLoading||!lastCatalogCheck||Date.now()-lastCatalogCheck<120000)return;
 if(new URLSearchParams(location.search).has('lumen_export'))return;
 if(!document.getElementById('lumen-tenis-filter'))return;
 batchTask=null;preparePages();
}
document.addEventListener('visibilitychange',refreshCatalogOnReturn);
window.addEventListener('focus',refreshCatalogOnReturn);
run();const mo=new MutationObserver(records=>{if(records.some(r=>r.type==="childList"||r.type==="characterData"||r.target.closest?.(gallerySelector+" "+itemSelector)))run()});mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["disabled","aria-disabled"]});setInterval(()=>{const count=document.querySelectorAll(gallerySelector+" "+itemSelector).length;if(count!==state.items||!document.getElementById("lumen-tenis-filter")){state.items=count;run()}},2000);
})();
