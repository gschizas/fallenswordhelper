import{aU as n,D as t,e as a,t as e,aV as s,d as r,P as o,x as i,V as c,aW as f,aX as l}from"./calfSystem-b136673a.js"
import{s as d}from"./setTipped-e5305fe4.js"
import{c as u}from"./currentGuildId-4405d1bb.js"
import{i as m}from"./intValue-f4d85578.js"
import{s as p,g as v}from"./idb-c31665cb.js"
import{i as h}from"./interceptSubmit-957549ab.js"
import{c as b}from"./closestTr-ea8b5479.js"
import{l as g,p as x}from"./lvlTests-045a7c7d.js"
import{l as y}from"./loadDataTables-fb922282.js"
import{a as L}from"./allthen-7191069a.js"
import{c as M}from"./changeMinMax-9ec858ae.js"
import{f as T,a as j,m as _,t as k}from"./assets-48002450.js"
import{a as w}from"./arena-6a803efd.js"
function F(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(b(s[0]).style.backgroundColor="#ff0000",t[a]=e),t}let q,D
function E(){p(T,q)}function C(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,E()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,N)}function V(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),N()}function G(n){q=q||{},q.hideMoves=n.target.checked,E(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=m(t[7])
return g(x,s,a,e)}(0,t)}function R(n,t,a,e){return!0}function z(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(j)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",G)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",S),$("#fshReset",n).on("click",V)}(t),$("td",n).append(t)}function A(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(n)&&(q.id[e[1]]=e[1],function(n,t){D&&!D[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function B(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function H(n,t){const a=_.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function I(n,t){const a=$(t),e=a.children()
A(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(B)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&H(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const O=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function W(n){n&&n.classList&&n.classList.add("fshGray")}function X(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max
var a})(n,a)&&W(t)}function K(n,t,a){d(a.players.map(e(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&W(t)}(n,t,a)}const Q=[n,n=>o(n.players),n=>n.players.length>0]
function Y(n,[t,,a]){Q.every(n=>n(a))&&K(n,t,a)}function Z(a){if(!a.s||!n(a.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(e(P,n))}(a)
s.forEach(e(Y,u())),s.forEach(e(X,a))}const nn="td.sorting, td.sorting_asc, td.sorting_desc"
function tn(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(r).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function an(){return w({subcmd:"view"})}function en(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function sn(){z(),E(),$.fn.dataTable.ext.search.push(J),$.fn.dataTable.ext.search.push(R)}function rn(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(en),function(n){q=n||{},D=q.id||{},q.id={}}(r),function(n){n.children("tbody").children("tr").each(I)}(c),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=a(s).reduce(e(F,r),{})
p("fsh_arenaFull",o)}(o),Z(i),sn(),c.DataTable(k),function(n){$(nn,n).off("click"),n.on("click",nn,tn)}(s)}function on(n,a){f("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),rn(n,a),h(),l("arena.process")}function cn(){if(i())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){L([v(T),v("fsh_arenaFull"),an().catch(()=>({})),y()],e(on,n))}(n):c("arena","Join error screen ?")}var fn=Object.freeze({__proto__:null,default:cn})
export{fn as a,cn as i,an as v}
//# sourceMappingURL=arena-3f06ba26.js.map
