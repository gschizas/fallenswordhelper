import{X as t,l as e,h as s,C as a,v as i,f as n,m as r,i as o,aF as c,aH as l,O as p,R as u,ab as f,A as m,p as d,Q as v}from"./calfSystem-3956a623.js"
import"./isArray-03eca71a.js"
import"./dontPost-e1ef8cf2.js"
import"./numberIsNaN-c09ad043.js"
import"./all-0781ab5a.js"
import"./allthen-a3d20eb3.js"
import"./lvlTests-8590fea4.js"
import"./loadDataTables-165302ba.js"
import{a as b,i as g,v as j}from"./arena-ba89a85a.js"
import"./changeMinMax-1c2bfa85.js"
import"./assets-0e690637.js"
import"./updateUrl-4773abd4.js"
import{c as $}from"./createSelect-b7354117.js"
import{i as h}from"./isSelected-fbb99d64.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let x
function N(t,e){let s=String(e-1)
0===e&&(s="x"),o(t,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(t,e){return`<option value="${String(e.id)}"${h(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return x||(x=s(t,e())),x}(n)
a("",r),t.slots.forEach(i(N,r))}function T(t,e,s){var a;(a=e.target.value,b({subcmd:"usesetup",set_id:a})).then(e=>{e.s&&_(s,t)})}function M(t,e,s){const a=t.sets.find(t=>t.id===Number(s.target.value))
a&&T(e,s,a)}function A(t,a,o){if(o.specials){const o=e({className:"flex"})
!function(t,a){if(t.sets.length>0){const o=$({innerHTML:t.sets.map(i(S,t.current_set)).join("")})
n(o,"change",i(M,t,a))
const c=e({className:"flex"})
s(c,o),r(a,c)}}(t,o),_(t.current_set,o),s(a,o)}}function C(t){t.preventDefault()
const e=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${p}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=u("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${f(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){m("arenaTypeTabs")?g():(!function(){const t=u('input[type="submit"]',d)
t&&v(t,"click",C)}(),j().then(H))}
//# sourceMappingURL=arenaJoin-507e52eb.js.map
