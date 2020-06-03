import{N as t,k as e,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as p,p as d,L as f}from"./calfSystem-8b6534a5.js"
import"./isArray-3a70d0a8.js"
import"./dontPost-10e2d3b5.js"
import"./numberIsNaN-0a4ef3fd.js"
import{a as u}from"./addCommas-02f70763.js"
import"./setTipped-84380d19.js"
import"./currentGuildId-4a8535f4.js"
import"./intValue-bb1f2246.js"
import"./idb-abce8d8d.js"
import"./insertElementBefore-91801123.js"
import{i as v}from"./insertElementAfterBegin-982d3e85.js"
import"./closest-92f48152.js"
import{c as j}from"./closestForm-8f3065cc.js"
import"./all-a74f4d72.js"
import"./allthen-fc452f77.js"
import"./closestTr-6d4448c3.js"
import"./lvlTests-84d5bdc1.js"
import"./loadDataTables-388b4b0b.js"
import{a as b,i as g,v as $}from"./arena-80edef25.js"
import"./changeMinMax-9e86069e.js"
import"./assets-0ee61781.js"
import"./updateUrl-9a36f3fb.js"
import{c as h}from"./createSelect-d68a34c1.js"
import{i as x}from"./isSelected-b77eba77.js"
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
r(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${C("Specials",t.specials)}${C("Hell Forge",t.hellforge)}${C("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){p("arenaTypeTabs")?g():(!function(){const t=m('input[type="submit"]',d)
t&&f(t,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-086cf785.js.map
