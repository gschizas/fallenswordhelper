import{aU as t,I as n,l as a,s as e,aV as s,d as r,v as o,n as i,w as c,S as l}from"./calfSystem-6fc0cc1b.js"
import{i as f}from"./isArray-5986f48a.js"
import{s as d}from"./setTipped-1f5829a1.js"
import{c as u}from"./currentGuildId-33ea4168.js"
import{i as m}from"./intValue-3f75a919.js"
import{s as p,g as v}from"./idb-92d6a2b5.js"
import{a as h}from"./allthen-14038593.js"
import{c as b}from"./closestTr-7bb79481.js"
import{l as g,p as y}from"./lvlTests-bc5254a3.js"
import{l as x}from"./loadDataTables-2ed3a59d.js"
import{c as L}from"./changeMinMax-949d021e.js"
import{f as M,a as T,m as j,t as _}from"./assets-5177b563.js"
import{u as k}from"./updateUrl-5273596c.js"
function w(t,n,[a,e]){const s=t.find(([,t])=>t===a)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[a]=e),n}let F,q
function E(){p(M,F)}function C(t,n){F=F||{},F.minLvl=t,F.maxLvl=n,E()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){L(C,D)}function S(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function A(t){F=F||{},F.hideMoves=t.target.checked,E(),$(".moveMax").toggle(!t.target.checked)}function G(t,n){return!F||function(t,n){const a=F.minLvl,e=F.maxLvl,s=m(n[7])
return g(y,s,a,e)}(0,n)}function I(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(T)
!function(t){const n=$("#fshHideMoves",t)
F&&"hideMoves"in F&&(n.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),n.on("click",A)}(n),function(t){const n=$("#fshMinLvl",t)
F&&"minLvl"in F?n.val(F.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
F&&"maxLvl"in F?n.val(F.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",N),$("#fshReset",t).on("click",S)}(n),$("td",t).append(n)}function J(n,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,F,F.id].every(t)&&(F.id[e[1]]=e[1],function(t,n){q&&!q[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,e[1]))}function R(t,n){const a=/(\d)\.png/.exec($("img",n).attr("src"))
a&&$(n).attr("data-order",a[1])}function U(t,n){const a=j.exec($("img",t).attr("src"))
a&&(!function(t,n){F.moves[t[1]]&&3===F.moves[t[1]]&&n.addClass("moveMax")}(a,n),t.attr("data-order",a[1]))}function V(t,n){const a=$(n),e=a.children()
J(a,e),function(t){const n=t.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(n.text())
a&&n.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(e),function(t){t.slice(4,7).each(R)}(e),function(t,n){const a=t.eq(8)
F&&F.moves&&U(a,n)}(e,a),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(e)}const z=t=>[t,Number(t.previousElementSibling.value)]
function B(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function H(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function O(t){t&&t.classList&&t.classList.add("fshGray")}function K(t,[n,,a]){a&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((a=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===a.max)
var a})(t,a)&&O(n)}function P(t,n,a){d(a.players.map(e(H,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,a){a.players.filter(n=>n.guild_id===t).length===a.max_players/4&&O(n)}(t,n,a)}const Q=[t,t=>f(t.players),t=>t.players.length>0]
function W(t,[n,,a]){Q.every(t=>t(a))&&P(t,n,a)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(t){const n=$(t.target).closest("td"),a=function(t){const n=t.attr("class"),a=/sorting([^\s]+)/.exec(n)
return a&&"_desc"===a[1]?"asc":"desc"}(n)
!function(t,n,a){const e=t.closest(r).DataTable()
3!==n?e.order([3,"asc"],[n,a]).draw():e.order([3,a]).draw()}(n,n.index(),a)}function Z(t){return o(i({cmd:"arena"},t))}function tt(){return Z({subcmd:"view"})}function nt(t,n){const a=$("tr",n).first()
$("a",a).contents().unwrap(),$(n).prepend($("<thead/>").append(a))}function at(){I(),E(),$.fn.dataTable.ext.search.push(G)}function et(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(nt),function(t){F=t||{},q=F.id||{},F.id={}}(r),function(t){t.children("tbody").children("tr").each(V)}(c),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=a(s).reduce(e(w,r),{})
p("fsh_arenaFull",o)}(o),function(a){if(!a.s||!t(a.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(z).map(e(B,a))
s.forEach(e(W,u())),s.forEach(e(K,a))}(i),at(),c.DataTable(_),function(t){$(X,t).off("click"),t.on("click",X,Y)}(s),s.on("click",'input.custombutton[type="submit"]',k)}function st(t,a){n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),et(t,a)}function rt(){if(c())return
const t=$("#arenaTypeTabs")
1===t.length?h([v(M),v("fsh_arenaFull"),tt().catch(()=>({})),x()],e(st,t)):l("arena","Join error screen ?")}var ot=Object.freeze({__proto__:null,default:rt})
export{Z as a,ot as b,rt as i,tt as v}
//# sourceMappingURL=arena-27737e44.js.map
