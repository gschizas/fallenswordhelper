import{s as a,a5 as t,a7 as n,Q as e,l as s,bh as r,f as c,p as o}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import{r as i}from"./round-12db58e6.js"
import"./toLowerCase-6383ba3b.js"
import"./isDate-f3df3fd8.js"
import"./padZ-55be60ec.js"
import{c as f}from"./createBr-7e2936bd.js"
import{a as m}from"./all-b94d2d9d.js"
import{c as u}from"./createAnchor-0ba33db2.js"
import{a as l}from"./arena-833d6240.js"
import{m as p,a as d,c as h}from"./makeHash-3c2cb9cb.js"
import{f as b}from"./formatUtcDateTime-af60a5d7.js"
let w,j
function y(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function _(t){const n=e-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=e-2592e3
return s(t).reduce(a(y,n),{lastCheck:e})}(t):t}function g(a){return j[a]?j[a]:async function(a){const t=await l({subcmd:"results",pvp_id:a})
return t.s&&(t.logTime=e,j[a]=t,n("fsh_arenaResults",j)),t}(a)}function k(s){return w||(w=async function(){const a=await t("fsh_arenaResults")
a?(j=_(a),n("fsh_arenaResults",j)):j={lastCheck:e}}()),w.then(a(g,s))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),D=(a,t)=>t[2]-a[2]||t[1]-a[1],R=(a,[t,n])=>[t,n,a[t]||0]
function v(a,t){let n=0
return 0!==t&&(n=i(a/t,3)),n}const x=([a,t,n])=>[a,t,n,v(n,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await k(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const n=await t("fsh_arenaJoined")
if(!n)return
!function(a,t,n,e){const s=new Blob([a],{type:t}),r=URL.createObjectURL(s),i=u({download:n,href:r,textContent:e})
c(o,i),c(o,f())}(n.map(t=>r(s(t).concat([["joinDate",b(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",p(d,t)]]).concat([["cyrb53",p(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const n=s([].concat(...t.map(a=>a.players)).reduce(J,{}))
const e=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return n.map(a(R,e)).map(x).sort(D)}async function U(a){const e=a.r.arenas,s=await async function(a){const e=await t("fsh_arenaWinners")||{},s=a.filter(a=>!e[a.id]).map(a=>a.id).map(T),c=r(await m(s)),o={...e,...c}
return n("fsh_arenaWinners",o),o}(e),c=e.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:s[a.id]})),o=L(c.filter(a=>!a.specials))
console.log("arenaBasicStats",o)
const i=L(c.filter(a=>a.specials))
console.log("arenaSpecialStats",i),await I(s)}export default async function(){const a=await l({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-16bae4ed.js.map
