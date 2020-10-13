import{Q as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-964f4fc9.js"
import"./isArray-40d05c68.js"
import"./numberIsNaN-91041dcf.js"
import{a as f}from"./addCommas-8259c1a9.js"
import"./setTipped-e5305fe4.js"
import"./insertElementBefore-eada6f05.js"
import"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import"./idb-be8b4ca8.js"
import{i as l}from"./insertElementAfterBegin-15a62f25.js"
import"./formToUrl-d1b2482f.js"
import{i as p}from"./interceptSubmit-ddb18ec3.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-e4403fab.js"
import"./lvlTests-761b273d.js"
import"./all-7e2b4bf6.js"
import"./loadDataTables-85b3dcec.js"
import"./allthen-7191069a.js"
import{a as d,i as u,v}from"./arena-ea228694.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
import{c as j}from"./createSelect-bf226428.js"
import{i as b}from"./isSelected-1ef1e976.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,d({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),l(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${f(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-04f9d9b5.js.map
