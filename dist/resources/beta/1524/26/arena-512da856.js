import{aT as n,D as t,e as a,t as e,aU as s,d as r,w as o,q as c,x as i,U as f,aV as l,aW as d}from"./calfSystem-cf4d22a7.js"
import{i as u}from"./isArray-fd538fb3.js"
import{s as m}from"./setTipped-7d31935e.js"
import{c as p}from"./currentGuildId-5763962b.js"
import{i as v}from"./intValue-e4cdd281.js"
import{s as h,g as b}from"./idb-4798970d.js"
import{i as g}from"./interceptSubmit-228afb85.js"
import{c as x}from"./closestTr-c0ecc50a.js"
import{l as y,p as L}from"./lvlTests-a8a8e68e.js"
import{l as M}from"./loadDataTables-c2f9706f.js"
import{a as T}from"./allthen-18c82be8.js"
import{c as j}from"./changeMinMax-bf9a1252.js"
import{f as _,a as k,m as w,t as q}from"./assets-d1187a02.js"
function F(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(x(s[0]).style.backgroundColor="#ff0000",t[a]=e),t}let D,E
function C(){h(_,D)}function N(n,t){D=D||{},D.minLvl=n,D.maxLvl=t,C()}function S(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function A(){j(N,S)}function G(){N(s.arenaMinLvl,s.arenaMaxLvl),$("#fshMinLvl").val(D.minLvl),$("#fshMaxLvl").val(D.maxLvl),S()}function J(n){D=D||{},D.hideMoves=n.target.checked,C(),$(".moveMax").toggle(!n.target.checked)}function R(n,t){return!D||function(n,t){const a=D.minLvl,e=D.maxLvl,s=v(t[7])
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
function O(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function W(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function P(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&(a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max
var a})(n,a)&&K(t)}function Q(n,t,a){m(a.players.map(e(W,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&K(t)}(n,t,a)}const X=[n,n=>u(n.players),n=>n.players.length>0]
function Y(n,[t,,a]){X.every(n=>n(a))&&Q(n,t,a)}const Z="td.sorting, td.sorting_asc, td.sorting_desc"
function nn(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(r).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function tn(n){return o(c({cmd:"arena"},n))}function an(){return tn({subcmd:"view"})}function en(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function sn(){U(),C(),$.fn.dataTable.ext.search.push(R)}function rn(s,[r,o,c]){const i=$('table[width="635"]',s)
i.each(en),function(n){D=n||{},E=D.id||{},D.id={}}(r),function(n){n.children("tbody").children("tr").each(H)}(i),function(s){if(!n(s))return
const r=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),o=a(s).reduce(e(F,r),{})
h("fsh_arenaFull",o)}(o),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(e(O,a))
s.forEach(e(Y,p())),s.forEach(e(P,a))}(c),sn(),i.DataTable(q),function(n){$(Z,n).off("click"),n.on("click",Z,nn)}(s)}function on(n,a){l("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),rn(n,a),g(),d("arena.process")}function cn(){if(i())return
const n=$("#arenaTypeTabs")
1===n.length?T([b(_),b("fsh_arenaFull"),an().catch(()=>({})),M()],e(on,n)):f("arena","Join error screen ?")}var fn=Object.freeze({__proto__:null,default:cn})
export{tn as a,fn as b,cn as i,an as v}
//# sourceMappingURL=arena-512da856.js.map
