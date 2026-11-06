'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const html=fs.readFileSync(path.join(__dirname,'embeds/velum-admin-panel/index.html'),'utf8');
const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
for(let i=0;i<scripts.length;i++){
  if(!scripts[i][1].trim())continue;
  new vm.Script(scripts[i][1],{filename:'admin-ui-'+i+'.js'});
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route('https://app.vaidevelum.com/embeds/velum-admin-panel/**',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  const page=await context.newPage();
  await page.goto('https://app.vaidevelum.com/embeds/velum-admin-panel/?test=directory',{waitUntil:'load'});
  const state=await page.evaluate(()=>{
    window.outbound=[];
    window.addEventListener('message',e=>{if(e.data?.source==='VELUM_ADMIN_PORTAL')window.outbound.push(e.data)});
    token='unit-test-admin';
    nativeMembersOpen();
    return {modal:document.querySelector('#nativeMemberModal').style.display};
  });
  assert.equal(state.modal,'grid');
  let requests=await page.evaluate(()=>window.outbound.filter(x=>x.type==='NATIVE_MEMBERS'));
  assert.equal(requests.length,1);assert.equal(requests[0].payload.action,'LIST');
  const response={source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{
    ok:true,action:'LIST',requestId:requests[0].payload.requestId,items:[
      {id:'m-1',kind:'MEMBER',name:'João Pessoa',email:'jpmaratonista@gmail.com'},
      {id:'c-1',kind:'CONTACT',name:'João Pessoa',email:'jpmaratonista@gmail.com'}],
    counts:{members:1,contacts:1},mensagem:'Busca concluída.'
  }};
  await page.evaluate(response=>window.postMessage(response,'*'),response);
  await page.waitForTimeout(130);
  assert.equal(await page.locator('#nativeMemberRows strong').count(),2);
  assert.match(await page.locator('#nativeMembersCount').innerText(),/1 membro/);
  assert.match(await page.locator('#nativeMemberRows').innerText(),/Membro Wix/);
  assert.match(await page.locator('#nativeMemberRows').innerText(),/Contato Wix/);
  await page.locator('#nativeMembersSearch').fill('jpmaratonista@gmail.com');
  await page.waitForTimeout(500);
  requests=await page.evaluate(()=>window.outbound.filter(x=>x.type==='NATIVE_MEMBERS'));
  assert.equal(requests.length,2);
  assert.equal(requests.at(-1).payload.data.search,'jpmaratonista@gmail.com');
  const before=await page.locator('#nativeMemberRows strong').count();
  await page.evaluate(()=>window.postMessage({source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{ok:true,action:'LIST',requestId:1,items:[]}},'*'));
  assert.equal(await page.locator('#nativeMemberRows strong').count(),before,'stale response cannot erase results');
  const reply={source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{
    ok:true,action:'LIST',requestId:requests.at(-1).payload.requestId,items:[
      {id:'c-1',kind:'CONTACT',name:'João Pessoa',email:'jpmaratonista@gmail.com'}],
    counts:{members:0,contacts:1},mensagem:'Busca concluída.'}};
  await page.evaluate(r=>window.postMessage(r,'*'),reply);
  await page.waitForTimeout(80);
  assert.equal(await page.locator('#nativeMemberRows strong').count(),1);
  assert.match(await page.locator('#nativeMemberRows').innerText(),/Excluir contato Wix/);
  await page.evaluate(requestId=>window.postMessage({source:'VELUM_ADMIN_PORTAL_PAGE',type:'NATIVE_MEMBERS_RESULT',payload:{ok:false,action:'LIST',requestId,mensagem:'Erro de permissão no Wix'}},'*'),requests.at(-1).payload.requestId);
  await page.waitForTimeout(70);
  assert.match(await page.locator('#nativeMembersStatus').innerText(),/Erro de permissão/);
  console.log('WIX_DIRECTORY_UI_OK: result event, member/contact distinction, server search, stale reply, errors, mobile script parsing');
 }finally{await browser.close()}
})().catch(err=>{console.error(err.stack||err);process.exitCode=1});
