import{P as e,m as t,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as d}from"./calfSystem-019de1cf.js"
import"./isArray-de90de98.js"
import"./numberIsNaN-cb2409eb.js"
import{a as m}from"./addCommas-8cd7d96d.js"
import"./setTipped-d4d554a0.js"
import"./insertElementBefore-f1fdb06b.js"
import"./currentGuildId-a399e8da.js"
import"./intValue-0e84cdad.js"
import"./idb-1bb3cee2.js"
import{i as l}from"./insertElementAfterBegin-da8071d0.js"
import"./formToUrl-91be1404.js"
import{i as f}from"./interceptSubmit-7b40d68d.js"
import"./closest-5107b89a.js"
import"./closestTr-ad14f34f.js"
import"./lvlTests-8fcd92f9.js"
import"./all-9da52a21.js"
import"./loadDataTables-be4d5e60.js"
import"./allthen-f8a5c187.js"
import{a as p,i as u,v}from"./arena-fbc47ae5.js"
import"./changeMinMax-29622459.js"
import"./assets-06ec229a.js"
import{c as j}from"./createSelect-383f96b4.js"
import{i as b}from"./isSelected-04794fec.js"
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
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${m(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}export default function(){d("arenaTypeTabs")?u():(f(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-df9990ef.js.map
