import{e as t,h as a,m as o,p as r}from"./calfSystem-4cc738f8.js"
import"./toLowerCase-e8c3179d.js"
import{g as s}from"./idb-670c0cca.js"
import{c as n}from"./createTable-8f45252e.js"
import{t as c}from"./thisTournament-18421f24.js"
import{m as e,c as i,a as m}from"./makeHash-59634999.js"
function f(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${f(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}
//# sourceMappingURL=results-998f2915.js.map
