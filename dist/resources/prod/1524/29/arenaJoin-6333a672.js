import{Q as e,m as t,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-57628ebe.js"
import"./isArray-26644043.js"
import"./numberIsNaN-d1ebf732.js"
import{a as f}from"./addCommas-0aacc5f1.js"
import"./setTipped-56aeba85.js"
import"./insertElementBefore-7e0a7ce8.js"
import"./currentGuildId-909a3fed.js"
import"./intValue-f94761c7.js"
import"./idb-5c863a6f.js"
import{i as l}from"./insertElementAfterBegin-8d3bd0da.js"
import"./formToUrl-ed8f6bd0.js"
import{i as d}from"./interceptSubmit-42e92144.js"
import"./closest-14c30e26.js"
import"./closestTr-125f03b2.js"
import"./lvlTests-e021fa96.js"
import"./all-01203f8c.js"
import"./loadDataTables-5af23ae2.js"
import"./allthen-ca11bf0c.js"
import{a as p,i as u,v}from"./arena-fd160b91.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
import{c as j}from"./createSelect-651b1813.js"
import{i as b}from"./isSelected-ce1d62ee.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),l(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${f(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-6333a672.js.map
