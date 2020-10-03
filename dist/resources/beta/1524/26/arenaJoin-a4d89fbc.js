import{Q as t,m as e,h as s,A as i,t as r,f as a,i as n,aD as o,C as c,y as m}from"./calfSystem-cf4d22a7.js"
import"./isArray-fd538fb3.js"
import"./numberIsNaN-a6bcb044.js"
import{a as l}from"./addCommas-b567f740.js"
import"./setTipped-7d31935e.js"
import"./insertElementBefore-47c09359.js"
import"./currentGuildId-5763962b.js"
import"./intValue-e4cdd281.js"
import"./idb-4798970d.js"
import{i as f}from"./insertElementAfterBegin-5b4956e9.js"
import"./formToUrl-31554e27.js"
import{i as p}from"./interceptSubmit-228afb85.js"
import"./closest-c2515a48.js"
import"./closestTr-c0ecc50a.js"
import"./lvlTests-a8a8e68e.js"
import"./all-646b32fa.js"
import"./loadDataTables-c2f9706f.js"
import"./allthen-18c82be8.js"
import{a as d,i as u,v}from"./arena-512da856.js"
import"./changeMinMax-bf9a1252.js"
import"./assets-d1187a02.js"
import{c as j}from"./createSelect-cb127fb6.js"
import{i as b}from"./isSelected-09e19637.js"
function g(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let $
function h(t,e){let s=String(e-1)
0===e&&(s="x"),n(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(t,e){return`<option value="${String(e.id)}"${b(t.slots.join(),e.slots.join())}>${e.name}</option>`}function y(t,a){const n=function(t){return $||($=s(t,e())),$}(a)
i("",n),t.slots.forEach(r(h,n))}function S(t,e,s){var i;(i=e.target.value,d({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&y(s,t)})}function T(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&S(e,s,i)}function N(t,i,n){if(n.specials){const n=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(r(x,t.current_set)).join("")})
a(n,"change",r(T,t,i))
const o=e({className:"flex"})
s(o,n),f(i,o)}}(t,n),y(t.current_set,n),s(i,n)}}function _(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function E(t){const e=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=g(t.r)
n(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${l(t.equip_level)}</div></div></div>`}(s)),N(t.r,e,s)}}function A(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-a4d89fbc.js.map
