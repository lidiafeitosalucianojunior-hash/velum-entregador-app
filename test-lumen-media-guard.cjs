'use strict';
const fs=require('node:fs'),path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const html=fs.readFileSync(path.join(__dirname,'embeds/lumen-ia/index.html'),'utf8');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.route('https://app.vaidevelum.com/embeds/lumen-ia/**',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  const host=[
   '<!doctype html><html><body><iframe src="https://app.vaidevelum.com/embeds/lumen-ia/?media-guard-test" style="width:390px;height:1650px"></iframe>',
   '<script>window.calls=[];window.addEventListener("message",e=>{',
   'const m=e.data||{};if(m.source!=="LUMEN_ADMIN_PANEL")return;window.calls.push(m.type);',
   'const reply=(type,payload)=>e.source.postMessage({source:"LUMEN_ADMIN_PANEL_PAGE",type,payload},e.origin);',
   'if(m.type==="IA_PING")reply("IA_PONG",{ok:true});',
   'if(m.type==="IA_LIST")reply("IA_LIST_RESULT",{ok:true,items:[',
   '{id:"a",cliente:"Cliente de mídia",canal:"WHATSAPP",modo:"IA",ultimaMensagem:"[Mensagem recebida]"},',
   '{id:"b",cliente:"Cliente com texto",canal:"WHATSAPP",modo:"IA",ultimaMensagem:"Esse qual o valor"}',
   '],aviso:"Caixa sincronizada"});',
   'if(m.type==="IA_META_CONFIG_REQUEST")reply("IA_META_CONFIG_RESULT",{ok:false,mensagem:"Aguardando Meta"});',
   'if(m.type==="IA_META_STATUS")reply("IA_META_STATUS_RESULT",{ok:false,mensagem:"Aguardando Meta"});',
   'if(m.type==="IA_DRAFT")reply("IA_DRAFT_RESULT",{ok:true,id:"b",messageId:"msg-b",rascunho:"Pode me enviar a foto do produto?",mensagem:"Sugestão pronta"});',
   '});</script></body></html>'
  ].join('');
  await page.route('https://www.vaidevelum.com/__media_guard_test',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:host}));
  await page.goto('https://www.vaidevelum.com/__media_guard_test',{waitUntil:'load'});
  const frame=page.frameLocator('iframe');
  await frame.locator('#conversationList button').first().waitFor({timeout:8000});
  await frame.locator('#conversationList button').nth(1).click();
  assert.equal(await frame.locator('#suggest').isEnabled(),true);
  await frame.locator('#suggest').click();
  await page.waitForTimeout(250);
  assert.match(await frame.locator('#aiDraft').inputValue(),/foto do produto/);
  assert.equal(await frame.locator('#sendApproved').isEnabled(),true);
  await frame.locator('#conversationList button').first().click();
  assert.equal(await frame.locator('#aiDraft').inputValue(),'','Draft from prior customer must be erased');
  assert.equal(await frame.locator('#suggest').isDisabled(),true,'No suggestion for unreadable media');
  assert.equal(await frame.locator('#sendApproved').isDisabled(),true,'No send from prior customer');
  assert.match(await frame.locator('#feedback').innerText(),/não contém texto legível/);
  assert.match(await frame.locator('#feedback').innerText(),/atenda manualmente/);
  const calls=await page.evaluate(()=>window.calls);
  assert.equal(calls.filter(x=>x==='IA_DRAFT').length,1);
  assert.equal(calls.filter(x=>x==='IA_SEND').length,0);
  console.log('MEDIA_GUARD_OK: no AI draft from unreadable message, no prior-client draft leakage or send');
 }finally{await browser.close();}
})().catch(err=>{console.error(err.stack);process.exitCode=1});
