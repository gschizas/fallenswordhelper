import{a as n}from"./allthen-3a9178b8.js"
import{c as t}from"./closestTr-e70c5c37.js"
import{ad as e,D as a,e as s,t as r,ae as o,d as c,P as i,w as l,q as f,x as d,V as u,af as m,ag as p}from"./calfSystem-393ab895.js"
import{s as v,g as h}from"./idb-46b78b1e.js"
import{i as b}from"./intValue-e7ef611d.js"
import{c as g}from"./changeMinMax-9086d4c2.js"
import{f as x,a as y,m as L,t as M}from"./assets-ad350aab.js"
import{l as T,p as j}from"./lvlTests-64ed0189.js"
import{i as _}from"./interceptSubmit-193429ea.js"
import{l as k}from"./loadDataTables-06b95544.js"
import{c as w}from"./currentGuildId-469c60c3.js"
import{s as q}from"./setTipped-777d443c.js"
function F(n,e,[a,s]){const r=n.find((([,n])=>n===a))
return r&&(t(r[0]).style.backgroundColor="#ff0000",e[a]=s),e}let D,E
function C(){v(x,D)}function N(n,t){D=D||{},D.minLvl=n,D.maxLvl=t,C()}function S(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function G(){g(N,S)}function J(){N(o.arenaMinLvl,o.arenaMaxLvl),$("#fshMinLvl").val(D.minLvl),$("#fshMaxLvl").val(D.maxLvl),S()}function R(n){D=D||{},D.hideMoves=n.target.checked,C(),$(".moveMax").toggle(!n.target.checked)}function V(n,t){return!D||function(n,t){const e=D.minLvl,a=D.maxLvl,s=b(t[7])
return T(j,s,e,a)}(0,t)}function z(n,t,e,a){return!0}function A(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(y)
!function(n){const t=$("#fshHideMoves",n)
D&&"hideMoves"in D&&(t.prop("checked",D.hideMoves),$(".moveMax").toggle(!D.hideMoves)),t.on("click",R)}(t),function(n){const t=$("#fshMinLvl",n)
D&&"minLvl"in D?t.val(D.minLvl):t.val(o.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
D&&"maxLvl"in D?t.val(D.maxLvl):t.val(o.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",G),$("#fshReset",n).on("click",J)}(t),$("td",n).append(t)}function B(n,t){const a=/#\s(\d+)/.exec(t.eq(0).text());[a,D,D.id].every(e)&&(D.id[a[1]]=a[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(n,a[1]))}function H(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function I(n,t){const e=L.exec($("img",n).attr("src"))
e&&(!function(n,t){D.moves[n[1]]&&3===D.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function O(n,t){const e=$(t),a=e.children()
B(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(H)}(a),function(n,t){const e=n.eq(8)
D&&D.moves&&I(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const P=n=>[n,Number(n.previousElementSibling.value)]
function K(n,t){return n.r.arenas?t.concat(n.r.arenas.find((n=>n.id===t[1]))):t}function Q(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function U(n){n&&n.classList&&n.classList.add("fshGray")}function W(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(e=((n,t)=>n.r.moves.find((n=>n.id===t.reward)))(n,t))&&3===e.max
var e})(n,e)&&U(t)}function X(n,t,e){q(e.players.map(r(Q,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter((t=>t.guild_id===n)).length===e.max_players/4&&U(t)}(n,t,e)}const Y=[e,n=>i(n.players),n=>n.players.length>0]
function Z(n,[t,,e]){Y.every((n=>n(e)))&&X(n,t,e)}function nn(n){if(!n.s||!e(n.r))return
const t=function(n){return a('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(P).map(r(K,n))}(n)
t.forEach(r(Z,w())),t.forEach(r(W,n))}const tn="td.sorting, td.sorting_asc, td.sorting_desc"
function en(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function an(n){return l(f({cmd:"arena"},n))}function sn(){return an({subcmd:"view"})}function rn(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function on(){A(),C(),$.fn.dataTable.ext.search.push(V),$.fn.dataTable.ext.search.push(z)}function cn(n,[t,o,c]){const i=$('table[width="635"]',n)
i.each(rn),function(n){D=n||{},E=D.id||{},D.id={}}(t),function(n){n.children("tbody").children("tr").each(O)}(i),function(n){if(!e(n))return
const t=a('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map((n=>[n,n.previousElementSibling.value])),o=s(n).reduce(r(F,t),{})
v("fsh_arenaFull",o)}(o),nn(c),on(),i.DataTable(M),function(n){$(tn,n).off("click"),n.on("click",tn,en)}(n)}function ln(n,t){m("arena.process"),a('#arenaTypeTabs tr[style="display: none;"]').forEach((n=>n.remove())),cn(n,t),_(),p("arena.process")}function fn(){if(d())return
const t=$("#arenaTypeTabs")
1===t.length?function(t){n([h(x),h("fsh_arenaFull"),sn().catch((()=>({}))),k()],r(ln,t))}(t):u("arena","Join error screen ?")}var dn=Object.freeze({__proto__:null,default:fn})
export{an as a,dn as b,fn as i,sn as v}
//# sourceMappingURL=arena-d61d47d0.js.map
