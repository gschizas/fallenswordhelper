import{aN as n,I as t,l as a,s as e,a6 as s,b9 as r,d as o,v as c,n as i,w as l,R as d,a4 as f,ba as u,bb as m}from"./calfSystem-1262535f.js"
import{i as p}from"./isArray-d09fe8d1.js"
import{s as v}from"./setTipped-5b3efabc.js"
import{c as h}from"./currentGuildId-5a28bdba.js"
import{i as b}from"./intValue-c4584407.js"
import{a as g}from"./allthen-2a364862.js"
import{l as y,p as x}from"./lvlTests-37a8796d.js"
import{l as L}from"./loadDataTables-96074b55.js"
import{c as M}from"./changeMinMax-d9269b1c.js"
import{f as T,a as j,m as _,t as k}from"./assets-2e0649eb.js"
import{u as w}from"./updateUrl-17430bd2.js"
function F(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let q,E
function N(){s(T,q)}function C(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,N()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function R(){M(C,D)}function S(){C(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),D()}function A(n){q=q||{},q.hideMoves=n.target.checked,N(),$(".moveMax").toggle(!n.target.checked)}function G(n,t){return!q||function(n,t){const a=q.minLvl,e=q.maxLvl,s=b(t[7])
return y(x,s,a,e)}(0,t)}function I(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(j)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",R),$("#fshReset",n).on("click",S)}(t),$("td",n).append(t)}function J(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,q,q.id].every(n)&&(q.id[e[1]]=e[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function z(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function B(n,t){const a=_.exec($("img",n).attr("src"))
a&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
J(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(z)}(e),function(n,t){const a=n.eq(8)
q&&q.moves&&B(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(o).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const O=n=>[n,Number(n.previousElementSibling.value)]
function U(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function V(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function P(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&K(t)}function Q(n,t,a){v(a.players.map(e(V,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&K(t)}(n,t,a)}const W=[n,n=>p(n.players),n=>n.players.length>0]
function X(n,[t,,a]){W.every(n=>n(a))&&Q(n,t,a)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(o).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(n){return c(i({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function an(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function en(){I(),N(),$.fn.dataTable.ext.search.push(G)}function sn(r,[o,c,i]){const l=$('table[width="635"]',r)
l.each(an),function(n){q=n||{},E=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(H)}(l),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(F,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(e(U,a))
s.forEach(e(X,h())),s.forEach(e(P,a))}(i),en(),l.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function rn(n,a){u("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,a),m("arena.process")}function on(){if(l())return
const n=$("#arenaTypeTabs")
1===n.length?g([f(T),f("fsh_arenaFull"),tn().catch(()=>({})),L()],e(rn,n)):d("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-7275428f.js.map
