import{e as t,h as a,m as o,p as r}from"./calfSystem-b136673a.js"
import"./toLowerCase-27ea448e.js"
import{g as s}from"./idb-c31665cb.js"
import{c as n}from"./createTable-629a2fee.js"
import{t as e}from"./thisTournament-1b272556.js"
import{m as c,c as i,a as m}from"./makeHash-0028679b.js"
function f(a){return t(a).concat([["cyrb32",c(m,a)]]).concat([["cyrb53",c(i,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function p(){const t=await s("fsh_arenaJoined")
if(!t)return
const c=e(),i=t.find(t=>t.pvpId===c)
i&&function(t){const s=n({innerHTML:`<tbody>${f(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(i)}export default p
//# sourceMappingURL=results-c3b8c6ea.js.map
