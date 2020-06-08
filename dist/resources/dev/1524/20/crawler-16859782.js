import{t as a,T as t,m as n,aU as e,f as s,p as r}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import{r as c}from"./round-29082f2f.js"
import"./toLowerCase-2574a84c.js"
import{g as o,s as i}from"./idb-911ff7c2.js"
import"./isDate-4c8ac6ee.js"
import"./padZ-c3ec0e2d.js"
import{c as f}from"./createBr-8f382fb1.js"
import{c as m}from"./createAnchor-48415e52.js"
import{a as u}from"./all-6bd68ac2.js"
import{a as p}from"./arena-c755f3af.js"
import{m as l,a as d,c as h}from"./makeHash-5a7b2000.js"
import{f as j}from"./formatUtcDateTime-89b5f49f.js"
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
//# sourceMappingURL=crawler-16859782.js.map
