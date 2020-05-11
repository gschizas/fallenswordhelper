import{v as a,ai as t,ak as n,az as e,q as s,by as r,h as o,p as c}from"./calfSystem-8dc0fa4b.js"
import"./numberIsNaN-73f607dc.js"
import{r as i}from"./round-98f16be7.js"
import"./toLowerCase-26121da0.js"
import"./isDate-f41a9473.js"
import{c as f}from"./createBr-ae194a23.js"
import{a as m}from"./all-905003de.js"
import{a as u}from"./arena-398ab6b2.js"
import{f as l}from"./fromEntries-81ecec83.js"
import{m as p,a as d,c as h}from"./makeHash-e9f3cf9c.js"
import{f as w}from"./formatUtcDateTime-4473e6e4.js"
let y,j
function _(a,t,[n,e]){return function(a,t,n){return"lastCheck"===a||t.logTime&&t.logTime>n}(n,e,a)&&(t[n]=e),t}function b(t){const n=e-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=e-2592e3
return s(t).reduce(a(_,n),{lastCheck:e})}(t):t}function k(a){return j[a]?j[a]:async function(a){const t=await u({subcmd:"results",pvp_id:a})
return t.s&&(t.logTime=e,j[a]=t,n("fsh_arenaResults",j)),t}(a)}function g(s){return y||(y=async function(){const a=await t("fsh_arenaResults")
a?(j=b(a),n("fsh_arenaResults",j)):j={lastCheck:e}}()),y.then(a(k,s))}const C=(a,t)=>a.concat(t.join("\t"),"\n"),v=(a,t)=>t[2]-a[2]||t[1]-a[1],D=(a,[t,n])=>[t,n,a[t]||0]
function R(a,t){let n=0
return 0!==t&&(n=i(a/t,3)),n}const x=([a,t,n])=>[a,t,n,R(n,t)]
function S(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function T(a){return[a,S(await g(a))]}const B=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function I(a){const n=await t("fsh_arenaJoined")
n&&function(a,t,n,e){const s=new Blob([a],{type:t}),i=URL.createObjectURL(s),m=r({download:n,href:i,textContent:e})
o(c,m),o(c,f())}(n.map(t=>l(s(t).concat([["joinDate",w(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",p(d,t)]]).concat([["cyrb53",p(h,t)]]))).map(a=>B.map(t=>a[t])).reduce(C,`${B.join("\t")}\n`),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function J(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function L(t){const n=s([].concat(...t.map(a=>a.players)).reduce(J,{}))
const e=function(a){return a.map(a=>a.winner).reduce(J,{})}(t)
return n.map(a(D,e)).map(x).sort(v)}async function U(a){const e=a.r.arenas,s=await async function(a){const e=await t("fsh_arenaWinners")||{},s=a.filter(a=>!e[a.id]).map(a=>a.id).map(T),r=l(await m(s)),o={...e,...r}
return n("fsh_arenaWinners",o),o}(e),r=e.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:s[a.id]})),o=L(r.filter(a=>!a.specials))
console.log("arenaBasicStats",o)
const c=L(r.filter(a=>a.specials))
console.log("arenaSpecialStats",c),await I(s)}export default async function(){const a=await u({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&U(a)}
//# sourceMappingURL=crawler-47b42ea5.js.map
