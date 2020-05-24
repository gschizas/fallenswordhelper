import{ax as n,u as e,F as t,b3 as a,H as s,aN as l,aa as i,a4 as r,bf as o,y as f,ah as u,o as c,e as h,w as d,aj as p}from"./calfSystem-d96a3efd.js"
import{n as v}from"./numberIsNaN-5b8bfc11.js"
import{b as m,p as y,c as g}from"./levelHighlight-580474a6.js"
import"./all-a5e007ad.js"
import{l as M,p as L}from"./lvlTests-87272fa2.js"
import{l as P}from"./loadDataTables-366dff61.js"
import{o as x}from"./onlinePlayersPage-4cfae1d0.js"
function b(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let C,R
const j=[()=>C,n=>function(n){const e=n.match(/;guild_id=([0-9]+)"/)
if(e)return Number(e[1])}(n[0])!==a(),n=>s(n[2])>=m,n=>s(n[2])<=y]
function w(n,e){(function(n){return j.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function I(n,e){C=t("highlightPlayersNearMyLvl"),R=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:w,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function N(){R.draw()}function O(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||N()}function k(n,e){return parseInt($(n,e).val(),10)}function q(n,e){v(e)||r(n,e)}function _(n,e,t){const a=k("#fshMinLvl",n),l=k("#fshMaxLvl",n)
q("onlinePlayerMinLvl",a),q("onlinePlayerMaxLvl",l)
const r=i(s(t[2]),0)
return M(L,r,a,l)}let T,D,H,z
function S(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(e(_,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(T),g(),I(T,function(t){return n(t).map(e(b,t))}(D))}function A(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return D[n]&&D[n][3]>e})(s,n)||(D[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function F(n,e){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=z;e+=1)x(e).then(n)}function G(n){$("#fshOutput",T).append(n)}function W(n){G(" "+(H+1))
const t=d(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(A,a))}(t,a),H+=1,1===H&&F(W,a),H===z&&(p("fsh_onlinePlayers",D),S(D))}function B(n){"fshRefresh"===n.target.id&&($("#fshRefresh",T).hide(),H=0,D={},x(1).then(W),r("lastOnlineCheck",l),G("Parsing online players...")),"fshReset"===n.target.id&&function(n){r("onlinePlayerMinLvl",o.onlinePlayerMinLvl),r("onlinePlayerMaxLvl",o.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(o.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(o.onlinePlayerMaxLvl),N()}(T)}function E(){T.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return l-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(l-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),u("fsh_onlinePlayers").then(S),c(T[0],B),h(T[0],"keyup",O)}export default function(n){f()||(T=n?$(n):$("#pCC"),P().then(E))}
//# sourceMappingURL=injectOnlinePlayers-599ddf05.js.map
