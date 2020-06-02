import{aU as t,I as n,l as e,s as a,aV as s,d as r,v as o,n as c,w as i,S as l}from"./calfSystem-dec5e071.js"
import{i as f}from"./isArray-5ae0f2ae.js"
import{s as d}from"./setTipped-80e36195.js"
import{c as u}from"./currentGuildId-694bbc76.js"
import{i as m}from"./intValue-8ad0a3ce.js"
import{s as p,g as v}from"./idb-8fe34e30.js"
import{a as h}from"./allthen-38e3a607.js"
import{c as b}from"./closestTr-37ea13b0.js"
import{l as g,p as y}from"./lvlTests-011061f4.js"
import{l as x}from"./loadDataTables-475e7aa4.js"
import{c as L}from"./changeMinMax-e936ffdd.js"
import{f as M,a as T,m as j,t as _}from"./assets-d1a83c4c.js"
import{u as k}from"./updateUrl-b1cce363.js"
function w(t,n,[e,a]){const s=t.find(([,t])=>t===e)
return s&&(b(s[0]).style.backgroundColor="#ff0000",n[e]=a),n}let F,q
function E(){p(M,F)}function C(t,n){F=F||{},F.minLvl=t,F.maxLvl=n,E()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){L(C,D)}function S(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function A(t){F=F||{},F.hideMoves=t.target.checked,E(),$(".moveMax").toggle(!t.target.checked)}function G(t,n){return!F||function(t,n){const e=F.minLvl,a=F.maxLvl,s=m(n[7])
return g(y,s,e,a)}(0,n)}function I(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(T)
!function(t){const n=$("#fshHideMoves",t)
F&&"hideMoves"in F&&(n.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),n.on("click",A)}(n),function(t){const n=$("#fshMinLvl",t)
F&&"minLvl"in F?n.val(F.minLvl):n.val(s.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
F&&"maxLvl"in F?n.val(F.maxLvl):n.val(s.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",N),$("#fshReset",t).on("click",S)}(n),$("td",t).append(n)}function J(n,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,F,F.id].every(t)&&(F.id[a[1]]=a[1],function(t,n){q&&!q[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,a[1]))}function R(t,n){const e=/(\d)\.png/.exec($("img",n).attr("src"))
e&&$(n).attr("data-order",e[1])}function U(t,n){const e=j.exec($("img",t).attr("src"))
e&&(!function(t,n){F.moves[t[1]]&&3===F.moves[t[1]]&&n.addClass("moveMax")}(e,n),t.attr("data-order",e[1]))}function V(t,n){const e=$(n),a=e.children()
J(e,a),function(t){const n=t.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(n.text())
e&&n.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(a),function(t){t.slice(4,7).each(R)}(a),function(t,n){const e=t.eq(8)
F&&F.moves&&U(e,n)}(a,e),function(t){const n=t.eq(8)
1===n.children(r).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(a)}const z=t=>[t,Number(t.previousElementSibling.value)]
function B(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function H(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function O(t){t&&t.classList&&t.classList.add("fshGray")}function K(t,[n,,e]){e&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((e=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===e.max)
var e})(t,e)&&O(n)}function P(t,n,e){d(e.players.map(a(H,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,e){e.players.filter(n=>n.guild_id===t).length===e.max_players/4&&O(n)}(t,n,e)}const Q=[t,t=>f(t.players),t=>t.players.length>0]
function W(t,[n,,e]){Q.every(t=>t(e))&&P(t,n,e)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(t){const n=$(t.target).closest("td"),e=function(t){const n=t.attr("class"),e=/sorting([^\s]+)/.exec(n)
return e&&"_desc"===e[1]?"asc":"desc"}(n)
!function(t,n,e){const a=t.closest(r).DataTable()
3!==n?a.order([3,"asc"],[n,e]).draw():a.order([3,e]).draw()}(n,n.index(),e)}function Z(t){return o(c({cmd:"arena"},t))}function tt(){return Z({subcmd:"view"})}function nt(t,n){const e=$("tr",n).first()
$("a",e).contents().unwrap(),$(n).prepend($("<thead/>").append(e))}function et(){I(),E(),$.fn.dataTable.ext.search.push(G)}function at(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(nt),function(t){F=t||{},q=F.id||{},F.id={}}(r),function(t){t.children("tbody").children("tr").each(V)}(i),function(s){if(!t(s))return
const r=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),o=e(s).reduce(a(w,r),{})
p("fsh_arenaFull",o)}(o),function(e){if(!e.s||!t(e.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(z).map(a(B,e))
s.forEach(a(W,u())),s.forEach(a(K,e))}(c),et(),i.DataTable(_),function(t){$(X,t).off("click"),t.on("click",X,Y)}(s),s.on("click",'input.custombutton[type="submit"]',k)}function st(t,e){n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),at(t,e)}function rt(){if(i())return
const t=$("#arenaTypeTabs")
1===t.length?h([v(M),v("fsh_arenaFull"),tt().catch(()=>({})),x()],a(st,t)):l("arena","Join error screen ?")}var ot=Object.freeze({__proto__:null,default:rt})
export{Z as a,ot as b,rt as i,tt as v}
//# sourceMappingURL=arena-2f8cf255.js.map
