const {chromium}=require('C:/Users/lucas/Documents/velum-site/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'embeds/lumen-ia/index.html'),'utf8');

(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://www.vaidevelum.com/lab-test',route=>route.fulfill({
   contentType:'text/html',
   body:`<!doctype html><meta charset="utf-8">
    <script>
    window.received=[];
    window.addEventListener('message',event=>{
      if(event.origin!=='https://app.vaidevelum.com' ||
        event.data?.source!=='LUMEN_ADMIN_PANEL')return;
      window.received.push(event.data);
      const frame=document.querySelector('iframe').contentWindow;
      if(event.data.type==='IA_LAB_TEST'){
        const p=event.data.payload||{};
        const isFrete=String(p.pergunta).toLowerCase().includes('frete');
        const answer=isFrete
          ? {resposta:'Para Sousa/PB, o frete é R$ 20,00 para pacote de até 1 kg.',fonte:'FRETE_VELUM'}
          : {resposta:'Lúmen Luxos: duas opções verificadas.',fonte:'BLING_VAREJO_ESTOQUE',modeloAnterior:'sandalia'};
        frame.postMessage({source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LAB_RESULT',
          payload:{ok:true,requestId:p.requestId,enviado:false,pendente:false,...answer}},
          'https://app.vaidevelum.com');
      }
      if(event.data.type==='IA_LAB_DIAG'){
        frame.postMessage({source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LAB_DIAG_RESULT',
          payload:{ok:true,requestId:event.data.payload.requestId,
            enviado:false,bling:{catalogo:'OK',estoque:'OK'},
            frete:{tabela:'OK',tarifaExemplo:5}}},
          'https://app.vaidevelum.com');
      }
      if(event.data.type==='IA_LIST'){
        frame.postMessage({source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LIST_RESULT',
          payload:{ok:true,items:[],aviso:'Conexão Meta pendente'}},'https://app.vaidevelum.com');
      }
    });
    </script>
    <iframe src="https://app.vaidevelum.com/embeds/lumen-ia/" style="width:100%;height:900px;border:0"></iframe>`
  }));
  await page.route('https://app.vaidevelum.com/embeds/lumen-ia/**',r=>r.fulfill({contentType:'text/html',body:html}));
  await page.route('https://connect.facebook.net/**',r=>r.fulfill({
    contentType:'text/javascript',body:'window.fbAsyncInit&&window.fbAsyncInit();'
  }));
  await page.goto('https://www.vaidevelum.com/lab-test',{waitUntil:'domcontentloaded'});
  const f=page.frameLocator('iframe');
  await f.locator('#labQuestion').waitFor();
  assert.equal(await f.locator('#labRun').isVisible(),true);
  await f.locator('[data-lab-example="Qual o frete para Sousa - PB?"]').click();
  assert.equal(await f.locator('#labQuestion').inputValue(),'Qual o frete para Sousa - PB?');
  await f.locator('#labRun').click();
  await f.locator('#labAnswer').getByText(/frete é R\$ 20,00/).waitFor();
  const sent=await page.evaluate(()=>window.received.filter(x=>x.type==='IA_LAB_TEST'));
  assert.equal(sent.length,1);
  assert.equal(sent[0].payload.pergunta,'Qual o frete para Sousa - PB?');
  assert.match(await f.locator('#labStatus').innerText(),/FRETE_VELUM/);
  await f.locator('#labQuestion').fill('Tem sandália 37?');
  await f.locator('#labRun').click();
  await f.locator('#labAnswer').getByText(/duas opções verificadas/).waitFor();
  assert.match(await f.locator('#labStatus').innerText(),/BLING_VAREJO_ESTOQUE/);
  await f.locator('#labQuestion').fill('37');
  await f.locator('#labRun').click();
  await page.waitForFunction(()=>window.received.filter(x=>x.type==='IA_LAB_TEST').length===3);
  const sent3=await page.evaluate(()=>window.received.filter(x=>x.type==='IA_LAB_TEST'));
  assert.equal(sent3[2].payload.modeloAnterior,'sandalia');

  await f.locator('#labDiagRun').click();
  await f.locator('#labDiagStatus').getByText(/Catálogo Bling: OK/).waitFor();
  const diag=await f.locator('#labDiagStatus').innerText();
  assert.match(diag,/Estoque Bling: OK/);
  assert.match(diag,/Tabela de frete: OK/);
  assert.match(diag,/Cajazeiras\/PB: R\$ 5,00/);
  const requested=await page.evaluate(()=>window.received.filter(x=>x.type==='IA_LAB_DIAG'));
  assert.equal(requested.length,1);
  // Mensagens forjadas de uma janela que não é a página Wix devem ser ignoradas.
  await f.locator('body').evaluate(()=>{
    window.postMessage({source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LAB_RESULT',
      payload:{ok:true,requestId:'lab-3',resposta:'Resposta falsa e preço inventado'}},'*');
  });
  assert.ok(!(await f.locator('#labAnswer').innerText()).includes('Resposta falsa'));
  assert.deepEqual(errors,[]);
  await page.screenshot({path:path.join(process.env.TEMP,'lumen-ia-laboratorio-mobile-20261105.png'),fullPage:true});
  console.log('OK: mobile lab UX, mock Wix-only replies, source display, size memory, no customer sends.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
