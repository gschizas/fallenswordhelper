import{l as s,f as t,A as e,t as a,e as i,i as r,aH as n,C as o,b0 as c,b1 as m,p as f,O as p,P as d,T as l,aU as u,b2 as v,b3 as b,y as j}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import{t as g}from"./toLowerCase-2574a84c.js"
import{a as h}from"./addCommas-f02ec3aa.js"
import"./setTipped-4f77e47d.js"
import"./insertElementBefore-372e5ad6.js"
import"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import{g as $,s as T}from"./idb-911ff7c2.js"
import{i as _}from"./insertElementAfterBegin-195a0721.js"
import"./formToUrl-3b57fbeb.js"
import{h as x,i as y}from"./interceptSubmit-e6a64c8e.js"
import"./closest-75b5e3c5.js"
import"./closestTr-8090afea.js"
import"./lvlTests-19db9840.js"
import{a as S}from"./all-6bd68ac2.js"
import"./loadDataTables-3b40cdab.js"
import"./allthen-41484118.js"
import{i as N,v as C}from"./arena-72c82f5b.js"
import"./changeMinMax-6161beed.js"
import"./assets-dcdda354.js"
import{a as E}from"./arena-c755f3af.js"
import{t as I}from"./thisTournament-a214cf54.js"
import{c as M}from"./createSelect-18786606.js"
import{i as q}from"./isSelected-619cf2c6.js"
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
if(d(e.r)){const s={pvpId:t,joined:l,...O(e),...G(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}export default function(){j("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),m(f,"submit",x),p(f,"submit",V))}
//# sourceMappingURL=arenaJoin-91154261.js.map
