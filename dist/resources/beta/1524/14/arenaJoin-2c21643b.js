import{W as e,k as t,f as s,B as i,u as a,e as n,l as r,i as o,aE as c,aG as l,N as p,Q as u,aa as d,z as m,p as f,P as v}from"./calfSystem-371c414c.js"
import"./isArray-f2e9e1ad.js"
import"./dontPost-0ae0f7ca.js"
import"./numberIsNaN-987e3021.js"
import"./setTipped-a7231de6.js"
import"./all-93023d41.js"
import"./allthen-691ee788.js"
import"./lvlTests-9314ee2e.js"
import"./loadDataTables-60dc642e.js"
import{a as j,i as g,v as $}from"./arena-c3478470.js"
import"./changeMinMax-d2b3357a.js"
import"./assets-810a369c.js"
import"./updateUrl-2acd4160.js"
import{c as b}from"./createSelect-a41538c7.js"
import{i as h}from"./isSelected-2f106be2.js"
function y(t){const s=Number(e("pvp_id"))
return t.arenas.find(e=>e.id===s)}let x
function N(e,t){let s=String(t-1)
0===t&&(s="x"),o(e,`<img src="${c}arena/${s}.png" class="moveImg">`)}function S(e,t){return`<option value="${String(t.id)}"${h(e.slots.join(),t.slots.join())}>${t.name}</option>`}function _(e,n){const r=function(e){return x||(x=s(e,t())),x}(n)
i("",r),e.slots.forEach(a(N,r))}function T(e,t,s){var i;(i=t.target.value,j({subcmd:"usesetup",set_id:i})).then(t=>{t.s&&_(s,e)})}function E(e,t,s){const i=e.sets.find(e=>e.id===Number(s.target.value))
i&&T(t,s,i)}function M(e,i,o){if(o.specials){const o=t({className:"flex"})
!function(e,i){if(e.sets.length>0){const o=b({innerHTML:e.sets.map(a(S,e.current_set)).join("")})
n(o,"change",a(E,e,i))
const c=t({className:"flex"})
s(c,o),r(i,c)}}(e,o),_(e.current_set,o),s(i,o)}}function P(e){e.preventDefault()
const t=l(e.target.closest("form").elements).filter(e=>"submit"!==e.type).map(e=>`${e.name}=${e.value}`).join("&")
window.location=`${p}?${t}`}function k(e,t){return`<div><div>${e}</div><div><img src="${c}ui/arena/specials_${s=t,String(Number(s))}.png"></div></div>`
var s}function q(e){const t=u("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&t){t.setAttribute("align","center")
const s=y(e.r)
o(t,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${k("Specials",e.specials)}${k("Hell Forge",e.hellforge)}${k("Epic",e.epic)}<div><div>Max Equip Level</div><div>${d(e.equip_level)}</div></div></div>`}(s)),M(e.r,t,s)}}export default function(){m("arenaTypeTabs")?g():(!function(){const e=u('input[type="submit"]',f)
e&&v(e,"click",P)}(),$().catch(()=>({})).then(q))}
//# sourceMappingURL=arenaJoin-2c21643b.js.map
