import{s as t,R as a,l as n,aV as e,f as s,p as r}from"./calfSystem-f7574730.js"
import"./numberIsNaN-92f332e4.js"
import{r as o}from"./round-334060b2.js"
import"./toLowerCase-9cb6a319.js"
import{g as c,s as i}from"./idb-14a57c5b.js"
import"./isDate-04e85c3b.js"
import"./padZ-30f972ec.js"
import{c as f}from"./createBr-6977f437.js"
import{a as m}from"./all-d5952527.js"
import{c as u}from"./createAnchor-2d560615.js"
import{a as p}from"./arena-f2357f8e.js"
import{m as l,a as d,c as h}from"./makeHash-31530d0b.js"
import{f as j}from"./formatUtcDateTime-f8ddad6b.js"
let w,b
function y(t,a,[n,e]){return function(t,a,n){return"lastCheck"===t||a.logTime&&a.logTime>n}(n,e,t)&&(a[n]=e),a}function _(e){const s=a-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=a-2592e3
return n(e).reduce(t(y,s),{lastCheck:a})}(e):e}function g(t){return b[t]?b[t]:async function(t){const n=await p({subcmd:"results",pvp_id:t})
return n.s&&(n.logTime=a,b[t]=n,i("fsh_arenaResults",b)),n}(t)}function k(n){return w||(w=async function(){const t=await c("fsh_arenaResults")
t?(b=_(t),i("fsh_arenaResults",b)):b={lastCheck:a}}()),w.then(t(g,n))}const C=(t,a)=>t.concat(a.join("\t"),"\n"),R=(t,a)=>a[2]-t[2]||a[1]-t[1],D=(t,[a,n])=>[a,n,t[a]||0]
function v(t,a){let n=0
return 0!==a&&(n=o(t/a,3)),n}const x=([t,a,n])=>[t,a,n,v(n,a)]
function S(t){const a=t.r[t.r.length-1]
return a.attacker_win?a.attacker.name:a.defender.name}async function T(t){return[t,S(await k(t))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(t){const a=await c("fsh_arenaJoined")
if(!a)return
!function(t,a,n,e){const o=new Blob([t],{type:a}),c=URL.createObjectURL(o),i=u({download:n,href:c,textContent:e})
s(r,i),s(r,f())}(a.map(a=>e(n(a).concat([["joinDate",j(new Date(1e3*a.joined))]]).concat([["winner",t[a.pvpId]]]).concat([["cyrb32",l(d,a)]]).concat([["cyrb53",l(h,a)]]))).map(t=>B.map(a=>t[a])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(t,a){return t[a]||(t[a]=0),t[a]+=1,t}function L(a){const e=n([].concat(...a.map(t=>t.players)).reduce(J,{}))
const s=function(t){return t.map(t=>t.winner).reduce(J,{})}(a)
return e.map(t(D,s)).map(x).sort(R)}async function U(t){const a=t.r.arenas,n=await async function(t){const a=await c("fsh_arenaWinners")||{},n=t.filter(t=>!a[t.id]).map(t=>t.id).map(T),s=e(await m(n)),r={...a,...s}
return i("fsh_arenaWinners",r),r}(a),s=a.filter(t=>1===t.type).map(t=>({id:t.id,players:t.players.map(t=>t.name),specials:t.specials,winner:n[t.id]})),r=L(s.filter(t=>!t.specials))
console.log("arenaBasicStats",r)
const o=L(s.filter(t=>t.specials))
console.log("arenaSpecialStats",o),await I(n)}export default async function(){const t=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
t.s&&U(t)}
//# sourceMappingURL=crawler-6174266a.js.map
