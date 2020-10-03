import{Q as t,m as s,h as e,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-a5fc99d4.js"
import"./isArray-fd538fb3.js"
import"./numberIsNaN-a6bcb044.js"
import{a as f}from"./addCommas-b567f740.js"
import"./setTipped-7d31935e.js"
import"./insertElementBefore-47c09359.js"
import"./currentGuildId-c73fd152.js"
import"./intValue-e4cdd281.js"
import"./idb-b13ab254.js"
import{i as l}from"./insertElementAfterBegin-247c27dd.js"
import"./formToUrl-287ebfb7.js"
import{i as d}from"./interceptSubmit-1ba9df73.js"
import"./closest-c2515a48.js"
import"./closestTr-a52072b1.js"
import"./lvlTests-8400fcaa.js"
import"./all-646b32fa.js"
import"./loadDataTables-c20a07f5.js"
import"./allthen-18c82be8.js"
import{a as p,i as u,v}from"./arena-1472f1f7.js"
import"./changeMinMax-bf9a1252.js"
import"./assets-d1187a02.js"
import{c as j}from"./createSelect-35c0af84.js"
import{i as b}from"./isSelected-09e19637.js"
function g(s){const e=Number(t("pvp_id"))
return s.arenas.find(t=>t.id===e)}let $
function h(t,s){let e=String(s-1)
0===s&&(e="x"),n(t,`<img src="${o}arena/${e}.png" class="moveImg">`)}function x(t,s){return`<option value="${String(s.id)}"${b(t.slots.join(),s.slots.join())}>${s.name}</option>`}function y(t,r){const n=function(t){return $||($=e(t,s())),$}(r)
i("",n),t.slots.forEach(a(h,n))}function S(t,s,e){var i;(i=s.target.value,p({subcmd:"usesetup",set_id:i})).then(s=>{s.s&&y(e,t)})}function T(t,s,e){const i=t.sets.find(t=>t.id===Number(e.target.value))
i&&S(s,e,i)}function N(t,i,n){if(n.specials){const n=s({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(a(x,t.current_set)).join("")})
r(n,"change",a(T,t,i))
const o=s({className:"flex"})
e(o,n),l(i,o)}}(t,n),y(t.current_set,n),e(i,n)}}function _(t,s){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function E(t){const s=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=g(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${f(t.equip_level)}</div></div></div>`}(e)),N(t.r,s,e)}}function A(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-da80a352.js.map
