import{aS as n,D as t,e as a,t as e,aT as s,d as r,w as o,q as i,x as c,U as f}from"./calfSystem-6459f18a.js"
import{i as l}from"./isArray-0709f57e.js"
import{s as d}from"./setTipped-c3fa7f51.js"
import{c as u}from"./currentGuildId-da0b8fda.js"
import{i as m}from"./intValue-e8157483.js"
import{s as p,g as v}from"./idb-737f325b.js"
import{i as h}from"./interceptSubmit-2837655b.js"
import{c as b}from"./closestTr-98dcae50.js"
import{l as g,p as x}from"./lvlTests-a02a80a7.js"
import{l as y}from"./loadDataTables-5d301d53.js"
import{a as L}from"./allthen-7d061027.js"
import{c as M}from"./changeMinMax-649d8c61.js"
import{f as T,a as j,m as _,t as k}from"./assets-c6a1020c.js"
function w(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(b(s[0]).style.backgroundColor="#ff0000",t[a]=e),t}let q,F
function D(){p(T,q)}function E(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,D()}function S(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function C(){M(E,S)}function N(){E(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),S()}function A(n){q=q||{},q.hideMoves=n.target.checked,D(),$(".moveMax").toggle(!n.target.checked)}function G(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=m(t[7])
return g(x,s,a,e)}(0,t)}function J(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(j)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",C),$("#fshReset",n).on("click",N)}(t),$("td",n).append(t)}function R(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(n)&&(q.id[e[1]]=e[1],function(n,t){F&&!F[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function z(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function B(n,t){const a=_.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
R(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(z)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&B(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const I=n=>[n,Number(n.previousElementSibling.value)]
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function V(n){n&&n.classList&&n.classList.add("fshGray")}function K(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max
var a})(n,a)&&V(t)}function P(n,t,a){d(a.players.map(e(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&V(t)}(n,t,a)}const Q=[n,n=>l(n.players),n=>n.players.length>0]
function W(n,[t,,a]){Q.every(n=>n(a))&&P(n,t,a)}function X(a){if(!a.s||!n(a.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(e(O,n))}(a)
s.forEach(e(W,u())),s.forEach(e(K,a))}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(r).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(n){return o(i({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function an(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function en(){J(),D(),$.fn.dataTable.ext.search.push(G)}function sn(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(an),function(n){q=n||{},F=q.id||{},q.id={}}(r),function(n){n.children("tbody").children("tr").each(H)}(c),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=a(s).reduce(e(w,r),{})
p("fsh_arenaFull",o)}(o),X(i),en(),c.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(s)}function rn(n,a){t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,a),h()}function on(){if(c())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){L([v(T),v("fsh_arenaFull"),tn().catch(()=>({})),y()],e(rn,n))}(n):f("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-22cbe927.js.map
