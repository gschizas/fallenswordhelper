import{b4 as n,N as t,q as e,v as a,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as f,z as d,a0 as u,ah as m,bd as p,be as v}from"./calfSystem-c91e004c.js"
import{i as h}from"./isArray-e79fe430.js"
import{a as b}from"./allthen-38d09eed.js"
import{l as g,p as y}from"./lvlTests-28ffdeaa.js"
import{l as x}from"./loadDataTables-1e1a3f50.js"
import{c as L}from"./changeMinMax-8030f196.js"
import{f as M,a as T,m as k,t as j}from"./assets-16c3fce3.js"
import{u as w}from"./updateUrl-efe16448.js"
function _(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[e]=a),t}let q,F
function E(){s(M,q)}function N(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function D(){L(N,C)}function S(){N(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!q||function(n,t){const e=q.minLvl,a=q.maxLvl,s=o(t[7])
return g(y,s,e,a)}(0,t)}function R(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(T)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",D),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function z(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(n)&&(q.id[a[1]]=a[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function B(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function G(n,t){const e=k.exec($("img",n).attr("src"))
e&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function H(n,t){const e=$(t),a=e.children()
z(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(B)}(a),function(n,t){const e=n.eq(8)
q&&q.moves&&G(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const I=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function O(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&K(t)}function Q(n,t,e){t.dataset.tipped=e.players.map(a(U,n)).join("<br>"),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&K(t)}(n,t,e)}const V=[n,n=>h(n.players),n=>n.players.length>0]
function W(n,[t,,e]){V.every(n=>n(e))&&Q(n,t,e)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function Z(n){return l(f({cmd:"arena"},n))}function nn(){return Z({subcmd:"view"})}function tn(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function en(){R(),E(),$.fn.dataTable.ext.search.push(J)}function an(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(tn),function(n){q=n||{},F=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(H)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=e(r).reduce(a(_,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(a(P,e))
s.forEach(a(W,i())),s.forEach(a(O,e))}(l),en(),f.DataTable(j),function(n){$(X,n).off("click"),n.on("click",X,Y)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function sn(n,e){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),an(n,e),v("arena.process")}function rn(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?b([m(M),m("fsh_arenaFull"),nn().catch(()=>({})),x()],a(sn,n)):u("arena","Join error screen ?")}export{Z as a,rn as i,nn as v}
//# sourceMappingURL=arena-cde5f9e6.js.map
