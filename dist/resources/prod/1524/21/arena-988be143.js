import{aT as t,D as n,e as a,t as e,aU as s,d as r,w as o,q as c,x as i,U as l}from"./calfSystem-2741d97b.js"
import{i as f}from"./isArray-aedaa0a2.js"
import{s as d}from"./setTipped-30e03bb5.js"
import{c as u}from"./currentGuildId-2c5ea0ad.js"
import{i as m}from"./intValue-1a593541.js"
import{s as p,g as v}from"./idb-cb4fc9f9.js"
import{i as h}from"./interceptSubmit-60aabec1.js"
import{c as b}from"./closestTr-a85aebac.js"
import{l as g,p as x}from"./lvlTests-8bc3afe6.js"
import{l as y}from"./loadDataTables-b99ba7c2.js"
import{a as L}from"./allthen-dcd66ca6.js"
import{c as M}from"./changeMinMax-f9710921.js"
import{f as T,a as j,m as _,t as k}from"./assets-a336e07e.js"
function w(t,n,[a,e]){const s=t.find(([,t])=>t===a)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[a]=e),n}let q,F
function D(){p(T,q)}function E(t,n){q=q||{},q.minLvl=t,q.maxLvl=n,D()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){M(E,C)}function S(){E(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(t){q=q||{},q.hideMoves=t.target.checked,D(),$(".moveMax").toggle(!t.target.checked)}function G(t,n){return!q||function(t,n){const a=q.minLvl,e=q.maxLvl,s=m(n[7])
return g(x,s,a,e)}(0,n)}function J(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(j)
!function(t){const n=$("#fshHideMoves",t)
q&&"hideMoves"in q&&(n.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),n.on("click",A)}(n),function(t){const n=$("#fshMinLvl",t)
q&&"minLvl"in q?n.val(q.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
q&&"maxLvl"in q?n.val(q.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",N),$("#fshReset",t).on("click",S)}(n),$("td",t).append(n)}function R(n,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(t)&&(q.id[e[1]]=e[1],function(t,n){F&&!F[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,e[1]))}function U(t,n){const a=/(\d)\.png/.exec($("img",n).attr("src"))
a&&$(n).attr("data-order",a[1])}function z(t,n){const a=_.exec($("img",t).attr("src"))
a&&(!function(t,n){q.moves[t[1]]&&3===q.moves[t[1]]&&n.addClass("moveMax")}(a,n),t.attr("data-order",a[1]))}function B(t,n){const a=$(n),e=a.children()
R(a,e),function(t){const n=t.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(n.text())
a&&n.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(e),function(t){t.slice(4,7).each(U)}(e),function(t,n){const a=t.eq(8)
q&&q.moves&&z(a,n)}(e,a),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(e)}const H=t=>[t,Number(t.previousElementSibling.value)]
function I(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function O(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function V(t){t&&t.classList&&t.classList.add("fshGray")}function K(t,[n,,a]){a&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((a=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===a.max)
var a})(t,a)&&V(n)}function P(t,n,a){d(a.players.map(e(O,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,a){a.players.filter(n=>n.guild_id===t).length===a.max_players/4&&V(n)}(t,n,a)}const Q=[t,t=>f(t.players),t=>t.players.length>0]
function W(t,[n,,a]){Q.every(t=>t(a))&&P(t,n,a)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(t){const n=$(t.target).closest("td"),a=function(t){const n=t.attr("class"),a=/sorting([^\s]+)/.exec(n)
return a&&"_desc"===a[1]?"asc":"desc"}(n)
!function(t,n,a){const e=t.closest(r).DataTable()
3!==n?e.order([3,"asc"],[n,a]).draw():e.order([3,a]).draw()}(n,n.index(),a)}function Z(t){return o(c({cmd:"arena"},t))}function tt(){return Z({subcmd:"view"})}function nt(t,n){const a=$("tr",n).first()
$("a",a).contents().unwrap(),$(n).prepend($("<thead/>").append(a))}function at(){J(),D(),$.fn.dataTable.ext.search.push(G)}function et(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(nt),function(t){q=t||{},F=q.id||{},q.id={}}(r),function(t){t.children("tbody").children("tr").each(B)}(i),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=a(s).reduce(e(w,r),{})
p("fsh_arenaFull",o)}(o),function(a){if(!a.s||!t(a.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(e(I,a))
s.forEach(e(W,u())),s.forEach(e(K,a))}(c),at(),i.DataTable(k),function(t){$(X,t).off("click"),t.on("click",X,Y)}(s)}function st(t,a){n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),et(t,a),h()}function rt(){if(i())return
const t=$("#arenaTypeTabs")
1===t.length?L([v(T),v("fsh_arenaFull"),tt().catch(()=>({})),y()],e(st,t)):l("arena","Join error screen ?")}var ot=Object.freeze({__proto__:null,default:rt})
export{Z as a,ot as b,rt as i,tt as v}
//# sourceMappingURL=arena-988be143.js.map
