import{e as t,h as a,m as o,p as r}from"./calfSystem-9901ad27.js"
import"./toLowerCase-dda30e6b.js"
import{g as s}from"./idb-efff97cf.js"
import{c as n}from"./createTable-cf4fb3e8.js"
import{t as e}from"./thisTournament-64d89a19.js"
import{m as c,c as f,a as i}from"./makeHash-b1364348.js"
function m(a){return t(a).concat([["cyrb32",c(i,a)]]).concat([["cyrb53",c(f,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const c=e(),f=t.find(t=>t.pvpId===c)
f&&function(t){const s=n({innerHTML:`<tbody>${m(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(f)}
//# sourceMappingURL=results-d009a2db.js.map
