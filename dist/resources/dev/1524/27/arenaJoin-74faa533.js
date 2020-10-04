import{m as e,h as s,A as t,t as a,f as i,i as r,aI as n,C as o,b0 as c,b1 as m,p,O as d,P as f,U as l,aU as u,b2 as v,b3 as b,y as j}from"./calfSystem-ec5e5725.js"
import"./numberIsNaN-871eca26.js"
import{t as g}from"./toLowerCase-33399b5a.js"
import{a as h}from"./addCommas-e12eda5f.js"
import"./setTipped-141d3404.js"
import"./insertElementBefore-543d9ef0.js"
import"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import{g as $,s as _}from"./idb-cecca562.js"
import{i as T}from"./insertElementAfterBegin-21a4a979.js"
import"./formToUrl-9589262c.js"
import{h as x,i as y}from"./interceptSubmit-540c8b15.js"
import"./closest-79b9364e.js"
import"./closestTr-039240ce.js"
import"./lvlTests-62ab81b3.js"
import{a as S}from"./all-e81516b4.js"
import"./loadDataTables-4279f9f3.js"
import"./allthen-dd6cac31.js"
import{i as N,v as C}from"./arena-40bc34ae.js"
import"./changeMinMax-5e8dfd5c.js"
import"./assets-9f475ea8.js"
import{a as E}from"./arena-9e8a0abb.js"
import{t as I}from"./thisTournament-ee0ba71c.js"
import{c as M}from"./createSelect-bed46071.js"
import{i as q}from"./isSelected-8eae2aea.js"
let A
function L(e,s){let t=String(s-1)
0===s&&(t="x"),r(e,`<img src="${n}arena/${t}.png" class="moveImg">`)}function U(e,s){return`<option value="${String(s.id)}"${q(e.slots.join(),s.slots.join())}>${s.name}</option>`}function w(i,r){const n=function(t){return A||(A=s(t,e())),A}(r)
t("",n),i.slots.forEach(a(L,n))}function B(e,s,t){var a;(a=s.target.value,E({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&w(t,e)})}function D(e,s,t){const a=e.sets.find(e=>e.id===Number(t.target.value))
a&&B(s,t,a)}function H(t,r,n){if(n.specials){const n=e({className:"flex"})
!function(t,r){if(t.sets.length>0){const n=M({innerHTML:t.sets.map(a(U,t.current_set)).join("")})
i(n,"change",a(D,t,r))
const o=e({className:"flex"})
s(o,n),T(r,o)}}(t,n),w(t.current_set,n),s(r,n)}}function J(e,s){return`<div><div>${e}</div><div><img src="${n}ui/arena/specials_${t=s,String(Number(t))}.png"></div></div>`
var t}function P(e){const s=o("#pCC > form > table tr:nth-of-type(4) td")
if(e.r&&s){s.setAttribute("align","center")
const t=function(e){const s=I()
return e.arenas.find(e=>e.id===s)}(e.r)
r(s,function(e){return`<div class="flex"><div><div>Players</div><div>${e.players.length} / ${e.max_players}</div></div>${J("Specials",e.specials)}${J("Hell Forge",e.hellforge)}${J("Epic",e.epic)}<div><div>Max Equip Level</div><div>${h(e.equip_level)}</div></div></div>`}(t)),H(e.r,s,t)}}function F(e){return E({subcmd:"join",pvp_id:e})}const G=e=>u(e.r.attributes.map(e=>["stat_"+g(b[e.id]),e.value])),O=e=>u(e.r.map(e=>[g(v[e.t]),e.n]))
async function V(e){e.preventDefault()
const s=I(),[t,a,i]=await S([c({subcmd:"loadequipped"}),F(s),$("fsh_arenaJoined")])
if(f(t.r)){const e={pvpId:s,joined:l,...O(t),...G(a)},r=i||[]
r.push(e),_("fsh_arenaJoined",r)}x(e)}function k(){j("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(P),m(p,"submit",x),d(p,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-74faa533.js.map
