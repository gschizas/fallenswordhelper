import{ah as t,n as a,f as n,k as o,p as s}from"./calfSystem-d96a3efd.js"
import"./toLowerCase-a0540d2c.js"
import{c as r}from"./createTable-13920811.js"
import{t as c}from"./thisTournament-76bfbc42.js"
import{m as e,c as i,a as f}from"./makeHash-38477382.js"
function m(t){return a(t).concat([["cyrb32",e(f,t)]]).concat([["cyrb53",e(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const e=c(),i=a.find(t=>t.pvpId===e)
i&&function(t){const a=r({innerHTML:`<tbody>${m(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-cce2783f.js.map
