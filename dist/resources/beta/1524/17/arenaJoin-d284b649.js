import{N as t,k as e,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as d,p,L as f}from"./calfSystem-02ae8657.js"
import"./isArray-7fbdd896.js"
import"./dontPost-c73663bf.js"
import"./numberIsNaN-0b348b17.js"
import{a as u}from"./addCommas-b37f5163.js"
import"./setTipped-48769a0a.js"
import"./currentGuildId-a8ad9d1f.js"
import"./intValue-514fe585.js"
import"./idb-ac1635f3.js"
import"./insertElementBefore-35d3b41e.js"
import{i as v}from"./insertElementAfterBegin-680701c3.js"
import"./closest-8af29cf3.js"
import{c as j}from"./closestForm-2319dd5e.js"
import"./all-5d0e9d43.js"
import"./allthen-9e407c02.js"
import"./closestTr-cb33d92d.js"
import"./lvlTests-4669cf32.js"
import"./loadDataTables-267f1793.js"
import{a as b,i as g,v as $}from"./arena-ae18c5d4.js"
import"./changeMinMax-0e67e80c.js"
import"./assets-4e511750.js"
import"./updateUrl-c3fdab4c.js"
import{c as h}from"./createSelect-b89f8a42.js"
import{i as x}from"./isSelected-defb7cc8.js"
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
r(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${C("Specials",t.specials)}${C("Hell Forge",t.hellforge)}${C("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){d("arenaTypeTabs")?g():(!function(){const t=m('input[type="submit"]',p)
t&&f(t,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-d284b649.js.map
