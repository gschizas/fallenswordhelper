import{X as t,l as s,h as e,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as p,R as d,ab as u,A as m,p as f,Q as v}from"./calfSystem-70c0e373.js"
import"./isArray-4a5a2451.js"
import"./dontPost-d8e94133.js"
import"./numberIsNaN-a9336482.js"
import"./setTipped-c21cfa84.js"
import"./all-0a0c0fc9.js"
import"./allthen-4e324603.js"
import"./lvlTests-2455dcd4.js"
import"./loadDataTables-514a87fb.js"
import{a as j,i as g,v as $}from"./arena-d67c51d9.js"
import"./changeMinMax-cc5be79c.js"
import"./assets-444d1aec.js"
import"./updateUrl-457b2445.js"
import{c as b}from"./createSelect-d3a46605.js"
import{i as h}from"./isSelected-291f2580.js"
function y(s){const e=Number(t("pvp_id"))
return s.arenas.find(t=>t.id===e)}let x
function N(t,s){let e=String(s-1)
0===s&&(e="x"),o(t,`<img src="${c}arena/${e}.png" class="moveImg">`)}function S(t,s){return`<option value="${String(s.id)}"${h(t.slots.join(),s.slots.join())}>${s.name}</option>`}function _(t,n){const r=function(t){return x||(x=e(t,s())),x}(n)
i("",r),t.slots.forEach(a(N,r))}function T(t,s,e){var i;(i=s.target.value,j({subcmd:"usesetup",set_id:i})).then(s=>{s.s&&_(e,t)})}function M(t,s,e){const i=t.sets.find(t=>t.id===Number(e.target.value))
i&&T(s,e,i)}function A(t,i,o){if(o.specials){const o=s({className:"flex"})
!function(t,i){if(t.sets.length>0){const o=b({innerHTML:t.sets.map(a(S,t.current_set)).join("")})
n(o,"change",a(M,t,i))
const c=s({className:"flex"})
e(c,o),r(i,c)}}(t,o),_(t.current_set,o),e(i,o)}}function C(t){t.preventDefault()
const s=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${p}?${s}`}function E(t,s){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function H(t){const s=d("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=y(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(e)),A(t.r,s,e)}}export default function(){m("arenaTypeTabs")?g():(!function(){const t=d('input[type="submit"]',f)
t&&v(t,"click",C)}(),$().catch(()=>({})).then(H))}
//# sourceMappingURL=arenaJoin-32c8a9f8.js.map
