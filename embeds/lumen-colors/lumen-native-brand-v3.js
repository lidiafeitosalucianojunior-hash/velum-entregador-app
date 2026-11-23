/* Identidade Lúmen Luxos para páginas nativas Wix. Não substitui formulários, estoque ou checkout. */
(function(){
'use strict';
if(window.__lumenNativeBrandV3?.version==='3.0.0')return;
window.__lumenNativeBrandV3={version:'3.0.0'};
const nativeRoutes=/^\/(?:account(?:\/|$)|members(?:\/|$)|member-area(?:\/|$)|login(?:\/|$)|signup(?:\/|$)|cart-page\/?$|product-page\/|checkout(?:\/|$)|thank-you(?:\/|$)|my-account(?:\/|$)|my-orders(?:\/|$)|my-addresses(?:\/|$)|my-wallet(?:\/|$)|my-subscriptions(?:\/|$)|search(?:\/|$)|results(?:\/|$)|password(?:\/|$)|payment-request-page(?:\/|$))/i;
function sync(){
 const path=decodeURI(location.pathname);
 // O painel Crédito Lúmen foi aprovado e mantém exatamente sua identidade e frame.
 const should=nativeRoutes.test(path)&&!/^\/account\/blank-1\/?$/i.test(path);
 document.documentElement.classList.toggle('lumen-native-brand',should);
}
const style=document.createElement('style');style.id='lumen-native-brand-css-v3';
style.textContent=[
':root.lumen-native-brand{--lumen-cocoa:#563d2c;--lumen-dark:#3c291d;--lumen-gold:#b49361;--lumen-beige:#ede1d1;--lumen-paper:#fffdfa;--lumen-muted:#796c60}',
'html.lumen-native-brand body{color:var(--lumen-cocoa)}',
'html.lumen-native-brand #SITE_PAGES{background-color:#fffdfb!important;color:var(--lumen-cocoa)!important}',
'html.lumen-native-brand #SITE_PAGES :is(h1,h2,h3,h4,[role=heading]){color:var(--lumen-dark)!important;letter-spacing:-.01em}',
'html.lumen-native-brand #SITE_PAGES :is(label,legend){color:var(--lumen-cocoa)}',
'html.lumen-native-brand #SITE_PAGES :is(input:not([type=checkbox]):not([type=radio]),textarea,select){box-sizing:border-box;max-width:100%;border-radius:9px!important;accent-color:var(--lumen-gold)}',
'html.lumen-native-brand #SITE_PAGES :is(input[type=radio],input[type=checkbox]){accent-color:var(--lumen-cocoa)}',
'html.lumen-native-brand #SITE_PAGES :is(button,[role=button],.wixui-button){border-radius:10px!important}',
'html.lumen-native-brand #SITE_PAGES :is(a,button,input,select,textarea,[role=button],[role=tab]):focus-visible{outline:2px solid var(--lumen-gold)!important;outline-offset:3px!important}',
'html.lumen-native-brand #SITE_PAGES :is(input,textarea,select):focus-visible{border-color:var(--lumen-gold)!important}',
'html.lumen-native-brand #SITE_PAGES :is(a,[role=link]):not([data-hook*=product]):hover{color:#8f6a44}',
'html.lumen-native-brand #SITE_PAGES :is([role=tab][aria-selected=true],button[aria-pressed=true]){border-color:#b39a78!important}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=error],[role=alert]){color:#9f4237}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=account-menu],[data-hook*=member-menu],[class*=MembersArea]){accent-color:var(--lumen-gold)}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=tablist],[role=tablist]){border-color:#e7dac9}',
'html.lumen-native-brand #SITE_PAGES [role=tab][aria-selected=true]{color:var(--lumen-cocoa)!important;border-bottom-color:var(--lumen-gold)!important}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=card],[data-hook*=Card]){border-color:#e7dccf;border-radius:12px}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=separator],[data-hook*=divider]){border-color:#ede4d9}',
'html.lumen-native-brand #SITE_PAGES [data-hook*=product-item-price]{color:var(--lumen-dark)}',
'html.lumen-native-brand #SITE_PAGES [data-hook=product-title]{color:var(--lumen-dark)!important}',
'html.lumen-native-brand #SITE_PAGES [data-hook=product-price]{color:#8f6a44!important}',
'html.lumen-native-brand #SITE_PAGES [data-hook*=product-gallery]{border-radius:10px}',
'html.lumen-native-brand #SITE_PAGES [data-hook=add-to-cart-button] :is(button,.wixui-button){background-color:var(--lumen-cocoa)!important;color:#fff!important;border-color:var(--lumen-cocoa)!important}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=member],[data-hook*=account]) a[aria-current=page]{color:#825e3b!important;font-weight:700}',
'html.lumen-native-brand #SITE_PAGES a[aria-current=page]{text-decoration-color:var(--lumen-gold)}',
'html.lumen-native-brand #SITE_PAGES :is([data-hook*=empty],[data-hook*=Empty]){color:var(--lumen-muted)}',
'@media(max-width:600px){html.lumen-native-brand #SITE_PAGES :is(input:not([type=checkbox]):not([type=radio]),textarea,select){min-width:0;width:auto;max-width:100%}html.lumen-native-brand #SITE_PAGES :is(h1,[role=heading][aria-level="1"]){overflow-wrap:anywhere}}',
'@media(prefers-reduced-motion:reduce){html.lumen-native-brand #SITE_PAGES *{scroll-behavior:auto!important}}'
].join('\n');
document.head.appendChild(style);
sync();
window.addEventListener('popstate',sync);
window.addEventListener('pageshow',sync);
window.addEventListener('hashchange',sync);
setInterval(sync,1800);
})();