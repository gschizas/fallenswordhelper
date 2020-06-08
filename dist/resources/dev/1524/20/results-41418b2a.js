import{m as t,f as a,l as o,p as r}from"./calfSystem-a2862afc.js"
import"./toLowerCase-2574a84c.js"
import{g as s}from"./idb-911ff7c2.js"
import{c as n}from"./createTable-6dbc7d62.js"
import{t as c}from"./thisTournament-a214cf54.js"
import{m as f,c as i,a as m}from"./makeHash-5a7b2000.js"
function e(a){return t(a).concat([["cyrb32",f(m,a)]]).concat([["cyrb53",f(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const f=c(),i=t.find(t=>t.pvpId===f)
i&&function(t){const s=n({innerHTML:`<tbody>${e(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}
//# sourceMappingURL=results-41418b2a.js.map
