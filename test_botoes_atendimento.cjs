const { chromium } = require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const assert = require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const roots=[
      ['velum-admin-panel','VELUM_ADMIN_PORTAL'],
      ['lumen-admin-panel','LUMEN_ADMIN_PANEL']
    ];
    for(const [name,source] of roots){
      const page=await browser.newPage();
      const file=path.resolve(__dirname,'embeds',name,'index.html');
      await page.goto(pathToFileURL(file).href,{waitUntil:'domcontentloaded'});
      const result=await page.evaluate(async()=>{
        const button=document.getElementById('velumAtendimentoIaOpen');
        if(!button)return {found:false};
        const events=[];
        window.addEventListener('message',e=>events.push(e.data));
        button.click();
        await new Promise(resolve=>setTimeout(resolve,50));
        return {found:true,text:button.textContent,events, ariaLabel:button.getAttribute('aria-label'), count:document.querySelectorAll('#velumAtendimentoIaOpen').length, width:Math.round(button.getBoundingClientRect().width), inHeader:!!button.closest('.top'), inQuick:!!button.closest('.quick')};
      });
      assert.equal(result.found,true,name+' missing button');
      assert.equal(result.events.some(v=>v?.source===source&&v?.type==='OPEN_IA'),true,name+' does not send OPEN_IA');
      assert.equal(result.count,1,name+' duplicate IA launcher');
      if(name==='lumen-admin-panel'){
        assert.equal(result.text.trim(),'🤖','Lúmen launcher must be robot icon only');
        assert.equal(result.ariaLabel,'Abrir Atendimento IA');
        assert.equal(result.inHeader,true,'Lúmen IA launcher must be in header');
        assert.equal(result.inQuick,false,'Lúmen quick actions must not have a large IA card');
        assert.ok(result.width<=44,'Lúmen IA launcher must remain discreet');
      }
      await page.close();
    }
    console.log('OK: buttons in both hosted admin panels send OPEN_IA to their Wix page.');
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
