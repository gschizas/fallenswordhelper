import{ai as t,q as a,h as n,l as o,p as s}from"./calfSystem-fd021443.js"
import"./toLowerCase-4cca5593.js"
import{c as r}from"./createTable-c0a20196.js"
import{t as c}from"./thisTournament-f7762e0b.js"
import{m as e,c as i,a as f}from"./makeHash-e6fd5a29.js"
function m(t){return a(t).concat([["cyrb32",e(f,t)]]).concat([["cyrb53",e(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const e=c(),i=a.find(t=>t.pvpId===e)
i&&function(t){const a=r({innerHTML:`<tbody>${m(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-75338b9d.js.map
