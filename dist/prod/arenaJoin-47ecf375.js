import{X as t,l as e,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as d,R as f,ab as p,A as u,p as m,Q as v}from"./calfSystem-72fdbe97.js"
import"./isArray-4303dc86.js"
import"./dontPost-ccc4e305.js"
import"./numberIsNaN-7d89f7bf.js"
import"./setTipped-dec59506.js"
import"./all-2c2dffdd.js"
import"./allthen-59a5f241.js"
import"./lvlTests-8d8b21ec.js"
import"./loadDataTables-4b1480e6.js"
import{a as j,i as b,v as g}from"./arena-3b6db177.js"
import"./changeMinMax-2a7730df.js"
import"./assets-45a33fc1.js"
import"./updateUrl-3f46424e.js"
import{c as $}from"./createSelect-a8d65a77.js"
import{i as h}from"./isSelected-2c686564.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let x
function N(t,e){let s=String(e-1)
0===e&&(s="x"),o(t,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(t,e){return`<option value="${String(e.id)}"${h(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return x||(x=s(t,e())),x}(n)
i("",r),t.slots.forEach(a(N,r))}function T(t,e,s){var i;(i=e.target.value,j({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&_(s,t)})}function M(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&T(e,s,i)}function A(t,i,o){if(o.specials){const o=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const o=$({innerHTML:t.sets.map(a(S,t.current_set)).join("")})
n(o,"change",a(M,t,i))
const c=e({className:"flex"})
s(c,o),r(i,c)}}(t,o),_(t.current_set,o),s(i,o)}}function C(t){t.preventDefault()
const e=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${d}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=f("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${p(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){u("arenaTypeTabs")?b():(!function(){const t=f('input[type="submit"]',m)
t&&v(t,"click",C)}(),g().then(H))}
//# sourceMappingURL=arenaJoin-47ecf375.js.map
