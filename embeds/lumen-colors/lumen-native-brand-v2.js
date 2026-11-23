/* Identidade Lúmen nas páginas nativas Wix, sem modificar fluxo de checkout ou widgets de pagamento. */
(function(){
"use strict";
if(window.__lumenNativeBrandV2)return;
window.__lumenNativeBrandV2=true;
const onNative=()=> /^\/(account(?:\/|$)|members(?:\/|$)|login(?:\/|$)|signup(?:\/|$)|cart-page\/?$|product-page\/|checkout(?:\/|$)|thank-you(?:\/|$)|my-account(?:\/|$)|search(?:\/|$))/i.test(location.pathname);
function syncBrand(){
 document.documentElement.classList.toggle("lumen-native-brand",onNative());
}
syncBrand();
window.addEventListener("popstate",syncBrand);
window.addEventListener("pageshow",syncBrand);
setInterval(syncBrand,2000);
if(document.getElementById("lumen-native-brand-css-v2"))return;
const style=document.createElement("style");
style.id="lumen-native-brand-css-v2";
style.textContent=[
".lumen-native-brand #SITE_PAGES{color:#4c3826}",
".lumen-native-brand #SITE_PAGES :is(h1,h2,h3){color:#4c3826}",
".lumen-native-brand #SITE_PAGES :is(input:not([type=checkbox]):not([type=radio]),textarea,select){border-radius:8px;accent-color:#947348;min-width:0}",
".lumen-native-brand #SITE_PAGES :is(button,a,[role=button]):focus-visible{outline:2px solid #ba9756!important;outline-offset:3px!important}",
".lumen-native-brand #SITE_PAGES :is(input,textarea,select):focus-visible{outline-color:#b99868!important}",
".lumen-native-brand #SITE_PAGES :is(button,[role=button]){border-radius:9px}",
".lumen-native-brand #SITE_PAGES a:not([data-hook*=product]):hover{color:#95704a}",
".lumen-native-brand #SITE_PAGES [data-hook*=error]{color:#a23932}",
"@media(max-width:600px){.lumen-native-brand #SITE_PAGES :is(input:not([type=checkbox]):not([type=radio]),textarea,select){max-width:100%}}"
].join("\n");
document.head.appendChild(style);
})();