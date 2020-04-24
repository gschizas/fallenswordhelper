import{ai as t,q as a,h as n,l as o,p as s}from"./calfSystem-94018cd0.js"
import"./toLowerCase-5662df04.js"
import{c as r}from"./createTable-f30811ff.js"
import{t as c}from"./thisTournament-c2289355.js"
import{m as i,a as e,c as f}from"./makeHash-8cbaa713.js"
function m(t){return a(t).concat([["cyrb32",i(f,t)]]).concat([["cyrb53",i(e,t)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const a=await t("fsh_arenaJoined")
if(!a)return
const i=c(),e=a.find(t=>t.pvpId===i)
e&&function(t){const a=r({innerHTML:`<tbody>${m(t)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,a)}(e)}
//# sourceMappingURL=results-99882301.js.map
