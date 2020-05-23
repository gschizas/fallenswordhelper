import{X as t,l as s,h as e,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as p,R as d,ab as f,A as u,p as m,Q as v}from"./calfSystem-e6a24264.js"
import"./isArray-3522bd29.js"
import"./dontPost-3c4fc141.js"
import"./numberIsNaN-c3be1434.js"
import"./setTipped-3dcc58a1.js"
import"./all-cd59a0c8.js"
import"./allthen-5b2ae140.js"
import"./lvlTests-4cd3827a.js"
import"./loadDataTables-c15b8735.js"
import{a as j,i as g,v as $}from"./arena-ec36d2fc.js"
import"./changeMinMax-919d8716.js"
import"./assets-10d3888a.js"
import"./updateUrl-ffa346d7.js"
import{c as b}from"./createSelect-fdb31c99.js"
import{i as h}from"./isSelected-f6990aa9.js"
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
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${f(t.equip_level)}</div></div></div>`}(e)),A(t.r,s,e)}}export default function(){u("arenaTypeTabs")?g():(!function(){const t=d('input[type="submit"]',m)
t&&v(t,"click",C)}(),$().catch(()=>({})).then(H))}
//# sourceMappingURL=arenaJoin-da438c63.js.map
