import{X as t,l as e,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as f,R as d,ab as p,A as u,p as m,Q as v}from"./calfSystem-fb94ddf0.js"
import"./isArray-dc6b23b1.js"
import"./dontPost-9febdb8a.js"
import"./numberIsNaN-c4fdd2a1.js"
import"./setTipped-fee0b5e8.js"
import"./all-d850e92d.js"
import"./allthen-b2156df7.js"
import"./lvlTests-c7abb5dc.js"
import"./loadDataTables-795746bb.js"
import{a as b,i as j,v as g}from"./arena-a12b0fb0.js"
import"./changeMinMax-c6cc0bbc.js"
import"./assets-90b59f36.js"
import"./updateUrl-e00f8709.js"
import{c as $}from"./createSelect-f6a560f2.js"
import{i as h}from"./isSelected-25bedb0e.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let x
function N(t,e){let s=String(e-1)
0===e&&(s="x"),o(t,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(t,e){return`<option value="${String(e.id)}"${h(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return x||(x=s(t,e())),x}(n)
i("",r),t.slots.forEach(a(N,r))}function T(t,e,s){var i;(i=e.target.value,b({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&_(s,t)})}function M(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&T(e,s,i)}function A(t,i,o){if(o.specials){const o=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const o=$({innerHTML:t.sets.map(a(S,t.current_set)).join("")})
n(o,"change",a(M,t,i))
const c=e({className:"flex"})
s(c,o),r(i,c)}}(t,o),_(t.current_set,o),s(i,o)}}function C(t){t.preventDefault()
const e=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${f}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=d("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${p(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){u("arenaTypeTabs")?j():(!function(){const t=d('input[type="submit"]',m)
t&&v(t,"click",C)}(),g().catch(()=>({})).then(H))}
//# sourceMappingURL=arenaJoin-58c735fb.js.map
