import{k as t,f as s,z as e,s as a,e as i,i as n,aG as r,b1 as o,a3 as c,J as m,N as p,p as l,b2 as d,L as f,M as u,R as v,aV as b,b3 as j,b4 as g,x as $}from"./calfSystem-d49dbbd3.js"
import"./dontPost-9ae48c7f.js"
import"./numberIsNaN-1742f258.js"
import{t as h}from"./toLowerCase-e686322a.js"
import{a as y}from"./addCommas-ab251bb7.js"
import"./setTipped-d04acae4.js"
import"./currentGuildId-fb556ea3.js"
import"./intValue-2ed328c8.js"
import{g as _,s as x}from"./idb-a6d1a1ba.js"
import"./insertElementBefore-5eb6d41d.js"
import{i as T}from"./insertElementAfterBegin-cc62b549.js"
import"./closest-c1f1e24c.js"
import{c as N}from"./closestForm-b109e51b.js"
import{a as S}from"./all-042a202c.js"
import"./allthen-d63ed67c.js"
import"./closestTr-92de2689.js"
import"./lvlTests-34e8a3b0.js"
import"./loadDataTables-179f48a6.js"
import{i as E,v as M}from"./arena-eb642c62.js"
import"./changeMinMax-ca3a869d.js"
import"./assets-ac0df700.js"
import"./updateUrl-cbaa891e.js"
import{a as k}from"./arena-562288ee.js"
import{t as w}from"./thisTournament-7287c4a3.js"
import{c as C}from"./createSelect-82713053.js"
import{i as I}from"./isSelected-8486a0ee.js"
let L
function q(t,s){let e=String(s-1)
0===s&&(e="x"),n(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function D(t,s){return`<option value="${String(s.id)}"${I(t.slots.join(),s.slots.join())}>${s.name}</option>`}function J(i,n){const r=function(e){return L||(L=s(e,t())),L}(n)
e("",r),i.slots.forEach(a(q,r))}function A(t,s,e){var a;(a=s.target.value,k({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&J(e,t)})}function B(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&A(s,e,a)}function F(e,n,r){if(r.specials){const r=t({className:"flex"})
!function(e,n){if(e.sets.length>0){const r=C({innerHTML:e.sets.map(a(D,e.current_set)).join("")})
i(r,"change",a(B,e,n))
const o=t({className:"flex"})
s(o,r),T(n,o)}}(e,r),J(e.current_set,r),s(n,r)}}function G(t){return k({subcmd:"join",pvp_id:t})}function H(t){t.preventDefault()
const s=c(N(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${m}?${s}`}const P=t=>b(t.r.attributes.map(t=>["stat_"+h(g[t.id]),t.value])),V=t=>b(t.r.map(t=>[h(j[t.t]),t.n]))
async function z(t){t.preventDefault()
const s=w(),[e,a,i]=await S([o({subcmd:"loadequipped"}),G(s),_("fsh_arenaJoined")])
if(u(e.r)){const t={pvpId:s,joined:v,...V(e),...P(a)},n=i||[]
n.push(t),x("fsh_arenaJoined",n)}H(t)}function R(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function U(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${R("Specials",t.specials)}${R("Hell Forge",t.hellforge)}${R("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(e)),F(t.r,s,e),function(){const t=p('input[type="submit"]',l)
t&&(d(t,"click",H),f(t,"click",z))}()}}export default function(){$("arenaTypeTabs")?E():(!function(){const t=p('input[type="submit"]',l)
t&&f(t,"click",H)}(),M().catch(()=>({})).then(U))}
//# sourceMappingURL=arenaJoin-f0be3d6d.js.map
