import{e as t,h as a,m as o,p as r}from"./calfSystem-4991bf5b.js"
import"./toLowerCase-b21b7cc8.js"
import{g as s}from"./idb-ee31c042.js"
import{c as n}from"./createTable-aefb26b4.js"
import{t as c}from"./thisTournament-d90567a4.js"
import{m as e,c as i,a as m}from"./makeHash-d0d7347d.js"
function d(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function f(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${d(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default f
//# sourceMappingURL=results-10500821.js.map
