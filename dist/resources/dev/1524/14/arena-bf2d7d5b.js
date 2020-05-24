import{b4 as n,M as t,n as a,u as e,aj as s,bf as r,H as o,d as c,b3 as i,Q as l,y as f,a0 as d,ah as u,bg as p,bh as m}from"./calfSystem-d96a3efd.js"
import{s as v}from"./setTipped-906b0642.js"
import{a as h}from"./allthen-182523ad.js"
import{l as b,p as g}from"./lvlTests-87272fa2.js"
import{l as x}from"./loadDataTables-366dff61.js"
import{c as y}from"./changeMinMax-2a9d74c1.js"
import{f as L,a as M,m as T,t as _}from"./assets-1567628f.js"
import{u as j}from"./updateUrl-266f192f.js"
import{a as k}from"./arena-c4be0131.js"
function w(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let F,q
function E(){s(L,F)}function C(n,t){F=F||{},F.minLvl=n,F.maxLvl=t,E()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){y(C,D)}function S(){C(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function H(n){F=F||{},F.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!F||function(n,t){const a=F.minLvl,e=F.maxLvl,s=o(t[7])
return b(g,s,a,e)}(0,t)}function R(n,t,a,e){return!0}function z(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(M)
!function(n){const t=$("#fshHideMoves",n)
F&&"hideMoves"in F&&(t.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),t.on("click",H)}(t),function(n){const t=$("#fshMinLvl",n)
F&&"minLvl"in F?t.val(F.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
F&&"maxLvl"in F?t.val(F.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",N),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function A(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,F,F.id].every(n)&&(F.id[e[1]]=e[1],function(n,t){q&&!q[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function B(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function G(n,t){const a=T.exec($("img",n).attr("src"))
a&&(!function(n,t){F.moves[n[1]]&&3===F.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function O(n,t){const a=$(t),e=a.children()
A(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(B)}(e),function(n,t){const a=n.eq(8)
F&&F.moves&&G(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const Q=n=>[n,Number(n.previousElementSibling.value)]
function U(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function I(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function P(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&K(t)}function V(n,t,a){v(a.players.map(e(I,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&K(t)}(n,t,a)}const W=[n,n=>l(n.players),n=>n.players.length>0]
function X(n,[t,,a]){W.every(n=>n(a))&&V(n,t,a)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(){return k({subcmd:"view"})}function tn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function an(){z(),E(),$.fn.dataTable.ext.search.push(J),$.fn.dataTable.ext.search.push(R)}function en(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(tn),function(n){F=n||{},q=F.id||{},F.id={}}(o),function(n){n.children("tbody").children("tr").each(O)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(w,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(Q).map(e(U,a))
s.forEach(e(X,i())),s.forEach(e(P,a))}(l),an(),f.DataTable(_),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',j)}function sn(n,a){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),en(n,a),m("arena.process")}function rn(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?h([u(L),u("fsh_arenaFull"),nn().catch(()=>({})),x()],e(sn,n)):d("arena","Join error screen ?")}var on=Object.freeze({__proto__:null,default:rn})
export{on as a,rn as i,nn as v}
//# sourceMappingURL=arena-bf2d7d5b.js.map
