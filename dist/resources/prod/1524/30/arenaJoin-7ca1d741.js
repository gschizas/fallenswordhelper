import{Q as t,m as s,h as e,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-6459f18a.js"
import"./isArray-0709f57e.js"
import"./numberIsNaN-fa7d637d.js"
import{a as l}from"./addCommas-508f0c08.js"
import"./setTipped-c3fa7f51.js"
import"./insertElementBefore-1b96a575.js"
import"./currentGuildId-da0b8fda.js"
import"./intValue-e8157483.js"
import"./idb-737f325b.js"
import{i as d}from"./insertElementAfterBegin-d4bb1be4.js"
import"./formToUrl-33859dc7.js"
import{i as f}from"./interceptSubmit-2837655b.js"
import"./closest-3bdef2f3.js"
import"./closestTr-98dcae50.js"
import"./lvlTests-a02a80a7.js"
import"./all-36f83e81.js"
import"./loadDataTables-5d301d53.js"
import"./allthen-7d061027.js"
import{a as p,i as u,v}from"./arena-22cbe927.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
import{c as j}from"./createSelect-b8122a28.js"
import{i as b}from"./isSelected-9a0f1276.js"
function g(s){const e=Number(t("pvp_id"))
return s.arenas.find(t=>t.id===e)}let $
function h(t,s){let e=String(s-1)
0===s&&(e="x"),n(t,`<img src="${o}arena/${e}.png" class="moveImg">`)}function x(t,s){return`<option value="${String(s.id)}"${b(t.slots.join(),s.slots.join())}>${s.name}</option>`}function y(t,r){const n=function(t){return $||($=e(t,s())),$}(r)
i("",n),t.slots.forEach(a(h,n))}function S(t,s,e){var i;(i=s.target.value,p({subcmd:"usesetup",set_id:i})).then(s=>{s.s&&y(e,t)})}function T(t,s,e){const i=t.sets.find(t=>t.id===Number(e.target.value))
i&&S(s,e,i)}function N(t,i,n){if(n.specials){const n=s({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(a(x,t.current_set)).join("")})
r(n,"change",a(T,t,i))
const o=s({className:"flex"})
e(o,n),d(i,o)}}(t,n),y(t.current_set,n),e(i,n)}}function _(t,s){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function E(t){const s=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=g(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${l(t.equip_level)}</div></div></div>`}(e)),N(t.r,s,e)}}function A(){m("arenaTypeTabs")?u():(f(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-7ca1d741.js.map
