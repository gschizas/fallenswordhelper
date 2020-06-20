import{P as e,m as t,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-89b939c8.js"
import"./isArray-75e85160.js"
import"./numberIsNaN-913aebac.js"
import{a as d}from"./addCommas-37030ade.js"
import"./setTipped-3dfbd3ed.js"
import"./insertElementBefore-08d48547.js"
import"./currentGuildId-ae8f3699.js"
import"./intValue-cd93b930.js"
import"./idb-9be3057e.js"
import{i as l}from"./insertElementAfterBegin-402b077c.js"
import"./formToUrl-ae369bee.js"
import{i as p}from"./interceptSubmit-57a8cf95.js"
import"./closest-e1837d80.js"
import"./closestTr-e9bb4ace.js"
import"./lvlTests-48f62cec.js"
import"./all-ca702d79.js"
import"./loadDataTables-bc7f4ac3.js"
import"./allthen-b213c39d.js"
import{a as f,i as u,v}from"./arena-07fddd53.js"
import"./changeMinMax-94960d14.js"
import"./assets-a288e2fc.js"
import{c as j}from"./createSelect-14b7b2e6.js"
import{i as b}from"./isSelected-168cd615.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,a){const n=function(e){return $||($=s(e,t())),$}(a)
i("",n),e.slots.forEach(r(h,n))}function S(e,t,s){var i;(i=t.target.value,f({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(r(x,e.current_set)).join("")})
a(n,"change",r(T,e,i))
const o=t({className:"flex"})
s(o,n),l(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${d(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}export default function(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-00a8e6a0.js.map
