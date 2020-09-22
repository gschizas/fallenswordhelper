import{P as t,m as e,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-ec854151.js"
import"./isArray-2519a795.js"
import"./numberIsNaN-00e0daaf.js"
import{a as d}from"./addCommas-6d131931.js"
import"./setTipped-5c176332.js"
import"./insertElementBefore-2ad05963.js"
import"./currentGuildId-1299fc05.js"
import"./intValue-44683b42.js"
import"./idb-72ad0068.js"
import{i as l}from"./insertElementAfterBegin-a7242446.js"
import"./formToUrl-48dc238d.js"
import{i as p}from"./interceptSubmit-99d78c5d.js"
import"./closest-d8e60c46.js"
import"./closestTr-25a90971.js"
import"./lvlTests-2fd3e201.js"
import"./all-e4fd8fad.js"
import"./loadDataTables-27ca2fa3.js"
import"./allthen-c22b3f9e.js"
import{a as f,i as u,v}from"./arena-c579a56f.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
import{c as j}from"./createSelect-952bde08.js"
import{i as g}from"./isSelected-e7754896.js"
function b(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let $
function h(t,e){let s=String(e-1)
0===e&&(s="x"),n(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(t,e){return`<option value="${String(e.id)}"${g(t.slots.join(),e.slots.join())}>${e.name}</option>`}function y(t,a){const n=function(t){return $||($=s(t,e())),$}(a)
i("",n),t.slots.forEach(r(h,n))}function S(t,e,s){var i;(i=e.target.value,f({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&y(s,t)})}function T(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&S(e,s,i)}function N(t,i,n){if(n.specials){const n=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(r(x,t.current_set)).join("")})
a(n,"change",r(T,t,i))
const o=e({className:"flex"})
s(o,n),l(i,o)}}(t,n),y(t.current_set,n),s(i,n)}}function _(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function E(t){const e=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=b(t.r)
n(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${d(t.equip_level)}</div></div></div>`}(s)),N(t.r,e,s)}}function A(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-b313e972.js.map
