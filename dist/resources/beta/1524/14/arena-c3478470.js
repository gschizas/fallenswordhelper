import{b3 as n,M as t,n as e,u as a,ai as s,bb as r,H as o,d as c,b2 as i,x as l,aO as d,y as f,$ as u,ag as m,bc as p,bd as v}from"./calfSystem-371c414c.js"
import{i as h}from"./isArray-f2e9e1ad.js"
import{s as b}from"./setTipped-a7231de6.js"
import{a as g}from"./allthen-691ee788.js"
import{l as y,p as x}from"./lvlTests-9314ee2e.js"
import{l as L}from"./loadDataTables-60dc642e.js"
import{c as M}from"./changeMinMax-d2b3357a.js"
import{f as T,a as _,m as k,t as j}from"./assets-810a369c.js"
import{u as w}from"./updateUrl-2acd4160.js"
function F(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[e]=a),t}let q,E
function C(){s(T,q)}function D(n,t){q=q||{},q.minLvl=n,q.maxLvl=t,C()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(D,N)}function A(){D(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(q.minLvl),$("#fshMaxLvl").val(q.maxLvl),N()}function H(n){q=q||{},q.hideMoves=n.target.checked,C(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!q||function(n,t){const e=q.minLvl,a=q.maxLvl,s=o(t[7])
return y(x,s,e,a)}(0,t)}function O(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(_)
!function(n){const t=$("#fshHideMoves",n)
q&&"hideMoves"in q&&(t.prop("checked",q.hideMoves),$(".moveMax").toggle(!q.hideMoves)),t.on("click",H)}(t),function(n){const t=$("#fshMinLvl",n)
q&&"minLvl"in q?t.val(q.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
q&&"maxLvl"in q?t.val(q.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",S),$("#fshReset",n).on("click",A)}(t),$("td",n).append(t)}function R(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,q,q.id].every(n)&&(q.id[a[1]]=a[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function z(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function B(n,t){const e=k.exec($("img",n).attr("src"))
e&&(!function(n,t){q.moves[n[1]]&&3===q.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function G(n,t){const e=$(t),a=e.children()
R(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(z)}(a),function(n,t){const e=n.eq(8)
q&&q.moves&&B(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const U=n=>[n,Number(n.previousElementSibling.value)]
function I(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&P(t)}function V(n,t,e){b(e.players.map(a(K,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&P(t)}(n,t,e)}const W=[n,n=>h(n.players),n=>n.players.length>0]
function X(n,[t,,e]){W.every(n=>n(e))&&V(n,t,e)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function nn(n){return l(d({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function en(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function an(){O(),C(),$.fn.dataTable.ext.search.push(J)}function sn(r,[o,c,l]){const d=$('table[width="635"]',r)
d.each(en),function(n){q=n||{},E=q.id||{},q.id={}}(o),function(n){n.children("tbody").children("tr").each(G)}(d),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=e(r).reduce(a(F,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(U).map(a(I,e))
s.forEach(a(X,i())),s.forEach(a(Q,e))}(l),an(),d.DataTable(j),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function rn(n,e){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,e),v("arena.process")}function on(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?g([m(T),m("fsh_arenaFull"),tn().catch(()=>({})),L()],a(rn,n)):u("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-c3478470.js.map
