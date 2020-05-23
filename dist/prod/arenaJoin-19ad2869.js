import{X as t,l as e,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as p,R as f,ab as u,A as d,p as m,Q as v}from"./calfSystem-4f7c0235.js"
import"./isArray-3ee7803f.js"
import"./dontPost-bb88e0ea.js"
import"./numberIsNaN-c62a2787.js"
import"./setTipped-c9246171.js"
import"./all-b95367c1.js"
import"./allthen-e8ef0afa.js"
import"./lvlTests-18ea534b.js"
import"./loadDataTables-61042690.js"
import{a as j,i as b,v as g}from"./arena-64491e1c.js"
import"./changeMinMax-5cdf8cdc.js"
import"./assets-3bbd1f11.js"
import"./updateUrl-d4e01d27.js"
import{c as $}from"./createSelect-a18d8e73.js"
import{i as h}from"./isSelected-59029484.js"
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
window.location=`${p}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=f("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){d("arenaTypeTabs")?b():(!function(){const t=f('input[type="submit"]',m)
t&&v(t,"click",C)}(),g().catch(()=>({})).then(H))}
//# sourceMappingURL=arenaJoin-19ad2869.js.map
