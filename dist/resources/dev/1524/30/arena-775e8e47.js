import{aU as n,D as t,e,t as a,aV as s,d as r,P as o,x as c,V as i,aW as f,aX as l}from"./calfSystem-54df10e3.js"
import{s as d}from"./setTipped-c3fa7f51.js"
import{c as u}from"./currentGuildId-7eae4191.js"
import{i as m}from"./intValue-e8157483.js"
import{s as p,g as v}from"./idb-7f0d2b39.js"
import{i as h}from"./interceptSubmit-d6a9b28d.js"
import{c as b}from"./closestTr-612573e8.js"
import{l as g,p as x}from"./lvlTests-9878d022.js"
import{l as y}from"./loadDataTables-0859fee6.js"
import{a as L}from"./allthen-7d061027.js"
import{c as M}from"./changeMinMax-649d8c61.js"
import{f as T,a as j,m as _,t as k}from"./assets-c6a1020c.js"
import{a as w}from"./arena-ac278570.js"
function F(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(b(s[0]).style.backgroundColor="#ff0000",t[e]=a),t}let q,D
function E(){p(T,q)}function C(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,N)}function V(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),N()}function G(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!q||function(n,t){const e=q.minLvl,a=q.maxLvl,s=m(t[7])
return g(x,s,e,a)}(0,t)}function R(n,t,e,a){return!0}function z(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(j)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",G)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",S),$("#fshReset",n).on("click",V)}(t),$("td",n).append(t)}function A(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(n)&&(q.id[a[1]]=a[1],function(n,t){D&&!D[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function B(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function H(n,t){const e=_.exec($("img",n).attr("src"))
e&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function I(n,t){const e=$(t),a=e.children()
A(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(B)}(a),function(n,t){const e=n.eq(8)
q&&q.moves&&H(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const O=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function W(n){n&&n.classList&&n.classList.add("fshGray")}function X(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max
var e})(n,e)&&W(t)}function K(n,t,e){d(e.players.map(a(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&W(t)}(n,t,e)}const Q=[n,n=>o(n.players),n=>n.players.length>0]
function Y(n,[t,,e]){Q.every(n=>n(e))&&K(n,t,e)}function Z(e){if(!e.s||!n(e.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(a(P,n))}(e)
s.forEach(a(Y,u())),s.forEach(a(X,e))}const nn="td.sorting, td.sorting_asc, td.sorting_desc"
function tn(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(r).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function en(){return w({subcmd:"view"})}function an(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function sn(){z(),E(),$.fn.dataTable.ext.search.push(J),$.fn.dataTable.ext.search.push(R)}function rn(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(an),function(n){q=n||{},D=q.id||{},q.id={}}(r),function(n){n.children("tbody").children("tr").each(I)}(i),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=e(s).reduce(a(F,r),{})
p("fsh_arenaFull",o)}(o),Z(c),sn(),i.DataTable(k),function(n){$(nn,n).off("click"),n.on("click",nn,tn)}(s)}function on(n,e){f("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),rn(n,e),h(),l("arena.process")}function cn(){if(c())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){L([v(T),v("fsh_arenaFull"),en().catch(()=>({})),y()],a(on,n))}(n):i("arena","Join error screen ?")}var fn=Object.freeze({__proto__:null,default:cn})
export{fn as a,cn as i,en as v}
//# sourceMappingURL=arena-775e8e47.js.map
