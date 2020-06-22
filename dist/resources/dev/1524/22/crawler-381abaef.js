import{t as a,T as t,e as n,aU as e,h as s,p as r}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import{r as c}from"./round-ae063e6e.js"
import"./toLowerCase-e8c3179d.js"
import{g as o,s as i}from"./idb-670c0cca.js"
import"./isDate-f0efcfda.js"
import"./padZ-efc0fa0f.js"
import{c as f}from"./createBr-498195da.js"
import{c as m}from"./createAnchor-d415ddba.js"
import{a as u}from"./all-4929a748.js"
import{a as p}from"./arena-ccc43962.js"
import{m as l,a as d,c as h}from"./makeHash-59634999.js"
import{f as j}from"./formatUtcDateTime-af21e3db.js"
let w,y
function _(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function b(e){const s=t-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=t-2592e3
return n(e).reduce(a(_,s),{lastCheck:t})}(e):e}function g(a){return y[a]?y[a]:async function(a){const n=await p({subcmd:"results",pvp_id:a})
return n.s&&(n.logTime=t,y[a]=n,i("fsh_arenaResults",y)),n}(a)}function k(n){return w||(w=async function(){const a=await o("fsh_arenaResults")
a?(y=b(a),i("fsh_arenaResults",y)):y={lastCheck:t}}()),w.then(a(g,n))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),D=(a,t)=>t[2]-a[2]||t[1]-a[1],R=(a,[t,n])=>[t,n,a[t]||0]
function T(a,t){let n=0
return 0!==t&&(n=c(a/t,3)),n}const v=([a,t,n])=>[a,t,n,T(n,t)]
function x(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function S(a){return[a,x(await k(a))]}const U=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function B(a){const t=await o("fsh_arenaJoined")
if(!t)return
!function(a,t,n,e){const c=new Blob([a],{type:t}),o=URL.createObjectURL(c),i=m({download:n,href:o,textContent:e})
s(r,i),s(r,f())}(t.map(t=>e(n(t).concat([["joinDate",j(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",l(d,t)]]).concat([["cyrb53",l(h,t)]]))).map(a=>U.map(t=>a[t])).reduce(C,U.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function I(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function J(t){const e=n([].concat(...t.map(a=>a.players)).reduce(I,{}))
const s=function(a){return a.map(a=>a.winner).reduce(I,{})}(t)
return e.map(a(R,s)).map(v).sort(D)}async function L(a){const t=a.r.arenas,n=await async function(a){const t=await o("fsh_arenaWinners")||{},n=a.filter(a=>!t[a.id]).map(a=>a.id).map(S),s=e(await u(n)),r={...t,...s}
return i("fsh_arenaWinners",r),r}(t),s=t.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:n[a.id]})),r=J(s.filter(a=>!a.specials))
console.log("arenaBasicStats",r)
const c=J(s.filter(a=>a.specials))
console.log("arenaSpecialStats",c),await B(n)}export default async function(){const a=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&L(a)}
//# sourceMappingURL=crawler-381abaef.js.map
