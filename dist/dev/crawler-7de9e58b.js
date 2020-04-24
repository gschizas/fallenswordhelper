import{v as a,ai as t,ak as n,az as e,q as s,by as r,h as c,p as o}from"./calfSystem-9b1fa4ca.js"
import"./numberIsNaN-6f59053c.js"
import{r as i}from"./round-66c1aede.js"
import"./toLowerCase-cb0a8722.js"
import"./isDate-dcf658b5.js"
import{c as f}from"./createBr-d5520a60.js"
import{a as m}from"./all-d7ba558a.js"
import{m as u,c as l,a as p}from"./makeHash-747f4a36.js"
import{a as d}from"./arena-cf16de3f.js"
import{f as h}from"./fromEntries-4c2983ea.js"
import{f as w}from"./formatUtcDateTime-1a4f6598.js"
let y,j
function _(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function b(t){const n=e-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=e-2592e3
return s(t).reduce(a(_,n),{lastCheck:e})}(t):t}function k(a){return j[a]?j[a]:async function(a){const t=await d({subcmd:"results",pvp_id:a})
return t.s&&(t.logTime=e,j[a]=t,n("fsh_arenaResults",j)),t}(a)}function g(s){return y||(y=async function(){const a=await t("fsh_arenaResults")
a?(j=b(a),n("fsh_arenaResults",j)):j={lastCheck:e}}()),y.then(a(k,s))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),v=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,n])=>[t,n,a[t]||0]
function R(a,t){let n=0
return 0!==t&&(n=i(a/t,3)),n}const x=([a,t,n])=>[a,t,n,R(n,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await g(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const n=await t("fsh_arenaJoined")
n&&function(a,t,n,e){const s=new Blob([a],{type:t}),i=URL.createObjectURL(s),m=r({download:n,href:i,textContent:e})
c(o,m),c(o,f())}(n.map(t=>h(s(t).concat([["joinDate",w(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",u(l,t)]]).concat([["cyrb53",u(p,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,`${B.join("\t")}\n`),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const n=s([].concat(...t.map(a=>a.players)).reduce(J,{}))
const e=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return n.map(a(D,e)).map(x).sort(v)}async function U(a){const e=a.r.arenas,s=await async function(a){const e=await t("fsh_arenaWinners")||{},s=a.filter(a=>!e[a.id]).map(a=>a.id).map(T),r=h(await m(s)),c={...e,...r}
return n("fsh_arenaWinners",c),c}(e),r=e.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:s[a.id]})),c=L(r.filter(a=>!a.specials))
console.log("arenaBasicStats",c)
const o=L(r.filter(a=>a.specials))
console.log("arenaSpecialStats",o),await I(s)}export default async function(){const a=await d({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-7de9e58b.js.map
