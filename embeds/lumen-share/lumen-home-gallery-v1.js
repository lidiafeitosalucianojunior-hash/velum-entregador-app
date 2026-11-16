/* LÚMEN LUXOS • Página inicial V1. Não altera clube nem filtros. */
(function(){
 'use strict';
 const onHome=()=>location.pathname==='/'||location.pathname==='';
 if(!onHome()||window.__lumenHomeCardsV1?.installed)return;
 const api=window.__lumenHomeCardsV1={installed:true,styled:0,clubPreserved:true,categoryAndSizeFiltersPreserved:true};
 const CSS_ID='lumen-home-gallery-v1-css';
 const css=`/* Homepage only. Restrict styles to repeater products with a real share widget. */
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card .ll-home-title-wrap{
  width:100%!important;min-width:0!important;max-width:100%!important;
  box-sizing:border-box!important;overflow:hidden!important;
  display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card .ll-home-product-name,
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card .ll-home-product-name *{
  font-family:Arial,Helvetica,sans-serif!important;
  font-size:var(--ll-home-name-font,9px)!important;
  font-weight:600!important;line-height:1.12!important;
  letter-spacing:-.2px!important;word-spacing:-.1px!important;
  text-align:center!important;text-align-last:center!important;
  white-space:nowrap!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card .ll-home-product-name{
  display:block!important;width:100%!important;max-width:100%!important;
  min-width:0!important;margin:0 auto!important;padding:0 1px!important;
  overflow:hidden!important;text-overflow:ellipsis!important;
  box-sizing:border-box!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp3pt6"],
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp3pt6"] :is(h2,h3,p,span){
  font-family:Arial,Helvetica,sans-serif!important;
  font-size:13px!important;line-height:1.15!important;
  color:#171717!important;text-align:center!important;white-space:nowrap!important;
  letter-spacing:-.15px!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp7cth"],
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp7cth"] :is(h2,h3,p,span){
  font-family:Arial,Helvetica,sans-serif!important;
  font-size:10.5px!important;line-height:1.15!important;
  color:#725139!important;text-align:center!important;white-space:nowrap!important;
  letter-spacing:-.15px!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpkifd"] button[aria-label="Adicionar ao carrinho"],
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpj66k"] button[aria-label="Comprar no WhatsApp"]{
  width:100%!important;min-width:0!important;box-sizing:border-box!important;
  padding-left:6px!important;padding-right:6px!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpkifd"] button .wixui-button__label,
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpj66k"] button .wixui-button__label{
  font-family:Arial,Helvetica,sans-serif!important;
  font-size:10px!important;line-height:1.15!important;
  font-weight:500!important;white-space:nowrap!important;
  letter-spacing:-.2px!important;
 }
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpap59"] label,
 body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkpap59"] label *{
  font-family:Arial,Helvetica,sans-serif!important;font-size:9px!important;
  letter-spacing:-.15px!important;
 }
 @media(min-width:650px){
  body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp3pt6"],
  body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp3pt6"] :is(h2,h3,p,span){font-size:15px!important}
  body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp7cth"],
  body.ll-lumen-home-v1 .wixui-repeater__item.ll-home-product-card [id^="comp-mtkp7cth"] :is(h2,h3,p,span){font-size:12px!important}
 }
 `;
 function ensureCss(){
  if(document.getElementById(CSS_ID))return;
  const s=document.createElement('style');s.id=CSS_ID;s.textContent=css;document.head.appendChild(s);
 }
 function normalize(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/ig,' ').toLowerCase().trim().replace(/\s+/g,' ')}
 let canvas=null;
 function renderTitle(card){
  const widget=card.querySelector('compartilhar-produto');
  const productName=normalize(widget?.getAttribute('nome'));
  if(!productName)return;
  const retail=card.querySelector('[id^="comp-mtkp3pt6"]');
  const wholesale=card.querySelector('[id^="comp-mtkp7cth"]');
  const entries=[...card.querySelectorAll('h1,h2,h3,h4,h5,p,span')]
   .filter(el=>el.isConnected&&el.textContent&&normalize(el.textContent)===productName
     &&!el.closest('button,[role="button"],compartilhar-produto')
     &&!retail?.contains(el)&&!wholesale?.contains(el));
  if(!entries.length)return;
  entries.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
  const inner=entries[0],title=inner.closest('h1,h2,h3,h4,h5,p')||inner;
  const container=title.closest('[id^="comp-"]');
  if(container&&container!==card&&!container.contains(retail)&&!container.contains(wholesale))container.classList.add('ll-home-title-wrap');
  title.classList.add('ll-home-product-name');
  if(!canvas)canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const txt=String(title.textContent||'').replace(/\s+/g,' ').trim();
  const available=Math.max(45,Math.min((container?.getBoundingClientRect().width||title.parentElement?.getBoundingClientRect().width||card.getBoundingClientRect().width)-6,card.getBoundingClientRect().width-10));
  let px=11;
  for(;px>=6.5;px-=0.25){
   ctx.font='600 '+px+'px Arial';
   if(ctx.measureText(txt).width<=available)break;
  }
  title.style.setProperty('--ll-home-name-font',Math.max(px,6.5)+'px');
 }
 function tick(){
  if(!onHome()||!document.body||!document.head)return;
  document.body.classList.add('ll-lumen-home-v1');
  ensureCss();
  let n=0;
  for(const card of document.querySelectorAll('.wixui-repeater__item')){
   if(!card.querySelector('compartilhar-produto'))continue;
   card.classList.add('ll-home-product-card');
   renderTitle(card);n++;
  }
  api.styled=n;
 }
 tick();
 document.addEventListener('DOMContentLoaded',tick,{once:true});
 window.addEventListener('resize',tick,{passive:true});
 setInterval(tick,1500);
})();