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
function trim(x){return String(x||"").trim()}
function name(li){return trim(li.querySelector('[data-hook="product-item-name"]')?.textContent)}
function realShoe(li){return !!name(li)&&!/(sapatilha|rasteira|tamanco|sand[aá]lia|papete|chinelo|bota|bolsa|salto|crocs)/i.test(name(li))}
function variants(li){const select=li.querySelector('select[data-hook="native-select"]');if(select)return [...select.options].filter(o=>!o.disabled&&/^\d{2}$/.test(trim(o.textContent)));return (li.dataset.llInventory||"").split("|").filter(s=>/^\d{2}$/.test(trim(s))).map(size=>({textContent:size,value:size,disabled:false}));}
function header(){
const root=document.querySelector(gallerySelector);if(!root)return false;
if(document.getElementById("lumen-tenis-filter"))return true;
const el=document.createElement("div");el.id="lumen-tenis-filter";
el.innerHTML="<div class=\"ll-top\">LÚMEN LUXOS · CURADORIA PREMIUM</div><h1>Tênis femininos</h1><p class=\"ll-intro\">Seus modelos favoritos, na sua numeração.</p><p class=\"ll-label\">SELECIONE O TAMANHO</p><div class=\"ll-btns\" role=\"group\" aria-label=\"Filtrar por numeração\"></div><p class=\"ll-count\" aria-live=\"polite\"></p><button type=\"button\" class=\"ll-open-results\">↗ Compartilhar resultados</button><p class=\"ll-share-hint\" role=\"status\">Escolha o formato e o tamanho do lote na janela de compartilhamento.</p>";
for(const n of ["Todos",...sizes]){const b=document.createElement("button");b.type="button";b.textContent=n;b.dataset.size=n==="Todos"?"":n;b.onclick=()=>{state.size=b.dataset.size;selectedProducts.clear();manualSelection=false;shareCursors.clear();shareSignatures.clear();activeMode=null;shareNotice="";sessionStorage.setItem("lumen_tenis_size",state.size);const url=new URL(location.href);if(state.size)url.searchParams.set("tamanho",state.size);else url.searchParams.delete("tamanho");history.replaceState(history.state,"",url.pathname+url.search);apply();pagination();};el.querySelector(".ll-btns").appendChild(b)}
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
 const selectedName=trim(select?.selectedOptions?.[0]?.textContent);
 const desired=selectedName&&selectedName!=='Tamanho'?selectedName:state.size;
 if(desired)url.searchParams.set('tamanho',desired);
 return url.href;
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
const wa=document.createElement("a");wa.className="ll-whatsapp";wa.textContent="💬 Comprar no WhatsApp";wa.target="_blank";wa.rel="noopener noreferrer";
const det=document.createElement("a");det.className="ll-checkout";det.textContent="🔥 Comprar agora";det.href=checkoutUrl(li,link);det.setAttribute('aria-label','Comprar agora '+name(li));det.addEventListener('click',()=>{det.href=checkoutUrl(li,link)});
extra.append(wa,det);
root.appendChild(extra);
const foot=document.createElement("div");foot.className="ll-foot";
const share=document.createElement("button");share.type="button";share.textContent="Compartilhar";
share.onclick=()=>shareSingleNative(li,share);
const choose=document.createElement("label");choose.className="ll-select-item";const check=document.createElement("input");check.type="checkbox";check.className="ll-select-checkbox";check.dataset.productLink=link;check.checked=manualSelection&&selectedProducts.has(link);check.setAttribute("aria-label","Selecionar "+name(li)+" para o lote");check.onchange=()=>{const p=productInfo(li);if(check.checked&&p){manualSelection=true;selectedProducts.set(p.link,p)}else{selectedProducts.delete(link);if(!selectedProducts.size)manualSelection=false}shareCursors.clear();shareSignatures.clear();shareNotice="";updateShareControl()};const caption=document.createElement("span");caption.textContent="Selecionar";choose.append(check,caption);foot.append(choose,share);extra.insertAdjacentElement("afterend",foot);
}
li.dataset.llDone="yes";const pi=productInfo(li);if(pi){
 if(cleanObserver){if(!cleanCardsWatched.has(li)){cleanCardsWatched.add(li);cleanObserver.observe(li)}}
 else if(li.getBoundingClientRect().top<window.innerHeight+300)warmClean(pi);
}
}
function apply(){
const items=[...document.querySelectorAll(gallerySelector+" "+itemSelector)];
if(!items.length)return;
let n=0;
for(const li of items){
const real=realShoe(li);const pending=!li.querySelector('select[data-hook="native-select"]')&&li.dataset.llInventory===undefined;const pass=real&&(pending||!state.size||variants(li).some(o=>trim(o.textContent)===state.size));
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
 const prices=currentPrices(li);
let photo='';
try{const raw=li.querySelector('wow-image')?.getAttribute('data-image-info');const data=raw?JSON.parse(raw):null;photo=data?.imageData?.uri?'https://static.wixstatic.com/media/'+data.imageData.uri:'';}catch(e){}
if(!photo)photo=li.querySelector('img')?.currentSrc||li.querySelector('img')?.src||'';
return {title,link,price:prices.retail?brl(prices.retail):'',wholesale:prices.wholesale?brl(prices.wholesale):'',sizes:available,photo};
}
function buildBatchProducts(){
 const all=[...[...document.querySelectorAll(gallerySelector+' '+itemSelector)].map(productInfo).filter(Boolean)];
 for(const pages of batchCache.values())all.push(...pages.items);
 const unique=new Map();
 for(const p of all)if(!unique.has(p.link)&&(!state.size||p.sizes.includes(state.size)))unique.set(p.link,p);
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
  while(queue.length&&seen.size<80){
   const number=queue.shift();if(seen.has(number))continue;
   seen.add(number);
   try{
    const result=await loadOtherPage(number);
    batchCache.set(number,result);
    for(const next of result.links)if(!seen.has(next)&&!queue.includes(next))queue.push(next);
    updateShareControl();
   }catch(error){
    batchError='Algumas páginas não carregaram; os modelos encontrados continuam disponíveis.';
    console.warn('Lúmen catálogo página '+number,error);
   }
  }
 })().catch(error=>{
  batchError='Não foi possível concluir a busca; os produtos desta página continuam disponíveis.';
  console.warn('Lúmen catálogo',error);
 }).finally(()=>{batchDone=true;batchLoading=false;updateShareControl()});
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
 return [...selectedProducts.values()].map(p=>fresh.get(p.link)||p);
}
/* Three independent photo formats, one unified native sharing flow. */
const photoByMode=new Map(),failedByMode=new Set(),photoQueued=new Set(),photoQueue=[];
let photoWorkers=0,shareBusy=false,shareNotice='',activeMode=null;
const shareCursors=new Map(),shareSignatures=new Map(),shareCaps=new Map();
let shareProfile='max';
function maxProfileFiles(){return shareProfile==='ig3'?3:shareProfile==='ig1'?1:Infinity}
function setShareProfile(next){
 if(!['max','ig3','ig1'].includes(next)||shareBusy)return;
 if(next!==shareProfile){
  shareProfile=next;
  shareCursors.clear();shareSignatures.clear();shareCaps.clear();
  activeMode=null;
  shareNotice=next==='max'
   ?'Envio máximo selecionado. Escolha um formato acima.'
   :next==='ig3'
    ?'Compatibilidade Instagram: até 3 fotos por lote. Escolha um formato acima. Se o Instagram não aparecer, tente 1 foto.'
    :'Compatibilidade Instagram: 1 foto por envio. Escolha um formato acima.';
 }
 updateShareControl();
}
let refreshTimer=null;
const modes={clean:'Imagem limpa',sizes:'Foto + numeração',retail:'Varejo + numeração'};
function imageKey(p,mode){return mode+'¦'+[p.link,p.photo,p.price,(p.sizes||[]).join(',')].join('¦')}
function saveCanvasImage(canvas,p,mode){
 return new Promise((resolve,reject)=>canvas.toBlob(blob=>{
  if(!blob){reject(new Error('Não foi possível gerar a foto.'));return}
  const name=String(p.title||'tenis').normalize('NFD')
   .replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').slice(0,46);
  resolve(new File([blob],'Lumen-'+name+'-'+mode+'.jpg',{type:'image/jpeg'}));
 },'image/jpeg',.88));
}
function outlined(ctx,txt,y,size){
 let fontSize=size;ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
 do{ctx.font='700 '+fontSize+'px Arial,Helvetica,sans-serif';if(ctx.measureText(txt).width<=980)break;fontSize-=2}while(fontSize>28);
 ctx.strokeStyle='#3f281a';ctx.lineWidth=11;ctx.shadowColor='#332013';ctx.shadowBlur=18;ctx.shadowOffsetY=5;
 ctx.strokeText(txt,540,y);ctx.fillStyle='#fff';ctx.fillText(txt,540,y);
 ctx.shadowBlur=0;ctx.shadowOffsetY=0;
}
async function image916(p,mode){
 if(mode==='clean')return cleanPhoto(p);
 const photo=await igPhoto(p.photo);
 if(!photo?.width||!photo?.height)throw Error('Fotografia indisponível');
 try{
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1920;
  const c=canvas.getContext('2d');if(!c)throw Error('Canvas indisponível');
  const cover=Math.max(1080/photo.width,1920/photo.height);
  const cropW=1080/cover,cropH=1920/cover;
  c.save();c.filter='blur(30px) brightness(.75)';
  c.drawImage(photo,(photo.width-cropW)/2,(photo.height-cropH)/2,cropW,cropH,0,0,1080,1920);
  c.restore();
  const fit=Math.min(1080/photo.width,1550/photo.height);
  const dw=photo.width*fit,dh=photo.height*fit;
  c.drawImage(photo,(1080-dw)/2,(1550-dh)/2+60,dw,dh);
  const shade=c.createLinearGradient(0,1440,0,1920);
  shade.addColorStop(0,'rgba(43,29,19,0)');
  shade.addColorStop(1,'rgba(43,29,19,.63)');
  c.fillStyle=shade;c.fillRect(0,1440,1080,480);
  const available=(p.sizes||[]).filter(n=>/^\d{2}$/.test(String(n))).join(' · ');
  if(mode==='sizes'){
   if(available)outlined(c,'Numerações: '+available,1800,60);
  }else if(mode==='retail'){
   if(available)outlined(c,'Numerações: '+available,1702,57);
   if(p.price)outlined(c,'Varejo: '+p.price,1822,70);
  }
  return await saveCanvasImage(canvas,p,mode);
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
   .catch(error=>{failedByMode.add(task.key);console.warn('Lúmen share',task.mode,task.p.title,error)})
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
const bg=Math.max(1440/photo.width,2560/photo.height),bw=1440/bg,bh=2560/bg;
ctx.save();ctx.filter='blur(32px)';ctx.drawImage(photo,(photo.width-bw)/2,(photo.height-bh)/2,bw,bh,0,0,1440,2560);ctx.restore();
const fit=Math.min(1440/photo.width,2560/photo.height),w=photo.width*fit,h=photo.height*fit;
ctx.drawImage(photo,(1440-w)/2,(2560-h)/2,w,h);
const jpeg=await new Promise((resolve,reject)=>canvas.toBlob(x=>x?resolve(x):reject(Error('JPEG')),'image/jpeg',.95));
return new File([jpeg],'Lumen-'+String(p.title||'tenis').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]+/g,'-').slice(0,50)+'.jpg',{type:'image/jpeg'});
}finally{if(typeof photo.close==='function')photo.close()}}
function warmClean(p){if(!p?.photo||cleanFiles.has(p.link)||cleanPending.has(p.link)||cleanFailures.has(p.link))return;
cleanPending.add(p.link);cleanJobs.push(p);function work(){if(cleanActive>=1||!cleanJobs.length)return;
const x=cleanJobs.shift();cleanActive++;cleanPhoto(x).then(f=>{cleanFiles.set(x.link,f);document.querySelectorAll('.ll-foot button').forEach(b=>{if(b.textContent==='Preparando foto…'&&b.closest('[data-hook="product-list-grid-item"]')?.querySelector('[data-hook="product-item-container"]')?.href===x.link)b.textContent='Compartilhar'});}).catch(e=>{cleanFailures.add(x.link);console.warn('Lumen foto limpa',e)}).finally(()=>{cleanPending.delete(x.link);cleanActive--;work()})}
while(cleanActive<1&&cleanJobs.length)work()}
function shareSingleNative(li,button){
 const p=productInfo(li);if(!p)return;
 const file=cleanFiles.get(p.link);
 if(!file){
  if(cleanFailures.has(p.link)){noteNative('A foto deste modelo está indisponível.');return}
  warmClean(p);button.textContent='Preparando foto…';
  noteNative('Preparando a foto limpa. Toque novamente quando o botão voltar a Compartilhar.');return;
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
/* Browser canShare is a browser-level estimate, never an Instagram/WhatsApp
   app-specific limit. Send the largest accepted set; lower the cap after a
   real non-cancellation rejection, requiring a new tap for the next attempt. */
function maxBrowserFiles(files,mode){
 if(!files.length||typeof navigator.share!=='function')return 0;
 const cap=Math.min(files.length,shareCaps.get(mode)||files.length,maxProfileFiles());
 if(typeof navigator.canShare!=='function')return cap;
 let low=0,high=cap;
 while(low<high){
  const n=Math.ceil((low+high)/2);
  try{if(navigator.canShare({files:files.slice(0,n)}))low=n;else high=n-1}
  catch(error){high=n-1}
 }
 return low;
}
function batchStatus(mode,message){activeMode=mode;shareNotice=message;updateShareControl()}
function shareFilteredList(mode){
 if(!modes[mode]||shareBusy)return;
 activeMode=mode;shareNotice='';
 if(!batchDone){
  if(!batchTask)preparePages();
  batchStatus(mode,'Reunindo os produtos de todas as páginas do filtro. Toque novamente quando estiverem carregados.');
  return;
 }
 const products=productsForNativeShare();
 if(!products.length){batchStatus(mode,'Não há modelos disponíveis neste filtro.');return}
 const signature=products.map(p=>imageKey(p,mode)).join('§');
 if(signature!==shareSignatures.get(mode)){shareSignatures.set(mode,signature);shareCursors.set(mode,0)}
 let cursor=shareCursors.get(mode)||0;
 if(cursor>=products.length){cursor=0;shareCursors.set(mode,0)}
 const remaining=products.slice(cursor);
 // For Instagram only prepare the selected 3- or 1-image group, not the
 // entire 41-product catalog; this also reduces peak Safari memory usage.
 const candidates=shareProfile==='max'?remaining:remaining.slice(0,maxProfileFiles());
 preloadNative(candidates,mode);
 const waiting=candidates.filter(p=>!photoByMode.has(imageKey(p,mode))&&!failedByMode.has(imageKey(p,mode)));
 if(waiting.length){
  const ready=candidates.length-waiting.length-candidates.filter(p=>failedByMode.has(imageKey(p,mode))).length;
  batchStatus(mode,'Preparando '+modes[mode]+': '+ready+' de '+candidates.length+' fotos. Toque novamente quando estiverem prontas.');
  return;
 }
 const valid=candidates.map(p=>({p,file:photoByMode.get(imageKey(p,mode))})).filter(x=>x.file);
 if(!valid.length){batchStatus(mode,'As fotos deste filtro não puderam ser carregadas. Confira as imagens dos produtos.');return}
 const files=valid.map(x=>x.file);
 const count=maxBrowserFiles(files,mode);
 if(count===0){batchStatus(mode,'Este navegador não permite compartilhar essas fotos. Abra no Safari do iPhone.');return}
 let requested;
 try{
  // MUST be synchronous inside the user click. No await or clipboard before this.
  requested=navigator.share({files:files.slice(0,count)});
 }catch(error){
  if(count>1)shareCaps.set(mode,Math.max(1,Math.floor(count/2)));
  batchStatus(mode,'Compartilhamento recusado. Toque novamente para tentar um lote menor. '+(error.message||''));
  return;
 }
 shareBusy=true;updateShareControl();
 Promise.resolve(requested).then(()=>{
  // Advance to the last included product, skipping unavailable photos.
  const last=valid[count-1].p;
  const position=remaining.findIndex(p=>p.link===last.link);
  shareCursors.set(mode,cursor+Math.max(1,position+1));
  shareNotice=(shareCursors.get(mode)<products.length)
   ?'Lote aberto no celular. Restam '+(products.length-shareCursors.get(mode))+' modelos. Toque no mesmo formato para continuar.'
   :'Todas as fotos deste filtro foram encaminhadas ao compartilhamento.';
 }).catch(error=>{
  if(error?.name==='AbortError'){
   shareNotice='Compartilhamento cancelado. Toque novamente para tentar.';
  }else{
   if(count>1)shareCaps.set(mode,Math.max(1,Math.floor(count/2)));
   shareNotice='O aplicativo recusou o lote. Toque novamente para tentar com menos fotos: '+(error.message||'erro do aplicativo.');
  }
 }).finally(()=>{shareBusy=false;updateShareControl()});
}
function updateShareControl(){
 const head=document.getElementById('lumen-tenis-filter');if(!head)return;
 const buttons=[...head.querySelectorAll('[data-share-mode]')];
 if(!buttons.length)return;
 const products=productsForNativeShare();
 for(const button of head.querySelectorAll('[data-share-profile]')){
  const selected=button.dataset.shareProfile===shareProfile;
  if(button.getAttribute('aria-pressed')!==String(selected))button.setAttribute('aria-pressed',String(selected));
  button.disabled=shareBusy;
 }
 for(const button of buttons){
  const mode=button.dataset.shareMode;
  const selected=mode===activeMode;
  button.setAttribute('aria-pressed',String(selected));
  button.disabled=shareBusy||!products.length;
 }
 const hint=head.querySelector('.ll-share-hint');
 if(!hint)return;
 let message=shareNotice;
 if(!message&&activeMode&&batchDone){
  const mode=activeMode,cursor=shareCursors.get(mode)||0;
  const remaining=products.slice(cursor);
  if(remaining.length){
   const ready=remaining.filter(p=>photoByMode.has(imageKey(p,mode))).length;
   const failed=remaining.filter(p=>failedByMode.has(imageKey(p,mode))).length;
   if(ready+failed<remaining.length)message='Preparando '+modes[mode]+': '+ready+' de '+remaining.length+' fotos…';
   else message=ready+' fotos prontas em '+modes[mode]+'. Toque novamente para abrir o compartilhamento nativo.';
  }
 }
 if(!message){
  message=(shareProfile==='max'
   ?'Envio máximo. Para exibir o Instagram, selecione "Instagram · até 3" e escolha um formato. '
   :shareProfile==='ig3'
   ?'Instagram · até 3 fotos por envio. Se não aparecer, experimente 1 foto. '
   :'Instagram · 1 foto por envio. Se ainda não aparecer, o aplicativo pode não oferecer esta opção no iPhone. ')+
   'O lote usa todos os modelos do filtro, ou somente os marcados. '+
   (batchLoading?'Reunindo produtos de outras páginas. ':'')+
   (batchError?batchError+' ':'')+
   'O máximo permitido depende do navegador e do aplicativo escolhido.';
 }
 if(hint.textContent!==message)hint.textContent=message;
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
