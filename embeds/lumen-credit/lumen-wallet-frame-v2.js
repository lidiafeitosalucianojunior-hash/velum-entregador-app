/* Lúmen Luxos | Corrige recorte do HTML Component no Wix Editor mobile.
   Escopo exclusivo /account/blank-1. Não toca na lógica de checkout/pagamento. */
(()=>{'use strict';
 const VERSION='2.0.0',KEY='__lumenCreditFrameSizeV2';
 if(window[KEY]?.version===VERSION)return;
 const state={version:VERSION,frame:null,height:0,scheduled:false};window[KEY]=state;
 const page=()=>location.pathname==='/account/blank-1'||location.pathname==='/account/blank-1/';
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const shouldChoose=f=>{
   const src=f.getAttribute('src')||'',title=f.getAttribute('title')||'';
   return (/credito-lumen-online[.]html|wix-host[.]com/i.test(src)||
     /html iframe|html component/i.test(title)||
     !!f.closest('[data-testid="html-comp"],[data-hook="html-comp"]'))&&
     f.getBoundingClientRect().width>190;
 };
 function findFrame(){
   const frames=[...document.querySelectorAll('iframe')].filter(shouldChoose);
   frames.sort((a,b)=>{
     const score=f=>(/credito-lumen-online[.]html/i.test(f.src)?300:0)+
       (/wix-host[.]com/i.test(f.src)?150:0)+
       (f.closest('[data-testid="html-comp"],[data-hook="html-comp"]')?50:0);
     return score(b)-score(a);
   });
   return frames[0]||null;
 }
 function updateStyle(el,prop,val){
   if(el.style.getPropertyValue(prop)!==val||el.style.getPropertyPriority(prop)!=='important'){
     el.style.setProperty(prop,val,'important');
   }
 }
 function grow(frame,desired){
   // Wix insere 2 a 6 wrappers entre iframe e componente: todos precisam crescer.
   // A versão anterior ajustava somente iframe+wrapper, deixando um ancestral em 550px.
   const h=clamp(Math.ceil(desired),650,1700);
   state.frame=frame;state.height=h;
   const first=frame.getBoundingClientRect();
   const chain=[];
   let node=frame;
   for(let i=0;node&&i<11;i++,node=node.parentElement){
     if(node===document.body||node===document.documentElement)break;
     if(node!==frame&&(node.tagName==='SECTION'||node.tagName==='MAIN'))break;
     if(node.id==='SITE_PAGES'||node.id==='SITE_CONTAINER')break;
     chain.push(node);
     // Pare antes de tocar no contêiner da página (isolamento de layout).
     if(node!==frame&&node.id&&/^(comp-|htmlComp)/i.test(node.id))break;
   }
   // A largura e posição horizontal são mantidas; ajusta somente altura/recorte.
   for(const el of chain){
     const offset=Math.max(0,Math.round(first.top-el.getBoundingClientRect().top));
     const needed=clamp(h+offset,650,2100);
     updateStyle(el,'height',needed+'px');
     updateStyle(el,'min-height',needed+'px');
     updateStyle(el,'max-height','none');
     updateStyle(el,'overflow','visible');
     updateStyle(el,'overflow-y','visible');
     updateStyle(el,'clip-path','none');
   }
   // Demais wrappers (como o wrapper com altura fixa do Editor mobile) também
   // precisam crescer até a seção, senão continuam ocultando o final do quadro.
   let parent=chain[chain.length-1]?.parentElement;
   for(let j=0;parent&&j<7;j++,parent=parent.parentElement){
     if(parent===document.body||parent===document.documentElement||
        parent.id==='SITE_CONTAINER'||parent.id==='SITE_PAGES')break;
     if(parent.tagName==='SECTION'||parent.tagName==='MAIN'){
       const offset=Math.max(0,Math.round(first.top-parent.getBoundingClientRect().top));
       updateStyle(parent,'min-height',clamp(h+offset+50,700,2400)+'px');
       updateStyle(parent,'overflow','visible');
       break;
     }
     const offset=Math.max(0,Math.round(first.top-parent.getBoundingClientRect().top));
     updateStyle(parent,'min-height',clamp(h+offset,650,2200)+'px');
     updateStyle(parent,'overflow','visible');
     updateStyle(parent,'max-height','none');
   }
   return chain.length;
 }
 function adjust(requested){
   if(!page())return;
   const frame=findFrame();if(!frame)return;
   // No mobile, a confirmação + campos podem exceder 1.000px.
   // Quando chega RESIZE, usa a altura real; até então reserva espaço seguro.
   const h=Number.isFinite(requested)&&requested>0?
     clamp(requested+90,750,1700):(window.innerWidth<=700?1220:960);
   grow(frame,h);
 }
 function schedule(){
   if(state.scheduled)return;
   state.scheduled=true;
   setTimeout(()=>{state.scheduled=false;adjust(state.height||0)},170);
 }
 window.addEventListener('message',e=>{
   if(!page()||!state.frame||e.source!==state.frame.contentWindow)return;
   const m=e.data;if(m?.kind!=='LUMEN_ONLINE_CREDIT_UI'||m?.type!=='RESIZE')return;
   const raw=Number(m.data?.height);
   if(Number.isFinite(raw)&&raw>=180&&raw<=1600)adjust(raw);
 });
 const observer=new MutationObserver(schedule);
 observer.observe(document.documentElement,{childList:true,subtree:true});
 window.addEventListener('pageshow',schedule);
 window.addEventListener('resize',schedule,{passive:true});
 if(page())schedule();
})();
