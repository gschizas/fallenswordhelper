import{aV as t,D as n,e as a,t as e,aW as s,d as r,P as o,x as c,V as i,aX as l,aY as f}from"./calfSystem-38898f3e.js"
import{s as d}from"./setTipped-5c176332.js"
import{c as u}from"./currentGuildId-7855dbba.js"
import{i as m}from"./intValue-44683b42.js"
import{s as p,g as v}from"./idb-ccc44752.js"
import{i as h}from"./interceptSubmit-7919653e.js"
import{c as b}from"./closestTr-4d04f2f4.js"
import{l as g,p as x}from"./lvlTests-d166aab9.js"
import{l as y}from"./loadDataTables-da43d3ec.js"
import{a as L}from"./allthen-c22b3f9e.js"
import{c as M}from"./changeMinMax-1374d190.js"
import{f as T,a as j,m as _,t as k}from"./assets-cc59cb67.js"
import{a as w}from"./arena-c2b62856.js"
function F(t,n,[a,e]){const s=t.find(([,t])=>t===a)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[a]=e),n}let q,D
function E(){p(T,q)}function C(t,n){q=q||{},q.minLvl=t,q.maxLvl=n,E()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,N)}function V(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),N()}function G(t){q=q||{},q.hideMoves=t.target.checked,E(),$(".moveMax").toggle(!t.target.checked)}function J(t,n){return!q||function(t,n){const a=q.minLvl,e=q.maxLvl,s=m(n[7])
return g(x,s,a,e)}(0,n)}function R(t,n,a,e){return!0}function z(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(j)
!function(t){const n=$("#fshHideMoves",t)
q&&"hideMoves"in q&&(n.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),n.on("click",G)}(n),function(t){const n=$("#fshMinLvl",t)
q&&"minLvl"in q?n.val(q.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
q&&"maxLvl"in q?n.val(q.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",S),$("#fshReset",t).on("click",V)}(n),$("td",t).append(n)}function A(n,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(t)&&(q.id[e[1]]=e[1],function(t,n){D&&!D[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,e[1]))}function B(t,n){const a=/(\d)\.png/.exec($("img",n).attr("src"))
a&&$(n).attr("data-order",a[1])}function H(t,n){const a=_.exec($("img",t).attr("src"))
a&&(!function(t,n){q.moves[t[1]]&&3===q.moves[t[1]]&&n.addClass("moveMax")}(a,n),t.attr("data-order",a[1]))}function I(t,n){const a=$(n),e=a.children()
A(a,e),function(t){const n=t.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(n.text())
a&&n.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(e),function(t){t.slice(4,7).each(B)}(e),function(t,n){const a=t.eq(8)
q&&q.moves&&H(a,n)}(e,a),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(e)}const O=t=>[t,Number(t.previousElementSibling.value)]
function P(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function W(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function X(t){t&&t.classList&&t.classList.add("fshGray")}function Y(t,[n,,a]){a&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&(a=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===a.max
var a})(t,a)&&X(n)}function K(t,n,a){d(a.players.map(e(W,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,a){a.players.filter(n=>n.guild_id===t).length===a.max_players/4&&X(n)}(t,n,a)}const Q=[t,t=>o(t.players),t=>t.players.length>0]
function U(t,[n,,a]){Q.every(t=>t(a))&&K(t,n,a)}const Z="td.sorting, td.sorting_asc, td.sorting_desc"
function tt(t){const n=$(t.target).closest("td"),a=function(t){const n=t.attr("class"),a=/sorting([^\s]+)/.exec(n)
return a&&"_desc"===a[1]?"asc":"desc"}(n)
!function(t,n,a){const e=t.closest(r).DataTable()
3!==n?e.order([3,"asc"],[n,a]).draw():e.order([3,a]).draw()}(n,n.index(),a)}function nt(){return w({subcmd:"view"})}function at(t,n){const a=$("tr",n).first()
$("a",a).contents().unwrap(),$(n).prepend($("<thead/>").append(a))}function et(){z(),E(),$.fn.dataTable.ext.search.push(J),$.fn.dataTable.ext.search.push(R)}function st(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(at),function(t){q=t||{},D=q.id||{},q.id={}}(r),function(t){t.children("tbody").children("tr").each(I)}(i),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=a(s).reduce(e(F,r),{})
p("fsh_arenaFull",o)}(o),function(a){if(!a.s||!t(a.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(e(P,a))
s.forEach(e(U,u())),s.forEach(e(Y,a))}(c),et(),i.DataTable(k),function(t){$(Z,t).off("click"),t.on("click",Z,tt)}(s)}function rt(t,a){l("arena.process"),n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),st(t,a),h(),f("arena.process")}function ot(){if(c())return
const t=$("#arenaTypeTabs")
1===t.length?L([v(T),v("fsh_arenaFull"),nt().catch(()=>({})),y()],e(rt,t)):i("arena","Join error screen ?")}var ct=Object.freeze({__proto__:null,default:ot})
export{ct as a,ot as i,nt as v}
//# sourceMappingURL=arena-15d569c8.js.map
