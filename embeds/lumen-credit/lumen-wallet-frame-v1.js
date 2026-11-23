/* Lúmen Luxos · ampliação isolada do iframe da área Crédito Lúmen */
(()=>{'use strict';
const KEY='__lumenCreditFrameSizeV1';if(window[KEY]?.active)return;
const state={active:true,target:null,height:0,scheduled:false};window[KEY]=state;
const isCreditPage=()=>/^\\/account\\/blank-1\\/?$/i.test(location.pathname);
function findFrame(){
 const frames=[...document.querySelectorAll('iframe')];
 const list=frames.map(frame=>{
   const src=frame.getAttribute('src')||'',title=frame.getAttribute('title')||'';
   const htmlHost=frame.closest('[data-testid="html-comp"],[data-hook="html-comp"]');
   const score=/credito-lumen|wix-host\\.com/i.test(src)?100:htmlHost?40:/html iframe|html component/i.test(title)?20:0;
   return {frame,score};
 }).filter(x=>x.score>0&&x.frame.getBoundingClientRect().width>200&&x.frame.getBoundingClientRect().height>100);
 list.sort((a,b)=>b.score-a.score);return list[0]?.frame||null;
}
function adjust(height){
 const frame=findFrame();if(!frame)return false;
 const h=Math.max(680,Math.min(1700,Math.ceil(Number(height)||1100)));
 state.target=frame;state.height=h;
 const host=frame.closest('[data-testid="html-comp"],[data-hook="html-comp"]')||frame.parentElement;
 if(!host)return false;
 const size=h+'px';
 for(const x of [frame,host]){
   if(x.style.getPropertyValue('height')!==size)x.style.setProperty('height',size,'important');
   if(x.style.getPropertyValue('min-height')!==size)x.style.setProperty('min-height',size,'important');
 }
 host.style.setProperty('overflow','visible','important');
 // Aumenta o espaço real da seção, evitando que o rodapé cubra o formulário.
 const section=host.closest('section')||host.closest('main');
 if(section){
   const distance=host.getBoundingClientRect().top-section.getBoundingClientRect().top;
   const needed=Math.max(h+60,Math.ceil(distance+h+55));
   if(needed<=2400){
     const current=parseFloat(section.style.minHeight)||0;
     if(current<needed)section.style.setProperty('min-height',needed+'px','important');
   }
 }
 return true;
}
function schedule(){if(state.scheduled)return;state.scheduled=true;setTimeout(()=>{state.scheduled=false;if(isCreditPage())adjust(state.height||1100)},220)}
window.addEventListener('message',e=>{
 if(!isCreditPage()||!state.target||e.source!==state.target.contentWindow)return;
 const m=e.data;if(m?.kind==='LUMEN_ONLINE_CREDIT_UI'&&m.type==='RESIZE'){
   const v=Number(m.data?.height);
   if(Number.isFinite(v)&&v>=180&&v<=1600)adjust(v+90);
 }
});
const observer=new MutationObserver(schedule);observer.observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('pageshow',schedule);window.addEventListener('resize',schedule,{passive:true});
if(isCreditPage())schedule();
})();