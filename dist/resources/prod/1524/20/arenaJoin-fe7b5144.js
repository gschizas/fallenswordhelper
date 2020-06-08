import{P as t,l as e,f as s,A as i,t as a,e as r,i as n,aD as o,C as c,y as l}from"./calfSystem-03970067.js"
import"./isArray-aff0783a.js"
import"./numberIsNaN-b19dc958.js"
import{a as m}from"./addCommas-623b93c1.js"
import"./setTipped-07001aa9.js"
import"./insertElementBefore-c9a36777.js"
import"./currentGuildId-cce6862b.js"
import"./intValue-0d844fc4.js"
import"./idb-3dad9172.js"
import{i as p}from"./insertElementAfterBegin-6c7a660f.js"
import"./formToUrl-906ab550.js"
import{i as f}from"./interceptSubmit-e3519b7d.js"
import"./closest-2eae4a84.js"
import"./closestTr-3d8fe8c0.js"
import"./lvlTests-494f9b6a.js"
import"./all-34a43a38.js"
import"./loadDataTables-a4c6ac52.js"
import"./allthen-0b78a490.js"
import{a as d,i as u,v}from"./arena-a46ac255.js"
import"./changeMinMax-1cc6fa24.js"
import"./assets-b2bca88f.js"
import{c as j}from"./createSelect-5f4036e6.js"
import{i as b}from"./isSelected-ee6a388c.js"
function g(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let $
function h(t,e){let s=String(e-1)
0===e&&(s="x"),n(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(t,e){return`<option value="${String(e.id)}"${b(t.slots.join(),e.slots.join())}>${e.name}</option>`}function y(t,r){const n=function(t){return $||($=s(t,e())),$}(r)
i("",n),t.slots.forEach(a(h,n))}function S(t,e,s){var i;(i=e.target.value,d({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&y(s,t)})}function T(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&S(e,s,i)}function N(t,i,n){if(n.specials){const n=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const n=j({innerHTML:t.sets.map(a(x,t.current_set)).join("")})
r(n,"change",a(T,t,i))
const o=e({className:"flex"})
s(o,n),p(i,o)}}(t,n),y(t.current_set,n),s(i,n)}}function _(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function E(t){const e=c("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=g(t.r)
n(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${_("Specials",t.specials)}${_("Hell Forge",t.hellforge)}${_("Epic",t.epic)}<div><div>Max Equip Level</div><div>${m(t.equip_level)}</div></div></div>`}(s)),N(t.r,e,s)}}export default function(){l("arenaTypeTabs")?u():(f(),v().catch(()=>({})).then(E))}
//# sourceMappingURL=arenaJoin-fe7b5144.js.map
