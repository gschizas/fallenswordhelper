import{aT as n,D as t,e,t as a,aU as s,d as r,w as o,q as c,x as i,U as f,aV as l,aW as d}from"./calfSystem-89b939c8.js"
import{i as u}from"./isArray-75e85160.js"
import{s as m}from"./setTipped-3dfbd3ed.js"
import{c as p}from"./currentGuildId-ae8f3699.js"
import{i as v}from"./intValue-cd93b930.js"
import{s as h,g as b}from"./idb-9be3057e.js"
import{i as g}from"./interceptSubmit-57a8cf95.js"
import{c as x}from"./closestTr-e9bb4ace.js"
import{l as y,p as L}from"./lvlTests-48f62cec.js"
import{l as M}from"./loadDataTables-bc7f4ac3.js"
import{a as T}from"./allthen-b213c39d.js"
import{c as j}from"./changeMinMax-94960d14.js"
import{f as _,a as k,m as w,t as q}from"./assets-a288e2fc.js"
function F(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(x(s[0]).style.backgroundColor="#ff0000",t[e]=a),t}let D,E
function C(){h(_,D)}function N(n,t){D=D||{},D.minLvl=n,D.maxLvl=t,C()}function S(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function A(){j(N,S)}function G(){N(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(D.minLvl),$("#fshMaxLvl").val(D.maxLvl),S()}function J(n){D=D||{},D.hideMoves=n.target.checked,C(),$(".moveMax").toggle(!n.target.checked)}function R(n,t){return!D||function(n,t){const e=D.minLvl,a=D.maxLvl,s=v(t[7])
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
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function W(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function P(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&K(t)}function Q(n,t,e){m(e.players.map(a(W,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&K(t)}(n,t,e)}const X=[n,n=>u(n.players),n=>n.players.length>0]
function Y(n,[t,,e]){X.every(n=>n(e))&&Q(n,t,e)}const Z="td.sorting, td.sorting_asc, td.sorting_desc"
function nn(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(r).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function tn(n){return o(c({cmd:"arena"},n))}function en(){return tn({subcmd:"view"})}function an(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function sn(){U(),C(),$.fn.dataTable.ext.search.push(R)}function rn(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(an),function(n){D=n||{},E=D.id||{},D.id={}}(r),function(n){n.children("tbody").children("tr").each(H)}(i),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=e(s).reduce(a(F,r),{})
h("fsh_arenaFull",o)}(o),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(a(O,e))
s.forEach(a(Y,p())),s.forEach(a(P,e))}(c),sn(),i.DataTable(q),function(n){$(Z,n).off("click"),n.on("click",Z,nn)}(s)}function on(n,e){l("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),rn(n,e),g(),d("arena.process")}function cn(){if(i())return
const n=$("#arenaTypeTabs")
1===n.length?T([b(_),b("fsh_arenaFull"),en().catch(()=>({})),M()],a(on,n)):f("arena","Join error screen ?")}var fn=Object.freeze({__proto__:null,default:cn})
export{tn as a,fn as b,cn as i,en as v}
//# sourceMappingURL=arena-07fddd53.js.map
