import{W as t,k as e,f as s,B as i,u as a,e as n,l as r,i as o,aE as c,aG as l,N as p,Q as d,aa as u,z as f,p as m,P as v}from"./calfSystem-d587d232.js"
import"./isArray-5dbf2807.js"
import"./dontPost-bc1edacc.js"
import"./numberIsNaN-054e0c59.js"
import"./setTipped-3e31c084.js"
import"./all-39781966.js"
import"./allthen-ba816a7b.js"
import"./lvlTests-e4cca5f4.js"
import"./loadDataTables-043f4b86.js"
import{a as j,i as b,v as g}from"./arena-c1de1733.js"
import"./changeMinMax-2faa59b9.js"
import"./assets-80dc2218.js"
import"./updateUrl-2eab1829.js"
import{c as $}from"./createSelect-722a4f03.js"
import{i as h}from"./isSelected-dd944521.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let x
function N(t,e){let s=String(e-1)
0===e&&(s="x"),o(t,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(t,e){return`<option value="${String(e.id)}"${h(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return x||(x=s(t,e())),x}(n)
i("",r),t.slots.forEach(a(N,r))}function T(t,e,s){var i;(i=e.target.value,j({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&_(s,t)})}function E(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&T(e,s,i)}function M(t,i,o){if(o.specials){const o=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const o=$({innerHTML:t.sets.map(a(S,t.current_set)).join("")})
n(o,"change",a(E,t,i))
const c=e({className:"flex"})
s(c,o),r(i,c)}}(t,o),_(t.current_set,o),s(i,o)}}function P(t){t.preventDefault()
const e=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${p}?${e}`}function k(t,e){return`<div><div>${t}</div><div><img src="${c}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function q(t){const e=d("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
o(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${k("Specials",t.specials)}${k("Hell Forge",t.hellforge)}${k("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),M(t.r,e,s)}}export default function(){f("arenaTypeTabs")?b():(!function(){const t=d('input[type="submit"]',m)
t&&v(t,"click",P)}(),g().catch(()=>({})).then(q))}
//# sourceMappingURL=arenaJoin-93c0dc68.js.map
