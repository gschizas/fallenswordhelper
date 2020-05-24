import{u as a,ah as t,aj as n,ay as e,n as s,bx as r,f as c,p as o}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import{r as i}from"./round-0cc3c134.js"
import"./toLowerCase-a0540d2c.js"
import"./isDate-b5dd2678.js"
import{c as f}from"./createBr-548e4e02.js"
import{a as m}from"./all-a5e007ad.js"
import{a as u}from"./arena-c4be0131.js"
import{f as l}from"./fromEntries-cf9f1789.js"
import{m as p,a as d,c as h}from"./makeHash-38477382.js"
import{f as w}from"./formatUtcDateTime-e6029519.js"
let j,y
function _(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function b(t){const n=e-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=e-2592e3
return s(t).reduce(a(_,n),{lastCheck:e})}(t):t}function g(a){return y[a]?y[a]:async function(a){const t=await u({subcmd:"results",pvp_id:a})
return t.s&&(t.logTime=e,y[a]=t,n("fsh_arenaResults",y)),t}(a)}function k(s){return j||(j=async function(){const a=await t("fsh_arenaResults")
a?(y=b(a),n("fsh_arenaResults",y)):y={lastCheck:e}}()),j.then(a(g,s))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),x=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,n])=>[t,n,a[t]||0]
function R(a,t){let n=0
return 0!==t&&(n=i(a/t,3)),n}const v=([a,t,n])=>[a,t,n,R(n,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await k(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const n=await t("fsh_arenaJoined")
if(!n)return
!function(a,t,n,e){const s=new Blob([a],{type:t}),i=URL.createObjectURL(s),m=r({download:n,href:i,textContent:e})
c(o,m),c(o,f())}(n.map(t=>l(s(t).concat([["joinDate",w(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",p(d,t)]]).concat([["cyrb53",p(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const n=s([].concat(...t.map(a=>a.players)).reduce(J,{}))
const e=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return n.map(a(D,e)).map(v).sort(x)}async function U(a){const e=a.r.arenas,s=await async function(a){const e=await t("fsh_arenaWinners")||{},s=a.filter(a=>!e[a.id]).map(a=>a.id).map(T),r=l(await m(s)),c={...e,...r}
return n("fsh_arenaWinners",c),c}(e),r=e.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:s[a.id]})),c=L(r.filter(a=>!a.specials))
console.log("arenaBasicStats",c)
const o=L(r.filter(a=>a.specials))
console.log("arenaSpecialStats",o),await I(s)}export default async function(){const a=await u({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-4faac128.js.map
