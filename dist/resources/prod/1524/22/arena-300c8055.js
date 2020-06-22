import{aT as t,D as n,e,t as a,aU as s,d as r,w as o,q as i,x as c,U as f}from"./calfSystem-d04e4be4.js"
import{i as l}from"./isArray-7fc52818.js"
import{s as d}from"./setTipped-e830c5fe.js"
import{c as u}from"./currentGuildId-9ae9b1fe.js"
import{i as m}from"./intValue-ec94378e.js"
import{s as p,g as v}from"./idb-0492f5ed.js"
import{i as h}from"./interceptSubmit-24b16034.js"
import{c as b}from"./closestTr-81820d98.js"
import{l as g,p as x}from"./lvlTests-b64fe2f8.js"
import{l as y}from"./loadDataTables-b5e9e533.js"
import{a as L}from"./allthen-086eab8e.js"
import{c as M}from"./changeMinMax-318fdbb8.js"
import{f as T,a as j,m as _,t as k}from"./assets-f1f94362.js"
function w(t,n,[e,a]){const s=t.find(([,t])=>t===e)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[e]=a),n}let q,F
function D(){p(T,q)}function E(t,n){q=q||{},q.minLvl=t,q.maxLvl=n,D()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){M(E,C)}function S(){E(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(t){q=q||{},q.hideMoves=t.target.checked,D(),$(".moveMax").toggle(!t.target.checked)}function G(t,n){return!q||function(t,n){const e=q.minLvl,a=q.maxLvl,s=m(n[7])
return g(x,s,e,a)}(0,n)}function J(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(j)
!function(t){const n=$("#fshHideMoves",t)
q&&"hideMoves"in q&&(n.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),n.on("click",A)}(n),function(t){const n=$("#fshMinLvl",t)
q&&"minLvl"in q?n.val(q.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
q&&"maxLvl"in q?n.val(q.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",N),$("#fshReset",t).on("click",S)}(n),$("td",t).append(n)}function R(n,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(t)&&(q.id[a[1]]=a[1],function(t,n){F&&!F[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,a[1]))}function U(t,n){const e=/(\d)\.png/.exec($("img",n).attr("src"))
e&&$(n).attr("data-order",e[1])}function z(t,n){const e=_.exec($("img",t).attr("src"))
e&&(!function(t,n){q.moves[t[1]]&&3===q.moves[t[1]]&&n.addClass("moveMax")}(e,n),t.attr("data-order",e[1]))}function B(t,n){const e=$(n),a=e.children()
R(e,a),function(t){const n=t.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(n.text())
e&&n.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(a),function(t){t.slice(4,7).each(U)}(a),function(t,n){const e=t.eq(8)
q&&q.moves&&z(e,n)}(a,e),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(a)}const H=t=>[t,Number(t.previousElementSibling.value)]
function I(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function O(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function V(t){t&&t.classList&&t.classList.add("fshGray")}function K(t,[n,,e]){e&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((e=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===e.max)
var e})(t,e)&&V(n)}function P(t,n,e){d(e.players.map(a(O,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,e){e.players.filter(n=>n.guild_id===t).length===e.max_players/4&&V(n)}(t,n,e)}const Q=[t,t=>l(t.players),t=>t.players.length>0]
function W(t,[n,,e]){Q.every(t=>t(e))&&P(t,n,e)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(t){const n=$(t.target).closest("td"),e=function(t){const n=t.attr("class"),e=/sorting([^\s]+)/.exec(n)
return e&&"_desc"===e[1]?"asc":"desc"}(n)
!function(t,n,e){const a=t.closest(r).DataTable()
3!==n?a.order([3,"asc"],[n,e]).draw():a.order([3,e]).draw()}(n,n.index(),e)}function Z(t){return o(i({cmd:"arena"},t))}function tt(){return Z({subcmd:"view"})}function nt(t,n){const e=$("tr",n).first()
$("a",e).contents().unwrap(),$(n).prepend($("<thead/>").append(e))}function et(){J(),D(),$.fn.dataTable.ext.search.push(G)}function at(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(nt),function(t){q=t||{},F=q.id||{},q.id={}}(r),function(t){t.children("tbody").children("tr").each(B)}(c),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=e(s).reduce(a(w,r),{})
p("fsh_arenaFull",o)}(o),function(e){if(!e.s||!t(e.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(a(I,e))
s.forEach(a(W,u())),s.forEach(a(K,e))}(i),et(),c.DataTable(k),function(t){$(X,t).off("click"),t.on("click",X,Y)}(s)}function st(t,e){n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),at(t,e),h()}function rt(){if(c())return
const t=$("#arenaTypeTabs")
1===t.length?L([v(T),v("fsh_arenaFull"),tt().catch(()=>({})),y()],a(st,t)):f("arena","Join error screen ?")}var ot=Object.freeze({__proto__:null,default:rt})
export{Z as a,ot as b,rt as i,tt as v}
//# sourceMappingURL=arena-300c8055.js.map
