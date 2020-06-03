import{l as a,f as t,k as o,p as r}from"./calfSystem-5545a3e6.js"
import"./toLowerCase-57ae178d.js"
import{g as s}from"./idb-ab1a88c6.js"
import{c as n}from"./createTable-b1e7ce39.js"
import{t as e}from"./thisTournament-aa40fa37.js"
import{m as c,c as i,a as m}from"./makeHash-bb6eeec1.js"
function f(t){return a(t).concat([["cyrb32",c(m,t)]]).concat([["cyrb53",c(i,t)]]).map(([a,t])=>`<tr><td>${a}</td><td>${t}</td></tr>`).join("")}export default async function(){const a=await s("fsh_arenaJoined")
if(!a)return
const c=e(),i=a.find(a=>a.pvpId===c)
i&&function(a){const s=n({innerHTML:`<tbody>${f(a)}</tbody>`})
t(r,o({innerHTML:"&nbsp;"})),t(r,s)}(i)}
//# sourceMappingURL=results-70838ae0.js.map
