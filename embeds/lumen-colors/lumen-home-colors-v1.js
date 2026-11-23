/* Lúmen Luxos — sete cores em uma linha, separadas das numerações na página inicial. */
(function () {
"use strict";
if (location.pathname !== "/" && location.pathname !== "") return;
if (window.__lumenHomeColorsV1?.version === "1.0.0") return;
const state = window.__lumenHomeColorsV1 = { version: "1.0.0" };
const colors = [
  {key:"preto",name:"Preto",hex:"#191919"},
  {key:"branco",name:"Branco",hex:"#f2f1ed"},
  {key:"marrom",name:"Marrom",hex:"#81502f"},
  {key:"nude",name:"Nude",hex:"#d5aa80"},
  {key:"dourado",name:"Dourado",hex:"#dcae3f"},
  {key:"prata",name:"Prata",hex:"#b8bcc3"},
  {key:"vinho",name:"Vinho",hex:"#79243e"}
];
const selected = (new URLSearchParams(location.search).get("cor")||"").toLowerCase();
const style = document.createElement("style");
style.id = "lumen-home-colors-style-v1";
style.textContent = [
 '#comp-mtkon13o [data-mesh-id="comp-mtkon13oinlineContent-gridContainer"]{grid-template-rows:repeat(8,auto)!important}',
 '#comp-mtkon13o #lumen-home-color-filter{grid-area:5 / 1 / 6 / 2!important;display:block!important;width:100%!important;min-width:0!important;margin:0 0 12px!important;position:relative!important}',
 '#comp-mtkon13o #comp-mtsoft3b{grid-area:6 / 1 / 7 / 2!important}',
 '#comp-mtkon13o #comp-mtkosfdq{grid-area:7 / 1 / 8 / 2!important}',
 '#comp-mtkon13o #comp-mtlt5din{grid-area:8 / 1 / 9 / 2!important}',
 '#lumen-home-color-filter *{box-sizing:border-box}',
 '#lumen-home-color-filter .ll-color-title{font:600 12px/1.2 Arial,sans-serif;color:#624b38;text-align:center;margin:0 0 6px}',
 '#lumen-home-color-filter .ll-color-scroll{width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin}',
 '#lumen-home-color-filter .ll-color-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px;min-width:315px;max-width:650px;margin:0 auto}',
 '#lumen-home-color-filter button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:0;min-height:54px;padding:5px 0;border:1px solid transparent;border-radius:8px;background:transparent;cursor:pointer;color:#5e472d;font:500 10px/1.15 Arial,sans-serif;appearance:none}',
 '#lumen-home-color-filter button[aria-pressed=true]{border-color:#b89a74;background:#efe6db}',
 '#lumen-home-color-filter .ll-color-dot{display:block;width:23px;height:23px;border:1px solid rgba(74,54,35,.3);border-radius:50%;box-shadow:inset 0 1px 2px #fff5}',
 '@media(max-width:360px){#lumen-home-color-filter button{font-size:9px}}'
].join("\n");
document.head.appendChild(style);
function create() {
 const outer = document.createElement("section");
 outer.id = "lumen-home-color-filter";
 outer.setAttribute("aria-label","Filtre produtos pela cor");
 const title=document.createElement("div");title.className="ll-color-title";title.textContent="Escolha a cor";
 const scroll=document.createElement("div");scroll.className="ll-color-scroll";
 const grid=document.createElement("div");grid.className="ll-color-grid";grid.setAttribute("role","group");grid.setAttribute("aria-label","Cores");
 for(const c of colors) {
  const btn=document.createElement("button");btn.type="button";
  btn.dataset.cor=c.key;btn.setAttribute("aria-pressed",String(selected===c.key));
  btn.setAttribute("aria-label","Filtrar por "+c.name+(selected===c.key?" (selecionada)":""));
  const dot=document.createElement("span");dot.className="ll-color-dot";dot.style.backgroundColor=c.hex;
  const name=document.createElement("span");name.textContent=c.name;
  btn.append(dot,name);
  btn.addEventListener("click",()=>{
   const url=new URL(location.href);
   if(c.key===selected)url.searchParams.delete("cor");
   else url.searchParams.set("cor",c.key);
   location.assign(url.href);
  });
  grid.appendChild(btn);
 }
 scroll.append(grid);outer.append(title,scroll);
 return outer;
}
function mount(){
 const grid=document.querySelector('[data-mesh-id="comp-mtkon13oinlineContent-gridContainer"]');
 const anchor=document.getElementById("comp-mtlus61b");
 if(!grid || !anchor || anchor.parentElement!==grid)return;
 if(document.getElementById("lumen-home-color-filter"))return;
 anchor.insertAdjacentElement("afterend",create());
}
mount();
document.addEventListener("DOMContentLoaded",mount);
window.addEventListener("pageshow",mount);
setTimeout(mount,300);setTimeout(mount,1800);
const obs=new MutationObserver(()=>{if(!document.getElementById("lumen-home-color-filter"))mount()});
obs.observe(document.documentElement,{subtree:true,childList:true});
})();