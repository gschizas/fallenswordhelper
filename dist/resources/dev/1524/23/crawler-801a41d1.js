import{t as a,T as t,e,aU as n,h as s,p as r}from"./calfSystem-9901ad27.js"
import"./numberIsNaN-cb2409eb.js"
import{r as o}from"./round-ef0af241.js"
import"./toLowerCase-dda30e6b.js"
import{g as c,s as i}from"./idb-efff97cf.js"
import"./isDate-32fe1182.js"
import"./padZ-ce2146a0.js"
import{c as f}from"./createBr-342ea6a2.js"
import{c as m}from"./createAnchor-0efcad5e.js"
import{a as u}from"./all-9da52a21.js"
import{a as p}from"./arena-afe5f36a.js"
import{m as l,a as d,c as h}from"./makeHash-b1364348.js"
import{f as j}from"./formatUtcDateTime-abf0e3ce.js"
let w,y
function b(a,t,[e,n]){return function(a,t,e){return"lastCheck"===a||t.logTime&&t.logTime>e}(e,n,a)&&(t[e]=n),t}function _(n){const s=t-86400
return!n.lastCheck||n.lastCheck<s?function(n){const s=t-2592e3
return e(n).reduce(a(b,s),{lastCheck:t})}(n):n}function g(a){return y[a]?y[a]:async function(a){const e=await p({subcmd:"results",pvp_id:a})
return e.s&&(e.logTime=t,y[a]=e,i("fsh_arenaResults",y)),e}(a)}function k(e){return w||(w=async function(){const a=await c("fsh_arenaResults")
a?(y=_(a),i("fsh_arenaResults",y)):y={lastCheck:t}}()),w.then(a(g,e))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),D=(a,t)=>t[2]-a[2]||t[1]-a[1],R=(a,[t,e])=>[t,e,a[t]||0]
function T(a,t){let e=0
return 0!==t&&(e=o(a/t,3)),e}const v=([a,t,e])=>[a,t,e,T(e,t)]
function x(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function S(a){return[a,x(await k(a))]}const U=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function B(a){const t=await c("fsh_arenaJoined")
if(!t)return
!function(a,t,e,n){const o=new Blob([a],{type:t}),c=URL.createObjectURL(o),i=m({download:e,href:c,textContent:n})
s(r,i),s(r,f())}(t.map(t=>n(e(t).concat([["joinDate",j(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",l(d,t)]]).concat([["cyrb53",l(h,t)]]))).map(a=>U.map(t=>a[t])).reduce(C,U.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function I(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function J(t){const n=e([].concat(...t.map(a=>a.players)).reduce(I,{}))
const s=function(a){return a.map(a=>a.winner).reduce(I,{})}(t)
return n.map(a(R,s)).map(v).sort(D)}async function L(a){const t=a.r.arenas,e=await async function(a){const t=await c("fsh_arenaWinners")||{},e=a.filter(a=>!t[a.id]).map(a=>a.id).map(S),s=n(await u(e)),r={...t,...s}
return i("fsh_arenaWinners",r),r}(t),s=t.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:e[a.id]})),r=J(s.filter(a=>!a.specials))
console.log("arenaBasicStats",r)
const o=J(s.filter(a=>a.specials))
console.log("arenaSpecialStats",o),await B(e)}export default async function(){const a=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&L(a)}
//# sourceMappingURL=crawler-801a41d1.js.map
