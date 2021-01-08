import{t,T as a,e as n,aT as e,h as s,p as r}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import{r as o}from"./round-6850c0fc.js"
import"./toLowerCase-5e186769.js"
import{g as c,s as i}from"./idb-7f0d2b39.js"
import"./isDate-546a6320.js"
import"./padZ-bd3dfcf9.js"
import{c as f}from"./createBr-fea25833.js"
import{c as m}from"./createAnchor-1e22829c.js"
import{a as u}from"./all-36f83e81.js"
import{a as p}from"./arena-ac278570.js"
import{m as l,a as d,c as h}from"./makeHash-b3260b0c.js"
import{f as j}from"./formatUtcDateTime-611562a5.js"
let w,y
function _(t,a,[n,e]){return function(t,a,n){return"lastCheck"===t||a.logTime&&a.logTime>n}(n,e,t)&&(a[n]=e),a}function b(e){const s=a-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=a-2592e3
return n(e).reduce(t(_,s),{lastCheck:a})}(e):e}function g(t){return y[t]?y[t]:async function(t){const n=await p({subcmd:"results",pvp_id:t})
return n.s&&(n.logTime=a,y[t]=n,i("fsh_arenaResults",y)),n}(t)}function k(n){return w||(w=async function(){const t=await c("fsh_arenaResults")
t?(y=b(t),i("fsh_arenaResults",y)):y={lastCheck:a}}()),w.then(t(g,n))}const C=(t,a)=>t.concat(a.join("\t"),"\n"),T=(t,a)=>a[2]-t[2]||a[1]-t[1],D=(t,[a,n])=>[a,n,t[a]||0]
function R(t,a){let n=0
return 0!==a&&(n=o(t/a,3)),n}const v=([t,a,n])=>[t,a,n,R(n,a)]
function x(t){const a=t.r[t.r.length-1]
return a.attacker_win?a.attacker.name:a.defender.name}async function S(t){return[t,x(await k(t))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(t){const a=await c("fsh_arenaJoined")
if(!a)return
!function(t,a,n,e){const o=new Blob([t],{type:a}),c=URL.createObjectURL(o),i=m({download:n,href:c,textContent:e})
s(r,i),s(r,f())}(a.map(a=>e(n(a).concat([["joinDate",j(new Date(1e3*a.joined))]]).concat([["winner",t[a.pvpId]]]).concat([["cyrb32",l(d,a)]]).concat([["cyrb53",l(h,a)]]))).map(t=>B.map(a=>t[a])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(t,a){return t[a]||(t[a]=0),t[a]+=1,t}function L(a){const e=n([].concat(...a.map(t=>t.players)).reduce(J,{}))
const s=function(t){return t.map(t=>t.winner).reduce(J,{})}(a)
return e.map(t(D,s)).map(v).sort(T)}async function U(t){const a=t.r.arenas,n=await async function(t){const a=await c("fsh_arenaWinners")||{},n=t.filter(t=>!a[t.id]).map(t=>t.id).map(S),s=e(await u(n)),r={...a,...s}
return i("fsh_arenaWinners",r),r}(a),s=a.filter(t=>1===t.type).map(t=>({id:t.id,players:t.players.map(t=>t.name),specials:t.specials,winner:n[t.id]})),r=L(s.filter(t=>!t.specials))
console.log("arenaBasicStats",r)
const o=L(s.filter(t=>t.specials))
console.log("arenaSpecialStats",o),await I(n)}async function N(){const t=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
t.s&&U(t)}export default N
//# sourceMappingURL=crawler-d8e02f5d.js.map
