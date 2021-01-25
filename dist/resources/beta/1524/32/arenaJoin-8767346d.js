import{R as t,m as e,h as s,A as i,t as a,f as r,i as n,ak as o,C as c,y as d}from"./calfSystem-26bcf570.js"
import{a as m,i as l,v as f}from"./arena-8f211cd4.js"
import{i as p}from"./interceptSubmit-ac75d95b.js"
import{a as u}from"./addCommas-b2b2ad82.js"
import{c as v}from"./createSelect-b4bae863.js"
import{i as b}from"./insertElementAfterBegin-3ba6aba1.js"
import{i as j}from"./isSelected-64b9fca7.js"
import"./allthen-975bc488.js"
import"./all-31b59575.js"
import"./closestTr-51226dd2.js"
import"./closest-331833f9.js"
import"./idb-47b3fdf8.js"
import"./intValue-da5ad0eb.js"
import"./changeMinMax-b9ad340a.js"
import"./numberIsNaN-fecd7e6d.js"
import"./assets-3768dd31.js"
import"./lvlTests-e2dd36df.js"
import"./loadDataTables-dd48330f.js"
import"./currentGuildId-b9dbffa6.js"
import"./isArray-73a21c38.js"
import"./setTipped-808b71de.js"
import"./formToUrl-ea3e8186.js"
import"./insertElementBefore-aa28f497.js"
function g(e){const s=Number(t("pvp_id"))
return e.arenas.find((t=>t.id===s))}let $
function h(t,e){let s=String(e-1)
0===e&&(s="x"),n(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(t,e){return`<option value="${String(e.id)}"${j(t.slots.join(),e.slots.join())}>${e.name}</option>`}function y(t,r){const n=function(t){return $||($=s(t,e())),$}(r)
i("",n),t.slots.forEach(a(h,n))}function S(t,e,s){var i;(i=e.target.value,m({subcmd:"usesetup",set_id:i})).then((e=>{e.s&&y(s,t)}))}function T(t,e,s){const i=t.sets.find((t=>t.id===Number(s.target.value)))
i&&S(e,s,i)}function N(t,i,n){if(n.specials){const n=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=v({innerHTML:t.sets.map(a(x,t.current_set)).join("")})
r(n,"change",a(T,t,i))
const o=e({className:"flex"})
s(o,n),b(i,o)}}(t,n),y(t.current_set,n),s(i,n)}}function _(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function E(t){const e=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=g(t.r)
n(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),N(t.r,e,s)}}function A(){d("arenaTypeTabs")?l():(p(),f().catch((()=>({}))).then(E))}export default A
//# sourceMappingURL=arenaJoin-8767346d.js.map
