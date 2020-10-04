import{aT as n,D as t,e,t as a,aU as s,d as r,w as o,q as i,x as c,V as f}from"./calfSystem-3bdf319e.js"
import{i as d}from"./isArray-5d976413.js"
import{s as l}from"./setTipped-141d3404.js"
import{c as u}from"./currentGuildId-e8170186.js"
import{i as m}from"./intValue-ef353ded.js"
import{s as p,g as v}from"./idb-31fb041e.js"
import{i as h}from"./interceptSubmit-5104e4a5.js"
import{c as b}from"./closestTr-51fa459d.js"
import{l as g,p as x}from"./lvlTests-2f55a016.js"
import{l as y}from"./loadDataTables-d66e2d23.js"
import{a as L}from"./allthen-dd6cac31.js"
import{c as M}from"./changeMinMax-5e8dfd5c.js"
import{f as T,a as j,m as _,t as k}from"./assets-9f475ea8.js"
function w(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(b(s[0]).style.backgroundColor="#ff0000",t[e]=a),t}let q,F
function D(){p(T,q)}function E(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,D()}function C(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){M(E,C)}function S(){E(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),C()}function A(n){q=q||{},q.hideMoves=n.target.checked,D(),$(".moveMax").toggle(!n.target.checked)}function G(n,t){return!q||function(n,t){const e=q.minLvl,a=q.maxLvl,s=m(t[7])
return g(x,s,e,a)}(0,t)}function J(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(j)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",N),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function R(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(n)&&(q.id[a[1]]=a[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function V(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function z(n,t){const e=_.exec($("img",n).attr("src"))
e&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function B(n,t){const e=$(t),a=e.children()
R(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(V)}(a),function(n,t){const e=n.eq(8)
q&&q.moves&&z(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const H=n=>[n,Number(n.previousElementSibling.value)]
function I(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function O(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function U(n){n&&n.classList&&n.classList.add("fshGray")}function K(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max
var e})(n,e)&&U(t)}function P(n,t,e){l(e.players.map(a(O,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&U(t)}(n,t,e)}const Q=[n,n=>d(n.players),n=>n.players.length>0]
function W(n,[t,,e]){Q.every(n=>n(e))&&P(n,t,e)}function X(e){if(!e.s||!n(e.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(a(I,n))}(e)
s.forEach(a(W,u())),s.forEach(a(K,e))}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(r).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function nn(n){return o(i({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function en(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function an(){J(),D(),$.fn.dataTable.ext.search.push(G)}function sn(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(en),function(n){q=n||{},F=q.id||{},q.id={}}(r),function(n){n.children("tbody").children("tr").each(B)}(c),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=e(s).reduce(a(w,r),{})
p("fsh_arenaFull",o)}(o),X(i),an(),c.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(s)}function rn(n,e){t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,e),h()}function on(){if(c())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){L([v(T),v("fsh_arenaFull"),tn().catch(()=>({})),y()],a(rn,n))}(n):f("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-ee0b35a3.js.map
