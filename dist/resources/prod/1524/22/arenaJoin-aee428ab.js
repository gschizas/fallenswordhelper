import{P as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-d04e4be4.js"
import"./isArray-7fc52818.js"
import"./numberIsNaN-eb16384c.js"
import{a as l}from"./addCommas-d05e6f0b.js"
import"./setTipped-e830c5fe.js"
import"./insertElementBefore-cc030078.js"
import"./currentGuildId-9ae9b1fe.js"
import"./intValue-ec94378e.js"
import"./idb-0492f5ed.js"
import{i as f}from"./insertElementAfterBegin-afd674a5.js"
import"./formToUrl-3c899008.js"
import{i as p}from"./interceptSubmit-24b16034.js"
import"./closest-137378db.js"
import"./closestTr-81820d98.js"
import"./lvlTests-b64fe2f8.js"
import"./all-f846cd86.js"
import"./loadDataTables-b5e9e533.js"
import"./allthen-086eab8e.js"
import{a as d,i as u,v}from"./arena-300c8055.js"
import"./changeMinMax-318fdbb8.js"
import"./assets-f1f94362.js"
import{c as j}from"./createSelect-9102253a.js"
import{i as b}from"./isSelected-19a0bf15.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,d({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),f(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}export default function(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-aee428ab.js.map
