import{N as t,k as e,f as s,z as i,s as a,e as n,i as r,aB as o,aD as c,J as l,M as m,x as p,p as d,L as f}from"./calfSystem-57340987.js"
import"./isArray-f770eec0.js"
import"./dontPost-e24d8962.js"
import"./numberIsNaN-9e712afc.js"
import{a as u}from"./addCommas-8127b6a1.js"
import"./setTipped-bbda3ddd.js"
import"./currentGuildId-fd144a5c.js"
import"./intValue-e99f58ac.js"
import"./idb-c55e2904.js"
import"./insertElementBefore-69bb0e1f.js"
import{i as v}from"./insertElementAfterBegin-d5ad26ea.js"
import"./closest-f4291115.js"
import{c as j}from"./closestForm-3a23bbf2.js"
import"./all-82b4870b.js"
import"./allthen-298d46c2.js"
import"./closestTr-ac8ec42f.js"
import"./lvlTests-e8a45565.js"
import"./loadDataTables-72045bea.js"
import{a as b,i as g,v as $}from"./arena-64d76230.js"
import"./changeMinMax-c6b97c52.js"
import"./assets-7a78599a.js"
import"./updateUrl-705783d5.js"
import{c as h}from"./createSelect-bb6ddc00.js"
import{i as x}from"./isSelected-fb089e99.js"
function y(e){const s=Number(t("pvp_id"))
return e.arenas.find(t=>t.id===s)}let N
function S(t,e){let s=String(e-1)
0===e&&(s="x"),r(t,`<img src="${o}arena/${s}.png" class="moveImg">`)}function T(t,e){return`<option value="${String(e.id)}"${x(t.slots.join(),e.slots.join())}>${e.name}</option>`}function _(t,n){const r=function(t){return N||(N=s(t,e())),N}(n)
i("",r),t.slots.forEach(a(S,r))}function E(t,e,s){var i;(i=e.target.value,b({subcmd:"usesetup",set_id:i})).then(e=>{e.s&&_(s,t)})}function M(t,e,s){const i=t.sets.find(t=>t.id===Number(s.target.value))
i&&E(e,s,i)}function A(t,i,r){if(r.specials){const r=e({className:"flex"})
!function(t,i){if(t.sets.length>0){const r=h({innerHTML:t.sets.map(a(T,t.current_set)).join("")})
n(r,"change",a(M,t,i))
const o=e({className:"flex"})
s(o,r),v(i,o)}}(t,r),_(t.current_set,r),s(i,r)}}function B(t){t.preventDefault()
const e=c(j(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${e}`}function C(t,e){return`<div><div>${t}</div><div><img src="${o}ui/arena/specials_${s=e,String(Number(s))}.png"></div></div>`
var s}function D(t){const e=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&e){e.setAttribute("align","center")
const s=y(t.r)
r(e,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${C("Specials",t.specials)}${C("Hell Forge",t.hellforge)}${C("Epic",t.epic)}<div><div>Max Equip Level</div><div>${u(t.equip_level)}</div></div></div>`}(s)),A(t.r,e,s)}}export default function(){p("arenaTypeTabs")?g():(!function(){const t=m('input[type="submit"]',d)
t&&f(t,"click",B)}(),$().catch(()=>({})).then(D))}
//# sourceMappingURL=arenaJoin-5bbdf211.js.map
