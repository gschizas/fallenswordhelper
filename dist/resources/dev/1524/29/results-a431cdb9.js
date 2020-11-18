import{e as t,h as a,m as o,p as r}from"./calfSystem-02c48ff5.js"
import"./toLowerCase-0a22477f.js"
import{g as s}from"./idb-49c5b621.js"
import{c as n}from"./createTable-b0dd7860.js"
import{t as c}from"./thisTournament-f8f3fca4.js"
import{m as f,c as e,a as i}from"./makeHash-0d05eb7a.js"
function m(a){return t(a).concat([["cyrb32",f(i,a)]]).concat([["cyrb53",f(e,a)]]).map(([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`).join("")}async function d(){const t=await s("fsh_arenaJoined")
if(!t)return
const f=c(),e=t.find(t=>t.pvpId===f)
e&&function(t){const s=n({innerHTML:`<tbody>${m(t)}</tbody>`})
a(r,o({innerHTML:"&nbsp;"})),a(r,s)}(e)}export default d
//# sourceMappingURL=results-a431cdb9.js.map
