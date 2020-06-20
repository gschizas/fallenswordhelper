import{e as t,h as a,m as o,p as r}from"./calfSystem-9c7241dc.js"
import"./toLowerCase-9b533dae.js"
import{g as s}from"./idb-5f8a9591.js"
import{c as n}from"./createTable-711dc1b7.js"
import{t as c}from"./thisTournament-5b7074c4.js"
import{m as e,c as i,a as m}from"./makeHash-37fd5623.js"
function d(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${d(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}
//# sourceMappingURL=results-9673d91e.js.map
