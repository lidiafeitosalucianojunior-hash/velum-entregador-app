const fs=require('fs');
const vm=require('vm');
const assert=require('node:assert/strict');
const puppeteer=require('C:/Users/lucas/AppData/Local/npm-cache/_npx/4b4c857f6efdfb61/node_modules/puppeteer');
const {PDFDocument}=require((process.env.TEMP||'C:/Users/lucas/AppData/Local/Temp')+'/velum-label-testdeps-20261114/node_modules/pdf-lib');

(async()=>{
 const source=fs.readFileSync('C:/Users/lucas/Documents/VELUM-FRETE-COMBINADO-20261112/embeds/lumen-admin-panel/index.html','utf8');
 const begin=source.indexOf('function printOfficialLabels(');
 const end=source.indexOf('function printLabels(',begin);
 assert(begin>=0&&end>begin,'A rotina oficial de impressão deve existir');
 const script=source.slice(begin,end);
 const token=(process.argv[2]&&/^[a-f0-9]{64}$/i.test(process.argv[2]))?process.argv[2]:'a'.repeat(64),prefix='https://www.vaidevelum.com/_functions/';
 const label={deliveryId:'VEL-WEB-TESTE',etiquetaPdfConfirmada:true,
  etiquetaPreviaConfirmada:true,
  etiquetaPrintUrl:prefix+'lumenEtiqueta?token='+token,
  etiquetaPreviaPrintUrl:prefix+'lumenEtiquetaPrevia?token='+token};
 const opened=[],notices=[];
 const sandbox={String,Array,Object,Promise,console,setTimeout,
  esc:s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'),
  notice:(...values)=>notices.push(values),
  window:{open:()=>{const w={closed:false,document:{open(){},write(s){this.html=s},close(){}}};
   opened.push(w);return w}}
 };
 vm.runInNewContext(script+'\nthis.printOfficialLabels=printOfficialLabels',sandbox);
 sandbox.printOfficialLabels([label]);
 assert.equal(opened.length,1);
 let html=opened[0].document.html;
 assert(html.includes('@page{size:100mm 150mm;margin:0}'));
 assert(html.includes('src="'+label.etiquetaPreviaPrintUrl+'"'));
 assert(!html.includes('src="'+label.etiquetaPrintUrl+'"'));
 assert(html.includes('window.print()'));
 assert(html.includes('IMPRIMIR ETIQUETA 10 x 15'));
 assert.equal(notices.length,0);
 const pop=await puppeteer.launch({headless:true,
  executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args:['--no-sandbox','--disable-gpu']});
 const page=await pop.newPage();
 const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO1NVdkAAAAASUVORK5CYII=';
 html=html.replace(label.etiquetaPreviaPrintUrl,process.argv[2]?label.etiquetaPreviaPrintUrl:png);
 html=html.replace('<script>(function(){','<script>window.__printed=0;window.print=function(){window.__printed++}</script><script>(function(){');
 const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
 await page.setContent(html,{waitUntil:'load'});
 await page.waitForFunction(()=>window.__printed>=1,{timeout:5000});
 const status=await page.evaluate(()=>({prints:window.__printed,
  pages:document.querySelectorAll('.label-print-sheet').length,
  buttonDisabled:document.getElementById('printNow').disabled,
  loaded:document.images[0].naturalWidth>0}));
 const bytes=await page.pdf({preferCSSPageSize:true,printBackground:true});
 const pdf=await PDFDocument.load(bytes);
 const pageCount=pdf.getPageCount(),p=pdf.getPage(0);
 const size={width:p.getWidth(),height:p.getHeight()};
 console.log(JSON.stringify({status,pdfPages:pageCount,
  physicalMm:{width:Math.round(size.width/72*25.4),height:Math.round(size.height/72*25.4)},
  jsErrors},null,2));
 assert.equal(status.prints,1);
 assert.equal(status.buttonDisabled,false);
 assert.equal(status.loaded,true);
 assert.equal(pageCount,1);
 assert(Math.abs(size.width-283.465)<1);
 assert(Math.abs(size.height-425.197)<1);
 assert.deepEqual(jsErrors,[]);
 // Um lote deve produzir uma pagina 10x15 para cada etiqueta.
 sandbox.printOfficialLabels([label,label]);
 assert.equal(opened.length,2);
 assert.equal((opened[1].document.html.match(/class="label-print-sheet"/g)||[]).length,2);
 sandbox.printOfficialLabels([{...label,etiquetaPreviaConfirmada:false}]);
 assert.equal(opened.length,2);
 assert(notices.length>0);
 await pop.close();
})().catch(e=>{console.error(e.stack);process.exit(1)});
