import{e as t,h as a,m as o,p as r}from"./calfSystem-ec5e5725.js"
import"./toLowerCase-33399b5a.js"
import{g as s}from"./idb-cecca562.js"
import{c as n}from"./createTable-4d32a607.js"
import{t as e}from"./thisTournament-ee0ba71c.js"
import{m as c,c as i,a as m}from"./makeHash-a69b8ed8.js"
function d(a){return t(a).concat([["cyrb32",c(m,a)]]).concat([["cyrb53",c(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function f(){const t=await s("fsh_arenaJoined")
if(!t)return
const c=e(),i=t.find(t=>t.pvpId===c)
i&&function(t){const s=n({innerHTML:`<tbody>${d(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default f
//# sourceMappingURL=results-3fdcc464.js.map
