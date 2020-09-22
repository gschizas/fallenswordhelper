import{P as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-019a589c.js"
import"./isArray-2519a795.js"
import"./numberIsNaN-00e0daaf.js"
import{a as l}from"./addCommas-6d131931.js"
import"./setTipped-5c176332.js"
import"./insertElementBefore-2ad05963.js"
import"./currentGuildId-29e13ecc.js"
import"./intValue-44683b42.js"
import"./idb-6718e849.js"
import{i as f}from"./insertElementAfterBegin-712445fc.js"
import"./formToUrl-c83543e1.js"
import{i as d}from"./interceptSubmit-ae6fd26f.js"
import"./closest-d8e60c46.js"
import"./closestTr-39693be5.js"
import"./lvlTests-9864f8f0.js"
import"./all-e4fd8fad.js"
import"./loadDataTables-c28bafc7.js"
import"./allthen-c22b3f9e.js"
import{a as p,i as u,v}from"./arena-e33fec1f.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
import{c as j}from"./createSelect-27fc4dcd.js"
import{i as g}from"./isSelected-e7754896.js"
function b(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${g(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),f(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=b(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-73a2065b.js.map
