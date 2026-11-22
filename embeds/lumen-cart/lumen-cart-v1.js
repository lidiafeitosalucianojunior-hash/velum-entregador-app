/* Lúmen Luxos: dois caminhos seguros para finalizar o carrinho Wix */
(()=>{'use strict';
const KEY='lumenCartChoicesV1';if(window[KEY]?.active)return;
const controller={active:true,checkoutId:'',pending:'',timer:null};window[KEY]=controller;
const cartPath=()=>/^\/cart-page\/?$/i.test(location.pathname);
const validateId=id=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
const style=document.createElement('style');style.id='lumen-cart-choice-styles';style.textContent="\nhtml.lumen-cart-active [data-hook=\"CheckoutButtonDataHook.button\"]{background:#513923!important;border:1px solid #513923!important;color:#fff!important;border-radius:10px!important;min-height:48px!important;font-weight:650!important;text-transform:none!important;box-shadow:0 4px 12px rgba(81,57,35,.1)!important}\nhtml.lumen-cart-active [data-hook=\"CheckoutButtonDataHook.button\"] span{color:#fff!important;text-transform:none!important;font-weight:650!important}\nhtml.lumen-cart-active .lumen-cart-choice{box-sizing:border-box!important;max-width:100%;width:100%;display:flex!important;flex-direction:column!important;gap:10px!important;margin-top:12px!important;padding:16px!important;background:#fbf8f2!important;border:1px solid #d8c6a2!important;border-radius:14px!important;box-shadow:0 3px 13px rgba(73,48,26,.06)!important;font-family:Arial,Helvetica,sans-serif!important}\nhtml.lumen-cart-active .lumen-cart-choice-title{font-size:16px!important;font-weight:700!important;color:#523c26!important;margin:0!important;line-height:1.4!important}\nhtml.lumen-cart-active .lumen-cart-choice-description{font-size:12px!important;color:#826d55!important;margin:0!important;line-height:1.5!important}\nhtml.lumen-cart-active .lumen-cart-choice-button{appearance:none!important;box-sizing:border-box!important;width:100%!important;min-height:48px!important;border:none!important;border-radius:10px!important;padding:12px!important;background:#5c4129!important;color:#fff!important;font-size:14px!important;font-weight:700!important;line-height:1.3!important;cursor:pointer!important;text-align:center!important;box-shadow:0 3px 12px rgba(92,65,41,.14)!important;-webkit-tap-highlight-color:transparent!important}\nhtml.lumen-cart-active .lumen-cart-choice-button:hover{background:#442f1e!important}\nhtml.lumen-cart-active .lumen-cart-choice-button:focus-visible{outline:3px solid #c9a64f!important;outline-offset:3px!important}\nhtml.lumen-cart-active .lumen-cart-choice-button:disabled{cursor:wait!important;opacity:.7!important}\nhtml.lumen-cart-active [data-hook=\"CheckoutButtons.default\"]{min-width:0!important}\nhtml.lumen-cart-active [data-hook=\"CheckoutButtons.default\"] .lumen-cart-choice-note{font-size:10px!important;color:#8d775e!important;margin:0!important}\n@media(max-width:650px){html.lumen-cart-active .lumen-cart-choice{padding:12px!important;margin-top:10px!important}html.lumen-cart-active .lumen-cart-choice-button{font-size:13px!important}}\n";document.head.appendChild(style);
function currentAnchor(){
  const anchors=[...document.querySelectorAll('a[data-wix-checkout-button],a[data-hook="CheckoutButtonDataHook.button"]')];
  return anchors.find(a=>{try{const u=new URL(a.href,location.origin);return u.origin===location.origin&&u.pathname==='/checkout'&&validateId(u.searchParams.get('checkoutId')||'')}catch{return false}})||null;
}
function getId(a){try{return new URL(a.href).searchParams.get('checkoutId')||''}catch{return ''}}
function checkoutPage(id){const u=new URL('/account/blank-1',location.origin);u.searchParams.set('checkoutId',id);u.searchParams.set('from','cart');return u.toString()}
function newCard(id){
 const card=document.createElement('section');card.className='lumen-cart-choice';card.setAttribute('aria-label','Finalização com Crédito Lúmen');card.dataset.lumenCheckoutId=id;
 const title=document.createElement('p');title.className='lumen-cart-choice-title';title.textContent='Crédito Lúmen';
 const description=document.createElement('p');description.className='lumen-cart-choice-description';description.textContent='Exclusivo para clientes Atacado Ativo com limite aprovado.';
 const action=document.createElement('button');action.type='button';action.className='lumen-cart-choice-button';action.textContent='Pagar com Crédito Lúmen';
 action.addEventListener('click',()=>{
   const native=currentAnchor(),recent=native&&getId(native);
   if(!native||!validateId(recent)||recent!==card.dataset.lumenCheckoutId){action.textContent='Atualize o carrinho para continuar';action.disabled=true;return}
   action.disabled=true;action.textContent='Abrindo Crédito Lúmen...';window.location.assign(checkoutPage(recent));
 });
 const note=document.createElement('p');note.className='lumen-cart-choice-note';note.textContent='O valor e o limite serão conferidos antes de concluir sua compra.';
 card.append(title,description,action,note);return card;
}
async function checkVisibility(id){
 try{
   controller.pending=id;
   const response=await fetch('/_functions/creditoLumenCheckoutDisplay?checkoutId='+encodeURIComponent(id),{credentials:'same-origin',cache:'no-store'});
   if(!response.ok)return;
   const answer=await response.json();
   if(controller.pending!==id||!cartPath())return;
   const anchor=currentAnchor();
   if(!anchor||getId(anchor)!==id)return;
   const parent=anchor.closest('[data-hook="CheckoutButtons.default"]');if(!parent)return;
   parent.querySelectorAll('.lumen-cart-choice').forEach(n=>{if(n.dataset.lumenCheckoutId!==id)n.remove()});
   if(answer?.eligible!==true||answer?.canPayPilot!==true){parent.querySelectorAll('.lumen-cart-choice').forEach(n=>n.remove());return}
   if(!parent.querySelector('.lumen-cart-choice'))anchor.insertAdjacentElement('afterend',newCard(id));
 }catch(e){console.warn('LUMEN_CART_CREDIT_CHECK_FAILED',String(e?.message||e).slice(0,90))}
}
function sync(){
 if(!cartPath()){document.documentElement.classList.remove('lumen-cart-active');return}
 document.documentElement.classList.add('lumen-cart-active');const anchor=currentAnchor();if(!anchor)return;
 if(anchor.getAttribute('aria-label')!=='Finalizar Pedido')anchor.setAttribute('aria-label','Finalizar Pedido');
 const label=anchor.querySelector('span');if(label&&label.textContent.trim()!=='Finalizar Pedido')label.textContent='Finalizar Pedido';
 const id=getId(anchor);if(!validateId(id))return;
 const parent=anchor.closest('[data-hook="CheckoutButtons.default"]');
 const existing=parent?.querySelector('.lumen-cart-choice');if(existing&&existing.dataset.lumenCheckoutId!==id)existing.remove();
 if(controller.checkoutId!==id){controller.checkoutId=id;controller.pending=''}
 if(!existing&&controller.pending!==id)checkVisibility(id);
}
function schedule(){if(controller.timer)return;controller.timer=setTimeout(()=>{controller.timer=null;sync()},180)}
const observer=new MutationObserver(schedule);observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
window.addEventListener('popstate',schedule);window.addEventListener('pageshow',schedule);sync();
})();