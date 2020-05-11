import{ai as t,q as a,h as n,l as o,p as s}from"./calfSystem-8dc0fa4b.js"
import"./toLowerCase-26121da0.js"
import{c as r}from"./createTable-5d1d98c3.js"
import{t as c}from"./thisTournament-fc433449.js"
import{m as e,c as i,a as f}from"./makeHash-e9f3cf9c.js"
function d(t){return a(t).concat([["cyrb32",e(f,t)]]).concat([["cyrb53",e(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const e=c(),i=a.find(t=>t.pvpId===e)
i&&function(t){const a=r({innerHTML:`<tbody>${d(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-c6bd2845.js.map
