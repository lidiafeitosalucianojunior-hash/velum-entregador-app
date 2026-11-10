const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../embeds/lumen-conversas/index.html'),'utf8');
const panel=fs.readFileSync(path.resolve(__dirname,'../embeds/lumen-admin-panel/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script&&script.length>3000);
function make(clock={value:Date.now()}){
 const sent=[],listeners={};
 class E{
  constructor(id){this.id=id;this.innerHTML='';this.className='';this.style={};
   this.dataset={};this.value='';this.hidden=false;this.clientHeight=550;
   this.scrollTop=0;this.scrollHeight=1000;this.listeners={};
   this.classList={add:()=>{},remove:()=>{},toggle:()=>{}}}
  addEventListener(e,fn){this.listeners[e]=fn}
  querySelector(s){return s==='span'?{textContent:''}:s.startsWith('#')?new E(s):null}
  querySelectorAll(){return []}
 }
 const ids=['shell','backPanel','refresh','live','total','waitingCount',
  'paidCount','search','list','welcome','chatContent','chatHead',
  'chatStage','messages','text','send','composerHint','toast'];
 const els=Object.fromEntries(ids.map(x=>[x,new E(x)]));
 els.live.querySelector=()=>({set textContent(v){els.live._text=v}});
 const filters=['ALL','HUMANO','PAGO','IA'].map(k=>{const e=new E(k);e.dataset.filter=k;return e});
 const parent={postMessage:(event)=>sent.push(event)};
 const win={
  parent,addEventListener:(ev,fn)=>{listeners[ev]=fn},
  setInterval:(fn,ms)=>{listeners.interval={fn,ms}},
  crypto:{getRandomValues:b=>{b.fill(12);return b}},
  document:{hidden:false}
 };
 const doc={getElementById:id=>els[id],querySelectorAll:sel=>
   sel==='.filter'?filters:[],hidden:false};
 vm.runInNewContext(script,{window:win,document:doc,
  Date:class extends Date{static now(){return clock.value}},Math,String,
  Array,Number,Object,JSON,RegExp,Uint8Array,clearTimeout:()=>{},
  setTimeout:()=>1});
 return {els,sent,win,listeners,filters,clock};
}
function emit(t,data){t.listeners.message({source:t.win.parent,data})}
const id='a'.repeat(32),id2='b'.repeat(32);
const paid={id,nome:'Cliente Pagamento',numero:'5588999994444',modo:'IA',
 ultimaMensagem:'Quero pagar',ultimaAtualizacao:'2026-11-08T18:00:00Z',
 etapa:{codigo:'PAGO',rotulo:'Pagamento aprovado',cor:'verde',borda:'verde'},
 pagamentoConfirmado:true,aguardandoHumano:false};
const waiting={id:id2,nome:'Cliente Aguardando',numero:'5588988883333',
 modo:'HUMANO',assumidaPor:'',ultimaMensagem:'Pode me atender?',
 ultimaAtualizacao:'2026-11-08T18:01:00Z',
 etapa:{codigo:'AGUARDANDO_HUMANO',rotulo:'Aguardando humano',
 cor:'vermelho',borda:'vermelha'},pagamentoConfirmado:false,
 aguardandoHumano:true};
test('interface abre lista, cards pagos verdes, espera humana vermelha e filtros',()=>{
 const t=make();
 assert.equal(t.sent[0].type,'CONVERSAS_LIST');
 assert.equal(t.listeners.interval.ms,10000);
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',type:'CONVERSAS_LIST_RESULT',
  payload:{ok:true,items:[paid,waiting],contadores:{total:2,aguardandoHumano:1,
   pagamentosConfirmados:1},atualizadoEm:'2026-11-08T18:05:00Z'}});
 assert.match(t.els.list.innerHTML,/class="conv paid/);
 assert.match(t.els.list.innerHTML,/class="conv waiting/);
 assert.match(t.els.list.innerHTML,/Pagamento aprovado/);
 assert.match(t.els.list.innerHTML,/Aguardando humano/);
 assert.equal(t.els.total.textContent,'2');
 assert.equal(t.els.waitingCount.textContent,'1');
 assert.equal(t.els.paidCount.textContent,'1');
 const button=t.filters[1];
 button.listeners.click();
 assert.match(t.els.list.innerHTML,/Cliente Aguardando/);
 assert.doesNotMatch(t.els.list.innerHTML,/Cliente Pagamento/);
});
test('abrir conversa carrega histórico; ativar/desativar IA e responder são ações reais',()=>{
 const t=make();emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',
  type:'CONVERSAS_LIST_RESULT',payload:{ok:true,items:[waiting,paid],
  contadores:{total:2,aguardandoHumano:1,pagamentosConfirmados:1}}});
 const open=sel=>sel==='[data-open]'?{dataset:{open:id2}}:null;
 t.els.list.listeners.click({target:{closest:open}});
 assert.equal(t.sent.at(-1).type,'CONVERSAS_DETAIL');
 assert.equal(t.sent.at(-1).payload.id,id2);
 const active={...waiting,assumidaPor:'LUMEN',etapa:{
  codigo:'EM_ATENDIMENTO_HUMANO',rotulo:'Atendimento humano',cor:'azul'},
  aguardandoHumano:false};
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',
  type:'CONVERSAS_DETAIL_RESULT',payload:{ok:true,conversa:active,
    janela24hAberta:true,mensagens:[
     {direcao:'ENTRADA',texto:'Bom dia',quando:'2026-11-08T18:01:00Z',status:'RECEBIDA'},
     {direcao:'SAIDA',texto:'Posso ajudar?',
      quando:'2026-11-08T18:03:00Z',status:'ACEITO_META',
      conteudoHistoricoDisponivel:true}],
    avisoHistorico:'Histórico recente'}});
 assert.match(t.els.messages.innerHTML,/Bom dia/);
 assert.match(t.els.messages.innerHTML,/Posso ajudar/);
 assert.equal(t.els.send.disabled,false);
 t.els.text.value='Boa tarde, em que posso ajudar?';
 t.els.send.listeners.click();
 assert.equal(t.sent.at(-1).type,'CONVERSAS_SEND');
 assert.equal(t.sent.at(-1).payload.texto,'Boa tarde, em que posso ajudar?');
 assert.match(t.sent.at(-1).payload.requestId,/^[0-9a-f]{32}$/);
});
test('responde a perda da primeira consulta Wix com nova busca, sem travar lista',()=>{
 const t=make();
 assert.equal(t.sent.filter(x=>x.type==='CONVERSAS_LIST').length,1);
 t.clock.value+=11000;
 t.listeners.interval.fn();
 assert.equal(t.sent.filter(x=>x.type==='CONVERSAS_LIST').length,2);
 assert.match(t.els.list.innerHTML,/Reconectando automaticamente/);
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',type:'CONVERSAS_LIST_RESULT',
  payload:{ok:true,items:[waiting],contadores:{
   total:1,aguardandoHumano:1,pagamentosConfirmados:0}}});
 assert.match(t.els.list.innerHTML,/Cliente Aguardando/);
 assert.match(t.els.list.innerHTML,/Desativar IA|Ativar IA/);
});
test('recuperacao por IA_LIST mantem botao de desativar IA sem inventar pagamento',()=>{
 const t=make();
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LIST_RESULT',payload:{
  ok:true,items:[{id,cliente:'Cliente Recuperada',canal:'WHATSAPP',
   modo:'IA',ultimaMensagem:'Oi',atualizadoEm:'2026-11-09T20:30:00Z'}]}});
 assert.match(t.els.list.innerHTML,/Cliente Recuperada/);
 assert.match(t.els.list.innerHTML,/Desativar IA/);
 assert.doesNotMatch(t.els.list.innerHTML,/Consulta temporária/);
 assert.equal(t.els.paidCount.textContent,'—');
});
test('fallback enriquecido preserva pausa manual e nao habilita acao Instagram',()=>{
 const t=make();
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',type:'IA_LIST_RESULT',payload:{
  ok:true,items:[{...waiting,iaPausaManual:true,
   canal:'WHATSAPP',etapa:waiting.etapa},{
   ...paid,id:'c'.repeat(32),canal:'INSTAGRAM',somenteLeitura:true,
   etapa:{codigo:'INSTAGRAM_LEITURA',rotulo:'Instagram · consulta',cor:'roxo'},
   pagamentoConfirmado:false}]}});
 assert.match(t.els.list.innerHTML,/IA pausada manualmente/);
 assert.match(t.els.list.innerHTML,/Ativar IA/);
 assert.match(t.els.list.innerHTML,/Somente leitura/);
});
test('painel Lumen oferece entrada para nova pagina de conversas',()=>{
 assert.match(panel,/id="velumConversasOpen"/);
 assert.match(panel,/id="openConversationsCard"/);
 assert.match(panel,/type:'OPEN_CONVERSAS'/);
 assert.match(html,/post\('CONVERSAS_BACK'\)/);
 assert.match(html,/data-mode="IA"/);
 assert.match(html,/data-mode="HUMANO"/);
});
test('HTML escapa mensagens de clientes e não injeta conteúdo no painel',()=>{
 const t=make();
 emit(t,{source:'LUMEN_ADMIN_PANEL_PAGE',type:'CONVERSAS_LIST_RESULT',
  payload:{ok:true,items:[{...waiting,ultimaMensagem:'<img src=x onerror=alert(1)>'}],
   contadores:{total:1,aguardandoHumano:1,pagamentosConfirmados:0}}});
 assert.ok(t.els.list.innerHTML.includes('&lt;img'));
 assert.ok(!t.els.list.innerHTML.includes('<img src=x onerror'));
});
