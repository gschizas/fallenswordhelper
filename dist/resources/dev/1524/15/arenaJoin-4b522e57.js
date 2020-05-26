import{k as t,f as s,z as e,s as a,e as i,i as n,aw as r,bf as o,ay as c,J as f,M as m,p,bg as l,K as u,a5 as d,L as v,Q as j,bh as b,bi as g,bj as $,a7 as h,x as y}from"./calfSystem-ee582533.js"
import"./dontPost-2a1b6847.js"
import"./numberIsNaN-c9f76e43.js"
import{t as _}from"./toLowerCase-6383ba3b.js"
import{a as x}from"./addCommas-f872a1dc.js"
import"./setTipped-a858a4c4.js"
import"./currentGuildId-0564d9a0.js"
import"./intValue-a842cf8a.js"
import"./insertElementBefore-7ed837be.js"
import{i as S}from"./insertElementAfterBegin-115e10be.js"
import{a as T}from"./all-b94d2d9d.js"
import"./allthen-f1914fd2.js"
import"./lvlTests-ac568200.js"
import"./loadDataTables-9af37330.js"
import{i as N,v as w}from"./arena-20295fe1.js"
import"./changeMinMax-174c484a.js"
import"./assets-3b767daf.js"
import"./updateUrl-2f469a7c.js"
import{a as E}from"./arena-833d6240.js"
import{t as M}from"./thisTournament-4e0a7b6b.js"
import{c as k}from"./createSelect-8ae33cf3.js"
import{i as C}from"./isSelected-49986668.js"
let I
function L(t,s){let e=String(s-1)
0===s&&(e="x"),n(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function q(t,s){return`<option value="${String(s.id)}"${C(t.slots.join(),s.slots.join())}>${s.name}</option>`}function D(i,n){const r=function(e){return I||(I=s(e,t())),I}(n)
e("",r),i.slots.forEach(a(L,r))}function J(t,s,e){var a;(a=s.target.value,E({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&D(e,t)})}function A(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&J(s,e,a)}function B(e,n,r){if(r.specials){const r=t({className:"flex"})
!function(e,n){if(e.sets.length>0){const r=k({innerHTML:e.sets.map(a(q,e.current_set)).join("")})
i(r,"change",a(A,e,n))
const o=t({className:"flex"})
s(o,r),S(n,o)}}(e,r),D(e.current_set,r),s(n,r)}}function H(t){return E({subcmd:"join",pvp_id:t})}function P(t){t.preventDefault()
const s=c(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${f}?${s}`}const z=t=>b(t.r.attributes.map(t=>["stat_"+_($[t.id]),t.value])),F=t=>b(t.r.map(t=>[_(g[t.t]),t.n]))
async function G(t){t.preventDefault()
const s=M(),[e,a,i]=await T([o({subcmd:"loadequipped"}),H(s),d("fsh_arenaJoined")])
if(v(e.r)){const t={pvpId:s,joined:j,...F(e),...z(a)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}P(t)}function K(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function Q(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=M()
return t.arenas.find(t=>t.id===s)}(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${K("Specials",t.specials)}${K("Hell Forge",t.hellforge)}${K("Epic",t.epic)}<div><div>Max Equip Level</div><div>${x(t.equip_level)}</div></div></div>`}(e)),B(t.r,s,e),function(){const t=m('input[type="submit"]',p)
t&&(l(t,"click",P),u(t,"click",G))}()}}export default function(){y("arenaTypeTabs")?N():(!function(){const t=m('input[type="submit"]',p)
t&&u(t,"click",P)}(),w().catch(()=>({})).then(Q))}
//# sourceMappingURL=arenaJoin-4b522e57.js.map
