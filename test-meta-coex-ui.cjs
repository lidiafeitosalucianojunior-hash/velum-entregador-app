const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'embeds/lumen-ia/index.html'),'utf8');

(async()=>{
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',err=>{throw err;});
    await page.route('https://www.vaidevelum.com/**',r=>r.fulfill({
      contentType:'text/html',
      body:`<!doctype html><title>Mock Wix Parent</title>
      <script>
      window.__events=[];
      window.addEventListener('message',event=>{
        if(event.origin!=='https://app.vaidevelum.com')return;
        if(event.data?.source!=='LUMEN_ADMIN_PANEL')return;
        window.__events.push(event.data);
        if(event.data.type==='IA_META_CONFIG_REQUEST'){
          document.querySelector('iframe').contentWindow.postMessage({
            source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_META_CONFIG_RESULT',
            payload:{ok:true,appId:'1797569804811459',configId:'1131842759224648'}
          },'https://app.vaidevelum.com')
        }
      });
      </script>
      <iframe src="https://app.vaidevelum.com/embeds/lumen-ia/" style="width:100%;height:800px;border:0"></iframe>`
    }));
    await page.route('https://app.vaidevelum.com/embeds/lumen-ia/**',r=>r.fulfill({contentType:'text/html',body:html}));
    await page.route('https://connect.facebook.net/**',r=>r.fulfill({contentType:'application/javascript',body:`
      window.FB={init:function(opts){window.__initOpts=opts;},
        login:function(cb,opts){window.__metaLoginOpts=opts;window.__metaLoginCallback=cb;}};
      window.fbAsyncInit?.();`
    }));
    await page.goto('https://www.vaidevelum.com/ia-test',{waitUntil:'domcontentloaded'});
    const f=page.frameLocator('iframe');
    await f.locator('#waConnect').waitFor();
    await page.waitForFunction(()=>window.__events.some(x=>x.type==='IA_META_CONFIG_REQUEST'));
    await f.locator('#waConnect').waitFor({state:'visible'});
    await f.locator('#waConnect').click();
    assert.equal(await f.locator('#waConnectBox').isVisible(),true);
    await f.locator('#waConfirm').click();
    const opts=await f.locator('body').evaluate(()=>window.__metaLoginOpts);
    assert.equal(opts.config_id,'1131842759224648');
    assert.equal(opts.response_type,'code');
    assert.equal(opts.extras.featureType,'whatsapp_business_app_onboarding');
    // Generic FINISH não pode fazer cadastro / migrar o número.
    await f.locator('body').evaluate(()=>{
      window.__metaLoginCallback({authResponse:{code:'A'.repeat(60)}});
      window.dispatchEvent(new MessageEvent('message',{
        origin:'https://www.facebook.com',
        data:JSON.stringify({type:'WA_EMBEDDED_SIGNUP',event:'FINISH',data:{waba_id:'123456789000'}})
      }));
    });
    assert.match(await f.locator('#waConnectFeedback').innerText(),/n.o confirmou a coexist.ncia/);
    assert.equal((await page.evaluate(()=>window.__events)).filter(x=>x.type==='IA_META_COEX_FINISH').length,0);
    // Simula nova autorização legítima; o código é enviado somente ao domínio Wix.
    await f.locator('#waConfirm').click();
    await f.locator('body').evaluate(()=>{
      window.dispatchEvent(new MessageEvent('message',{
        origin:'https://www.facebook.com',
        data:JSON.stringify({type:'WA_EMBEDDED_SIGNUP',
          event:'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING',
          data:{waba_id:'123456789000',phone_number_id:'987654321123'}})
      }));
      window.__metaLoginCallback({authResponse:{code:'Q'.repeat(60)}});
    });
    await page.waitForFunction(()=>window.__events.some(x=>x.type==='IA_META_COEX_FINISH'));
    const sent=await page.evaluate(()=>window.__events.filter(x=>x.type==='IA_META_COEX_FINISH'));
    assert.equal(sent.length,1,'authorization code must be sent exactly once');
    assert.equal(sent[0].payload.event,'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING');
    assert.equal(sent[0].payload.phoneNumberId,'987654321123');
    assert.equal(sent[0].payload.code,'Q'.repeat(60));
    assert.equal((await f.locator('#waConnectFeedback').innerText()).includes('Validando'),true);
    await page.evaluate(()=>{
      document.querySelector('iframe').contentWindow.postMessage({
        source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_META_COEX_RESULT',
        payload:{ok:true,numero:'••••1234',mensagem:'Meta confirmou a coexistência.'}
      },'https://app.vaidevelum.com');
    });
    assert.match(await f.locator('#waConnectFeedback').innerText(),/confirmou a coexist.ncia/);
    await f.locator('#waConnectBox').screenshot({path:path.join(process.env.TEMP,'lumen-ia-coex-mobile-test-20261105.png')});
    await page.screenshot({path:path.join(process.env.TEMP,'lumen-ia-coex-full-mobile-test-20261105.png'),fullPage:true});
    console.log('OK: config session request, Wix target origin, v4 coexist-only, one-time code relay, mobile panel.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
