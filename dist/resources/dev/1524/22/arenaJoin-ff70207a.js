import{m as s,h as t,A as a,t as e,f as i,i as r,aH as n,C as o,b0 as c,b1 as m,p as f,O as p,P as d,T as l,aU as u,b2 as v,b3 as j,y as b}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import{t as g}from"./toLowerCase-e8c3179d.js"
import{a as h}from"./addCommas-c5c5d2c5.js"
import"./setTipped-cae99fc1.js"
import"./insertElementBefore-dcd1920e.js"
import"./currentGuildId-53b525a7.js"
import"./intValue-209ea1ab.js"
import{g as $,s as T}from"./idb-670c0cca.js"
import{i as _}from"./insertElementAfterBegin-fe5a69b7.js"
import"./formToUrl-84dfad91.js"
import{h as x,i as y}from"./interceptSubmit-c1f9070f.js"
import"./closest-b21303d7.js"
import"./closestTr-13a40903.js"
import"./lvlTests-411fa632.js"
import{a as S}from"./all-4929a748.js"
import"./loadDataTables-ffa79b01.js"
import"./allthen-58353ff8.js"
import{i as N,v as C}from"./arena-df446a59.js"
import"./changeMinMax-49a3ab9d.js"
import"./assets-3613be14.js"
import{a as E}from"./arena-ccc43962.js"
import{t as I}from"./thisTournament-18421f24.js"
import{c as M}from"./createSelect-560e9a5a.js"
import{i as q}from"./isSelected-7c391139.js"
let A
function H(s,t){let a=String(t-1)
0===t&&(a="x"),r(s,`<img src="${n}arena/${a}.png" class="moveImg">`)}function L(s,t){return`<option value="${String(t.id)}"${q(s.slots.join(),t.slots.join())}>${t.name}</option>`}function w(i,r){const n=function(a){return A||(A=t(a,s())),A}(r)
a("",n),i.slots.forEach(e(H,n))}function B(s,t,a){var e;(e=t.target.value,E({subcmd:"usesetup",set_id:e})).then(t=>{t.s&&w(a,s)})}function D(s,t,a){const e=s.sets.find(s=>s.id===Number(a.target.value))
e&&B(t,a,e)}function J(a,r,n){if(n.specials){const n=s({className:"flex"})
!function(a,r){if(a.sets.length>0){const n=M({innerHTML:a.sets.map(e(L,a.current_set)).join("")})
i(n,"change",e(D,a,r))
const o=s({className:"flex"})
t(o,n),_(r,o)}}(a,n),w(a.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${a=t,String(Number(a))}.png"></div></div>`
var a}function U(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const a=function(s){const t=I()
return s.arenas.find(s=>s.id===t)}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(a)),J(s.r,t,a)}}function F(s){return E({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map(s=>["stat_"+g(j[s.id]),s.value])),O=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const t=I(),[a,e,i]=await S([c({subcmd:"loadequipped"}),F(t),$("fsh_arenaJoined")])
if(d(a.r)){const s={pvpId:t,joined:l,...O(a),...G(e)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}export default function(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),m(f,"submit",x),p(f,"submit",V))}
//# sourceMappingURL=arenaJoin-ff70207a.js.map
