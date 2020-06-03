import{N as e,k as t,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as f,p,L as d}from"./calfSystem-4197cc22.js"
import"./isArray-32682e84.js"
import"./dontPost-c8e8377e.js"
import"./numberIsNaN-1db4e673.js"
import{a as u}from"./addCommas-519d90bf.js"
import"./setTipped-c0d7f504.js"
import"./currentGuildId-2aaee988.js"
import"./intValue-202eff7d.js"
import"./idb-f3252f63.js"
import"./insertElementBefore-fe70cd72.js"
import{i as v}from"./insertElementAfterBegin-aa3c6e65.js"
import"./closest-5218baf6.js"
import{c as j}from"./closestForm-3cd1f491.js"
import"./all-5f4a0555.js"
import"./allthen-634cf4ca.js"
import"./closestTr-3be0023c.js"
import"./lvlTests-ef15725a.js"
import"./loadDataTables-cad389d5.js"
import{a as g,i as $,v as b}from"./arena-9f238041.js"
import"./changeMinMax-75b72872.js"
import"./assets-fe42a5fe.js"
import"./updateUrl-3c221329.js"
import{c as h}from"./createSelect-1e40a4e6.js"
import{i as x}from"./isSelected-71dd7c7c.js"
function y(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let N
function S(e,t){let s=String(t-1)
0===t&&(s="x"),r(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function T(e,t){return`<option value="${String(t.id)}"${x(e.slots.join(),t.slots.join())}>${t.name}</option>`}function _(e,n){const r=function(e){return N||(N=s(e,t())),N}(n)
i("",r),e.slots.forEach(a(S,r))}function E(e,t,s){var i;(i=t.target.value,g({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&_(s,e)})}function M(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
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
r(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${C("Specials",e.specials)}${C("Hell Forge",e.hellforge)}${C("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),A(e.r,t,s)}}export default function(){f("arenaTypeTabs")?$():(!function(){const e=m('input[type="submit"]',p)
e&&d(e,"click",B)}(),b().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-6e2a4bb9.js.map
