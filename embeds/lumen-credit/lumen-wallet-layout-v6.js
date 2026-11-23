/* Lúmen Luxos | Wallet layout V3: member area iframe and page/footer resizing. */
(()=>{'use strict';
const KEY='__lumenWalletLayoutV6',VERSION='6.0.0';
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

function shopRouteIsLive(path){
 // The storefront editor must be a published Wix page, never a guessed URL.
 return fetch(path,{method:'HEAD',credentials:'same-origin',cache:'no-store',redirect:'follow'})
   .then(r=>r.ok&&!/\/404(?:\/|$)/i.test(new URL(r.url).pathname))
   .catch(()=>false);
}
function showShopNotice(){
 if(document.getElementById('lumen-shop-notice'))return;
 const shade=document.createElement('div');shade.id='lumen-shop-notice';shade.setAttribute('role','presentation');
 shade.innerHTML='<div class="lumen-shop-dialog" role="dialog" aria-modal="true" aria-labelledby="lumen-shop-title" aria-describedby="lumen-shop-text"><div class="lumen-shop-logo">✦</div><h2 id="lumen-shop-title">Minha Loja</h2><p id="lumen-shop-text">Sua vitrine personalizada está em preparação. O acesso será liberado para clientes com <strong>Atacado Ativo</strong> assim que a página estiver publicada. Seus créditos, endereços e compras não são alterados.</p><button type="button">Entendi</button></div>';
 const close=()=>{shade.remove();document.removeEventListener('keydown',esc)};
 const esc=e=>{if(e.key==='Escape')close()};
 shade.querySelector('button').addEventListener('click',close);
 shade.addEventListener('click',e=>{if(e.target===shade)close()});
 document.addEventListener('keydown',esc);
 document.body.appendChild(shade);shade.querySelector('button').focus();
}
function shopCard(frame,target){
 const root=document.getElementById('SITE_PAGES')||document.getElementById('PAGES_CONTAINER');
 if(!root)return 0;
 let card=document.getElementById('lumen-dashboard-my-shop');
 if(!card){
  if(!document.getElementById('lumen-dashboard-my-shop-style')){
   const sheet=document.createElement('style');sheet.id='lumen-dashboard-my-shop-style';
   sheet.textContent=[
    '#lumen-dashboard-my-shop{box-sizing:border-box!important;position:absolute!important;z-index:4!important;display:flex!important;align-items:center!important;justify-content:space-between!important;text-align:left!important;gap:12px!important;min-height:86px!important;padding:15px 17px!important;border:1px solid #ded0bd!important;border-radius:16px!important;background:#faf7f2!important;box-shadow:0 2px 12px #4a36200b!important;color:#4e3928!important;font:600 14px/1.3 Arial,Helvetica,sans-serif!important;cursor:pointer!important}',
    '#lumen-dashboard-my-shop .lumen-shop-icon{width:41px;height:41px;flex:0 0 41px;border:1px solid #e6d7c2;border-radius:12px;display:grid;place-items:center;background:#eee4d5;font-size:24px;color:#957244}',
    '#lumen-dashboard-my-shop .lumen-shop-label{display:flex;flex:1;flex-direction:column;gap:4px;min-width:0}',
    '#lumen-dashboard-my-shop .lumen-shop-label small{font:400 11px/1.3 Arial,sans-serif!important;color:#877869!important}',
    '#lumen-dashboard-my-shop .lumen-shop-arrow{font-size:24px;font-weight:400;color:#a08360}',
    '#lumen-dashboard-my-shop:focus-visible{outline:2px solid #ad874a!important;outline-offset:3px!important}',
    '#lumen-dashboard-my-shop:hover{background:#f4ece0!important}',
    '#lumen-shop-notice{position:fixed;inset:0;z-index:2147483000;background:#1e160e88;display:grid;place-items:center;padding:22px;box-sizing:border-box}',
    '#lumen-shop-notice .lumen-shop-dialog{box-sizing:border-box;background:#fffdf9;border-radius:18px;padding:25px 23px 24px;box-shadow:0 16px 50px #0003;max-width:400px;width:100%;font:14px/1.55 Arial,sans-serif;color:#604732}',
    '#lumen-shop-notice .lumen-shop-logo{font-size:28px;color:#a88752}',
    '#lumen-shop-notice h2{font:700 22px/1.2 Arial,sans-serif;color:#4d3827;margin:8px 0 14px}',
    '#lumen-shop-notice p{margin:0 0 20px;color:#705d4b}',
    '#lumen-shop-notice button{appearance:none;background:#563d2b;color:#fff;border:0;border-radius:10px;padding:12px 18px;cursor:pointer;font:600 13px Arial,sans-serif}',
    '@media(max-width:420px){#lumen-dashboard-my-shop{min-height:78px!important;padding:12px!important}#lumen-dashboard-my-shop .lumen-shop-icon{width:38px;height:38px;flex-basis:38px}}'
   ].join('\n');document.head.appendChild(sheet);
  }
  card=document.createElement('button');card.id='lumen-dashboard-my-shop';card.type='button';
  card.setAttribute('aria-label','Minha Loja. Criar e personalizar minha vitrine de revenda');
  card.innerHTML='<span class="lumen-shop-icon" aria-hidden="true">▣</span><span class="lumen-shop-label"><strong>Minha Loja</strong><small>Personalize sua vitrine de revenda</small></span><span class="lumen-shop-arrow" aria-hidden="true">›</span>';
  card.addEventListener('click',async()=>{
   card.disabled=true;
   try{
    if(await shopRouteIsLive('/minha-loja')){location.assign('/minha-loja');return;}
    showShopNotice();
   }finally{card.disabled=false;}
  });
  root.appendChild(card);
 }
 if(getComputedStyle(root).position==='static')set(root,'position','relative');
 const fr=frame.getBoundingClientRect(),rr=root.getBoundingClientRect();
 const left=Math.max(6,Math.round(fr.left-rr.left));
 const width=Math.max(200,Math.min(fr.width,rr.width-left-6));
 card.style.left=left+'px';card.style.width=Math.round(width)+'px';
 card.style.top=Math.ceil(fr.top-rr.top+target+14)+'px';
 card.style.display=/^\/account\/blank-1\/?$/i.test(location.pathname)?'flex':'none';
 return card.getBoundingClientRect().height+30;
}

function resizeFrame(frame,requested){
 if(!frame)return;
 const target=Math.max(window.innerWidth<=600?1160:920,Math.min(4700,Math.ceil(requested||1040)+36));
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
   const extra=shopCard(frame,target);
   const needed=Math.ceil(Math.max(950,rect.top-r.top+target+extra+65));
   set(pages,'min-height',needed+'px');
   set(pages,'height',needed+'px');
   set(pages,'overflow','visible');
 }
 keepFooterBelow(frame,target+(document.getElementById('lumen-dashboard-my-shop')?.getBoundingClientRect().height||0)+30);
}
function sync(){
 if(!/^\/account\/blank-1\/?$/i.test(location.pathname)){
  const shop=document.getElementById('lumen-dashboard-my-shop');if(shop)shop.style.display='none';
  return;
 }
 const frame=state.frame&&document.documentElement.contains(state.frame)?state.frame:pick();
 if(!frame)return;
 if(state.frame!==frame)state.requested=0;
 hideNativeDropdown();
 hideNativeProfile(frame);
 resizeFrame(frame,state.requested);
}
function queue(){if(state.queued)return;state.queued=true;setTimeout(()=>{state.queued=false;sync()},160)}
window.addEventListener('message',e=>{
 const m=e.data;
 if(m?.kind!=='LUMEN_WALLET')return;
 const sourceFrame=[...document.querySelectorAll('iframe')].find(f=>f.contentWindow===e.source);
 if(m?.type==='NAVIGATE_MEMBER'&&sourceFrame){
  const destinations={addresses:'/account/my-addresses',wallet:'/account/my-wallet',subscriptions:'/account/my-subscriptions',account:'/account/my-account'};
  const destination=destinations[String(m.data?.section||'')];
  if(destination){location.assign(destination);return;}
 }
 if(m?.type!=='RESIZE')return;
 if(sourceFrame){state.frame=sourceFrame;}
 if(!state.frame||e.source!==state.frame.contentWindow)return;
 const h=Number(m.data?.height);
 if(Number.isFinite(h)&&h>=250&&h<=4500){state.requested=h;queue();}
});
new MutationObserver(queue).observe(document.documentElement,{subtree:true,childList:true});
window.addEventListener('pageshow',queue);
window.addEventListener('load',queue);
setTimeout(queue,600);
setTimeout(queue,2200);
window.addEventListener('resize',queue,{passive:true});
window.addEventListener('popstate',queue);
queue();
})();