/* Lúmen Luxos | carrinho limpo sem injeção no componente React do Wix. */
(()=>{'use strict';
 const VERSION='2.0.0';
 if(window.__lumenCartCleanV2?.version===VERSION)return;
 const state={version:VERSION,scheduled:false,running:false};window.__lumenCartCleanV2=state;
 const GUID=/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;
 const cartPage=()=>/^\\/cart-page\\/?$/i.test(location.pathname);
 let style=document.getElementById('lumen-cart-clean-style');
 if(!style){style=document.createElement('style');style.id='lumen-cart-clean-style';style.textContent="\nhtml.lumen-cart-clean-v2 a[data-wix-checkout-button],\nhtml.lumen-cart-clean-v2 a[data-hook=\"CheckoutButtonDataHook.button\"]{\n box-sizing:border-box!important;background:#513923!important;border:1px solid #513923!important;\n border-radius:10px!important;color:#fff!important;min-height:48px!important;\n margin-bottom:66px!important;font-weight:700!important;\n box-shadow:none!important;text-transform:capitalize!important;\n}\nhtml.lumen-cart-clean-v2 a[data-wix-checkout-button] span,\nhtml.lumen-cart-clean-v2 a[data-hook=\"CheckoutButtonDataHook.button\"] span{\n text-transform:capitalize!important;color:white!important;font-weight:700!important;\n}\n#lumen-cart-clean-credit-button{\n box-sizing:border-box!important;position:absolute!important;z-index:12!important;\n display:none;align-items:center;justify-content:center;\n background:#f8f4ed!important;color:#513923!important;\n border:1px solid #9c7b55!important;border-radius:10px!important;\n font-family:Arial,Helvetica,sans-serif!important;font-size:14px!important;font-weight:700!important;\n min-height:48px!important;padding:10px 14px!important;line-height:1.35!important;\n text-decoration:none!important;box-shadow:none!important;text-align:center!important;\n -webkit-tap-highlight-color:transparent;\n}\n#lumen-cart-clean-credit-button:hover{background:#eee5d9!important}\n#lumen-cart-clean-credit-button:focus-visible{outline:2px solid #ba9557!important;outline-offset:2px!important}\n@media(max-width:600px){#lumen-cart-clean-credit-button{font-size:13px!important}}\n";document.head.appendChild(style)}
 let credit=document.getElementById('lumen-cart-clean-credit-button');
 if(!credit){credit=document.createElement('a');credit.id='lumen-cart-clean-credit-button';credit.textContent='Comprar com Crédito Lúmen';credit.setAttribute('aria-label','Comprar com Crédito Lúmen');document.body.appendChild(credit)}
 function set(el,key,value){if(el.style[key]!==value)el.style[key]=value}
 function locate(){
  if(!cartPage())return null;
  return [...document.querySelectorAll('a[data-wix-checkout-button],a[data-hook="CheckoutButtonDataHook.button"]')].find(a=>{
   try{const u=new URL(a.href,location.href);return u.origin===location.origin&&u.pathname==='/checkout'&&GUID.test(u.searchParams.get('checkoutId')||'')&&a.getBoundingClientRect().width>100}catch{return false}
  })||null;
 }
 function render(){
  if(state.running)return;state.running=true;
  try{
   const native=locate();document.documentElement.classList.toggle('lumen-cart-clean-v2',!!native);
   if(!native){set(credit,'display','none');return}
   const u=new URL(native.href,location.href);
   const newUrl=new URL('/account/blank-1',location.origin);
   newUrl.searchParams.set('checkoutId',u.searchParams.get('checkoutId'));
   newUrl.searchParams.set('from','cart');
   const href=newUrl.toString();if(credit.href!==href)credit.href=href;
   const r=native.getBoundingClientRect();
   const x=Math.round(r.left+window.scrollX),y=Math.round(r.bottom+window.scrollY+9),w=Math.round(r.width);
   set(credit,'left',x+'px');set(credit,'top',y+'px');set(credit,'width',w+'px');set(credit,'height','48px');
   set(credit,'display','flex');
  }finally{state.running=false}
 }
 function queue(){if(state.scheduled)return;state.scheduled=true;setTimeout(()=>{state.scheduled=false;render()},200)}
 const observer=new MutationObserver(queue);
 observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href']});
 window.addEventListener('resize',queue,{passive:true});
 window.addEventListener('scroll',queue,{passive:true});
 window.addEventListener('popstate',queue);
 window.addEventListener('pageshow',queue);
 render();
})();
