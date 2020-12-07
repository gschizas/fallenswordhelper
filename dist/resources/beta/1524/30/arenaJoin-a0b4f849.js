import{Q as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-ebf4b17d.js"
import"./isArray-0709f57e.js"
import"./numberIsNaN-fa7d637d.js"
import{a as l}from"./addCommas-508f0c08.js"
import"./setTipped-c3fa7f51.js"
import"./insertElementBefore-1b96a575.js"
import"./currentGuildId-f7450bbe.js"
import"./intValue-e8157483.js"
import"./idb-b7d9067e.js"
import{i as f}from"./insertElementAfterBegin-2ad94795.js"
import"./formToUrl-c9020722.js"
import{i as d}from"./interceptSubmit-3d708b68.js"
import"./closest-3bdef2f3.js"
import"./closestTr-24d1e04a.js"
import"./lvlTests-66478ebb.js"
import"./all-36f83e81.js"
import"./loadDataTables-1e8f9239.js"
import"./allthen-7d061027.js"
import{a as p,i as u,v}from"./arena-daf5722c.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
import{c as j}from"./createSelect-63561806.js"
import{i as b}from"./isSelected-9a0f1276.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),f(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-a0b4f849.js.map
