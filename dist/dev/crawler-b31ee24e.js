import{v as a,ai as t,q as e,ak as n,bM as r,by as s,h as o,p as c}from"./calfSystem-94018cd0.js"
import"./numberIsNaN-b4c6efab.js"
import{r as i}from"./round-f3bae54c.js"
import"./toLowerCase-5662df04.js"
import"./isDate-c1cc18a3.js"
import{c as m}from"./createBr-abc79016.js"
import{a as f}from"./all-e6dbe465.js"
import{m as p,c as l,a as d}from"./makeHash-8cbaa713.js"
import{a as u}from"./arena-e6f62ae5.js"
import{f as b}from"./fromEntries-583a14e3.js"
import{f as j}from"./formatUtcDateTime-a9fd1a5f.js"
const w=(a,t)=>a.concat(t.join("\t"),"\n"),y=(a,t)=>t[2]-a[2]||t[1]-a[1],h=(a,[t,e])=>[t,e,a[t]||0]
function _(a,t){let e=0
return 0!==t&&(e=i(a/t,3)),e}const g=([a,t,e])=>[a,t,e,_(e,t)]
function k(a){const t=a.r[a.r.length-1]
return t.attacker_win?t.attacker.name:t.defender.name}async function D(a){return[a,k(await r())]}const v=["pvpId","joinDate","helmet","armor","gloves","boots","weapon","shield","ring","amulet","rune","stat_attack","stat_defense","stat_armor","stat_damage","stat_hp","winner","cyrb32","cyrb53"]
async function x(a){const n=await t("fsh_arenaJoined")
n&&function(a,t,e,n){const r=new Blob([a],{type:t}),i=URL.createObjectURL(r),f=s({download:e,href:i,textContent:n})
o(c,f),o(c,m())}(n.map(t=>b(e(t).concat([["joinDate",j(new Date(1e3*t.joined))]]).concat([["winner",a[t.pvpId]]]).concat([["cyrb32",p(l,t)]]).concat([["cyrb53",p(d,t)]]))).map(a=>v.map(t=>a[t])).reduce(w,`${v.join("\t")}\n`),"text/plain","fsh_arenaJoined.txt","fsh_arenaJoined")}function S(a,t){return a[t]||(a[t]=0),a[t]+=1,a}function B(t){const n=e([].concat(...t.map(a=>a.players)).reduce(S,{}))
const r=function(a){return a.map(a=>a.winner).reduce(S,{})}(t)
return n.map(a(h,r)).map(g).sort(y)}async function I(a){const e=a.r.arenas,r=await async function(a){const e=await t("fsh_arenaWinners")||{},r=a.filter(a=>!e[a.id]).map(a=>a.id).map(D),s=b(await f(r)),o={...e,...s}
return n("fsh_arenaWinners",o),o}(e),s=e.filter(a=>1===a.type).map(a=>({id:a.id,players:a.players.map(a=>a.name),specials:a.specials,winner:r[a.id]})),o=B(s.filter(a=>!a.specials))
console.log("arenaBasicStats",o)
const c=B(s.filter(a=>a.specials))
console.log("arenaSpecialStats",c),await x(r)}export default async function(){const a=await u({subcmd:"completed",arena_id:-1,latest:!1,limit:9999})
a.s&&I(a)}
//# sourceMappingURL=crawler-b31ee24e.js.map
