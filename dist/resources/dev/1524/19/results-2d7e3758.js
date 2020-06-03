import{l as t,f as a,k as o,p as r}from"./calfSystem-f7574730.js"
import"./toLowerCase-9cb6a319.js"
import{g as s}from"./idb-14a57c5b.js"
import{c as n}from"./createTable-61b1bd32.js"
import{t as c}from"./thisTournament-a3ecf488.js"
import{m as i,c as e,a as f}from"./makeHash-31530d0b.js"
function m(a){return t(a).concat([["cyrb32",i(f,a)]]).concat([["cyrb53",i(e,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}export default async function(){const t=await s("fsh_arenaJoined")
if(!t)return
const i=c(),e=t.find(t=>t.pvpId===i)
e&&function(t){const s=n({innerHTML:`<tbody>${m(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(e)}
//# sourceMappingURL=results-2d7e3758.js.map
