import{v as a,ai as t,ak as e,az as n,q as s,by as r,h as o,p as c}from"./calfSystem-0e5d6faf.js"
import"./numberIsNaN-a4c8282b.js"
import{r as i}from"./round-90a12e36.js"
import"./toLowerCase-adcc7aa6.js"
import"./isDate-d076e679.js"
import{c as f}from"./createBr-224efa54.js"
import{a as m}from"./all-9248ebd2.js"
import{a as u}from"./arena-52bce975.js"
import{f as l}from"./fromEntries-00e6eae5.js"
import{m as p,a as d,c as h}from"./makeHash-ded1c2fe.js"
import{f as w}from"./formatUtcDateTime-4e1d9582.js"
let y,j
function _(a,t,[e,n]){return function(a,t,e){return"lastCheck"===a||t.logTime&&t.logTime>e}(e,n,a)&&(t[e]=n),t}function b(t){const e=n-86400
return!t.lastCheck||t.lastCheck<e?function(t){const e=n-2592e3
return s(t).reduce(a(_,e),{lastCheck:n})}(t):t}function k(a){return j[a]?j[a]:async function(a){const t=await u({subcmd:"results",pvp_id:a})
return t.s&&(t.logTime=n,j[a]=t,e("fsh_arenaResults",j)),t}(a)}function g(s){return y||(y=async function(){const a=await t("fsh_arenaResults")
a?(j=b(a),e("fsh_arenaResults",j)):j={lastCheck:n}}()),y.then(a(k,s))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),v=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,e])=>[t,e,a[t]||0]
function R(a,t){let e=0
return 0!==t&&(e=i(a/t,3)),e}const x=([a,t,e])=>[a,t,e,R(e,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await g(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const e=await t("fsh_arenaJoined")
e&&function(a,t,e,n){const s=new Blob([a],{type:t}),i=URL.createObjectURL(s),m=r({download:e,href:i,textContent:n})
o(c,m),o(c,f())}(e.map(t=>l(s(t).concat([["joinDate",w(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",p(d,t)]]).concat([["cyrb53",p(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,`${B.join("\t")}\n`),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const e=s([].concat(...t.map(a=>a.players)).reduce(J,{}))
const n=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return e.map(a(D,n)).map(x).sort(v)}async function U(a){const n=a.r.arenas,s=await async function(a){const n=await t("fsh_arenaWinners")||{},s=a.filter(a=>!n[a.id]).map(a=>a.id).map(T),r=l(await m(s)),o={...n,...r}
return e("fsh_arenaWinners",o),o}(n),r=n.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:s[a.id]})),o=L(r.filter(a=>!a.specials))
console.log("arenaBasicStats",o)
const c=L(r.filter(a=>a.specials))
console.log("arenaSpecialStats",c),await I(s)}export default async function(){const a=await u({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-0d0b67ae.js.map
