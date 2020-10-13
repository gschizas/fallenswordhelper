import{t,T as a,e as n,aT as e,h as s,p as r}from"./calfSystem-b136673a.js"
import"./numberIsNaN-91041dcf.js"
import{r as c}from"./round-9f8a3650.js"
import"./toLowerCase-27ea448e.js"
import{g as o,s as i}from"./idb-c31665cb.js"
import"./isDate-45c423ee.js"
import"./padZ-28ca6b6e.js"
import{c as m}from"./createBr-31259e07.js"
import{c as f}from"./createAnchor-e5f170c1.js"
import{a as u}from"./all-7e2b4bf6.js"
import{a as p}from"./arena-6a803efd.js"
import{m as l,a as d,c as h}from"./makeHash-0028679b.js"
import{f as j}from"./formatUtcDateTime-233cbd79.js"
let w,b
function y(t,a,[n,e]){return function(t,a,n){return"lastCheck"===t||a.logTime&&a.logTime>n}(n,e,t)&&(a[n]=e),a}function _(e){const s=a-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=a-2592e3
return n(e).reduce(t(y,s),{lastCheck:a})}(e):e}function g(t){return b[t]?b[t]:async function(t){const n=await p({subcmd:"results",pvp_id:t})
return n.s&&(n.logTime=a,b[t]=n,i("fsh_arenaResults",b)),n}(t)}function k(n){return w||(w=async function(){const t=await o("fsh_arenaResults")
t?(b=_(t),i("fsh_arenaResults",b)):b={lastCheck:a}}()),w.then(t(g,n))}const C=(t,a)=>t.concat(a.join("\t"),"\n"),T=(t,a)=>a[2]-t[2]||a[1]-t[1],D=(t,[a,n])=>[a,n,t[a]||0]
function R(t,a){let n=0
return 0!==a&&(n=c(t/a,3)),n}const v=([t,a,n])=>[t,a,n,R(n,a)]
function x(t){const a=t.r[t.r.length-1]
return a.attacker_win?a.attacker.name:a.defender.name}async function S(t){return[t,x(await k(t))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(t){const a=await o("fsh_arenaJoined")
if(!a)return
!function(t,a,n,e){const c=new Blob([t],{type:a}),o=URL.createObjectURL(c),i=f({download:n,href:o,textContent:e})
s(r,i),s(r,m())}(a.map(a=>e(n(a).concat([["joinDate",j(new Date(1e3*a.joined))]]).concat([["winner",t[a.pvpId]]]).concat([["cyrb32",l(d,a)]]).concat([["cyrb53",l(h,a)]]))).map(t=>B.map(a=>t[a])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(t,a){return t[a]||(t[a]=0),t[a]+=1,t}function L(a){const e=n([].concat(...a.map(t=>t.players)).reduce(J,{}))
const s=function(t){return t.map(t=>t.winner).reduce(J,{})}(a)
return e.map(t(D,s)).map(v).sort(T)}async function U(t){const a=t.r.arenas,n=await async function(t){const a=await o("fsh_arenaWinners")||{},n=t.filter(t=>!a[t.id]).map(t=>t.id).map(S),s=e(await u(n)),r={...a,...s}
return i("fsh_arenaWinners",r),r}(a),s=a.filter(t=>1===t.type).map(t=>({id:t.id,players:t.players.map(t=>t.name),specials:t.specials,winner:n[t.id]})),r=L(s.filter(t=>!t.specials))
console.log("arenaBasicStats",r)
const c=L(s.filter(t=>t.specials))
console.log("arenaSpecialStats",c),await I(n)}async function N(){const t=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
t.s&&U(t)}export default N
//# sourceMappingURL=crawler-ad7540bd.js.map
