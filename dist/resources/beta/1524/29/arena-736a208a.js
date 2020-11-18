import{aS as n,D as t,e as a,t as e,aT as s,d as r,w as o,q as c,x as i,U as f,aU as l,aV as d}from"./calfSystem-f9a27018.js"
import{i as u}from"./isArray-26644043.js"
import{s as m}from"./setTipped-56aeba85.js"
import{c as p}from"./currentGuildId-a542fdb9.js"
import{i as v}from"./intValue-f94761c7.js"
import{s as h,g as b}from"./idb-5c501cd3.js"
import{i as g}from"./interceptSubmit-039f8ca3.js"
import{c as x}from"./closestTr-0d6f3b27.js"
import{l as y,p as L}from"./lvlTests-12363b02.js"
import{l as M}from"./loadDataTables-343ff96f.js"
import{a as T}from"./allthen-ca11bf0c.js"
import{c as j}from"./changeMinMax-09af108d.js"
import{f as _,a as k,m as w,t as q}from"./assets-8c112bf6.js"
function F(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(x(s[0]).style.backgroundColor="#ff0000",t[a]=e),t}let D,E
function S(){h(_,D)}function C(n,t){D=D||{},D.minLvl=n,D.maxLvl=t,S()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function A(){j(C,N)}function G(){C(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(D.minLvl),$("#fshMaxLvl").val(D.maxLvl),N()}function J(n){D=D||{},D.hideMoves=n.target.checked,S(),$(".moveMax").toggle(!n.target.checked)}function R(n,t){return!D||function(n,t){const a=D.minLvl,e=D.maxLvl,s=v(t[7])
return y(L,s,a,e)}(0,t)}function U(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(k)
!function(n){const t=$("#fshHideMoves",n)
D&&"hideMoves"in D&&(t.prop("checked",D.hideMoves),$(".moveMax").toggle(!D.hideMoves)),t.on("click",J)}(t),function(n){const t=$("#fshMinLvl",n)
D&&"minLvl"in D?t.val(D.minLvl):t.val(s.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
D&&"maxLvl"in D?t.val(D.maxLvl):t.val(s.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",A),$("#fshReset",n).on("click",G)}(t),$("td",n).append(t)}function V(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,D,D.id].every(n)&&(D.id[e[1]]=e[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function z(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function B(n,t){const a=w.exec($("img",n).attr("src"))
a&&(!function(n,t){D.moves[n[1]]&&3===D.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
V(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(z)}(e),function(n,t){const a=n.eq(8)
D&&D.moves&&B(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(r).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const I=n=>[n,Number(n.previousElementSibling.value)]
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max
var a})(n,a)&&P(t)}function W(n,t,a){m(a.players.map(e(K,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&P(t)}(n,t,a)}const X=[n,n=>u(n.players),n=>n.players.length>0]
function Y(n,[t,,a]){X.every(n=>n(a))&&W(n,t,a)}function Z(a){if(!a.s||!n(a.r))return
const s=function(n){return t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(e(O,n))}(a)
s.forEach(e(Y,p())),s.forEach(e(Q,a))}const nn="td.sorting, td.sorting_asc, td.sorting_desc"
function tn(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(r).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function an(n){return o(c({cmd:"arena"},n))}function en(){return an({subcmd:"view"})}function sn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function rn(){U(),S(),$.fn.dataTable.ext.search.push(R)}function on(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(sn),function(n){D=n||{},E=D.id||{},D.id={}}(r),function(n){n.children("tbody").children("tr").each(H)}(i),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=a(s).reduce(e(F,r),{})
h("fsh_arenaFull",o)}(o),Z(c),rn(),i.DataTable(q),function(n){$(nn,n).off("click"),n.on("click",nn,tn)}(s)}function cn(n,a){l("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),on(n,a),g(),d("arena.process")}function fn(){if(i())return
const n=$("#arenaTypeTabs")
1===n.length?function(n){T([b(_),b("fsh_arenaFull"),en().catch(()=>({})),M()],e(cn,n))}(n):f("arena","Join error screen ?")}var ln=Object.freeze({__proto__:null,default:fn})
export{an as a,ln as b,fn as i,en as v}
//# sourceMappingURL=arena-736a208a.js.map
