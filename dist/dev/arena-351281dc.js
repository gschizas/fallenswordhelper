import{b5 as n,N as t,q as a,v as e,ak as s,bg as r,I as o,c,b4 as i,R as l,z as f,a1 as d,ai as u,bh as p,bi as m}from"./calfSystem-8dc0fa4b.js"
import{s as v}from"./setTipped-e2c23c98.js"
import{a as h}from"./allthen-88a2d4fe.js"
import{l as b,p as g}from"./lvlTests-cababa62.js"
import{l as x}from"./loadDataTables-4b77a2be.js"
import{c as y}from"./changeMinMax-04eb4a75.js"
import{f as L,a as M,m as T,t as k}from"./assets-ee86d4ec.js"
import{u as _}from"./updateUrl-c03619d9.js"
import{a as j}from"./arena-398ab6b2.js"
function w(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let q,F
function E(){s(L,q)}function N(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function D(){y(N,C)}function R(){N(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function S(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function z(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=o(t[7])
return b(g,s,a,e)}(0,t)}function J(n,t,a,e){return!0}function A(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(M)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",S)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",D),$("#fshReset",n).on("click",R)}(t),$("td",n).append(t)}function B(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(n)&&(q.id[e[1]]=e[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function G(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function H(n,t){const a=T.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function I(n,t){const a=$(t),e=a.children()
B(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(G)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&H(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const O=n=>[n,Number(n.previousElementSibling.value)]
function U(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&P(t)}function V(n,t,a){v(a.players.map(e(K,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&P(t)}(n,t,a)}const W=[n,n=>l(n.players),n=>n.players.length>0]
function X(n,[t,,a]){W.every(n=>n(a))&&V(n,t,a)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(){return j({subcmd:"view"})}function tn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function an(){A(),E(),$.fn.dataTable.ext.search.push(z),$.fn.dataTable.ext.search.push(J)}function en(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(tn),function(n){q=n||{},F=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(I)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(w,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(e(U,a))
s.forEach(e(X,i())),s.forEach(e(Q,a))}(l),an(),f.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',_)}function sn(n,a){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),en(n,a),m("arena.process")}function rn(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?h([u(L),u("fsh_arenaFull"),nn().catch(()=>({})),x()],e(sn,n)):d("arena","Join error screen ?")}var on=Object.freeze({__proto__:null,default:rn})
export{on as a,rn as i,nn as v}
//# sourceMappingURL=arena-351281dc.js.map
