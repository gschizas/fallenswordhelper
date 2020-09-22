import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,b0 as c,b1 as m,p as d,O as p,P as f,T as l,aU as u,b2 as v,b3 as b,y as j}from"./calfSystem-38898f3e.js"
import"./numberIsNaN-00e0daaf.js"
import{t as g}from"./toLowerCase-2f55d839.js"
import{a as h}from"./addCommas-6d131931.js"
import"./setTipped-5c176332.js"
import"./insertElementBefore-2ad05963.js"
import"./currentGuildId-7855dbba.js"
import"./intValue-44683b42.js"
import{g as $,s as T}from"./idb-ccc44752.js"
import{i as _}from"./insertElementAfterBegin-32b9e13c.js"
import"./formToUrl-3fe1dedb.js"
import{h as x,i as y}from"./interceptSubmit-7919653e.js"
import"./closest-d8e60c46.js"
import"./closestTr-4d04f2f4.js"
import"./lvlTests-d166aab9.js"
import{a as S}from"./all-e4fd8fad.js"
import"./loadDataTables-da43d3ec.js"
import"./allthen-c22b3f9e.js"
import{i as N,v as C}from"./arena-15d569c8.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
import{a as E}from"./arena-c2b62856.js"
import{t as I}from"./thisTournament-15b781da.js"
import{c as M}from"./createSelect-54eb1774.js"
import{i as q}from"./isSelected-e7754896.js"
let A
function H(s,t){let e=String(t-1)
0===t&&(e="x"),r(s,`<img src="${n}arena/${e}.png" class="moveImg">`)}function L(s,t){return`<option value="${String(t.id)}"${q(s.slots.join(),t.slots.join())}>${t.name}</option>`}function w(i,r){const n=function(e){return A||(A=t(e,s())),A}(r)
e("",n),i.slots.forEach(a(H,n))}function B(s,t,e){var a;(a=t.target.value,E({subcmd:"usesetup",set_id:a})).then(t=>{t.s&&w(e,s)})}function D(s,t,e){const a=s.sets.find(s=>s.id===Number(e.target.value))
a&&B(t,e,a)}function J(e,r,n){if(n.specials){const n=s({className:"flex"})
!function(e,r){if(e.sets.length>0){const n=M({innerHTML:e.sets.map(a(L,e.current_set)).join("")})
i(n,"change",a(D,e,r))
const o=s({className:"flex"})
t(o,n),_(r,o)}}(e,n),w(e.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${e=t,String(Number(e))}.png"></div></div>`
var e}function U(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const e=function(s){const t=I()
return s.arenas.find(s=>s.id===t)}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(e)),J(s.r,t,e)}}function F(s){return E({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map(s=>["stat_"+g(b[s.id]),s.value])),O=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const t=I(),[e,a,i]=await S([c({subcmd:"loadequipped"}),F(t),$("fsh_arenaJoined")])
if(f(e.r)){const s={pvpId:t,joined:l,...O(e),...G(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}function k(){j("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),m(d,"submit",x),p(d,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-f34669e5.js.map
