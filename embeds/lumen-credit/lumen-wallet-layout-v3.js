/* Lúmen Luxos | Wallet layout V3: member area iframe and page/footer resizing. */
(()=>{'use strict';
const KEY='__lumenWalletLayoutV3',VERSION='3.0.0';
if(window[KEY]?.version===VERSION)return;
if(!/^\/account\/blank-1\/?$/i.test(location.pathname)||new URLSearchParams(location.search).has('checkoutId'))return;
const state={version:VERSION,frame:null,requested:0,queued:false,menuHidden:false};
window[KEY]=state;
const set=(el,key,val)=>{if(el?.style?.getPropertyValue(key)!==val||el?.style?.getPropertyPriority(key)!=='important')el?.style?.setProperty(key,val,'important')};
const visible=r=>r.width>210&&r.height>90&&r.left<window.innerWidth+20&&r.right>-20;
const score=f=>{
 const r=f.getBoundingClientRect(),src=f.getAttribute('src')||'',title=f.getAttribute('title')||'';
 if(!visible(r))return -1;
 if(/chat|intercom|assistant|wixchat|chatbot/i.test(src+' '+title))return -1;
 return (/html iframe|html component/i.test(title)?150:0)+
 (/wix-host|html-component/i.test(src)?100:0)+
 (f.closest('[data-testid="html-comp"],[data-hook="html-comp"],.wixui-html-embed,[id*="htmlComp"]')?140:0)+
 (r.width>290?50:0)+(r.top>200?20:0);
};
function pick(){
 const frames=[...document.querySelectorAll('iframe')].map(f=>({f,s:score(f)})).filter(x=>x.s>=140).sort((a,b)=>b.s-a.s);
 return frames[0]?.f||null;
}
function hideNativeDropdown(){
 // Acesso à navegação continua pelos quatro cards da carteira; outros
 // destinos do Wix fora desta página não são alterados.
 if(state.menuHidden)return;
 const sel=[...document.querySelectorAll('select')].find(x=>[...x.options].some(o=>/meus endere.os/i.test(o.textContent||''))&&[...x.options].some(o=>/minha conta/i.test(o.textContent||'')));
 const candidates=sel?[sel]:[...document.querySelectorAll('button,[role="combobox"]')].filter(e=>/^(meu cr[eé]dito l[uú]men)$/i.test((e.textContent||'').trim()));
 for(const candidate of candidates){
   let node=candidate,match=null;
   for(let i=0;node&&i<6;i++,node=node.parentElement){
     const r=node.getBoundingClientRect();
     if(r.width>=Math.min(300,window.innerWidth*.7)&&r.height>=40&&r.height<=145){
       if(node.closest('#SITE_FOOTER')||node.closest('header'))break;
       match=node;continue;
     }
     if(match)break;
   }
   if(match){
     match.setAttribute('data-lumen-credit-old-menu','hidden');
     set(match,'display','none');
     state.menuHidden=true;
     return;
   }
 }
}
function resizeFrame(frame,requested){
 if(!frame)return;
 const target=Math.max(670,Math.min(2100,Math.ceil(requested||760)+18));
 state.frame=frame;
 const rect=frame.getBoundingClientRect();
 // As alturas de HTML Component no Editor são fixas em vários ancestrais.
 // Expande apenas a ramificação do componente, sem tocar nas vitrines/carrinho.
 let node=frame;
 for(let n=0;node&&n<12;n++,node=node.parentElement){
   if(node===document.body||node===document.documentElement||node.id==='SITE_PAGES'||node.id==='PAGES_CONTAINER'||node.id==='SITE_CONTAINER')break;
   const r=node.getBoundingClientRect(),offset=Math.max(0,Math.round(rect.top-r.top));
   const h=Math.min(2800,target+offset);
   const bounded=node===frame||node.getBoundingClientRect().height<2700;
   if(bounded){
     set(node,'min-height',h+'px');
     set(node,'height',h+'px');
     set(node,'max-height','none');
     set(node,'overflow','visible');
     set(node,'overflow-y','visible');
   }
 }
 // O Wix posiciona o rodapé em relação à altura da página-membro.
 const pages=document.getElementById('SITE_PAGES')||document.getElementById('PAGES_CONTAINER');
 if(pages){
   const r=pages.getBoundingClientRect();
   const needed=Math.ceil(Math.max(700,rect.top-r.top+target+45));
   set(pages,'min-height',needed+'px');
   set(pages,'height',needed+'px');
   set(pages,'overflow','visible');
 }
}
function sync(){
 const frame=pick();
 if(!frame)return;
 if(state.frame!==frame)state.requested=0;
 resizeFrame(frame,state.requested);
 hideNativeDropdown();
}
function queue(){if(state.queued)return;state.queued=true;setTimeout(()=>{state.queued=false;sync()},160)}
window.addEventListener('message',e=>{
 if(!state.frame||e.source!==state.frame.contentWindow)return;
 const m=e.data;
 if(m?.kind==='LUMEN_WALLET'&&m?.type==='RESIZE'){
  const h=Number(m.data?.height);
  if(Number.isFinite(h)&&h>=250&&h<=2400){state.requested=h;queue()}
 }
});
new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true});
window.addEventListener('pageshow',queue);
window.addEventListener('resize',queue,{passive:true});
window.addEventListener('popstate',queue);
queue();
})();