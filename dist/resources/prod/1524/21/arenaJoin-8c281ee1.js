import{P as e,m as t,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-2741d97b.js"
import"./isArray-aedaa0a2.js"
import"./numberIsNaN-ed994c04.js"
import{a as l}from"./addCommas-ea41e3ec.js"
import"./setTipped-30e03bb5.js"
import"./insertElementBefore-1ac41a54.js"
import"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import"./idb-cb4fc9f9.js"
import{i as p}from"./insertElementAfterBegin-83c570c6.js"
import"./formToUrl-d134536c.js"
import{i as d}from"./interceptSubmit-60aabec1.js"
import"./closest-5ba11a5a.js"
import"./closestTr-a85aebac.js"
import"./lvlTests-8bc3afe6.js"
import"./all-75af160a.js"
import"./loadDataTables-b99ba7c2.js"
import"./allthen-dcd66ca6.js"
import{a as f,i as u,v}from"./arena-988be143.js"
import"./changeMinMax-f9710921.js"
import"./assets-a336e07e.js"
import{c as j}from"./createSelect-078f4373.js"
import{i as b}from"./isSelected-be4c873a.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,f({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),p(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}export default function(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-8c281ee1.js.map
