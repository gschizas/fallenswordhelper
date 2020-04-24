import{b4 as n,N as t,q as a,v as e,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as f,z as d,a0 as u,ah as m,bd as p,be as v}from"./calfSystem-07c25a1c.js"
import{i as h}from"./isArray-9e480d80.js"
import{a as b}from"./allthen-b942817a.js"
import{l as g,p as y}from"./lvlTests-9a41f863.js"
import{l as x}from"./loadDataTables-10290546.js"
import{c as L}from"./changeMinMax-bfb859e8.js"
import{f as M,a as T,m as k,t as j}from"./assets-078845b6.js"
import{u as w}from"./updateUrl-b4e629af.js"
function _(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let q,F
function E(){s(M,q)}function N(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function D(){L(N,C)}function S(){N(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=o(t[7])
return g(y,s,a,e)}(0,t)}function R(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(T)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",D),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function z(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(n)&&(q.id[e[1]]=e[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function B(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function G(n,t){const a=k.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
z(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(B)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&G(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const I=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function O(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&K(t)}function Q(n,t,a){t.dataset.tipped=a.players.map(e(U,n)).join("<br>"),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&K(t)}(n,t,a)}const V=[n,n=>h(n.players),n=>n.players.length>0]
function W(n,[t,,a]){V.every(n=>n(a))&&Q(n,t,a)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function Z(n){return l(f({cmd:"arena"},n))}function nn(){return Z({subcmd:"view"})}function tn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function an(){R(),E(),$.fn.dataTable.ext.search.push(J)}function en(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(tn),function(n){q=n||{},F=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(H)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(_,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(e(P,a))
s.forEach(e(W,i())),s.forEach(e(O,a))}(l),an(),f.DataTable(j),function(n){$(X,n).off("click"),n.on("click",X,Y)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function sn(n,a){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),en(n,a),v("arena.process")}function rn(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?b([m(M),m("fsh_arenaFull"),nn().catch(()=>({})),x()],e(sn,n)):u("arena","Join error screen ?")}export{Z as a,rn as i,nn as v}
//# sourceMappingURL=arena-50fb0b67.js.map
