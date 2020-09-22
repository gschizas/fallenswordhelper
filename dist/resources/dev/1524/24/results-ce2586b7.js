import{e as t,h as a,m as o,p as r}from"./calfSystem-38898f3e.js"
import"./toLowerCase-2f55d839.js"
import{g as s}from"./idb-ccc44752.js"
import{c as n}from"./createTable-a01b8368.js"
import{t as c}from"./thisTournament-15b781da.js"
import{m as e,c as i,a as m}from"./makeHash-95f4544c.js"
function f(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function d(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${f(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default d
//# sourceMappingURL=results-ce2586b7.js.map
