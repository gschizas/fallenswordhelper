import{X as t,l as e,h as s,C as i,v as a,f as n,m as r,i as o,aF as c,aH as l,O as p,R as d,ab as u,A as f,p as m,Q as v}from"./calfSystem-99da704d.js"
import"./isArray-e5fc8b65.js"
import"./dontPost-af5ba7a2.js"
import"./numberIsNaN-9b6eee03.js"
import"./setTipped-4c5fce4d.js"
import"./all-cf5ebb4b.js"
import"./allthen-d5b32056.js"
import"./lvlTests-73991118.js"
import"./loadDataTables-65d61b54.js"
import{a as b,i as j,v as g}from"./arena-60c541a2.js"
import"./changeMinMax-ebcdced5.js"
import"./assets-90437058.js"
import"./updateUrl-68b3753f.js"
import{c as $}from"./createSelect-157c0b36.js"
import{i as h}from"./isSelected-092c140b.js"
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
window.location=`${p}?${e}`}function E(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function H(t){const e=d("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${E("Specials",t.specials)}${E("Hell Forge",t.hellforge)}${E("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){f("arenaTypeTabs")?j():(!function(){const t=d('input[type="submit"]',m)
t&&v(t,"click",C)}(),g().then(H))}
//# sourceMappingURL=arenaJoin-df1ebcef.js.map
