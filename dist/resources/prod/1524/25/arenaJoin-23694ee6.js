import{Q as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-71b9378d.js"
import"./isArray-392e0aa1.js"
import"./numberIsNaN-929de7af.js"
import{a as l}from"./addCommas-bdfe3cd5.js"
import"./setTipped-64e874d6.js"
import"./insertElementBefore-286ff14c.js"
import"./currentGuildId-58e8f97e.js"
import"./intValue-65d3c36c.js"
import"./idb-97e2a44e.js"
import{i as d}from"./insertElementAfterBegin-1ff1031d.js"
import"./formToUrl-203c6ff2.js"
import{i as f}from"./interceptSubmit-c92da7b4.js"
import"./closest-8d8d60b3.js"
import"./closestTr-966a5985.js"
import"./lvlTests-e64d872a.js"
import"./all-3791b7d5.js"
import"./loadDataTables-3161a792.js"
import"./allthen-ad810e11.js"
import{a as p,i as u,v}from"./arena-8fbcb231.js"
import"./changeMinMax-502ef301.js"
import"./assets-73a041e8.js"
import{c as j}from"./createSelect-f1cb1eb2.js"
import{i as b}from"./isSelected-cb2669ec.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),d(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(f(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-23694ee6.js.map
