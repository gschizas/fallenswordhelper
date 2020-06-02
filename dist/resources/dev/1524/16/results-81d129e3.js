import{l as t,f as a,k as o,p as r}from"./calfSystem-d49dbbd3.js"
import"./toLowerCase-e686322a.js"
import{g as s}from"./idb-a6d1a1ba.js"
import{c as n}from"./createTable-86f16c48.js"
import{t as c}from"./thisTournament-7287c4a3.js"
import{m as e,c as i,a as m}from"./makeHash-5e0e3547.js"
function d(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${d(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}
//# sourceMappingURL=results-81d129e3.js.map
