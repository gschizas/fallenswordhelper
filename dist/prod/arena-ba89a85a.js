import{b4 as n,N as t,q as a,v as e,aj as s,bc as r,I as o,c,b3 as i,y as l,aP as f,z as d,a0 as u,ah as m}from"./calfSystem-3956a623.js"
import{i as p}from"./isArray-03eca71a.js"
import{a as v}from"./allthen-a3d20eb3.js"
import{l as h,p as b}from"./lvlTests-8590fea4.js"
import{l as g}from"./loadDataTables-165302ba.js"
import{c as y}from"./changeMinMax-1c2bfa85.js"
import{f as x,a as L,m as M,t as T}from"./assets-0e690637.js"
import{u as k}from"./updateUrl-4773abd4.js"
function j(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let w,_
function q(){s(x,w)}function F(n,t){w=w||{},w.minLvl=n,w.maxLvl=t,q()}function E(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function N(){y(F,E)}function C(){F(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(w.minLvl),$("#fshMaxLvl").val(w.maxLvl),E()}function D(n){w=w||{},w.hideMoves=n.target.checked,q(),$(".moveMax").toggle(!n.target.checked)}function S(n,t){return!w||function(n,t){const a=w.minLvl,e=w.maxLvl,s=o(t[7])
return h(b,s,a,e)}(0,t)}function A(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(L)
!function(n){const t=$("#fshHideMoves",n)
w&&"hideMoves"in w&&(t.prop("checked",w.hideMoves),$(".moveMax").toggle(!w.hideMoves)),t.on("click",D)}(t),function(n){const t=$("#fshMinLvl",n)
w&&"minLvl"in w?t.val(w.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
w&&"maxLvl"in w?t.val(w.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",N),$("#fshReset",n).on("click",C)}(t),$("td",n).append(t)}function J(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,w,w.id].every(n)&&(w.id[e[1]]=e[1],function(n,t){_&&!_[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function R(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function z(n,t){const a=M.exec($("img",n).attr("src"))
a&&(!function(n,t){w.moves[n[1]]&&3===w.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function B(n,t){const a=$(t),e=a.children()
J(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(R)}(e),function(n,t){const a=n.eq(8)
w&&w.moves&&z(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const G=n=>[n,Number(n.previousElementSibling.value)]
function H(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function I(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function P(n){n&&n.classList&&n.classList.add("fshGray")}function U(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&P(t)}function K(n,t,a){t.dataset.tipped=a.players.map(e(I,n)).join("<br>"),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&P(t)}(n,t,a)}const O=[n,n=>p(n.players),n=>n.players.length>0]
function Q(n,[t,,a]){O.every(n=>n(a))&&K(n,t,a)}const V="td.sorting, td.sorting_asc, td.sorting_desc"
function W(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function X(n){return l(f({cmd:"arena"},n))}function Y(){return X({subcmd:"view"})}function Z(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function nn(){A(),q(),$.fn.dataTable.ext.search.push(S)}function tn(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(Z),function(n){w=n||{},_=w.id||{},w.id={}}(o),function(n){n.children("tbody").children("tr").each(B)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(j,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(G).map(e(H,a))
s.forEach(e(Q,i())),s.forEach(e(U,a))}(l),nn(),f.DataTable(T),function(n){$(V,n).off("click"),n.on("click",V,W)}(r),r.on("click",'input.custombutton[type="submit"]',k)}function an(n,a){t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),tn(n,a)}function en(){if(d())return
const n=$("#arenaTypeTabs")
1===n.length?v([m(x),m("fsh_arenaFull"),Y().catch(()=>({})),g()],e(an,n)):u("arena","Join error screen ?")}export{X as a,en as i,Y as v}
//# sourceMappingURL=arena-ba89a85a.js.map
