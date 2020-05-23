import{v as t,ai as a,ak as n,az as e,q as s,by as r,h as o,p as c}from"./calfSystem-01eb06ed.js"
import"./numberIsNaN-5d7b8ccd.js"
import{r as i}from"./round-0f71090a.js"
import"./toLowerCase-b5dc48c4.js"
import"./isDate-fee13b4a.js"
import{c as f}from"./createBr-5d121b17.js"
import{a as m}from"./all-6b303efd.js"
import{a as u}from"./arena-7178bf3d.js"
import{f as l}from"./fromEntries-d95cc157.js"
import{m as p,a as d,c as h}from"./makeHash-36e90385.js"
import{f as w}from"./formatUtcDateTime-29eee854.js"
let b,y
function j(t,a,[n,e]){return function(t,a,n){return"lastCheck"===t||a.logTime&&a.logTime>n}(n,e,t)&&(a[n]=e),a}function _(a){const n=e-86400
return!a.lastCheck||a.lastCheck<n?function(a){const n=e-2592e3
return s(a).reduce(t(j,n),{lastCheck:e})}(a):a}function k(t){return y[t]?y[t]:async function(t){const a=await u({subcmd:"results",pvp_id:t})
return a.s&&(a.logTime=e,y[t]=a,n("fsh_arenaResults",y)),a}(t)}function g(s){return b||(b=async function(){const t=await a("fsh_arenaResults")
t?(y=_(t),n("fsh_arenaResults",y)):y={lastCheck:e}}()),b.then(t(k,s))}const C=(t,a)=>t.concat(a.join("\t"),"\n"),v=(t,a)=>a[2]-t[2]||a[1]-t[1],D=(t,[a,n])=>[a,n,t[a]||0]
function R(t,a){let n=0
return 0!==a&&(n=i(t/a,3)),n}const x=([t,a,n])=>[t,a,n,R(n,a)]
function S(t){const a=t.r[t.r.length-1]
return a.attacker_win?a.attacker.name:a.defender.name}async function T(t){return[t,S(await g(t))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(t){const n=await a("fsh_arenaJoined")
if(!n)return
!function(t,a,n,e){const s=new Blob([t],{type:a}),i=URL.createObjectURL(s),m=r({download:n,href:i,textContent:e})
o(c,m),o(c,f())}(n.map(a=>l(s(a).concat([["joinDate",w(new Date(1e3*a.joined))]]).concat([["winner",t[a.pvpId]]]).concat([["cyrb32",p(d,a)]]).concat([["cyrb53",p(h,a)]]))).map(t=>B.map(a=>t[a])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(t,a){return t[a]||(t[a]=0),t[a]+=1,t}function L(a){const n=s([].concat(...a.map(t=>t.players)).reduce(J,{}))
const e=function(t){return t.map(t=>t.winner).reduce(J,{})}(a)
return n.map(t(D,e)).map(x).sort(v)}async function U(t){const e=t.r.arenas,s=await async function(t){const e=await a("fsh_arenaWinners")||{},s=t.filter(t=>!e[t.id]).map(t=>t.id).map(T),r=l(await m(s)),o={...e,...r}
return n("fsh_arenaWinners",o),o}(e),r=e.filter(t=>1===t.type).map(t=>({id:t.id,players:t.players.map(t=>t.name),specials:t.specials,winner:s[t.id]})),o=L(r.filter(t=>!t.specials))
console.log("arenaBasicStats",o)
const c=L(r.filter(t=>t.specials))
console.log("arenaSpecialStats",c),await I(s)}export default async function(){const t=await u({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
t.s&&U(t)}
//# sourceMappingURL=crawler-8ab02657.js.map
