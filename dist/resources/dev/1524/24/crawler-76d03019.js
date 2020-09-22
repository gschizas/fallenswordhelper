import{t,T as a,e as n,aU as e,h as s,p as r}from"./calfSystem-38898f3e.js"
import"./numberIsNaN-00e0daaf.js"
import{r as c}from"./round-0254204f.js"
import"./toLowerCase-2f55d839.js"
import{g as o,s as i}from"./idb-ccc44752.js"
import"./isDate-1ee2b7eb.js"
import"./padZ-cba8efb8.js"
import{c as f}from"./createBr-db5bac92.js"
import{c as m}from"./createAnchor-3dbd9e50.js"
import{a as u}from"./all-e4fd8fad.js"
import{a as p}from"./arena-c2b62856.js"
import{m as l,a as d,c as h}from"./makeHash-95f4544c.js"
import{f as b}from"./formatUtcDateTime-dded6bcd.js"
let j,w
function y(t,a,[n,e]){return function(t,a,n){return"lastCheck"===t||a.logTime&&a.logTime>n}(n,e,t)&&(a[n]=e),a}function _(e){const s=a-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=a-2592e3
return n(e).reduce(t(y,s),{lastCheck:a})}(e):e}function g(t){return w[t]?w[t]:async function(t){const n=await p({subcmd:"results",pvp_id:t})
return n.s&&(n.logTime=a,w[t]=n,i("fsh_arenaResults",w)),n}(t)}function k(n){return j||(j=async function(){const t=await o("fsh_arenaResults")
t?(w=_(t),i("fsh_arenaResults",w)):w={lastCheck:a}}()),j.then(t(g,n))}const C=(t,a)=>t.concat(a.join("\t"),"\n"),D=(t,a)=>a[2]-t[2]||a[1]-t[1],R=(t,[a,n])=>[a,n,t[a]||0]
function T(t,a){let n=0
return 0!==a&&(n=c(t/a,3)),n}const v=([t,a,n])=>[t,a,n,T(n,a)]
function x(t){const a=t.r[t.r.length-1]
return a.attacker_win?a.attacker.name:a.defender.name}async function S(t){return[t,x(await k(t))]}const U=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function B(t){const a=await o("fsh_arenaJoined")
if(!a)return
!function(t,a,n,e){const c=new Blob([t],{type:a}),o=URL.createObjectURL(c),i=m({download:n,href:o,textContent:e})
s(r,i),s(r,f())}(a.map(a=>e(n(a).concat([["joinDate",b(new Date(1e3*a.joined))]]).concat([["winner",t[a.pvpId]]]).concat([["cyrb32",l(d,a)]]).concat([["cyrb53",l(h,a)]]))).map(t=>U.map(a=>t[a])).reduce(C,U.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function I(t,a){return t[a]||(t[a]=0),t[a]+=1,t}function J(a){const e=n([].concat(...a.map(t=>t.players)).reduce(I,{}))
const s=function(t){return t.map(t=>t.winner).reduce(I,{})}(a)
return e.map(t(R,s)).map(v).sort(D)}async function L(t){const a=t.r.arenas,n=await async function(t){const a=await o("fsh_arenaWinners")||{},n=t.filter(t=>!a[t.id]).map(t=>t.id).map(S),s=e(await u(n)),r={...a,...s}
return i("fsh_arenaWinners",r),r}(a),s=a.filter(t=>1===t.type).map(t=>({id:t.id,players:t.players.map(t=>t.name),specials:t.specials,winner:n[t.id]})),r=J(s.filter(t=>!t.specials))
console.log("arenaBasicStats",r)
const c=J(s.filter(t=>t.specials))
console.log("arenaSpecialStats",c),await B(n)}async function N(){const t=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
t.s&&L(t)}export default N
//# sourceMappingURL=crawler-76d03019.js.map
