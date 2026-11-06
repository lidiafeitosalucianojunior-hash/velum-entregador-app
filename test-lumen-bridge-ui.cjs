'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const html=fs.readFileSync(path.join(__dirname,'embeds','lumen-ia','index.html'),'utf8');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
   const page=await browser.newPage({viewport:{width:390,height:844}});
   await page.route('https://app.vaidevelum.com/embeds/lumen-ia/**',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
   const fakeHost=[
    '<!doctype html><html><body>',
    '<iframe style="width:100%;height:1500px" src="https://app.vaidevelum.com/embeds/lumen-ia/?bridge-test"></iframe>',
    '<script>',
    'window.requests=[];window.lists=0;window.notifications=0;',
    'window.addEventListener("message",e=>{',
    'const msg=e.data||{}; if(msg.source!=="LUMEN_ADMIN_PANEL")return;',
    'window.requests.push(msg.type);',
    'const respond=(type,payload)=>e.source.postMessage({source:"LUMEN_ADMIN_PANEL_PAGE",type,payload},e.origin);',
    'if(msg.type==="IA_PING")setTimeout(()=>respond("IA_PONG",{ok:true}),170);',
    'if(msg.type==="IA_LIST"){window.lists++;if(window.lists>=2)respond("IA_LIST_RESULT",{ok:true,items:[],aviso:"Nenhuma conversa real recebida; aguardando conexão Meta."});}',
    'if(msg.type==="IA_META_STATUS")respond("IA_META_STATUS_RESULT",{ok:true,whatsapp:{completeCount:6,totalCount:6,integracao:{estado:"OK"}},instagram:{completeCount:0,totalCount:3,missing:["CONFIG"]}});',
    'if(msg.type==="IA_META_CONFIG_REQUEST")respond("IA_META_CONFIG_RESULT",{ok:false,mensagem:"Cadastro Meta sob análise"});',
    'if(msg.type==="IA_LAB_TEST")respond("IA_LAB_RESULT",{ok:true,requestId:msg.payload.requestId,fonte:"SIMULACAO",resposta:"Olá! Sou assistente da Lúmen Luxos. Simulação sem envio.",pendente:false});',
    '});',
    '</script></body></html>'
   ].join('');
   await page.route('https://www.vaidevelum.com/__lumen_bridge_test',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:fakeHost}));
   await page.goto('https://www.vaidevelum.com/__lumen_bridge_test',{waitUntil:'load'});
   await page.waitForTimeout(1100);
   const frame=page.frameLocator('iframe');
   const state=await page.evaluate(()=>({requests:window.requests,lists:window.lists}));
   assert.ok(state.requests.includes('IA_PING'),'UI should request Wix readiness');
   assert.ok(state.lists>=2,'UI must retry missing inbox request when bridge replies');
   assert.match(await frame.locator('#notice').innerText(),/Nenhuma conversa real recebida/);
   assert.match(await frame.locator('#conversationList').innerText(),/Nenhuma conversa sincronizada/);
   assert.match(await frame.locator('#waState').innerText(),/6\/6/);
   await frame.locator('#labQuestion').fill('Oi');
   await frame.locator('#labRun').click();
   await page.waitForTimeout(150);
   assert.match(await frame.locator('#labAnswer').innerText(),/Simulação sem envio/);
   assert.ok(!state.requests.includes('IA_SEND'),'simulation must not send real WhatsApp messages');
   console.log('LUMEN_BRIDGE_UI_TEST_OK: ping, lost first inbox, retry, empty state, status and isolated simulation');
 }finally{await browser.close();}
})().catch(e=>{console.error(e.stack);process.exitCode=1});