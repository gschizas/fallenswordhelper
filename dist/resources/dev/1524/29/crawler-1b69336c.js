import{t as a,T as t,e as n,aT as e,h as s,p as r}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import{r as c}from"./round-d6369a4d.js"
import"./toLowerCase-0a22477f.js"
import{g as o,s as i}from"./idb-49c5b621.js"
import"./isDate-14b56c12.js"
import"./padZ-a3ed1fe1.js"
import{c as f}from"./createBr-467e74dc.js"
import{c as m}from"./createAnchor-d707da0a.js"
import{a as u}from"./all-01203f8c.js"
import{a as p}from"./arena-6c34b7f6.js"
import{m as l,a as d,c as h}from"./makeHash-0d05eb7a.js"
import{f as j}from"./formatUtcDateTime-02cd0ca5.js"
let w,y
function b(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function _(e){const s=t-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=t-2592e3
return n(e).reduce(a(b,s),{lastCheck:t})}(e):e}function g(a){return y[a]?y[a]:async function(a){const n=await p({subcmd:"results",pvp_id:a})
return n.s&&(n.logTime=t,y[a]=n,i("fsh_arenaResults",y)),n}(a)}function k(n){return w||(w=async function(){const a=await o("fsh_arenaResults")
a?(y=_(a),i("fsh_arenaResults",y)):y={lastCheck:t}}()),w.then(a(g,n))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),T=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,n])=>[t,n,a[t]||0]
function R(a,t){let n=0
return 0!==t&&(n=c(a/t,3)),n}const v=([a,t,n])=>[a,t,n,R(n,t)]
function x(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function S(a){return[a,x(await k(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const t=await o("fsh_arenaJoined")
if(!t)return
!function(a,t,n,e){const c=new Blob([a],{type:t}),o=URL.createObjectURL(c),i=m({download:n,href:o,textContent:e})
s(r,i),s(r,f())}(t.map(t=>e(n(t).concat([["joinDate",j(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",l(d,t)]]).concat([["cyrb53",l(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,B.join("\t")+"\n"),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const e=n([].concat(...t.map(a=>a.players)).reduce(J,{}))
const s=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return e.map(a(D,s)).map(v).sort(T)}async function U(a){const t=a.r.arenas,n=await async function(a){const t=await o("fsh_arenaWinners")||{},n=a.filter(a=>!t[a.id]).map(a=>a.id).map(S),s=e(await u(n)),r={...t,...s}
return i("fsh_arenaWinners",r),r}(t),s=t.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:n[a.id]})),r=L(s.filter(a=>!a.specials))
console.log("arenaBasicStats",r)
const c=L(s.filter(a=>a.specials))
console.log("arenaSpecialStats",c),await I(n)}async function N(){const a=await p({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}export default N
//# sourceMappingURL=crawler-1b69336c.js.map
