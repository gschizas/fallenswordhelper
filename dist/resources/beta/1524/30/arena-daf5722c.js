import{aS as n,D as t,e,t as a,aT as s,d as r,w as o,q as i,x as c,U as f,aU as l,aV as d}from"./calfSystem-ebf4b17d.js"
import{i as u}from"./isArray-0709f57e.js"
import{s as m}from"./setTipped-c3fa7f51.js"
import{c as p}from"./currentGuildId-f7450bbe.js"
import{i as v}from"./intValue-e8157483.js"
import{s as h,g as b}from"./idb-b7d9067e.js"
import{i as g}from"./interceptSubmit-3d708b68.js"
import{c as x}from"./closestTr-24d1e04a.js"
import{l as y,p as L}from"./lvlTests-66478ebb.js"
import{l as M}from"./loadDataTables-1e8f9239.js"
import{a as T}from"./allthen-7d061027.js"
import{c as j}from"./changeMinMax-649d8c61.js"
import{f as _,a as k,m as w,t as q}from"./assets-c6a1020c.js"
function F(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(x(s[0]).style.backgroundColor="#ff0000",t[e]=a),t}let D,E
function S(){h(_,D)}function C(n,t){D=D||{},D.minLvl=n,D.maxLvl=t,S()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function A(){j(C,N)}function G(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(D.minLvl),$("#fshMaxLvl").val(D.maxLvl),N()}function J(n){D=D||{},D.hideMoves=n.target.checked,S(),$(".moveMax").toggle(!n.target.checked)}function R(n,t){return!D||function(n,t){const e=D.minLvl,a=D.maxLvl,s=v(t[7])
return y(L,s,e,a)}(0,t)}function U(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(k)
!function(n){const t=$("#fshHideMoves",n)
D&&"hideMoves"in D&&(t.prop("checked",D.hideMoves),$(".moveMax").toggle(!D.hideMoves)),t.on("click",J)}(t),function(n){const t=$("#fshMinLvl",n)
D&&"minLvl"in D?t.val(D.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
D&&"maxLvl"in D?t.val(D.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",A),$("#fshReset",n).on("click",G)}(t),$("td",n).append(t)}function V(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,D,D.id].every(n)&&(D.id[a[1]]=a[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function z(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function B(n,t){const e=w.exec($("img",n).attr("src"))
e&&(!function(n,t){D.moves[n[1]]&&3===D.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function H(n,t){const e=$(t),a=e.children()
V(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(z)}(a),function(n,t){const e=n.eq(8)
D&&D.moves&&B(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const I=n=>[n,Number(n.previousElementSibling.value)]
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max
var e})(n,e)&&P(t)}function W(n,t,e){m(e.players.map(a(K,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&P(t)}(n,t,e)}const X=[n,n=>u(n.players),n=>n.players.length>0]
function Y(n,[t,,e]){X.every(n=>n(e))&&W(n,t,e)}function Z(e){if(!e.s||!n(e.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(a(O,n))}(e)
s.forEach(a(Y,p())),s.forEach(a(Q,e))}const nn="td.sorting, td.sorting_asc, td.sorting_desc"
function tn(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(r).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function en(n){return o(i({cmd:"arena"},n))}function an(){return en({subcmd:"view"})}function sn(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function rn(){U(),S(),$.fn.dataTable.ext.search.push(R)}function on(s,[r,o,i]){const c=$('table[width="635"]',s)
c.each(sn),function(n){D=n||{},E=D.id||{},D.id={}}(r),function(n){n.children("tbody").children("tr").each(H)}(c),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=e(s).reduce(a(F,r),{})
h("fsh_arenaFull",o)}(o),Z(i),rn(),c.DataTable(q),function(n){$(nn,n).off("click"),n.on("click",nn,tn)}(s)}function cn(n,e){l("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),on(n,e),g(),d("arena.process")}function fn(){if(c())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){T([b(_),b("fsh_arenaFull"),an().catch(()=>({})),M()],a(cn,n))}(n):f("arena","Join error screen ?")}var ln=Object.freeze({__proto__:null,default:fn})
export{en as a,ln as b,fn as i,an as v}
//# sourceMappingURL=arena-daf5722c.js.map
