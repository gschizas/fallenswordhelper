import{b4 as n,N as t,q as a,v as e,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as f,z as d,a0 as u,ah as m,bd as p,be as v}from"./calfSystem-2fb02284.js"
import{i as h}from"./isArray-22938fdc.js"
import{s as b}from"./setTipped-db163424.js"
import{a as g}from"./allthen-1b0c8f52.js"
import{l as y,p as x}from"./lvlTests-34a451b3.js"
import{l as L}from"./loadDataTables-b8097ab6.js"
import{c as M}from"./changeMinMax-638e0585.js"
import{f as T,a as _,m as j,t as k}from"./assets-fad649bc.js"
import{u as w}from"./updateUrl-1abaacc0.js"
function q(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let F,E
function N(){s(T,F)}function C(n,t){F=F||{},F.minLvl=n,F.maxLvl=t,N()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,D)}function z(){C(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function A(n){F=F||{},F.hideMoves=n.target.checked,N(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!F||function(n,t){const a=F.minLvl,e=F.maxLvl,s=o(t[7])
return y(x,s,a,e)}(0,t)}function R(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(_)
!function(n){const t=$("#fshHideMoves",n)
F&&"hideMoves"in F&&(t.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
F&&"minLvl"in F?t.val(F.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
F&&"maxLvl"in F?t.val(F.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",S),$("#fshReset",n).on("click",z)}(t),$("td",n).append(t)}function B(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,F,F.id].every(n)&&(F.id[e[1]]=e[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function G(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function H(n,t){const a=j.exec($("img",n).attr("src"))
a&&(!function(n,t){F.moves[n[1]]&&3===F.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function I(n,t){const a=$(t),e=a.children()
B(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(G)}(e),function(n,t){const a=n.eq(8)
F&&F.moves&&H(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const O=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&K(t)}function V(n,t,a){b(a.players.map(e(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&K(t)}(n,t,a)}const W=[n,n=>h(n.players),n=>n.players.length>0]
function X(n,[t,,a]){W.every(n=>n(a))&&V(n,t,a)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function nn(n){return l(f({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function an(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function en(){R(),N(),$.fn.dataTable.ext.search.push(J)}function sn(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(an),function(n){F=n||{},E=F.id||{},F.id={}}(o),function(n){n.children("tbody").children("tr").each(I)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(q,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(e(P,a))
s.forEach(e(X,i())),s.forEach(e(Q,a))}(l),en(),f.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function rn(n,a){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,a),v("arena.process")}function on(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?g([m(T),m("fsh_arenaFull"),tn().catch(()=>({})),L()],e(rn,n)):u("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-ed0ade9b.js.map
