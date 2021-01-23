import{a as n}from"./allthen-3a9178b8.js"
import{c as t}from"./closestTr-177ae492.js"
import{ac as a,D as e,e as s,t as r,ad as o,d as i,w as c,q as f,x as l,U as d}from"./calfSystem-7aee5245.js"
import{s as u,g as m}from"./idb-12bca0fb.js"
import{i as p}from"./intValue-e7ef611d.js"
import{c as v}from"./changeMinMax-9086d4c2.js"
import{f as h,a as b,m as g,t as x}from"./assets-ad350aab.js"
import{l as y,p as L}from"./lvlTests-a5afa597.js"
import{i as M}from"./interceptSubmit-e2017f31.js"
import{l as T}from"./loadDataTables-1b31a4f6.js"
import{c as j}from"./currentGuildId-2e15c82d.js"
import{i as _}from"./isArray-551d6583.js"
import{s as k}from"./setTipped-777d443c.js"
function w(n,a,[e,s]){const r=n.find((([,n])=>n===e))
return r&&(t(r[0]).style.backgroundColor="#ff0000",a[e]=s),a}let q,F
function D(){u(h,q)}function E(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,D()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){v(E,C)}function S(){E(o.arenaMinLvl,o.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(n){q=q||{},q.hideMoves=n.target.checked,D(),$(".moveMax").toggle(!n.target.checked)}function G(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=p(t[7])
return y(L,s,a,e)}(0,t)}function J(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(b)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(o.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(o.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",N),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function R(n,t){const e=/#\s(\d+)/.exec(t.eq(0).text());[e,q,q.id].every(a)&&(q.id[e[1]]=e[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(n,e[1]))}function z(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function B(n,t){const a=g.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
R(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(z)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&B(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(i).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const I=n=>[n,Number(n.previousElementSibling.value)]
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find((n=>n.id===t[1]))):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function V(n){n&&n.classList&&n.classList.add("fshGray")}function K(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(a=((n,t)=>n.r.moves.find((n=>n.id===t.reward)))(n,t))&&3===a.max
var a})(n,a)&&V(t)}function P(n,t,a){k(a.players.map(r(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter((t=>t.guild_id===n)).length===a.max_players/4&&V(t)}(n,t,a)}const Q=[a,n=>_(n.players),n=>n.players.length>0]
function W(n,[t,,a]){Q.every((n=>n(a)))&&P(n,t,a)}function X(n){if(!n.s||!a(n.r))return
const t=function(n){return e('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(r(O,n))}(n)
t.forEach(r(W,j())),t.forEach(r(K,n))}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(i).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(n){return c(f({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function an(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function en(){J(),D(),$.fn.dataTable.ext.search.push(G)}function sn(n,[t,o,i]){const c=$('table[width="635"]',n)
c.each(an),function(n){q=n||{},F=q.id||{},q.id={}}(t),function(n){n.children("tbody").children("tr").each(H)}(c),function(n){if(!a(n))return
const t=e('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map((n=>[n,n.previousElementSibling.value])),o=s(n).reduce(r(w,t),{})
u("fsh_arenaFull",o)}(o),X(i),en(),c.DataTable(x),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(n)}function rn(n,t){e('#arenaTypeTabs tr[style="display: none;"]').forEach((n=>n.remove())),sn(n,t),M()}function on(){if(l())return
const t=$("#arenaTypeTabs")
1===t.length?function(t){n([m(h),m("fsh_arenaFull"),tn().catch((()=>({}))),T()],r(rn,t))}(t):d("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-d28a1916.js.map
