import{ai as a,q as t,h as n,l as o,p as s}from"./calfSystem-9b1fa4ca.js"
import"./toLowerCase-cb0a8722.js"
import{c as r}from"./createTable-aa7942b1.js"
import{t as c}from"./thisTournament-14307abb.js"
import{m as i,a as e,c as f}from"./makeHash-747f4a36.js"
function m(a){return t(a).concat([["cyrb32",i(f,a)]]).concat([["cyrb53",i(e,a)]]).map(([a,t])=>`<tr><td>${a}</td><td>${t}</td></tr>`).join("")}export default async function(){const t=await a("fsh_arenaJoined")
if(!t)return
const i=c(),e=t.find(a=>a.pvpId===i)
e&&function(a){const t=r({innerHTML:`<tbody>${m(a)}</tbody>`})
n(s,o({innerHTML:"&nbsp;"})),n(s,t)}(e)}
//# sourceMappingURL=results-f5651d21.js.map
