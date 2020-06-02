import{l as t,f as a,k as o,p as r}from"./calfSystem-1c103624.js"
import"./toLowerCase-9f60cfa4.js"
import{g as s}from"./idb-347cc2af.js"
import{c as n}from"./createTable-930c2471.js"
import{t as c}from"./thisTournament-f2882448.js"
import{m as f,c as i,a as e}from"./makeHash-4196f3e8.js"
function m(a){return t(a).concat([["cyrb32",f(e,a)]]).concat([["cyrb53",f(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const f=c(),i=t.find(t=>t.pvpId===f)
i&&function(t){const s=n({innerHTML:`<tbody>${m(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}
//# sourceMappingURL=results-a16a2179.js.map
