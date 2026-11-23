/* Lúmen Luxos | Wallet layout V3: member area iframe and page/footer resizing. */
(()=>{'use strict';
const KEY='__lumenWalletLayoutV4',VERSION='4.0.0';
if(window[KEY]?.version===VERSION)return;
if(!/^\/account\/blank-1\/?$/i.test(location.pathname)||new URLSearchParams(location.search).has('checkoutId'))return;
const state={version:VERSION,frame:null,requested:0,queued:false,menuHidden:false,profileHidden:false,footerOffset:0,baseFooterTransform:null};
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
 // Desktop Wix Members pode exibir a mesma navegação como menu vertical.
 // Ocultá-la somente quando contiver múltiplas rotas da área de membros.
 const navigation=[...document.querySelectorAll('aside,nav,[role="navigation"]')].filter(el=>{
   if(el.closest('header,#SITE_HEADER,#SITE_FOOTER'))return false;
   const rect=el.getBoundingClientRect();
   if(rect.width<140||rect.width>480||rect.height>1000)return false;
   const count=[...el.querySelectorAll('a[href]')].filter(a=>{
     try{return new URL(a.href,location.origin).pathname.startsWith('/account/')}catch{return false}
   }).length;
   return count>=3;
 });
 if(navigation.length){
   for(const el of navigation){
     el.setAttribute('data-lumen-credit-old-menu','hidden');
     set(el,'display','none');
   }
   state.menuHidden=true;
   return;
 }
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
function hideNativeProfile(frame){
 // Remover somente a capa e o avatar da área de membros na página do painel.
 if(state.profileHidden)return;
 const root=document.querySelector('#SITE_PAGES')||document.querySelector('#PAGES_CONTAINER');
 if(!root)return;
 const fr=frame.getBoundingClientRect();
 const known=[...root.querySelectorAll('[data-hook],[data-testid],[class*="member"],[class*="Member"]')].filter(el=>{
   if(el.contains(frame))return false;
   const hint=[el.getAttribute('data-hook'),el.getAttribute('data-testid'),el.className].join(' ').toLowerCase();
   if(!/(member.*profile.*header|profile.*header|member.*cover|profile.*cover)/.test(hint))return false;
   const r=el.getBoundingClientRect();
   return r.height>45&&r.height<720&&r.width>200&&r.bottom<=fr.top+30;
 });
 if(known.length){
   known.sort((a,b)=>a.getBoundingClientRect().height-b.getBoundingClientRect().height);
   const candidate=known[0];
   candidate.setAttribute('data-lumen-profile-hidden','true');
   set(candidate,'display','none');
   state.profileHidden=true;return;
 }
 // Editor antigo do Wix usa capa e avatar sem data-hook. Identifica avatar
 // circular, sem depender do nome da cliente nem de dados pessoais.
 const circles=[...root.querySelectorAll('div,span')].filter(el=>{
   const r=el.getBoundingClientRect();
   if(r.width<75||r.width>230||Math.abs(r.width-r.height)>8||r.top<80||r.bottom>fr.top-70)return false;
   const c=getComputedStyle(el),bg=c.backgroundColor,rad=parseFloat(c.borderTopLeftRadius)||0;
   return rad>=r.width*.35&&bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent'&&
      el.textContent.trim().length<=2;
 });
 for(const circle of circles){
   let parent=circle;
   for(let n=0;parent&&n<7;n++,parent=parent.parentElement){
     if(parent===root||parent.contains(frame))break;
     const r=parent.getBoundingClientRect();
     if(r.width>fr.width*.65&&r.height>260&&r.height<680&&r.bottom<fr.top+40){
       parent.setAttribute('data-lumen-profile-hidden','true');
       set(parent,'display','none');
       state.profileHidden=true;return;
     }
   }
 }
}
function keepFooterBelow(frame,target){
 const footer=document.getElementById('SITE_FOOTER');
 if(!footer)return;
 if(state.baseFooterTransform===null)state.baseFooterTransform=getComputedStyle(footer).transform;
 const r=frame.getBoundingClientRect();
 const required=r.top+window.scrollY+target+24;
 // Aplica deslocamento sobre a posição original, sem acumular a cada abertura.
 const originalTop=footer.getBoundingClientRect().top+window.scrollY-state.footerOffset;
 const offset=Math.max(0,Math.ceil(required-originalTop));
 state.footerOffset=offset;
 const base=state.baseFooterTransform&&state.baseFooterTransform!=='none'?state.baseFooterTransform+' ':'';
 const val=offset?base+'translateY('+offset+'px)':(state.baseFooterTransform==='none'?'none':state.baseFooterTransform);
 set(footer,'transform',val);
 const root=document.getElementById('SITE_CONTAINER');
 if(root){
   const rect=root.getBoundingClientRect();
   const needed=Math.ceil(Math.max(rect.height,required-rect.top-window.scrollY+footer.getBoundingClientRect().height+35));
   set(root,'min-height',needed+'px');
   set(root,'overflow','visible');
 }
}
function resizeFrame(frame,requested){
 if(!frame)return;
 const target=Math.max(900,Math.min(4700,Math.ceil(requested||1040)+24));
 state.frame=frame;
 const rect=frame.getBoundingClientRect();
 // As alturas de HTML Component no Editor são fixas em vários ancestrais.
 // Expande apenas a ramificação do componente, sem tocar nas vitrines/carrinho.
 let node=frame;
 for(let n=0;node&&n<12;n++,node=node.parentElement){
   if(node===document.body||node===document.documentElement||node.id==='SITE_PAGES'||node.id==='PAGES_CONTAINER'||node.id==='SITE_CONTAINER')break;
   const r=node.getBoundingClientRect(),offset=Math.max(0,Math.round(rect.top-r.top));
   const h=Math.min(5000,target+offset);
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
   const needed=Math.ceil(Math.max(950,rect.top-r.top+target+65));
   set(pages,'min-height',needed+'px');
   set(pages,'height',needed+'px');
   set(pages,'overflow','visible');
 }
 keepFooterBelow(frame,target);
}
function sync(){
 const frame=pick();
 if(!frame)return;
 if(state.frame!==frame)state.requested=0;
 hideNativeDropdown();
 hideNativeProfile(frame);
 resizeFrame(frame,state.requested);
}
function queue(){if(state.queued)return;state.queued=true;setTimeout(()=>{state.queued=false;sync()},160)}
window.addEventListener('message',e=>{
 if(!state.frame||e.source!==state.frame.contentWindow)return;
 const m=e.data;
 if(m?.kind==='LUMEN_WALLET'&&m?.type==='RESIZE'){
  const h=Number(m.data?.height);
  if(Number.isFinite(h)&&h>=250&&h<=4500){state.requested=h;queue()}
 }
});
new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true});
window.addEventListener('pageshow',queue);
window.addEventListener('resize',queue,{passive:true});
window.addEventListener('popstate',queue);
queue();
})();