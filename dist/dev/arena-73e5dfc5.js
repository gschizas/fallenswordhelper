import{b5 as n,N as t,q as a,v as e,ak as s,bg as r,I as o,c,b4 as i,R as l,z as f,a1 as d,ai as u,bh as p,bi as m}from"./calfSystem-94018cd0.js"
import{a as v}from"./allthen-55ea9059.js"
import{l as h,p as b}from"./lvlTests-80d9f538.js"
import{l as g}from"./loadDataTables-1819f403.js"
import{c as x}from"./changeMinMax-02149fd9.js"
import{f as y,a as L,m as M,t as T}from"./assets-3b7e982f.js"
import{u as k}from"./updateUrl-48eff90a.js"
import{a as j}from"./arena-e6f62ae5.js"
function w(n,t,[a,e]){const s=n.find(([,n])=>n===a)
return s&&(s[0].closest("tr").style.backgroundColor="#ff0000",t[a]=e),t}let _,q
function F(){s(y,_)}function E(n,t){_=_||{},_.minLvl=n,_.maxLvl=t,F()}function N(){$('#arenaTypeTabs table[width="635"]').DataTable().draw()}function C(){x(E,N)}function D(){E(r.arenaMinLvl,r.arenaMaxLvl),$("#fshMinLvl").val(_.minLvl),$("#fshMaxLvl").val(_.maxLvl),N()}function R(n){_=_||{},_.hideMoves=n.target.checked,F(),$(".moveMax").toggle(!n.target.checked)}function S(n,t){return!_||function(n,t){const a=_.minLvl,e=_.maxLvl,s=o(t[7])
return h(b,s,a,e)}(0,t)}function J(n,t,a,e){return!0}function z(){const n=function(){const n=$("#pCC > table > tbody > tr:nth-child(4)")
return n.clone().insertBefore(n).find("td").attr("height","2"),n.clone().insertAfter(n).find("td").attr("height","1"),n}(),t=$(L)
!function(n){const t=$("#fshHideMoves",n)
_&&"hideMoves"in _&&(t.prop("checked",_.hideMoves),$(".moveMax").toggle(!_.hideMoves)),t.on("click",R)}(t),function(n){const t=$("#fshMinLvl",n)
_&&"minLvl"in _?t.val(_.minLvl):t.val(r.arenaMinLvl)}(t),function(n){const t=$("#fshMaxLvl",n)
_&&"maxLvl"in _?t.val(_.maxLvl):t.val(r.arenaMaxLvl)}(t),function(n){$("#fshMinLvl, #fshMaxLvl",n).on("keyup",C),$("#fshReset",n).on("click",D)}(t),$("td",n).append(t)}function A(t,a){const e=/#\s(\d+)/.exec(a.eq(0).text());[e,_,_.id].every(n)&&(_.id[e[1]]=e[1],function(n,t){q&&!q[t]&&(n.css("background-color","#F5F298"),n.find("tr").css("background-color","#F5F298"))}(t,e[1]))}function B(n,t){const a=/(\d)\.png/.exec($("img",t).attr("src"))
a&&$(t).attr("data-order",a[1])}function G(n,t){const a=M.exec($("img",n).attr("src"))
a&&(!function(n,t){_.moves[n[1]]&&3===_.moves[n[1]]&&t.addClass("moveMax")}(a,t),n.attr("data-order",a[1]))}function H(n,t){const a=$(t),e=a.children()
A(a,e),function(n){const t=n.eq(1),a=/(\d+)\s\/\s(\d+)/.exec(t.text())
a&&t.attr("data-order",100*(Number(a[1])-Number(a[2]))+Number(a[2]))}(e),function(n){const t=n.eq(2)
t.attr("data-order",$("td",t).first().text().replace(/[,\s]/g,""))}(e),function(n){n.slice(4,7).each(B)}(e),function(n,t){const a=n.eq(8)
_&&_.moves&&G(a,t)}(e,a),function(n){const t=n.eq(8)
1===t.children(c).length&&t.attr("data-order",t.find("td").first().text().replace(/[,\s]/g,""))}(e)}const I=n=>[n,Number(n.previousElementSibling.value)]
function U(n,t){return n.r.arenas?t.concat(n.r.arenas.find(n=>n.id===t[1])):t}function K(n,t){return t.guild_id===n?`<span class="fshRed">${t.name}</span>`:t.name}function O(n){n&&n.classList&&n.classList.add("fshGray")}function P(n,[t,,a]){a&&((n,t)=>{return((n,t)=>1===t.reward_type&&n.r.moves)(n,t)&&((a=((n,t)=>n.r.moves.find(n=>n.id===t.reward))(n,t))&&3===a.max)
var a})(n,a)&&O(t)}function Q(n,t,a){t.dataset.tipped=a.players.map(e(K,n)).join("<br>"),t.classList.add("tip-static"),n&&"Join"===t.value&&function(n,t,a){a.players.filter(t=>t.guild_id===n).length===a.max_players/4&&O(t)}(n,t,a)}const V=[n,n=>l(n.players),n=>n.players.length>0]
function W(n,[t,,a]){V.every(n=>n(a))&&Q(n,t,a)}const X="td.sorting, td.sorting_asc, td.sorting_desc"
function Y(n){const t=$(n.target).closest("td"),a=function(n){const t=n.attr("class"),a=/sorting([^\s]+)/.exec(t)
return a&&"_desc"===a[1]?"asc":"desc"}(t)
!function(n,t,a){const e=n.closest(c).DataTable()
3!==t?e.order([3,"asc"],[t,a]).draw():e.order([3,a]).draw()}(t,t.index(),a)}function Z(){return j({subcmd:"view"})}function nn(n,t){const a=$("tr",t).first()
$("a",a).contents().unwrap(),$(t).prepend($("<thead/>").append(a))}function tn(){z(),F(),$.fn.dataTable.ext.search.push(S),$.fn.dataTable.ext.search.push(J)}function an(r,[o,c,l]){const f=$('table[width="635"]',r)
f.each(nn),function(n){_=n||{},q=_.id||{},_.id={}}(o),function(n){n.children("tbody").children("tr").each(H)}(f),function(r){if(!n(r))return
const o=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(n=>[n,n.previousElementSibling.value]),c=a(r).reduce(e(w,o),{})
s("fsh_arenaFull",c)}(c),function(a){if(!a.s||!n(a.r))return
const s=t('#arenaTypeTabs tr:not([style="display: none;"]) input[type="submit"]').map(I).map(e(U,a))
s.forEach(e(W,i())),s.forEach(e(P,a))}(l),tn(),f.DataTable(T),function(n){$(X,n).off("click"),n.on("click",X,Y)}(r),r.on("click",'input.custombutton[type="submit"]',k)}function en(n,a){p("arena.process"),t('#arenaTypeTabs tr[style="display: none;"]').forEach(n=>n.remove()),an(n,a),m("arena.process")}function sn(){if(f())return
const n=$("#arenaTypeTabs")
1===n.length?v([u(y),u("fsh_arenaFull"),Z().catch(()=>({})),g()],e(en,n)):d("arena","Join error screen ?")}export{sn as i,Z as v}
//# sourceMappingURL=arena-73e5dfc5.js.map
