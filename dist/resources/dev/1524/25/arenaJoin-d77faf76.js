import{m as s,h as e,A as t,t as a,f as i,i as r,aH as n,C as o,b0 as c,b1 as m,p as d,O as f,P as p,T as l,aU as u,b2 as v,b3 as j,y as b}from"./calfSystem-69dd5601.js"
import"./numberIsNaN-929de7af.js"
import{t as g}from"./toLowerCase-c42114e1.js"
import{a as h}from"./addCommas-bdfe3cd5.js"
import"./setTipped-64e874d6.js"
import"./insertElementBefore-286ff14c.js"
import"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import{g as $,s as T}from"./idb-874fe815.js"
import{i as _}from"./insertElementAfterBegin-c6f715e1.js"
import"./formToUrl-543a6364.js"
import{h as x,i as y}from"./interceptSubmit-9f6267e0.js"
import"./closest-8d8d60b3.js"
import"./closestTr-29c432ed.js"
import"./lvlTests-df1daa9a.js"
import{a as S}from"./all-3791b7d5.js"
import"./loadDataTables-0867dbe6.js"
import"./allthen-ad810e11.js"
import{i as N,v as C}from"./arena-8e1e47ea.js"
import"./changeMinMax-502ef301.js"
import"./assets-73a041e8.js"
import{a as E}from"./arena-5086fb94.js"
import{t as I}from"./thisTournament-80ee4f5b.js"
import{c as M}from"./createSelect-e7d1ed86.js"
import{i as q}from"./isSelected-cb2669ec.js"
let A
function H(s,e){let t=String(e-1)
0===e&&(t="x"),r(s,`<img src="${n}arena/${t}.png" class="moveImg">`)}function L(s,e){return`<option value="${String(e.id)}"${q(s.slots.join(),e.slots.join())}>${e.name}</option>`}function w(i,r){const n=function(t){return A||(A=e(t,s())),A}(r)
t("",n),i.slots.forEach(a(H,n))}function B(s,e,t){var a;(a=e.target.value,E({subcmd:"usesetup",set_id:a})).then(e=>{e.s&&w(t,s)})}function D(s,e,t){const a=s.sets.find(s=>s.id===Number(t.target.value))
a&&B(e,t,a)}function J(t,r,n){if(n.specials){const n=s({className:"flex"})
!function(t,r){if(t.sets.length>0){const n=M({innerHTML:t.sets.map(a(L,t.current_set)).join("")})
i(n,"change",a(D,t,r))
const o=s({className:"flex"})
e(o,n),_(r,o)}}(t,n),w(t.current_set,n),e(r,n)}}function P(s,e){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${t=e,String(Number(t))}.png"></div></div>`
var t}function U(s){const e=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&e){e.setAttribute("align","center")
const t=function(s){const e=I()
return s.arenas.find(s=>s.id===e)}(s.r)
r(e,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(t)),J(s.r,e,t)}}function F(s){return E({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map(s=>["stat_"+g(j[s.id]),s.value])),O=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const e=I(),[t,a,i]=await S([c({subcmd:"loadequipped"}),F(e),$("fsh_arenaJoined")])
if(p(t.r)){const s={pvpId:e,joined:l,...O(t),...G(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}function k(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),m(d,"submit",x),f(d,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-d77faf76.js.map
