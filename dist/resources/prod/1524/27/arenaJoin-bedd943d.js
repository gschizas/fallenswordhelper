import{Q as e,m as t,h as s,A as i,t as a,f as r,i as n,aE as o,C as c,y as d}from"./calfSystem-3bdf319e.js"
import"./isArray-5d976413.js"
import"./numberIsNaN-871eca26.js"
import{a as m}from"./addCommas-e12eda5f.js"
import"./setTipped-141d3404.js"
import"./insertElementBefore-543d9ef0.js"
import"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import"./idb-31fb041e.js"
import{i as l}from"./insertElementAfterBegin-788dea7e.js"
import"./formToUrl-6c242df5.js"
import{i as f}from"./interceptSubmit-5104e4a5.js"
import"./closest-79b9364e.js"
import"./closestTr-51fa459d.js"
import"./lvlTests-2f55a016.js"
import"./all-e81516b4.js"
import"./loadDataTables-d66e2d23.js"
import"./allthen-dd6cac31.js"
import{a as p,i as u,v}from"./arena-ee0b35a3.js"
import"./changeMinMax-5e8dfd5c.js"
import"./assets-9f475ea8.js"
import{c as j}from"./createSelect-9d596900.js"
import{i as g}from"./isSelected-8eae2aea.js"
function b(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${g(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),l(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=b(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${m(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){d("arenaTypeTabs")?u():(f(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-bedd943d.js.map
