import{b5 as n,N as t,q as e,v as a,ak as s,bg as r,I as o,c,b4 as i,R as l,z as f,a1 as d,ai as u,bh as p,bi as m}from"./calfSystem-0e5d6faf.js"
import{s as v}from"./setTipped-a747706b.js"
import{a as h}from"./allthen-ecc09c9c.js"
import{l as b,p as g}from"./lvlTests-6c0bd1bb.js"
import{l as x}from"./loadDataTables-6dbe583c.js"
import{c as y}from"./changeMinMax-ba462eb9.js"
import{f as L,a as M,m as T,t as k}from"./assets-e88e9d09.js"
import{u as _}from"./updateUrl-1997a60e.js"
import{a as j}from"./arena-52bce975.js"
function w(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[e]=a),t}let q,F
function E(){s(L,q)}function N(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function D(){y(N,C)}function R(){N(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function S(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function z(n,t){return!q||function(n,t){const e=q.minLvl,a=q.maxLvl,s=o(t[7])
return b(g,s,e,a)}(0,t)}function J(n,t,e,a){return!0}function A(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(M)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",S)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",D),$("#fshReset",n).on("click",R)}(t),$("td",n).append(t)}function B(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(n)&&(q.id[a[1]]=a[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function G(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function H(n,t){const e=T.exec($("img",n).attr("src"))
e&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function I(n,t){const e=$(t),a=e.children()
B(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(G)}(a),function(n,t){const e=n.eq(8)
q&&q.moves&&H(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const O=n=>[n,Number(n.previousElementSibling.value)]
function U(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&P(t)}function V(n,t,e){v(e.players.map(a(K,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&P(t)}(n,t,e)}const W=[n,n=>l(n.players),n=>n.players.length>0]
function X(n,[t,,e]){W.every(n=>n(e))&&V(n,t,e)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function nn(){return j({subcmd:"view"})}function tn(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function en(){A(),E(),$.fn.dataTable.ext.search.push(z),$.fn.dataTable.ext.search.push(J)}function an(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(tn),function(n){q=n||{},F=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(I)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=e(r).reduce(a(w,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(a(U,e))
s.forEach(a(X,i())),s.forEach(a(Q,e))}(l),en(),f.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',_)}function sn(n,e){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),an(n,e),m("arena.process")}function rn(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?h([u(L),u("fsh_arenaFull"),nn().catch(()=>({})),x()],a(sn,n)):d("arena","Join error screen ?")}var on=Object.freeze({__proto__:null,default:rn})
export{on as a,rn as i,nn as v}
//# sourceMappingURL=arena-da57e22e.js.map
