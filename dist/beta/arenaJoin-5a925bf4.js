import{X as e,l as t,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as f,R as p,ab as u,A as m,p as d,Q as v}from"./calfSystem-c91e004c.js"
import"./isArray-e79fe430.js"
import"./dontPost-2d911553.js"
import"./numberIsNaN-e812a421.js"
import"./all-143e11c3.js"
import"./allthen-38d09eed.js"
import"./lvlTests-28ffdeaa.js"
import"./loadDataTables-1e1a3f50.js"
import{a as g,i as j,v as $}from"./arena-cde5f9e6.js"
import"./changeMinMax-8030f196.js"
import"./assets-16c3fce3.js"
import"./updateUrl-efe16448.js"
import{c as b}from"./createSelect-25476fc7.js"
import{i as h}from"./isSelected-23025101.js"
function y(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let x
function N(e,t){let s=String(t-1)
0===t&&(s="x"),o(e,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(e,t){return`<option value="${String(t.id)}"${h(e.slots.join(),t.slots.join())}>${t.name}</option>`}function _(e,n){const r=function(e){return x||(x=s(e,t())),x}(n)
i("",r),e.slots.forEach(a(N,r))}function T(e,t,s){var i;(i=t.target.value,g({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&_(s,e)})}function M(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&T(t,s,i)}function A(e,i,o){if(o.specials){const o=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const o=b({innerHTML:e.sets.map(a(S,e.current_set)).join("")})
n(o,"change",a(M,e,i))
const c=t({className:"flex"})
s(c,o),r(i,c)}}(e,o),_(e.current_set,o),s(i,o)}}function C(e){e.preventDefault()
const t=l(e.target.closest("form").elements).filter(e=>"submit"!==e.type).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${f}?${t}`}function E(e,t){return`<div><div>${e}</div><div><img src="${c}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function H(e){const t=p("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=y(e.r)
o(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${E("Specials",e.specials)}${E("Hell Forge",e.hellforge)}${E("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),A(e.r,t,s)}}export default function(){m("arenaTypeTabs")?j():(!function(){const e=p('input[type="submit"]',d)
e&&v(e,"click",C)}(),$().then(H))}
//# sourceMappingURL=arenaJoin-5a925bf4.js.map
