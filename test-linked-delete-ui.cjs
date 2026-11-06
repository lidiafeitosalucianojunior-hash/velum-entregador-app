'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),vm=require('vm');
const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const html=fs.readFileSync(path.join(__dirname,'embeds/velum-admin-panel/index.html'),'utf8');
const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach(([_,script],i)=>{if(script.trim())new vm.Script(script,{filename:'admin-panel-'+i})});
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route('https://app.vaidevelum.com/embeds/velum-admin-panel/**',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  const page=await context.newPage();
  await page.goto('https://app.vaidevelum.com/embeds/velum-admin-panel/?test=linked-deletion',{waitUntil:'load'});
  await page.evaluate(()=>{
   window.outbound=[];
   window.addEventListener('message',e=>{if(e.data?.source==='VELUM_ADMIN_PORTAL')window.outbound.push(e.data)});
   token='unit-test-admin';nativeMembersOpen();
  });
  async function nextReq(action){
    const rows=await page.evaluate(()=>window.outbound.filter(x=>x.type==='NATIVE_MEMBERS'));
    const last=rows.at(-1);
    assert.equal(last.payload.action,action);
    return last.payload;
  }
  let req=await nextReq('LIST');
  const seed={source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{
   ok:true,action:'LIST',requestId:req.requestId,items:[
     {id:'m-1',kind:'MEMBER',name:'Cliente Teste',email:'jpmaratonista@gmail.com'},
     {id:'c-1',kind:'CONTACT',name:'Cliente Teste',email:'jpmaratonista@gmail.com'}],
   counts:{members:1,contacts:1},mensagem:'Consulta concluída.'}};
  await page.evaluate(value=>window.postMessage(value,'*'),seed);
  await page.waitForTimeout(80);
  assert.equal(await page.locator('#nativeMemberRows button').filter({hasText:'Excluir contato Wix'}).count(),1);
  await page.locator('#nativeMemberRows button').filter({hasText:'Excluir contato Wix'}).click();
  await page.waitForTimeout(120);
  req=await nextReq('CHECK_DELETE');assert.equal(req.data.kind,'CONTACT');
  const before=await page.evaluate(()=>window.outbound.filter(x=>x.payload?.action==='DELETE_FULL').length);
  assert.equal(before,0,'must never delete before server preflight');
  const answer={source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{
    ok:true,action:'CHECK_DELETE',kind:'CONTACT',id:'c-1',contactId:'c-1',memberId:'m-1',email:'jpmaratonista@gmail.com',hasMember:true,requestId:req.requestId}};
  const seen=[];
  page.on('dialog',async dialog=>{seen.push(dialog.type());if(dialog.type()==='prompt')await dialog.accept('EXCLUIR');else await dialog.accept()});
  await page.evaluate(v=>window.postMessage(v,'*'),answer);
  await page.waitForTimeout(110);
  req=await nextReq('DELETE_FULL');
  assert.equal(req.data.contactId,'c-1');
  assert.equal(req.data.memberId,'m-1');
  assert.equal(req.data.confirmationText,'EXCLUIR');
  assert.equal(req.data.confirm,true);
  assert.deepEqual(seen,['confirm','prompt']);
  console.log('WIX_LINKED_DELETE_UI_OK: requires server preflight, exact target, separate consent and EXCLUIR phrase; both dialogs shown on iPhone');
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
