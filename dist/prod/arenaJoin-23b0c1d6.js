import{X as t,l as e,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as d,R as f,ab as p,A as u,p as m,Q as v}from"./calfSystem-d06402b1.js"
import"./isArray-ab78a040.js"
import"./dontPost-a6e48caa.js"
import"./numberIsNaN-cb3c2f58.js"
import"./setTipped-f9a342fb.js"
import"./all-0c4e78e9.js"
import"./allthen-5b4db3f0.js"
import"./lvlTests-1d8749df.js"
import"./loadDataTables-284dd27f.js"
import{a as b,i as j,v as g}from"./arena-cca762e1.js"
import"./changeMinMax-bf6b98e2.js"
import"./assets-2dfb5462.js"
import"./updateUrl-1b6ead9f.js"
import{c as $}from"./createSelect-f00c958d.js"
import{i as h}from"./isSelected-1093d2d9.js"
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
window.location=`${d}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=f("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${p(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){u("arenaTypeTabs")?j():(!function(){const t=f('input[type="submit"]',m)
t&&v(t,"click",C)}(),g().catch(()=>({})).then(H))}
//# sourceMappingURL=arenaJoin-23b0c1d6.js.map
