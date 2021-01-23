import{ao as t,e as a,h as n,m as r,p as o}from"./calfSystem-393ab895.js"
import{c as e}from"./createTable-aae48322.js"
import{g as i}from"./idb-46b78b1e.js"
import{t as m}from"./thisTournament-d87a26c2.js"
import{t as s}from"./toLowerCase-51740687.js"
function c(t){let a=6
for(let n=0;n<t.length;n+=1)a=Math.imul(a^t.charCodeAt(n),9**9)
return(a^a>>>9)>>>0}function u(t,a=0){let n=3735928559^a,r=1103547991^a
for(let a,o=0;o<t.length;o++)a=t.charCodeAt(o),n=Math.imul(n^a,2654435761),r=Math.imul(r^a,1597334677)
return n=Math.imul(n^n>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),4294967296*(2097151&r)+(n>>>0)}function f(a,n){return a(t.map(s).map((t=>n[t])).filter((t=>t)).join())}function l(t){return a(t).concat([["cyrb32",f(c,t)]]).concat([["cyrb53",f(u,t)]]).map((([t,a])=>`<tr><td>${t}</td><td>${a}</td></tr>`)).join("")}async function d(){const t=await i("fsh_arenaJoined")
if(!t)return
const a=m(),s=t.find((t=>t.pvpId===a))
s&&function(t){const a=e({innerHTML:`<tbody>${l(t)}</tbody>`})
n(o,r({innerHTML:"&nbsp;"})),n(o,a)}(s)}export default d
//# sourceMappingURL=results-34ca59c4.js.map
