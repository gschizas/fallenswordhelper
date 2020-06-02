import{s as a,R as t,l as n,aV as e,f as s,p as r}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import{r as o}from"./round-99c4f204.js"
import"./toLowerCase-e686322a.js"
import{g as c,s as i}from"./idb-a6d1a1ba.js"
import"./isDate-f02c431c.js"
import"./padZ-004f73b4.js"
import{c as f}from"./createBr-a87f6e7f.js"
import{a as m}from"./all-042a202c.js"
import{c as u}from"./createAnchor-040d02de.js"
import{a as p}from"./arena-562288ee.js"
import{m as l,a as d,c as h}from"./makeHash-5e0e3547.js"
import{f as j}from"./formatUtcDateTime-2bb50a55.js"
let w,b
function y(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function _(e){const s=t-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=t-2592e3
return n(e).reduce(a(y,s),{lastCheck:t})}(e):e}function g(a){return b[a]?b[a]:async function(a){const n=await p({subcmd:"results",pvp_id:a})
return n.s&&(n.logTime=t,b[a]=n,i("fsh_arenaResults",b)),n}(a)}function k(n){return w||(w=async function(){const a=await c("fsh_arenaResults")
a?(b=_(a),i("fsh_arenaResults",b)):b={lastCheck:t}}()),w.then(a(g,n))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),R=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,n])=>[t,n,a[t]||0]
function v(a,t){let n=0
return 0!==t&&(n=o(a/t,3)),n}const x=([a,t,n])=>[a,t,n,v(n,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await k(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const t=await c("fsh_arenaJoined")
if(!t)return
!function(a,t,n,e){const o=new Blob([a],{type:t}),c=URL.createObjectURL(o),i=u({download:n,href:c,textContent:e})
s(r,i),s(r,f())}(t.map(t=>e(n(t).concat([["joinDate",j(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",l(d,t)]]).concat([["cyrb53",l(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const e=n([].concat(...t.map(a=>a.players)).reduce(J,{}))
const s=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return e.map(a(D,s)).map(x).sort(R)}async function U(a){const t=a.r.arenas,n=await async function(a){const t=await c("fsh_arenaWinners")||{},n=a.filter(a=>!t[a.id]).map(a=>a.id).map(T),s=e(await m(n)),r={...t,...s}
return i("fsh_arenaWinners",r),r}(t),s=t.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:n[a.id]})),r=L(s.filter(a=>!a.specials))
console.log("arenaBasicStats",r)
const o=L(s.filter(a=>a.specials))
console.log("arenaSpecialStats",o),await I(n)}export default async function(){const a=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-79d650c8.js.map
