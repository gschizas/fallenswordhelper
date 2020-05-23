import{ai as t,q as a,h as n,l as o,p as s}from"./calfSystem-01eb06ed.js"
import"./toLowerCase-b5dc48c4.js"
import{c as r}from"./createTable-1806515f.js"
import{t as e}from"./thisTournament-604e2d20.js"
import{m as c,c as i,a as m}from"./makeHash-36e90385.js"
function d(t){return a(t).concat([["cyrb32",c(m,t)]]).concat([["cyrb53",c(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const c=e(),i=a.find(t=>t.pvpId===c)
i&&function(t){const a=r({innerHTML:`<tbody>${d(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-121bb0aa.js.map
