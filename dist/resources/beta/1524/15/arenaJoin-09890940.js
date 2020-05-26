import{M as e,k as t,f as s,z as i,s as a,e as n,i as r,at as o,av as c,J as l,L as m,x as p,p as d,K as f}from"./calfSystem-1262535f.js"
import"./isArray-d09fe8d1.js"
import"./dontPost-780742ab.js"
import"./numberIsNaN-e4fe1516.js"
import{a as u}from"./addCommas-feda1131.js"
import"./setTipped-5b3efabc.js"
import"./currentGuildId-5a28bdba.js"
import"./intValue-c4584407.js"
import"./insertElementBefore-dcdbe7ae.js"
import{i as v}from"./insertElementAfterBegin-eeb77058.js"
import"./all-c00b9c25.js"
import"./allthen-2a364862.js"
import"./lvlTests-37a8796d.js"
import"./loadDataTables-96074b55.js"
import{a as j,i as b,v as g}from"./arena-7275428f.js"
import"./changeMinMax-d9269b1c.js"
import"./assets-2e0649eb.js"
import"./updateUrl-17430bd2.js"
import{c as $}from"./createSelect-a72ed217.js"
import{i as h}from"./isSelected-f4a48542.js"
function x(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let y
function N(e,t){let s=String(t-1)
0===t&&(s="x"),r(e,`<img src="${o}arena/${s}.png" class="moveImg">`)}function S(e,t){return`<option value="${String(t.id)}"${h(e.slots.join(),t.slots.join())}>${t.name}</option>`}function _(e,n){const r=function(e){return y||(y=s(e,t())),y}(n)
i("",r),e.slots.forEach(a(N,r))}function T(e,t,s){var i;(i=t.target.value,j({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&_(s,e)})}function E(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&T(t,s,i)}function M(e,i,r){if(r.specials){const r=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const r=$({innerHTML:e.sets.map(a(S,e.current_set)).join("")})
n(r,"change",a(E,e,i))
const o=t({className:"flex"})
s(o,r),v(i,o)}}(e,r),_(e.current_set,r),s(i,r)}}function A(e){e.preventDefault()
const t=c(e.target.closest("form").elements).filter(e=>"submit"!==e.type).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${l}?${t}`}function C(e,t){return`<div><div>${e}</div><div><img src="${o}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function I(e){const t=m("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=x(e.r)
r(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${C("Specials",e.specials)}${C("Hell Forge",e.hellforge)}${C("Epic",e.epic)}<div><div>Max Equip Level</div><div>${u(e.equip_level)}</div></div></div>`}(s)),M(e.r,t,s)}}export default function(){p("arenaTypeTabs")?b():(!function(){const e=m('input[type="submit"]',d)
e&&f(e,"click",A)}(),g().catch(()=>({})).then(I))}
//# sourceMappingURL=arenaJoin-09890940.js.map
