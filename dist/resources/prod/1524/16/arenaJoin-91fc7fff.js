import{N as e,k as t,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as f,p,L as d}from"./calfSystem-be09bdff.js"
import"./isArray-283d553a.js"
import"./dontPost-c1d489a0.js"
import"./numberIsNaN-47b99611.js"
import{a as u}from"./addCommas-f6a1bc8a.js"
import"./setTipped-014680cd.js"
import"./currentGuildId-a5ce9ac2.js"
import"./intValue-b1f59eab.js"
import"./idb-a63ec135.js"
import"./insertElementBefore-1fd7bda7.js"
import{i as v}from"./insertElementAfterBegin-c450d776.js"
import"./closest-81c3e392.js"
import{c as j}from"./closestForm-15394b22.js"
import"./all-e1939fb2.js"
import"./allthen-47fe90e5.js"
import"./closestTr-973c6982.js"
import"./lvlTests-90ef33ff.js"
import"./loadDataTables-e799ca6a.js"
import{a as b,i as g,v as $}from"./arena-b82d1aef.js"
import"./changeMinMax-8257012f.js"
import"./assets-70e16598.js"
import"./updateUrl-9030af0e.js"
import{c as h}from"./createSelect-c7722083.js"
import{i as x}from"./isSelected-efd58bbd.js"
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
r(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${C("Specials",e.specials)}${C("Hell Forge",e.hellforge)}${C("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),A(e.r,t,s)}}export default function(){f("arenaTypeTabs")?g():(!function(){const e=m('input[type="submit"]',p)
e&&d(e,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-91fc7fff.js.map
