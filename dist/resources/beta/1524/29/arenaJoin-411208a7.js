import{Q as e,m as t,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as f}from"./calfSystem-f9a27018.js"
import"./isArray-26644043.js"
import"./numberIsNaN-d1ebf732.js"
import{a as m}from"./addCommas-0aacc5f1.js"
import"./setTipped-56aeba85.js"
import"./insertElementBefore-7e0a7ce8.js"
import"./currentGuildId-a542fdb9.js"
import"./intValue-f94761c7.js"
import"./idb-5c501cd3.js"
import{i as l}from"./insertElementAfterBegin-04a4f560.js"
import"./formToUrl-b3369df3.js"
import{i as p}from"./interceptSubmit-039f8ca3.js"
import"./closest-14c30e26.js"
import"./closestTr-0d6f3b27.js"
import"./lvlTests-12363b02.js"
import"./all-01203f8c.js"
import"./loadDataTables-343ff96f.js"
import"./allthen-ca11bf0c.js"
import{a as d,i as u,v}from"./arena-736a208a.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
import{c as j}from"./createSelect-fe1ddbce.js"
import{i as b}from"./isSelected-ce1d62ee.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,d({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),l(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${m(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){f("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-411208a7.js.map
