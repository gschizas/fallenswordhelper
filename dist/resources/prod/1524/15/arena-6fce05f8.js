import{aN as t,I as n,l as e,s as a,a6 as s,b9 as r,d as o,v as c,n as i,w as l,R as f,a4 as d}from"./calfSystem-740ec4d2.js"
import{i as u}from"./isArray-3eb52569.js"
import{s as m}from"./setTipped-af58be0b.js"
import{c as p}from"./currentGuildId-ce4d8404.js"
import{i as v}from"./intValue-576c2dec.js"
import{a as h}from"./allthen-0a5c5fb9.js"
import{l as b,p as g}from"./lvlTests-7a00a4d1.js"
import{l as y}from"./loadDataTables-89aea7e0.js"
import{c as x}from"./changeMinMax-2c00e952.js"
import{f as L,a as M,m as T,t as j}from"./assets-6e314512.js"
import{u as _}from"./updateUrl-66484a50.js"
function k(t,n,[e,a]){const s=t.find(([,t])=>t===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",n[e]=a),n}let w,F
function q(){s(L,w)}function E(t,n){w=w||{},w.minLvl=t,w.maxLvl=n,q()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function C(){x(E,N)}function D(){E(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(w.minLvl),$("#fshMaxLvl").val(w.maxLvl),N()}function R(t){w=w||{},w.hideMoves=t.target.checked,q(),$(".moveMax").toggle(!t.target.checked)}function S(t,n){return!w||function(t,n){const e=w.minLvl,a=w.maxLvl,s=v(n[7])
return b(g,s,e,a)}(0,n)}function A(){const t=function(){const t=$("#pCC > table > tbody > tr:nth-child(4)")
return t.clone().insertBefore(t).find("td").attr("height","2"),t.clone().insertAfter(t).find("td").attr("height","1"),t}(),n=$(M)
!function(t){const n=$("#fshHideMoves",t)
w&&"hideMoves"in w&&(n.prop("checked",w.hideMoves),$(".moveMax").toggle(!w.hideMoves)),n.on("click",R)}(n),function(t){const n=$("#fshMinLvl",t)
w&&"minLvl"in w?n.val(w.minLvl):n.val(r.arenaMinLvl)}(n),function(t){const n=$("#fshMaxLvl",t)
w&&"maxLvl"in w?n.val(w.maxLvl):n.val(r.arenaMaxLvl)}(n),function(t){$("#fshMinLvl, #fshMaxLvl",t).on("keyup",C),$("#fshReset",t).on("click",D)}(n),$("td",t).append(n)}function G(n,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,w,w.id].every(t)&&(w.id[a[1]]=a[1],function(t,n){F&&!F[n]&&(t.css("background-color","#F5F298"),t.find("tr").css("background-color","#F5F298"))}(n,a[1]))}function I(t,n){const e=/(\d)\.png/.exec($("img",n).attr("src"))
e&&$(n).attr("data-order",e[1])}function J(t,n){const e=T.exec($("img",t).attr("src"))
e&&(!function(t,n){w.moves[t[1]]&&3===w.moves[t[1]]&&n.addClass("moveMax")}(e,n),t.attr("data-order",e[1]))}function z(t,n){const e=$(n),a=e.children()
G(e,a),function(t){const n=t.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(n.text())
e&&n.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(t){const n=t.eq(2)
n.attr("data-order",$("td",n).first().text().replace(/[,\s]/g,""))}(a),function(t){t.slice(4,7).each(I)}(a),function(t,n){const e=t.eq(8)
w&&w.moves&&J(e,n)}(a,e),function(t){const n=t.eq(8)
1===n.children(o).length&&n.attr("data-order",n.find("td").first().text().replace(/[,\s]/g,""))}(a)}const B=t=>[t,Number(t.previousElementSibling.value)]
function H(t,n){return t.r.arenas?n.concat(t.r.arenas.find(t=>t.id===n[1])):n}function O(t,n){return n.guild_id===t?`<span class="fshRed">${n.name}</span>`:n.name}function U(t){t&&t.classList&&t.classList.add("fshGray")}function V(t,[n,,e]){e&&((t,n)=>{return((t,n)=>1===n.reward_type&&t.r.moves)(t,n)&&((e=((t,n)=>t.r.moves.find(t=>t.id===n.reward))(t,n))&&3===e.max)
var e})(t,e)&&U(n)}function K(t,n,e){m(e.players.map(a(O,t)).join("<br>"),n),n.classList.add("tip-static"),t&&"Join"===n.value&&function(t,n,e){e.players.filter(n=>n.guild_id===t).length===e.max_players/4&&U(n)}(t,n,e)}const P=[t,t=>u(t.players),t=>t.players.length>0]
function Q(t,[n,,e]){P.every(t=>t(e))&&K(t,n,e)}const W="td.sorting, td.sorting_asc, td.sorting_desc"
function X(t){const n=$(t.target).closest("td"),e=function(t){const n=t.attr("class"),e=/sorting([^\s]+)/.exec(n)
return e&&"_desc"===e[1]?"asc":"desc"}(n)
!function(t,n,e){const a=t.closest(o).DataTable()
3!==n?a.order([3,"asc"],[n,e]).draw():a.order([3,e]).draw()}(n,n.index(),e)}function Y(t){return c(i({cmd:"arena"},t))}function Z(){return Y({subcmd:"view"})}function tt(t,n){const e=$("tr",n).first()
$("a",e).contents().unwrap(),$(n).prepend($("<thead/>").append(e))}function nt(){A(),q(),$.fn.dataTable.ext.search.push(S)}function et(r,[o,c,i]){const l=$('table[width="635"]',r)
l.each(tt),function(t){w=t||{},F=w.id||{},w.id={}}(o),function(t){t.children("tbody").children("tr").each(z)}(l),function(r){if(!t(r))return
const o=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(t=>[t,t.previousElementSibling.value]),c=e(r).reduce(a(k,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!t(e.r))return
const s=n('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(B).map(a(H,e))
s.forEach(a(Q,p())),s.forEach(a(V,e))}(i),nt(),l.DataTable(j),function(t){$(W,t).off("click"),t.on("click",W,X)}(r),r.on("click",'input.custombutton[type="submit"]',_)}function at(t,e){n('#arenaTypeTabs tr[style="display: none;"]').forEach(t=>t.remove()),et(t,e)}function st(){if(l())return
const t=$("#arenaTypeTabs")
1===t.length?h([d(L),d("fsh_arenaFull"),Z().catch(()=>({})),y()],a(at,t)):f("arena","Join error screen ?")}var rt=Object.freeze({__proto__:null,default:st})
export{Y as a,rt as b,st as i,Z as v}
//# sourceMappingURL=arena-6fce05f8.js.map
