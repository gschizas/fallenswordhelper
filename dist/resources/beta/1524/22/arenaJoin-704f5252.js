import{P as t,m as e,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-1b876afa.js"
import"./isArray-f02424dc.js"
import"./numberIsNaN-1ac731b5.js"
import{a as f}from"./addCommas-97b5462a.js"
import"./setTipped-aa3fcf43.js"
import"./insertElementBefore-f07a50c4.js"
import"./currentGuildId-000cb2c0.js"
import"./intValue-4dd66c70.js"
import"./idb-0681f9af.js"
import{i as l}from"./insertElementAfterBegin-476f3d65.js"
import"./formToUrl-cdc17fa4.js"
import{i as p}from"./interceptSubmit-8946388b.js"
import"./closest-f51e0443.js"
import"./closestTr-21ae2865.js"
import"./lvlTests-eea60268.js"
import"./all-8cfc3076.js"
import"./loadDataTables-beec4940.js"
import"./allthen-d1515ca1.js"
import{a as d,i as u,v}from"./arena-e030693e.js"
import"./changeMinMax-655aab04.js"
import"./assets-669be9a7.js"
import{c as j}from"./createSelect-bd42f675.js"
import{i as b}from"./isSelected-ffb8ab29.js"
function g(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let $
function h(t,e){let s=String(e-1)
0===e&&(s="x"),n(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(t,e){return`<option value="${String(e.id)}"${b(t.slots.join(),e.slots.join())}>${e.name}</option>`}function y(t,r){const n=function(t){return $||($=s(t,e())),$}(r)
i("",n),t.slots.forEach(a(h,n))}function S(t,e,s){var i;(i=e.target.value,d({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&y(s,t)})}function T(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&S(e,s,i)}function N(t,i,n){if(n.specials){const n=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(a(x,t.current_set)).join("")})
r(n,"change",a(T,t,i))
const o=e({className:"flex"})
s(o,n),l(i,o)}}(t,n),y(t.current_set,n),s(i,n)}}function _(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function E(t){const e=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=g(t.r)
n(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${f(t.equip_level)}</div></div></div>`}(s)),N(t.r,e,s)}}export default function(){m("arenaTypeTabs")?u():(p(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-704f5252.js.map
