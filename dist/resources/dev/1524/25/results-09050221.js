import{e as t,h as a,m as o,p as r}from"./calfSystem-69dd5601.js"
import"./toLowerCase-c42114e1.js"
import{g as s}from"./idb-874fe815.js"
import{c as n}from"./createTable-ba9c0bc4.js"
import{t as c}from"./thisTournament-80ee4f5b.js"
import{m as e,c as i,a as m}from"./makeHash-3753c102.js"
function f(a){return t(a).concat([["cyrb32",e(m,a)]]).concat([["cyrb53",e(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function d(){const t=await s("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(t=>t.pvpId===e)
i&&function(t){const s=n({innerHTML:`<tbody>${f(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default d
//# sourceMappingURL=results-09050221.js.map
