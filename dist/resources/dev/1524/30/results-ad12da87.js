import{e as t,h as a,m as o,p as r}from"./calfSystem-54df10e3.js"
import"./toLowerCase-5e186769.js"
import{g as s}from"./idb-7f0d2b39.js"
import{c as n}from"./createTable-a5bfc655.js"
import{t as e}from"./thisTournament-370e78a5.js"
import{m as c,c as i,a as m}from"./makeHash-b3260b0c.js"
function f(a){return t(a).concat([["cyrb32",c(m,a)]]).concat([["cyrb53",c(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function d(){const t=await s("fsh_arenaJoined")
if(!t)return
const c=e(),i=t.find(t=>t.pvpId===c)
i&&function(t){const s=n({innerHTML:`<tbody>${f(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default d
//# sourceMappingURL=results-ad12da87.js.map
