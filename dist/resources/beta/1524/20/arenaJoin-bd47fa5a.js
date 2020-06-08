import{P as e,l as t,f as s,A as i,t as a,e as r,i as n,aD as o,C as c,y as l}from"./calfSystem-05554bae.js"
import"./isArray-9377ced3.js"
import"./numberIsNaN-d04aa9f7.js"
import{a as f}from"./addCommas-1723dd41.js"
import"./setTipped-227f970f.js"
import"./insertElementBefore-2ba0b318.js"
import"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./idb-862da886.js"
import{i as m}from"./insertElementAfterBegin-1acc7ec9.js"
import"./formToUrl-21fa7da6.js"
import{i as p}from"./interceptSubmit-399cf9b1.js"
import"./closest-a50421eb.js"
import"./closestTr-de7cfbf0.js"
import"./lvlTests-7c6c89cc.js"
import"./all-e13706ab.js"
import"./loadDataTables-bfb23461.js"
import"./allthen-feed7e5f.js"
import{a as d,i as u,v}from"./arena-094a06a2.js"
import"./changeMinMax-816e12f5.js"
import"./assets-f388842b.js"
import{c as j}from"./createSelect-c3e25d67.js"
import{i as b}from"./isSelected-64635cac.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,d({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),m(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${f(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}export default function(){l("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-bd47fa5a.js.map
