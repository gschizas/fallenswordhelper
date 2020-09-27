import{aV as t,D as n,e,t as a,aW as s,d as r,P as o,x as i,V as c,aX as f,aY as l}from"./calfSystem-69dd5601.js"
import{s as d}from"./setTipped-64e874d6.js"
import{c as u}from"./currentGuildId-a0138513.js"
import{i as m}from"./intValue-65d3c36c.js"
import{s as p,g as v}from"./idb-874fe815.js"
import{i as h}from"./interceptSubmit-9f6267e0.js"
import{c as b}from"./closestTr-29c432ed.js"
import{l as g,p as x}from"./lvlTests-df1daa9a.js"
import{l as y}from"./loadDataTables-0867dbe6.js"
import{a as L}from"./allthen-ad810e11.js"
import{c as M}from"./changeMinMax-502ef301.js"
import{f as T,a as j,m as _,t as k}from"./assets-73a041e8.js"
import{a as w}from"./arena-5086fb94.js"
function F(t,n,[e,a]){const s=t.find(([,t])=>t===e)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[e]=a),n}let q,D
function E(){p(T,q)}function C(t,n){q=q||{},q.minLvl=t,q.maxLvl=n,E()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,N)}function V(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),N()}function G(t){q=q||{},q.hideMoves=t.target.checked,E(),$(".moveMax").toggle(!t.target.checked)}function J(t,n){return!q||function(t,n){const e=q.minLvl,a=q.maxLvl,s=m(n[7])
return g(x,s,e,a)}(0,n)}function R(t,n,e,a){return!0}function z(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(j)
!function(t){const n=$("#fshHideMoves",t)
q&&"hideMoves"in q&&(n.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),n.on("click",G)}(n),function(t){const n=$("#fshMinLvl",t)
q&&"minLvl"in q?n.val(q.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
q&&"maxLvl"in q?n.val(q.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",S),$("#fshReset",t).on("click",V)}(n),$("td",t).append(n)}function A(n,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(t)&&(q.id[a[1]]=a[1],function(t,n){D&&!D[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,a[1]))}function B(t,n){const e=/(\d)\.png/.exec($("img",n).attr("src"))
e&&$(n).attr("data-order",e[1])}function H(t,n){const e=_.exec($("img",t).attr("src"))
e&&(!function(t,n){q.moves[t[1]]&&3===q.moves[t[1]]&&n.addClass("moveMax")}(e,n),t.attr("data-order",e[1]))}function I(t,n){const e=$(n),a=e.children()
A(e,a),function(t){const n=t.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(n.text())
e&&n.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(a),function(t){t.slice(4,7).each(B)}(a),function(t,n){const e=t.eq(8)
q&&q.moves&&H(e,n)}(a,e),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(a)}const O=t=>[t,Number(t.previousElementSibling.value)]
function P(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function W(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function X(t){t&&t.classList&&t.classList.add("fshGray")}function Y(t,[n,,e]){e&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&(e=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===e.max
var e})(t,e)&&X(n)}function K(t,n,e){d(e.players.map(a(W,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,e){e.players.filter(n=>n.guild_id===t).length===e.max_players/4&&X(n)}(t,n,e)}const Q=[t,t=>o(t.players),t=>t.players.length>0]
function U(t,[n,,e]){Q.every(t=>t(e))&&K(t,n,e)}const Z="td.sorting, td.sorting_asc, td.sorting_desc"
function tt(t){const n=$(t.target).closest("td"),e=function(t){const n=t.attr("class"),e=/sorting([^\s]+)/.exec(n)
return e&&"_desc"===e[1]?"asc":"desc"}(n)
!function(t,n,e){const a=t.closest(r).DataTable()
3!==n?a.order([3,"asc"],[n,e]).draw():a.order([3,e]).draw()}(n,n.index(),e)}function nt(){return w({subcmd:"view"})}function et(t,n){const e=$("tr",n).first()
$("a",e).contents().unwrap(),$(n).prepend($("<thead/>").append(e))}function at(){z(),E(),$.fn.dataTable.ext.search.push(J),$.fn.dataTable.ext.search.push(R)}function st(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(et),function(t){q=t||{},D=q.id||{},q.id={}}(r),function(t){t.children("tbody").children("tr").each(I)}(c),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=e(s).reduce(a(F,r),{})
p("fsh_arenaFull",o)}(o),function(e){if(!e.s||!t(e.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(a(P,e))
s.forEach(a(U,u())),s.forEach(a(Y,e))}(i),at(),c.DataTable(k),function(t){$(Z,t).off("click"),t.on("click",Z,tt)}(s)}function rt(t,e){f("arena.process"),n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),st(t,e),h(),l("arena.process")}function ot(){if(i())return
const t=$("#arenaTypeTabs")
1===t.length?L([v(T),v("fsh_arenaFull"),nt().catch(()=>({})),y()],a(rt,t)):c("arena","Join error screen ?")}var it=Object.freeze({__proto__:null,default:ot})
export{it as a,ot as i,nt as v}
//# sourceMappingURL=arena-8e1e47ea.js.map
