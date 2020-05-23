import{b4 as n,N as t,q as e,v as a,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as f,z as d,a0 as u,ah as m}from"./calfSystem-4f7c0235.js"
import{i as p}from"./isArray-3ee7803f.js"
import{s as v}from"./setTipped-c9246171.js"
import{a as h}from"./allthen-e8ef0afa.js"
import{l as b,p as g}from"./lvlTests-18ea534b.js"
import{l as y}from"./loadDataTables-61042690.js"
import{c as x}from"./changeMinMax-5cdf8cdc.js"
import{f as L,a as M,m as T,t as _}from"./assets-3bbd1f11.js"
import{u as j}from"./updateUrl-d4e01d27.js"
function k(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[e]=a),t}let w,q
function F(){s(L,w)}function E(n,t){w=w||{},w.minLvl=n,w.maxLvl=t,F()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function C(){x(E,N)}function D(){E(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(w.minLvl),$("#fshMaxLvl").val(w.maxLvl),N()}function S(n){w=w||{},w.hideMoves=n.target.checked,F(),$(".moveMax").toggle(!n.target.checked)}function z(n,t){return!w||function(n,t){const e=w.minLvl,a=w.maxLvl,s=o(t[7])
return b(g,s,e,a)}(0,t)}function A(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(M)
!function(n){const t=$("#fshHideMoves",n)
w&&"hideMoves"in w&&(t.prop("checked",w.hideMoves),$(".moveMax").toggle(!w.hideMoves)),t.on("click",S)}(t),function(n){const t=$("#fshMinLvl",n)
w&&"minLvl"in w?t.val(w.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
w&&"maxLvl"in w?t.val(w.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",C),$("#fshReset",n).on("click",D)}(t),$("td",n).append(t)}function J(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,w,w.id].every(n)&&(w.id[a[1]]=a[1],function(n,t){q&&!q[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function R(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function B(n,t){const e=T.exec($("img",n).attr("src"))
e&&(!function(n,t){w.moves[n[1]]&&3===w.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function G(n,t){const e=$(t),a=e.children()
J(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(R)}(a),function(n,t){const e=n.eq(8)
w&&w.moves&&B(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const H=n=>[n,Number(n.previousElementSibling.value)]
function I(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function O(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function U(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&P(t)}function K(n,t,e){v(e.players.map(a(O,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&P(t)}(n,t,e)}const Q=[n,n=>p(n.players),n=>n.players.length>0]
function V(n,[t,,e]){Q.every(n=>n(e))&&K(n,t,e)}const W="td.sorting, td.sorting_asc, td.sorting_desc"
function X(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function Y(n){return l(f({cmd:"arena"},n))}function Z(){return Y({subcmd:"view"})}function nn(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function tn(){A(),F(),$.fn.dataTable.ext.search.push(z)}function en(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(nn),function(n){w=n||{},q=w.id||{},w.id={}}(o),function(n){n.children("tbody").children("tr").each(G)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=e(r).reduce(a(k,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(H).map(a(I,e))
s.forEach(a(V,i())),s.forEach(a(U,e))}(l),tn(),f.DataTable(_),function(n){$(W,n).off("click"),n.on("click",W,X)}(r),r.on("click",'input.custombutton[type="submit"]',j)}function an(n,e){t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),en(n,e)}function sn(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?h([m(L),m("fsh_arenaFull"),Z().catch(()=>({})),y()],a(an,n)):u("arena","Join error screen ?")}var rn=Object.freeze({__proto__:null,default:sn})
export{Y as a,rn as b,sn as i,Z as v}
//# sourceMappingURL=arena-64491e1c.js.map
