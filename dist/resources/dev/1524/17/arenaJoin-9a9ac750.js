import{k as t,f as s,z as e,s as a,e as i,i as n,aG as r,b1 as o,a3 as c,J as f,N as m,p,b2 as l,L as u,M as d,R as v,aV as j,b3 as b,b4 as g,x as $}from"./calfSystem-1c103624.js"
import"./dontPost-f9ce543e.js"
import"./numberIsNaN-40c4542d.js"
import{t as h}from"./toLowerCase-9f60cfa4.js"
import{a as y}from"./addCommas-708246cb.js"
import"./setTipped-d80523c9.js"
import"./currentGuildId-b6fa52f3.js"
import"./intValue-f5e62e5b.js"
import{g as _,s as x}from"./idb-347cc2af.js"
import"./insertElementBefore-0e09c5df.js"
import{i as T}from"./insertElementAfterBegin-ed14bd7f.js"
import"./closest-a4273a71.js"
import{c as N}from"./closestForm-29ccb52c.js"
import{a as S}from"./all-bf5942c7.js"
import"./allthen-a3d432e8.js"
import"./closestTr-335afa5f.js"
import"./lvlTests-33617635.js"
import"./loadDataTables-fc57660c.js"
import{i as E,v as M}from"./arena-80fe9e89.js"
import"./changeMinMax-09a9a6ff.js"
import"./assets-80c6fb35.js"
import"./updateUrl-44ce0828.js"
import{a as k}from"./arena-408f147c.js"
import{t as w}from"./thisTournament-f2882448.js"
import{c as C}from"./createSelect-165ca97d.js"
import{i as I}from"./isSelected-beb941ff.js"
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
window.location=`${f}?${s}`}const P=t=>j(t.r.attributes.map(t=>["stat_"+h(g[t.id]),t.value])),V=t=>j(t.r.map(t=>[h(b[t.t]),t.n]))
async function z(t){t.preventDefault()
const s=w(),[e,a,i]=await S([o({subcmd:"loadequipped"}),G(s),_("fsh_arenaJoined")])
if(d(e.r)){const t={pvpId:s,joined:v,...V(e),...P(a)},n=i||[]
n.push(t),x("fsh_arenaJoined",n)}H(t)}function R(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function U(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${R("Specials",t.specials)}${R("Hell Forge",t.hellforge)}${R("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(e)),F(t.r,s,e),function(){const t=m('input[type="submit"]',p)
t&&(l(t,"click",H),u(t,"click",z))}()}}export default function(){$("arenaTypeTabs")?E():(!function(){const t=m('input[type="submit"]',p)
t&&u(t,"click",H)}(),M().catch(()=>({})).then(U))}
//# sourceMappingURL=arenaJoin-9a9ac750.js.map
