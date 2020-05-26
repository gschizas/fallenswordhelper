import{a5 as t,l as a,f as n,k as o,p as s}from"./calfSystem-ee582533.js"
import"./toLowerCase-6383ba3b.js"
import{c as r}from"./createTable-cbb3667c.js"
import{t as c}from"./thisTournament-4e0a7b6b.js"
import{m as e,c as i,a as b}from"./makeHash-3c2cb9cb.js"
function m(t){return a(t).concat([["cyrb32",e(b,t)]]).concat([["cyrb53",e(i,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const e=c(),i=a.find(t=>t.pvpId===e)
i&&function(t){const a=r({innerHTML:`<tbody>${m(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(i)}
//# sourceMappingURL=results-c99a2be2.js.map
