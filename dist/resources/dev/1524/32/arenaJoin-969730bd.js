import{m as s,h as t,A as a,t as e,f as i,i as r,al as n,C as o,am as c,an as m,p as d,P as f,Q as p,U as l,ao as u,ap as v,aq as j,y as b}from"./calfSystem-19a5d332.js"
import{a as g,i as h,v as $}from"./arena-91ff9118.js"
import{h as _,i as T}from"./interceptSubmit-6d528c47.js"
import{a as x}from"./addCommas-b2b2ad82.js"
import{t as y}from"./thisTournament-be3f13bd.js"
import{c as S}from"./createSelect-e114f3f9.js"
import{i as N}from"./insertElementAfterBegin-635560b5.js"
import{i as C}from"./isSelected-64b9fca7.js"
import{a as E}from"./all-31b59575.js"
import{t as q}from"./toLowerCase-ace931b6.js"
import{g as I,s as M}from"./idb-faef0351.js"
import"./allthen-975bc488.js"
import"./closestTr-1e3a3aee.js"
import"./closest-331833f9.js"
import"./intValue-da5ad0eb.js"
import"./changeMinMax-b9ad340a.js"
import"./numberIsNaN-fecd7e6d.js"
import"./assets-3768dd31.js"
import"./lvlTests-5bd52df5.js"
import"./loadDataTables-e74270a0.js"
import"./currentGuildId-daa4c793.js"
import"./setTipped-808b71de.js"
import"./formToUrl-8a3e8d2a.js"
import"./insertElementBefore-aa28f497.js"
let A
function L(s,t){let a=String(t-1)
0===t&&(a="x"),r(s,`<img src="${n}arena/${a}.png" class="moveImg">`)}function w(s,t){return`<option value="${String(t.id)}"${C(s.slots.join(),t.slots.join())}>${t.name}</option>`}function B(i,r){const n=function(a){return A||(A=t(a,s())),A}(r)
a("",n),i.slots.forEach(e(L,n))}function D(s,t,a){var e;(e=t.target.value,g({subcmd:"usesetup",set_id:e})).then((t=>{t.s&&B(a,s)}))}function H(s,t,a){const e=s.sets.find((s=>s.id===Number(a.target.value)))
e&&D(t,a,e)}function J(a,r,n){if(n.specials){const n=s({className:"flex"})
!function(a,r){if(a.sets.length>0){const n=S({innerHTML:a.sets.map(e(w,a.current_set)).join("")})
i(n,"change",e(H,a,r))
const o=s({className:"flex"})
t(o,n),N(r,o)}}(a,n),B(a.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${a=t,String(Number(a))}.png"></div></div>`
var a}function U(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const a=function(s){const t=y()
return s.arenas.find((s=>s.id===t))}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${x(s.equip_level)}</div></div></div>`}(a)),J(s.r,t,a)}}function F(s){return g({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map((s=>[`stat_${q(j[s.id])}`,s.value]))),Q=s=>u(s.r.map((s=>[q(v[s.t]),s.n])))
async function V(s){s.preventDefault()
const t=y(),[a,e,i]=await E([c({subcmd:"loadequipped"}),F(t),I("fsh_arenaJoined")])
if(p(a.r)){const s={pvpId:t,joined:l,...Q(a),...G(e)},r=i||[]
r.push(s),M("fsh_arenaJoined",r)}_(s)}function k(){b("arenaTypeTabs")?h():(T(),$().catch((()=>({}))).then(U),m(d,"submit",_),f(d,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-969730bd.js.map
