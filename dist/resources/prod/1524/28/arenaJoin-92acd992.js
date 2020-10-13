import{Q as e,m as t,h as s,A as i,t as a,f as r,i as n,aD as o,C as c,y as m}from"./calfSystem-a5da5210.js"
import"./isArray-40d05c68.js"
import"./numberIsNaN-91041dcf.js"
import{a as l}from"./addCommas-8259c1a9.js"
import"./setTipped-e5305fe4.js"
import"./insertElementBefore-eada6f05.js"
import"./currentGuildId-87288eec.js"
import"./intValue-f4d85578.js"
import"./idb-2c141566.js"
import{i as f}from"./insertElementAfterBegin-619f3b2f.js"
import"./formToUrl-6151060b.js"
import{i as d}from"./interceptSubmit-9e7a42eb.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-dd293153.js"
import"./lvlTests-d209aef3.js"
import"./all-7e2b4bf6.js"
import"./loadDataTables-a4c2d910.js"
import"./allthen-7191069a.js"
import{a as p,i as u,v}from"./arena-725678dd.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
import{c as j}from"./createSelect-ea56724f.js"
import{i as g}from"./isSelected-1ef1e976.js"
function b(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${g(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,p({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&y(s,e)})}function T(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=j({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),f(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=b(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${l(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){m("arenaTypeTabs")?u():(d(),v().catch(()=>({})).then(E))}export default A
//# sourceMappingURL=arenaJoin-92acd992.js.map
