import{Q as e,m as t,h as s,A as i,t as a,f as r,i as n,aj as o,C as c,y as d}from"./calfSystem-47fc08ae.js"
import{a as m,i as f,v as l}from"./arena-75f10570.js"
import{i as p}from"./interceptSubmit-3f0967f1.js"
import{a as u}from"./addCommas-02eed580.js"
import{c as v}from"./createSelect-0a182dfb.js"
import{i as j}from"./insertElementAfterBegin-dabff013.js"
import{i as b}from"./isSelected-7a00c567.js"
import"./allthen-3a9178b8.js"
import"./all-6dfbd6b8.js"
import"./closestTr-d8faa348.js"
import"./closest-77701dcf.js"
import"./idb-b72d80f0.js"
import"./intValue-e7ef611d.js"
import"./changeMinMax-9086d4c2.js"
import"./numberIsNaN-53300e34.js"
import"./assets-ad350aab.js"
import"./lvlTests-c6e367ee.js"
import"./loadDataTables-65daaaab.js"
import"./currentGuildId-72bd2a1a.js"
import"./isArray-551d6583.js"
import"./setTipped-777d443c.js"
import"./formToUrl-e4e5b8f2.js"
import"./insertElementBefore-43970b1f.js"
function g(t){const s=Number(e("pvp_id"))
return t.arenas.find((e=>e.id===s))}let $
function h(e,t){let s=String(t-1)
0===t&&(s="x"),n(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function x(e,t){return`<option value="${String(t.id)}"${b(e.slots.join(),t.slots.join())}>${t.name}</option>`}function y(e,r){const n=function(e){return $||($=s(e,t())),$}(r)
i("",n),e.slots.forEach(a(h,n))}function S(e,t,s){var i;(i=t.target.value,m({subcmd:"usesetup",set_id:i})).then((t=>{t.s&&y(s,e)}))}function T(e,t,s){const i=e.sets.find((e=>e.id===Number(s.target.value)))
i&&S(t,s,i)}function N(e,i,n){if(n.specials){const n=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const n=v({innerHTML:e.sets.map(a(x,e.current_set)).join("")})
r(n,"change",a(T,e,i))
const o=t({className:"flex"})
s(o,n),j(i,o)}}(e,n),y(e.current_set,n),s(i,n)}}function _(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function E(e){const t=c("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=g(e.r)
n(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${_("Specials",e.specials)}${_("Hell Forge",e.hellforge)}${_("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),N(e.r,t,s)}}function A(){d("arenaTypeTabs")?f():(p(),l().catch((()=>({}))).then(E))}export default A
//# sourceMappingURL=arenaJoin-fd555d19.js.map
