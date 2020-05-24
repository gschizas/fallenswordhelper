import{b3 as n,M as t,n as a,u as e,ai as s,bb as r,H as o,d as c,b2 as i,x as l,aO as f,y as d,$ as u,ag as m}from"./calfSystem-d587d232.js"
import{i as p}from"./isArray-5dbf2807.js"
import{s as v}from"./setTipped-3e31c084.js"
import{a as h}from"./allthen-ba816a7b.js"
import{l as b,p as g}from"./lvlTests-e4cca5f4.js"
import{l as y}from"./loadDataTables-043f4b86.js"
import{c as x}from"./changeMinMax-2faa59b9.js"
import{f as L,a as M,m as T,t as _}from"./assets-80dc2218.js"
import{u as k}from"./updateUrl-2eab1829.js"
function j(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let w,F
function q(){s(L,w)}function E(n,t){w=w||{},w.minLvl=n,w.maxLvl=t,q()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function D(){x(E,C)}function N(){E(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(w.minLvl),$("#fshMaxLvl").val(w.maxLvl),C()}function S(n){w=w||{},w.hideMoves=n.target.checked,q(),$(".moveMax").toggle(!n.target.checked)}function A(n,t){return!w||function(n,t){const a=w.minLvl,e=w.maxLvl,s=o(t[7])
return b(g,s,a,e)}(0,t)}function H(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(M)
!function(n){const t=$("#fshHideMoves",n)
w&&"hideMoves"in w&&(t.prop("checked",w.hideMoves),$(".moveMax").toggle(!w.hideMoves)),t.on("click",S)}(t),function(n){const t=$("#fshMinLvl",n)
w&&"minLvl"in w?t.val(w.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
w&&"maxLvl"in w?t.val(w.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",D),$("#fshReset",n).on("click",N)}(t),$("td",n).append(t)}function J(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,w,w.id].every(n)&&(w.id[e[1]]=e[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function O(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function R(n,t){const a=T.exec($("img",n).attr("src"))
a&&(!function(n,t){w.moves[n[1]]&&3===w.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function z(n,t){const a=$(t),e=a.children()
J(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(O)}(e),function(n,t){const a=n.eq(8)
w&&w.moves&&R(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const B=n=>[n,Number(n.previousElementSibling.value)]
function G(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function I(n){n&&n.classList&&n.classList.add("fshGray")}function K(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&I(t)}function P(n,t,a){v(a.players.map(e(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&I(t)}(n,t,a)}const Q=[n,n=>p(n.players),n=>n.players.length>0]
function V(n,[t,,a]){Q.every(n=>n(a))&&P(n,t,a)}const W="td.sorting, td.sorting_asc, td.sorting_desc"
function X(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function Y(n){return l(f({cmd:"arena"},n))}function Z(){return Y({subcmd:"view"})}function nn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function tn(){H(),q(),$.fn.dataTable.ext.search.push(A)}function an(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(nn),function(n){w=n||{},F=w.id||{},w.id={}}(o),function(n){n.children("tbody").children("tr").each(z)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(j,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(B).map(e(G,a))
s.forEach(e(V,i())),s.forEach(e(K,a))}(l),tn(),f.DataTable(_),function(n){$(W,n).off("click"),n.on("click",W,X)}(r),r.on("click",'input.custombutton[type="submit"]',k)}function en(n,a){t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),an(n,a)}function sn(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?h([m(L),m("fsh_arenaFull"),Z().catch(()=>({})),y()],e(en,n)):u("arena","Join error screen ?")}var rn=Object.freeze({__proto__:null,default:sn})
export{Y as a,rn as b,sn as i,Z as v}
//# sourceMappingURL=arena-c1de1733.js.map
