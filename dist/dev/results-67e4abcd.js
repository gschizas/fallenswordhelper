import{ai as t,q as a,h as n,l as o,p as s}from"./calfSystem-70b0df7f.js"
import"./toLowerCase-28f7d145.js"
import{c as r}from"./createTable-1e93d178.js"
import{t as e}from"./thisTournament-46cd8efd.js"
import{m as c,c as i,a as f}from"./makeHash-4e561419.js"
function d(t){return a(t).concat([["cyrb32",c(f,t)]]).concat([["cyrb53",c(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const c=e(),i=a.find(t=>t.pvpId===c)
i&&function(t){const a=r({innerHTML:`<tbody>${d(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-67e4abcd.js.map
