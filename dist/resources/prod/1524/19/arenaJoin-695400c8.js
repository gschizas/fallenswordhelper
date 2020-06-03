import{N as t,k as s,f as e,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as p,p as f,L as d}from"./calfSystem-6fc0cc1b.js"
import"./isArray-5986f48a.js"
import"./dontPost-7996c1bc.js"
import"./numberIsNaN-4ae9af58.js"
import{a as u}from"./addCommas-1fbf27a6.js"
import"./setTipped-1f5829a1.js"
import"./currentGuildId-33ea4168.js"
import"./intValue-3f75a919.js"
import"./idb-92d6a2b5.js"
import"./insertElementBefore-6f4b88f2.js"
import{i as v}from"./insertElementAfterBegin-b4303728.js"
import"./closest-958712aa.js"
import{c as j}from"./closestForm-b7a4ace7.js"
import"./all-31f0cef5.js"
import"./allthen-14038593.js"
import"./closestTr-7bb79481.js"
import"./lvlTests-bc5254a3.js"
import"./loadDataTables-2ed3a59d.js"
import{a as b,i as g,v as $}from"./arena-27737e44.js"
import"./changeMinMax-949d021e.js"
import"./assets-5177b563.js"
import"./updateUrl-5273596c.js"
import{c as h}from"./createSelect-5ab26d4f.js"
import{i as x}from"./isSelected-ac8aeb31.js"
function y(s){const e=Number(t("pvp_id"))
return s.arenas.find(t=>t.id===e)}let N
function S(t,s){let e=String(s-1)
0===s&&(e="x"),r(t,`<img src="${o}arena/${e}.png" class="moveImg">`)}function T(t,s){return`<option value="${String(s.id)}"${x(t.slots.join(),s.slots.join())}>${s.name}</option>`}function _(t,n){const r=function(t){return N||(N=e(t,s())),N}(n)
i("",r),t.slots.forEach(a(S,r))}function E(t,s,e){var i;(i=s.target.value,b({subcmd:"usesetup",set_id:i})).then(s=>{s.s&&_(e,t)})}function M(t,s,e){const i=t.sets.find(t=>t.id===Number(e.target.value))
i&&E(s,e,i)}function A(t,i,r){if(r.specials){const r=s({className:"flex"})
!function(t,i){if(t.sets.length>0){const r=h({innerHTML:t.sets.map(a(T,t.current_set)).join("")})
n(r,"change",a(M,t,i))
const o=s({className:"flex"})
e(o,r),v(i,o)}}(t,r),_(t.current_set,r),e(i,r)}}function B(t){t.preventDefault()
const s=c(j(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${s}`}function C(t,s){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function D(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=y(t.r)
r(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${C("Specials",t.specials)}${C("Hell Forge",t.hellforge)}${C("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(e)),A(t.r,s,e)}}export default function(){p("arenaTypeTabs")?g():(!function(){const t=m('input[type="submit"]',f)
t&&d(t,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-695400c8.js.map
