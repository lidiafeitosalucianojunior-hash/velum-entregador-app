'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../embeds/lumen-admin-panel/index.html'),'utf8');
test('scripts do painel são JavaScript válido',()=>{
 const blocks=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
 assert(blocks.length>0);
 for(const [,script] of blocks)new Function(script);
});
test('modal consulta oferta persistida sem reenviar notificação ao tentar confirmar',()=>{
 const m=html.match(/function dispatchProbe\(state,delay=3500\)\{([\s\S]*?)\n \}/);
 assert(m,'consulta do estado do chamado deve estar presente');
 assert.match(m[1],/send\('DISPATCH_STATUS'/);
 assert.doesNotMatch(m[1],/send\('(SELECT_DRIVERS|DISPATCH_PREPARED|RECALL_DELIVERY|LOGISTICS_ACTION)'/);
 assert.match(html,/if\(m\.type==='DISPATCH_STATUS_RESULT'\)dispatchStatusResult\(d\)/);
 assert.match(html,/dispatchProbe\(state,5000\)/);
});
test('só conclui com confirmação do servidor, distinguindo oferta de aceite',()=>{
 assert.match(html,/if\(data\.ok===true&&data\.confirmada===true\)/);
 assert.match(html,/Aguardando o entregador aceitar/);
 assert.match(html,/if\(data\.ok===true&&data\.status==='WAITING_DRIVER'&&data\.mesmaSelecao===false\)/);
 assert.match(html,/dispatchProbe\(state,100\)/);
 assert.match(html,/atualize as corridas|Atualizar corridas|Conferir corrida/i);
});

test('sinal de chamada permanece até aceite ou recusa confirmados',()=>{
 assert.match(html,/function dispatchRingStart\(\)/);
 assert.match(html,/function dispatchRingStop\(\)/);
 assert.match(html,/function dispatchRingPulse\(\)/);
 assert.match(html,/dispatchRingStart\(\)/);
 assert.match(html,/if\(data\.ok===true&&data\.recusada===true\)/);
 assert.match(html,/data\.aceita===true/);
 assert.match(html,/Corrida aceita/);
 assert.match(html,/Corrida recusada/);
 assert.match(html,/dispatchProbe\(state,3500\)/);
 assert.match(html,/Aguardando aceitar ou recusar a corrida/);
});
