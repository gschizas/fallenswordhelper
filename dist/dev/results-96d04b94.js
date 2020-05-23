import{ai as a,q as t,h as n,l as o,p as s}from"./calfSystem-0e5d6faf.js"
import"./toLowerCase-adcc7aa6.js"
import{c as r}from"./createTable-0ea5d31f.js"
import{t as c}from"./thisTournament-9dc95920.js"
import{m as e,c as i,a as d}from"./makeHash-ded1c2fe.js"
function f(a){return t(a).concat([["cyrb32",e(d,a)]]).concat([["cyrb53",e(i,a)]]).map(([a,t])=>`<tr><td>${a}</td><td>${t}</td></tr>`).join("")}export default async function(){const t=await a("fsh_arenaJoined")
if(!t)return
const e=c(),i=t.find(a=>a.pvpId===e)
i&&function(a){const t=r({innerHTML:`<tbody>${f(a)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,t)}(i)}
//# sourceMappingURL=results-96d04b94.js.map
