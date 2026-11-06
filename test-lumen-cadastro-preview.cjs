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
   '<!doctype html><html><body><iframe src="https://app.vaidevelum.com/embeds/lumen-ia/?cadastro-preview-test" style="width:390px;height:1600px"></iframe>',
   '<script>window.calls=[];window.addEventListener("message",e=>{',
   'const m=e.data||{};if(m.source!=="LUMEN_ADMIN_PANEL")return;window.calls.push(m.type);',
   'const reply=(type,payload)=>e.source.postMessage({source:"LUMEN_ADMIN_PANEL_PAGE",type,payload},e.origin);',
   'if(m.type==="IA_PING")reply("IA_PONG",{ok:true});',
   'if(m.type==="IA_LIST")reply("IA_LIST_RESULT",{ok:true,items:[',
   '{id:"client1",cliente:"Cliente 1",canal:"WHATSAPP",modo:"IA",ultimaMensagem:"Meu nome é Ana Paula"},',
   '{id:"client2",cliente:"Cliente 2",canal:"WHATSAPP",modo:"IA",ultimaMensagem:"Esse qual o valor"}',
   '],aviso:"Caixa sincronizada"});',
   'if(m.type==="IA_META_CONFIG_REQUEST")reply("IA_META_CONFIG_RESULT",{ok:false,mensagem:"Pendente"});',
   'if(m.type==="IA_META_STATUS")reply("IA_META_STATUS_RESULT",{ok:false,mensagem:"Pendente"});',
   'if(m.type==="IA_CADASTRO_PREVIEW")reply("IA_CADASTRO_PREVIEW_RESULT",{ok:true,id:m.payload.id,cadastro:{',
   'campos:{nome:{valor:"Ana Paula",estado:"AGUARDANDO_CONFIRMACAO"},cep:{valor:"58900000",estado:"AGUARDANDO_CONFIRMACAO"}},',
   'bling:{estado:"CORRESPONDENCIA_UNICA",quantidade:1,contatoId:42},atualizacaoAutomatica:false,podeGravarNoBling:false},somenteLeitura:true});',
   '});</script></body></html>'
  ].join('');
  await page.route('https://www.vaidevelum.com/__lumen_cadastro_preview_test',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:host}));
  await page.goto('https://www.vaidevelum.com/__lumen_cadastro_preview_test',{waitUntil:'load'});
  const frame=page.frameLocator('iframe');
  await frame.locator('#conversationList button').first().waitFor({timeout:9000});
  await frame.locator('#conversationList button').first().click();
  await frame.locator('#cadastroPreviewPanel summary').click();
  assert.equal(await frame.locator('#cadastroPreviewButton').isEnabled(),true);
  await frame.locator('#cadastroPreviewButton').click();
  await frame.locator('#cadastroPreviewFields').getByText('Ana Paula',{exact:false}).waitFor();
  assert.match(await frame.locator('#cadastroPreviewFields').innerText(),/CEP/);
  assert.match(await frame.locator('#cadastroPreviewStatus').innerText(),/Somente leitura/);
  await frame.locator('#conversationList button').nth(1).click();
  assert.equal(await frame.locator('#cadastroPreviewFields').innerText(),'');
  const calls=await page.evaluate(()=>window.calls);
  assert.equal(calls.filter(x=>x==='IA_CADASTRO_PREVIEW').length,1);
  assert.equal(calls.filter(x=>x==='IA_SEND').length,0);
  console.log('CADASTRO_PREVIEW_UI_OK: authenticated data scoped to selected customer; no write/send controls');
 }finally{await browser.close();}
})().catch(err=>{console.error(err.stack);process.exitCode=1});
