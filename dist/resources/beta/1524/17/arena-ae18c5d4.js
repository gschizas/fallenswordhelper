import{aU as n,I as t,l as a,s as e,aV as s,d as r,v as o,n as c,w as i,S as l,aW as f,aX as d}from"./calfSystem-02ae8657.js"
import{i as u}from"./isArray-7fbdd896.js"
import{s as m}from"./setTipped-48769a0a.js"
import{c as p}from"./currentGuildId-a8ad9d1f.js"
import{i as v}from"./intValue-514fe585.js"
import{s as h,g as b}from"./idb-ac1635f3.js"
import{a as g}from"./allthen-9e407c02.js"
import{c as y}from"./closestTr-cb33d92d.js"
import{l as x,p as L}from"./lvlTests-4669cf32.js"
import{l as M}from"./loadDataTables-267f1793.js"
import{c as T}from"./changeMinMax-0e67e80c.js"
import{f as j,a as _,m as k,t as w}from"./assets-4e511750.js"
import{u as F}from"./updateUrl-c3fdab4c.js"
function q(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(y(s[0]).style.backgroundColor="#ff0000",t[a]=e),t}let E,C
function D(){h(j,E)}function N(n,t){E=E||{},E.minLvl=n,E.maxLvl=t,D()}function S(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function A(){T(N,S)}function G(){N(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(E.minLvl),$("#fshMaxLvl").val(E.maxLvl),S()}function I(n){E=E||{},E.hideMoves=n.target.checked,D(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!E||function(n,t){const a=E.minLvl,e=E.maxLvl,s=v(t[7])
return x(L,s,a,e)}(0,t)}function R(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(_)
!function(n){const t=$("#fshHideMoves",n)
E&&"hideMoves"in E&&(t.prop("checked",E.hideMoves),$(".moveMax").toggle(!E.hideMoves)),t.on("click",I)}(t),function(n){const t=$("#fshMinLvl",n)
E&&"minLvl"in E?t.val(E.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
E&&"maxLvl"in E?t.val(E.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",A),$("#fshReset",n).on("click",G)}(t),$("td",n).append(t)}function U(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,E,E.id].every(n)&&(E.id[e[1]]=e[1],function(n,t){C&&!C[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function V(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function z(n,t){const a=k.exec($("img",n).attr("src"))
a&&(!function(n,t){E.moves[n[1]]&&3===E.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function B(n,t){const a=$(t),e=a.children()
U(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(V)}(e),function(n,t){const a=n.eq(8)
E&&E.moves&&z(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const H=n=>[n,Number(n.previousElementSibling.value)]
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function W(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function X(n){n&&n.classList&&n.classList.add("fshGray")}function K(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&X(t)}function P(n,t,a){m(a.players.map(e(W,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&X(t)}(n,t,a)}const Q=[n,n=>u(n.players),n=>n.players.length>0]
function Y(n,[t,,a]){Q.every(n=>n(a))&&P(n,t,a)}const Z="td.sorting, td.sorting_asc, td.sorting_desc"
function nn(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(r).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function tn(n){return o(c({cmd:"arena"},n))}function an(){return tn({subcmd:"view"})}function en(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function sn(){R(),D(),$.fn.dataTable.ext.search.push(J)}function rn(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(en),function(n){E=n||{},C=E.id||{},E.id={}}(r),function(n){n.children("tbody").children("tr").each(B)}(i),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=a(s).reduce(e(q,r),{})
h("fsh_arenaFull",o)}(o),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(e(O,a))
s.forEach(e(Y,p())),s.forEach(e(K,a))}(c),sn(),i.DataTable(w),function(n){$(Z,n).off("click"),n.on("click",Z,nn)}(s),s.on("click",'input.custombutton[type="submit"]',F)}function on(n,a){f("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),rn(n,a),d("arena.process")}function cn(){if(i())return
const n=$("#arenaTypeTabs")
1===n.length?g([b(j),b("fsh_arenaFull"),an().catch(()=>({})),M()],e(on,n)):l("arena","Join error screen ?")}var ln=Object.freeze({__proto__:null,default:cn})
export{tn as a,ln as b,cn as i,an as v}
//# sourceMappingURL=arena-ae18c5d4.js.map
