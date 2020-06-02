import{N as e,k as t,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as p,p as f,L as d}from"./calfSystem-dec5e071.js"
import"./isArray-5ae0f2ae.js"
import"./dontPost-5930c5be.js"
import"./numberIsNaN-ea515379.js"
import{a as u}from"./addCommas-25733728.js"
import"./setTipped-80e36195.js"
import"./currentGuildId-694bbc76.js"
import"./intValue-8ad0a3ce.js"
import"./idb-8fe34e30.js"
import"./insertElementBefore-1d764477.js"
import{i as v}from"./insertElementAfterBegin-80cc8c86.js"
import"./closest-d88a3ae2.js"
import{c as j}from"./closestForm-b48fc8bc.js"
import"./all-74575e32.js"
import"./allthen-38e3a607.js"
import"./closestTr-37ea13b0.js"
import"./lvlTests-011061f4.js"
import"./loadDataTables-475e7aa4.js"
import{a as b,i as g,v as $}from"./arena-2f8cf255.js"
import"./changeMinMax-e936ffdd.js"
import"./assets-d1a83c4c.js"
import"./updateUrl-b1cce363.js"
import{c as h}from"./createSelect-eb09d534.js"
import{i as x}from"./isSelected-0f7bc2ee.js"
function y(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let N
function S(e,t){let s=String(t-1)
0===t&&(s="x"),r(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function T(e,t){return`<option value="${String(t.id)}"${x(e.slots.join(),t.slots.join())}>${t.name}</option>`}function _(e,n){const r=function(e){return N||(N=s(e,t())),N}(n)
i("",r),e.slots.forEach(a(S,r))}function E(e,t,s){var i;(i=t.target.value,b({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&_(s,e)})}function M(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&E(t,s,i)}function A(e,i,r){if(r.specials){const r=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const r=h({innerHTML:e.sets.map(a(T,e.current_set)).join("")})
n(r,"change",a(M,e,i))
const o=t({className:"flex"})
s(o,r),v(i,o)}}(e,r),_(e.current_set,r),s(i,r)}}function B(e){e.preventDefault()
const t=c(j(e.target).elements).filter(e=>"submit"!==e.type).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${l}?${t}`}function C(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function D(e){const t=m("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=y(e.r)
r(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${C("Specials",e.specials)}${C("Hell Forge",e.hellforge)}${C("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),A(e.r,t,s)}}export default function(){p("arenaTypeTabs")?g():(!function(){const e=m('input[type="submit"]',f)
e&&d(e,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-28fd7fcf.js.map
