import{aO as t,I as n,l as a,s as e,a7 as s,ba as r,d as o,L as c,w as i,S as l,a5 as f,bb as d,bc as u}from"./calfSystem-ee582533.js"
import{s as m}from"./setTipped-a858a4c4.js"
import{c as p}from"./currentGuildId-0564d9a0.js"
import{i as v}from"./intValue-a842cf8a.js"
import{a as h}from"./allthen-f1914fd2.js"
import{l as b,p as g}from"./lvlTests-ac568200.js"
import{l as x}from"./loadDataTables-9af37330.js"
import{c as y}from"./changeMinMax-174c484a.js"
import{f as L,a as M,m as T,t as j}from"./assets-3b767daf.js"
import{u as _}from"./updateUrl-2f469a7c.js"
import{a as k}from"./arena-833d6240.js"
function w(t,n,[a,e]){const s=t.find(([,t])=>t===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",n[a]=e),n}let F,q
function E(){s(L,F)}function C(t,n){F=F||{},F.minLvl=t,F.maxLvl=n,E()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){y(C,D)}function S(){C(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function G(t){F=F||{},F.hideMoves=t.target.checked,E(),$(".moveMax").toggle(!t.target.checked)}function I(t,n){return!F||function(t,n){const a=F.minLvl,e=F.maxLvl,s=v(n[7])
return b(g,s,a,e)}(0,n)}function J(t,n,a,e){return!0}function O(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(M)
!function(t){const n=$("#fshHideMoves",t)
F&&"hideMoves"in F&&(n.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),n.on("click",G)}(n),function(t){const n=$("#fshMinLvl",t)
F&&"minLvl"in F?n.val(F.minLvl):n.val(r.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
F&&"maxLvl"in F?n.val(F.maxLvl):n.val(r.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",N),$("#fshReset",t).on("click",S)}(n),$("td",t).append(n)}function R(n,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,F,F.id].every(t)&&(F.id[e[1]]=e[1],function(t,n){q&&!q[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,e[1]))}function z(t,n){const a=/(\d)\.png/.exec($("img",n).attr("src"))
a&&$(n).attr("data-order",a[1])}function A(t,n){const a=T.exec($("img",t).attr("src"))
a&&(!function(t,n){F.moves[t[1]]&&3===F.moves[t[1]]&&n.addClass("moveMax")}(a,n),t.attr("data-order",a[1]))}function B(t,n){const a=$(n),e=a.children()
R(a,e),function(t){const n=t.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(n.text())
a&&n.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(e),function(t){t.slice(4,7).each(z)}(e),function(t,n){const a=t.eq(8)
F&&F.moves&&A(a,n)}(e,a),function(t){const n=t.eq(8)
1===n.children(o).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(e)}const H=t=>[t,Number(t.previousElementSibling.value)]
function U(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function V(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function K(t){t&&t.classList&&t.classList.add("fshGray")}function P(t,[n,,a]){a&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((a=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===a.max)
var a})(t,a)&&K(n)}function Q(t,n,a){m(a.players.map(e(V,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,a){a.players.filter(n=>n.guild_id===t).length===a.max_players/4&&K(n)}(t,n,a)}const W=[t,t=>c(t.players),t=>t.players.length>0]
function X(t,[n,,a]){W.every(t=>t(a))&&Q(t,n,a)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(t){const n=$(t.target).closest("td"),a=function(t){const n=t.attr("class"),a=/sorting([^\s]+)/.exec(n)
return a&&"_desc"===a[1]?"asc":"desc"}(n)
!function(t,n,a){const e=t.closest(o).DataTable()
3!==n?e.order([3,"asc"],[n,a]).draw():e.order([3,a]).draw()}(n,n.index(),a)}function tt(){return k({subcmd:"view"})}function nt(t,n){const a=$("tr",n).first()
$("a",a).contents().unwrap(),$(n).prepend($("<thead/>").append(a))}function at(){O(),E(),$.fn.dataTable.ext.search.push(I),$.fn.dataTable.ext.search.push(J)}function et(r,[o,c,i]){const l=$('table[width="635"]',r)
l.each(nt),function(t){F=t||{},q=F.id||{},F.id={}}(o),function(t){t.children("tbody").children("tr").each(B)}(l),function(r){if(!t(r))return
const o=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),c=a(r).reduce(e(w,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!t(a.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(e(U,a))
s.forEach(e(X,p())),s.forEach(e(P,a))}(i),at(),l.DataTable(j),function(t){$(Y,t).off("click"),t.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',_)}function st(t,a){d("arena.process"),n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),et(t,a),u("arena.process")}function rt(){if(i())return
const t=$("#arenaTypeTabs")
1===t.length?h([f(L),f("fsh_arenaFull"),tt().catch(()=>({})),x()],e(st,t)):l("arena","Join error screen ?")}var ot=Object.freeze({__proto__:null,default:rt})
export{ot as a,rt as i,tt as v}
//# sourceMappingURL=arena-20295fe1.js.map
