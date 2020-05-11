import{b4 as n,N as t,q as e,v as a,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as d,z as f,a0 as u,ah as m,bd as p,be as v}from"./calfSystem-99da704d.js"
import{i as h}from"./isArray-e5fc8b65.js"
import{s as b}from"./setTipped-4c5fce4d.js"
import{a as g}from"./allthen-d5b32056.js"
import{l as y,p as x}from"./lvlTests-73991118.js"
import{l as L}from"./loadDataTables-65d61b54.js"
import{c as M}from"./changeMinMax-ebcdced5.js"
import{f as T,a as _,m as j,t as k}from"./assets-90437058.js"
import{u as w}from"./updateUrl-68b3753f.js"
function q(n,t,[e,a]){const s=n.find(([,n])=>n===e)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[e]=a),t}let F,E
function N(){s(T,F)}function C(n,t){F=F||{},F.minLvl=n,F.maxLvl=t,N()}function D(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function S(){M(C,D)}function z(){C(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(F.minLvl),$("#fshMaxLvl").val(F.maxLvl),D()}function A(n){F=F||{},F.hideMoves=n.target.checked,N(),$(".moveMax").toggle(!n.target.checked)}function J(n,t){return!F||function(n,t){const e=F.minLvl,a=F.maxLvl,s=o(t[7])
return y(x,s,e,a)}(0,t)}function R(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(_)
!function(n){const t=$("#fshHideMoves",n)
F&&"hideMoves"in F&&(t.prop("checked",F.hideMoves),$(".moveMax").toggle(!F.hideMoves)),t.on("click",A)}(t),function(n){const t=$("#fshMinLvl",n)
F&&"minLvl"in F?t.val(F.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
F&&"maxLvl"in F?t.val(F.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",S),$("#fshReset",n).on("click",z)}(t),$("td",n).append(t)}function B(t,e){const a=/#\s(\d+)/.exec(e.eq(0).text());[a,F,F.id].every(n)&&(F.id[a[1]]=a[1],function(n,t){E&&!E[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,a[1]))}function G(n,t){const e=/(\d)\.png/.exec($("img",t).attr("src"))
e&&$(t).attr("data-order",e[1])}function H(n,t){const e=j.exec($("img",n).attr("src"))
e&&(!function(n,t){F.moves[n[1]]&&3===F.moves[n[1]]&&t.addClass("moveMax")}(e,t),n.attr("data-order",e[1]))}function I(n,t){const e=$(t),a=e.children()
B(e,a),function(n){const t=n.eq(1),e=/(\d+)\s\/\s(\d+)/.exec(t.text())
e&&t.attr("data-order",100*(Number(e[1])-Number(e[2]))+Number(e[2]))}(a),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(a),function(n){n.slice(4,7).each(G)}(a),function(n,t){const e=n.eq(8)
F&&F.moves&&H(e,t)}(a,e),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(a)}const O=n=>[n,Number(n.previousElementSibling.value)]
function P(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function U(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function K(n){n&&n.classList&&n.classList.add("fshGray")}function Q(n,[t,,e]){e&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((e=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===e.max)
var e})(n,e)&&K(t)}function V(n,t,e){b(e.players.map(a(U,n)).join("<br>"),t),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,e){e.players.filter(t=>t.guild_id===n).length===e.max_players/4&&K(t)}(n,t,e)}const W=[n,n=>h(n.players),n=>n.players.length>0]
function X(n,[t,,e]){W.every(n=>n(e))&&V(n,t,e)}const Y="td.sorting, td.sorting_asc, td.sorting_desc"
function Z(n){const t=$(n.target).closest("td"),e=function(n){const t=n.attr("class"),e=/sorting([^\s]+)/.exec(t)
return e&&"_desc"===e[1]?"asc":"desc"}(t)
!function(n,t,e){const a=n.closest(c).DataTable()
3!==t?a.order([3,"asc"],[t,e]).draw():a.order([3,e]).draw()}(t,t.index(),e)}function nn(n){return l(d({cmd:"arena"},n))}function tn(){return nn({subcmd:"view"})}function en(n,t){const e=$("tr",t).first()
$("a",e).contents().unwrap(),$(t).prepend($("<thead/>").append(e))}function an(){R(),N(),$.fn.dataTable.ext.search.push(J)}function sn(r,[o,c,l]){const d=$('table[width="635"]',r)
d.each(en),function(n){F=n||{},E=F.id||{},F.id={}}(o),function(n){n.children("tbody").children("tr").each(I)}(d),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=e(r).reduce(a(q,o),{})
s("fsh_arenaFull",c)}(c),function(e){if(!e.s||!n(e.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(O).map(a(P,e))
s.forEach(a(X,i())),s.forEach(a(Q,e))}(l),an(),d.DataTable(k),function(n){$(Y,n).off("click"),n.on("click",Y,Z)}(r),r.on("click",'input.custombutton[type="submit"]',w)}function rn(n,e){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),sn(n,e),v("arena.process")}function on(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?g([m(T),m("fsh_arenaFull"),tn().catch(()=>({})),L()],a(rn,n)):u("arena","Join error screen ?")}var cn=Object.freeze({__proto__:null,default:on})
export{nn as a,cn as b,on as i,tn as v}
//# sourceMappingURL=arena-60c541a2.js.map
