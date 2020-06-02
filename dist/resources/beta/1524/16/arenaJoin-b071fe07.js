import{N as t,k as e,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as p,p as f,L as d}from"./calfSystem-9554b525.js"
import"./isArray-7b017653.js"
import"./dontPost-03651e75.js"
import"./numberIsNaN-f35fe828.js"
import{a as u}from"./addCommas-f0a6ae56.js"
import"./setTipped-de144ccc.js"
import"./currentGuildId-7c7a6b86.js"
import"./intValue-bb872327.js"
import"./idb-e27acc21.js"
import"./insertElementBefore-5f238f78.js"
import{i as v}from"./insertElementAfterBegin-ecab1c25.js"
import"./closest-687f4f6c.js"
import{c as j}from"./closestForm-6e8f6fcc.js"
import"./all-e75535ec.js"
import"./allthen-04728b30.js"
import"./closestTr-a2db1fa0.js"
import"./lvlTests-848165a9.js"
import"./loadDataTables-993c57a0.js"
import{a as b,i as g,v as $}from"./arena-2829c0c7.js"
import"./changeMinMax-41147b63.js"
import"./assets-b7fd89f1.js"
import"./updateUrl-44a8065a.js"
import{c as h}from"./createSelect-778b3d82.js"
import{i as x}from"./isSelected-9995d8c2.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let N
function S(t,e){let s=String(e-1)
0===e&&(s="x"),r(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function T(t,e){return`<option value="${String(e.id)}"${x(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return N||(N=s(t,e())),N}(n)
i("",r),t.slots.forEach(a(S,r))}function E(t,e,s){var i;(i=e.target.value,b({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&_(s,t)})}function M(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&E(e,s,i)}function A(t,i,r){if(r.specials){const r=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const r=h({innerHTML:t.sets.map(a(T,t.current_set)).join("")})
n(r,"change",a(M,t,i))
const o=e({className:"flex"})
s(o,r),v(i,o)}}(t,r),_(t.current_set,r),s(i,r)}}function B(t){t.preventDefault()
const e=c(j(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${e}`}function C(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function D(t){const e=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
r(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${C("Specials",t.specials)}${C("Hell Forge",t.hellforge)}${C("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){p("arenaTypeTabs")?g():(!function(){const t=m('input[type="submit"]',f)
t&&d(t,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-b071fe07.js.map
